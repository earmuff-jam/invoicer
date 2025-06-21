import { useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { isValid } from "features/Properties/utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InfoRounded, KeyboardArrowDownRounded } from "@mui/icons-material";
import TextFieldWithLabel from "src/common/UserInfo/TextFieldWithLabel";
import { LEASE_TERM_MENU_OPTIONS } from "src/features/Properties/constants";

export default function AssociateTenantPopup({
  handleSubmit,
  existingGroups,
  creatorId,
  data,
}) {
  // dummy data
  const profiles = [
    {
      id: uuidv4(),
      emailAddress: "emily22@invoicer.gmail.com",
    },
  ];
  const loading = false;
  const isSor = true; // formfield of checkbox

  const [options, setOptions] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleCheckbox = (event) => {
    // setChecked(event.target.checked);
  };

  const handleChange = () => {};

  const handleLeaseTerm = () => {};

  const handleDateTime = (ev, id) => {
    const value = dayjs(ev).format("MM-DD-YYYY");
    const updatedFormData = { ...formData };
    let errorMsg = "";
    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }
    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };
    setFormData(updatedFormData);
  };

  useEffect(() => {
    if (!loading && Array.isArray(profiles)) {
      const draftProfiles = profiles
        .filter((profile) => profile.id !== creatorId)
        .map((v) => ({
          display: v.emailAddress,
          value: v.id,
          label: v.emailAddress,
        }));
      setOptions(draftProfiles);
    }
  }, []);

  useEffect(() => {
    if (
      Array.isArray(existingGroups) &&
      existingGroups.length > 0 &&
      Array.isArray(profiles) &&
      profiles.length > 0
    ) {
      const profileMap = new Map(
        profiles.map((profile) => [profile.id, profile])
      );
      const collaborators = existingGroups
        ?.map((userID) => profileMap.get(userID))
        .filter((profile) => profile !== undefined);

      const draftCollaborators = collaborators.map((profile) => ({
        display: profile.emailAddress,
        value: profile.id,
        label: profile.emailAddress,
      }));

      setTenants(draftCollaborators);
    }
  }, [existingGroups, profiles]);

  // Helper function to create a new tenant object from email
  const createTenantFromEmail = (email) => ({
    display: email,
    value: uuidv4(),
    label: email,
    isNew: true,
  });

  console.log(tenants, data);

  return (
    <Stack spacing="0.2rem">
      <Typography variant="body2" fontWeight="medium">
        Email Address *
      </Typography>
      <Autocomplete
        id="tenant-options"
        multiple
        freeSolo
        limitTags={5}
        loading={loading}
        options={options}
        value={tenants}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return option.display || option.label || "";
        }}
        isOptionEqualToValue={(option, value) => {
          if (typeof option === "string" && typeof value === "string") {
            return option === value;
          }
          if (typeof option === "object" && typeof value === "object") {
            return option.value === value.value;
          }
          if (typeof option === "string" && typeof value === "object") {
            return option === value.display;
          }
          if (typeof option === "object" && typeof value === "string") {
            return option.display === value;
          }
          return false;
        }}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) =>
            option.display
              .toLowerCase()
              .includes(params.inputValue.toLowerCase())
          );

          const { inputValue } = params;
          const isExisting = options.some(
            (option) =>
              option.display.toLowerCase() === inputValue.toLowerCase()
          );
          const isSelected = tenants.some(
            (tenant) =>
              tenant.display.toLowerCase() === inputValue.toLowerCase()
          );

          if (
            inputValue !== "" &&
            isValid(inputValue) &&
            !isExisting &&
            !isSelected
          ) {
            filtered.push({
              display: inputValue,
              value: `temp_${inputValue}`,
              label: `Add "${inputValue}"`,
              isNew: true,
            });
          }

          return filtered;
        }}
        onChange={(event, newValue, reason, details) => {
          if (reason === "removeOption") {
            console.log("Deleted:", details?.option);
          } else if (reason === "selectOption") {
            console.log("Selected:", details?.option);
          } else if (reason === "createOption") {
            console.log("Created:", details?.option);
          }

          const processedValue = newValue
            .map((item) => {
              if (typeof item === "string") {
                if (isValid(item)) {
                  return createTenantFromEmail(item);
                }
                return null;
              }
              return item;
            })
            .filter(Boolean);

          setTenants(processedValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Associate tenants"
            sx={{ textTransform: "initial" }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            {option.isNew ? (
              <Typography sx={{ textTransform: "initial" }}>
                <strong>Add:</strong> {option.display}
              </Typography>
            ) : (
              <Typography
                sx={{ textTransform: "initial", fontSize: "0.875rem" }}
              >
                {option.display}
              </Typography>
            )}
          </li>
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                size="small"
                label={option.display}
                {...tagProps}
                disabled={option.value === creatorId}
                color={option.isNew ? "secondary" : "default"}
              />
            );
          })
        }
      />

      {/* Partial Room rental checkbox */}
      <Stack spacing={1} sx={{ padding: "1rem 0rem" }}>
        <Typography variant="body2" fontWeight="medium">
          Select the start date of the lease *
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date *"
            id="start_date"
            name="start_date"
            placeholder="Start Date"
            value={dayjs("")}
            onChange={(ev) => handleDateTime(ev, "start_date")}
            errorMsg={formData?.start_date?.["errorMsg"]}
            slotProps={{
              textField: {
                helperText: "Rental start date",
                size: "small",
                sx: { flexGrow: 1 },
              },
            }}
          />
        </LocalizationProvider>
      </Stack>

      {/* Lease Term */}
      <Stack>
        <FormControl fullWidth>
          <InputLabel id="lease-term-label">Lease Term</InputLabel>
          <Select
            size="small"
            variant="standard"
            labelId="lease-term-label"
            id="lease-term"
            value={formData?.leaseTerm?.value}
            label="Select Lease Term"
            onChange={handleLeaseTerm}
          >
            {LEASE_TERM_MENU_OPTIONS.map((option) => (
              <MenuItem key={option.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* SoR room / partial room rental checkbox */}
      <Stack spacing={1}>
        <Stack>
          <FormGroup sx={{ flexDirection: "row", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData?.isChecked?.value || false}
                  onChange={handleCheckbox}
                  slotProps={{
                    input: {
                      "aria-label": "controlled",
                    },
                  }}
                />
              }
              label="Single Occupancy Room (SOR)?"
            />
            <Tooltip title="Single Occupancy Rooms are rooms that are rented out as an individual item">
              <InfoRounded fontSize="small" color="secondary" />
            </Tooltip>
          </FormGroup>
        </Stack>
        {isSor && (
          <TextFieldWithLabel
            label="Room Name"
            id="roomName"
            name="roomName"
            placeholder="Assign the above user a room"
            value={formData?.roomName?.value || ""}
            handleChange={handleChange}
            errorMsg={formData?.roomName?.["errorMsg"] || ""}
          />
        )}
      </Stack>

      <Button
        variant="text"
        onClick={() => {
          handleSubmit(tenants);
          setTenants([]);
        }}
        disabled={tenants.length === 0}
      >
        Update Tenants
      </Button>
    </Stack>
  );
}
