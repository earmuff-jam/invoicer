import { useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  BLANK_ASSOCIATE_TENANT_DETAILS,
  LEASE_TERM_MENU_OPTIONS,
} from "features/Properties/constants";

import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { InfoRounded } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextFieldWithLabel from "common/UserInfo/TextFieldWithLabel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export default function AssociateTenantPopup({
  closeDialog,
  creatorId,
  property,
}) {
  // dummy data
  const profiles = [
    {
      id: uuidv4(),
      emailAddress: "emily22@invoicer.gmail.com",
    },
  ];
  const loading = false;

  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState(BLANK_ASSOCIATE_TENANT_DETAILS);

  const isSoR = formData?.isSoR?.value || false;

  const handleCheckbox = (event) => {
    const { checked: value, id } = event.target;
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

  const handleChange = (ev) => {
    const { id, value } = ev.target;
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

  const handleLeaseTerm = (ev, id) => {
    const { value } = ev.target;
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

  const isSubmitAssociationDisabled = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter(
      (v) => v.isRequired
    );
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => {
      if (el.type !== "boolean") {
        return el.value.trim() === "";
      }
    });

    // if SoR is selected, ensure room name is filled
    const sorFormField = formData.isSoR?.value;

    return (
      containsErr ||
      isRequiredFieldsEmpty ||
      (sorFormField && formData.assignedRoomName?.value?.length <= 0)
    );
  };

  const handleSubmitAssociation = (ev) => {
    ev.preventDefault();
    const draftData = Object.entries(formData).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {});

    draftData["propertyId"] = property.id;
    draftData["updated_on"] = dayjs().toISOString();

    const draftTenantsList = [draftData];
    localStorage.setItem("tenants", JSON.stringify(draftTenantsList));
    closeDialog();
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

  return (
    <Stack spacing="0.2rem">
      <Typography variant="body2" fontWeight="medium">
        Email Address *
      </Typography>
      <Autocomplete
        id="email"
        options={options}
        value={formData.email.value}
        onChange={(_, newValue) => {
          const draftEvent = {
            target: {
              id: "email",
              value: newValue?.display || newValue?.label || newValue || "",
            },
          };
          handleChange(draftEvent);
        }}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option.display || option.label || ""
        }
        isOptionEqualToValue={(option, value) =>
          (option.value || option) === (value.value || value)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Select tenant"
            label="Tenant Email"
            value={formData.email.value}
            error={!!formData.email.errorMsg}
            helperText={formData.email.errorMsg}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Typography sx={{ textTransform: "initial" }}>
              {option.display || option.label || option}
            </Typography>
          </li>
        )}
      />

      {/* Lease start date */}
      <Stack spacing={2} sx={{ padding: "1rem 0rem" }}>
        <Typography variant="body2" fontWeight="medium">
          Start date of the lease *
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date *"
            id="start_date"
            name="start_date"
            placeholder="Start Date"
            value={dayjs(formData?.start_date?.value || dayjs())}
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
      <Stack spacing={1}>
        <Typography variant="body2" fontWeight="medium">
          Term length of the lease *
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            size="small"
            variant="standard"
            labelId="lease-term-label"
            id="term"
            value={formData?.term?.value}
            label="Select Lease Term"
            onChange={(ev) => handleLeaseTerm(ev, "term")}
          >
            {LEASE_TERM_MENU_OPTIONS.map((option) => (
              <MenuItem key={option.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Tax and Rent Amount */}
      <Stack direction="row" spacing={1}>
        <TextFieldWithLabel
          label={
            <Stack direction="row" alignItems="center">
              <Tooltip title="The tax rate applied in percentage.">
                <InfoRounded
                  color="secondary"
                  fontSize="small"
                  sx={{ fontSize: "1rem", margin: "0.2rem" }}
                />
              </Tooltip>
              <Typography variant="subtitle2">Standard Tax rate</Typography>
            </Stack>
          }
          id="tax_rate"
          name="tax_rate"
          placeholder="Standard tax rate. Eg, 1"
          value={formData?.tax_rate?.value || ""}
          handleChange={handleChange}
          errorMsg={formData.tax_rate?.["errorMsg"]}
        />

        <TextFieldWithLabel
          label="Monthly rent amount"
          id="rent"
          name="rent"
          placeholder="Monthly rent amount. Eg, 2150.00"
          value={formData?.rent?.value || ""}
          handleChange={handleChange}
          errorMsg={formData.rent?.["errorMsg"]}
        />
      </Stack>

      {/* SoR room / partial room rental checkbox */}
      <Stack spacing={1}>
        <Stack>
          <FormGroup sx={{ flexDirection: "row", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  id={formData?.isPrimary?.id}
                  checked={formData?.isPrimary?.value || false}
                  onChange={handleCheckbox}
                  slotProps={{
                    input: {
                      "aria-label": "controlled",
                    },
                  }}
                />
              }
              label="Primary point of contact"
            />
          </FormGroup>
        </Stack>

        <Stack>
          <FormGroup sx={{ flexDirection: "row", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  id={formData?.isSoR?.id}
                  checked={formData?.isSoR?.value || false}
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
            <Tooltip title="Single Occupancy Rooms are rooms that are rented out to a single individual">
              <InfoRounded
                fontSize="small"
                color="secondary"
                sx={{ fontSize: "1rem" }}
              />
            </Tooltip>
          </FormGroup>
        </Stack>

        {isSoR && (
          <TextFieldWithLabel
            label="Room Name"
            id="assignedRoomName"
            placeholder="Assign the above user a room"
            value={formData?.assignedRoomName?.value || ""}
            handleChange={handleChange}
            errorMsg={formData?.assignedRoomName?.["errorMsg"] || ""}
          />
        )}
      </Stack>

      <Button
        variant="text"
        onClick={handleSubmitAssociation}
        disabled={isSubmitAssociationDisabled()}
      >
        Update Tenants
      </Button>
    </Stack>
  );
}
