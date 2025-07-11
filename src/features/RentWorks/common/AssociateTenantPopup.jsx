import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import dayjs from "dayjs";

import { InfoRounded } from "@mui/icons-material";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomSnackbar from "common/CustomSnackbar/CustomSnackbar";
import TextFieldWithLabel from "common/UserInfo/TextFieldWithLabel";
import { useGetUserListQuery } from "features/Api/firebaseUserApi";
import { useUpdatePropertyByIdMutation } from "features/Api/propertiesApi";
import { useCreateTenantMutation } from "features/Api/tenantsApi";
import {
  BLANK_ASSOCIATE_TENANT_DETAILS,
  LEASE_TERM_MENU_OPTIONS,
} from "features/RentWorks/common/constants";
import { fetchLoggedInUser } from "features/RentWorks/common/utils";

export default function AssociateTenantPopup({
  closeDialog,
  property,
  tenants,
}) {
  const user = fetchLoggedInUser();
  const currentUserId = user?.uid;

  const [createTenant] = useCreateTenantMutation();
  const [updateProperty] = useUpdatePropertyByIdMutation();

  const { data: profiles, isLoading } = useGetUserListQuery();

  const [options, setOptions] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
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

  const reset = () => setFormData(BLANK_ASSOCIATE_TENANT_DETAILS);

  const isSubmitAssociationDisabled = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter(
      (v) => v.isRequired,
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

  const handleSubmitAssociation = async (ev) => {
    ev.preventDefault();
    const draftData = Object.entries(formData).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {});

    if (!isSoR) delete draftData["assignedRoomName"];

    draftData["id"] = uuidv4();
    draftData["propertyId"] = property.id;
    draftData["createdBy"] = currentUserId;
    draftData["createdOn"] = dayjs().toISOString();

    draftData["updatedBy"] = currentUserId;
    draftData["updatedOn"] = dayjs().toISOString();

    try {
      await createTenant(draftData).unwrap();
      await updateProperty({
        id: property?.id,
        rentees: [...(property?.rentees || []), draftData?.email],
        updatedBy: user?.uid,
        updatedOn: dayjs().toISOString(),
      }).unwrap();

      setShowSnackbar(true);
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error);
    }
    closeDialog();
    reset();
  };

  useEffect(() => {
    if (!isLoading && Array.isArray(profiles)) {
      const draftProfiles = profiles
        .filter((profile) => profile?.uid !== currentUserId)
        .map((v) => ({
          display: v.googleEmailAddress,
          value: v.id,
          label: v.googleEmailAddress,
        }));
      setOptions(draftProfiles);
    }
  }, [isLoading]);

  useEffect(() => {
    // update form fields if present
    if (property) {
      const updatedFormData = { ...formData };
      updatedFormData["rent"].value = property?.rent;
      setFormData(updatedFormData);
    }
  }, [property?.id, isLoading]);

  return (
    <Stack spacing="0.2rem">
      <Typography variant="body2" fontWeight="medium">
        Email Address *
      </Typography>
      <Autocomplete
        id="email"
        options={options}
        value={
          options.find(
            (opt) =>
              (typeof opt === "string" ? opt : opt.value) ===
              (formData.email.value?.value || formData.email.value),
          ) || formData.email.value
        }
        onChange={(_, newValue) => {
          const value =
            typeof newValue === "string"
              ? newValue
              : newValue?.display || newValue?.label || "";
          handleChange({ target: { id: "email", value } });
        }}
        onInputChange={(_, inputValue, reason) => {
          if (reason === "input") {
            handleChange({ target: { id: "email", value: inputValue } });
          }
        }}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option.display || option.label || ""
        }
        isOptionEqualToValue={(option, value) =>
          (typeof option === "string" ? option : option.value) ===
          (typeof value === "string" ? value : value.value)
        }
        freeSolo
        noOptionsText="Sorry no matching records found."
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Select or enter tenant email"
            label="Tenant Email"
            error={!!formData.email.errorMsg}
            helperText={formData.email.errorMsg}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Typography sx={{ textTransform: "initial" }}>
              {option.display ||
                option.label ||
                (typeof option === "string" ? option : "")}
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
          label={
            <Stack direction="row" alignItems="center">
              <Tooltip title="Monthly rent amount is the populated from the property details">
                <InfoRounded
                  color="secondary"
                  fontSize="small"
                  sx={{ fontSize: "1rem", margin: "0.2rem" }}
                />
              </Tooltip>
              <Typography variant="subtitle2">Monthly Rent Amount</Typography>
            </Stack>
          }
          id="rent"
          name="rent"
          isDisabled={true}
          placeholder="Monthly rent amount. Eg, 2150.00"
          value={formData?.rent?.value || ""} // todo : convert this form to react hook forms and update this to accomodate rent + additional_rent
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
                  disabled={
                    tenants?.filter((tenant) => tenant.isPrimary).length > 0
                  }
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
              label="Primary point of contact (PoC)"
            />
            <Tooltip title="Primary point of contact. If current property already contains existing tenant as a primary contact, PoC is disabled.">
              <InfoRounded
                fontSize="small"
                color="secondary"
                sx={{ fontSize: "1rem" }}
              />
            </Tooltip>
          </FormGroup>
        </Stack>

        <Stack>
          <FormGroup sx={{ flexDirection: "row", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={property?.rentees?.length > 0} // cannot assign SoR if tenants already exists
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
              label="Single Occupancy Room (SoR)?"
            />
            <Tooltip title="Rooms occupied by single individual. If current property already contains existing tenant, SoR is disabled.">
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
      <CustomSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        title="Changes saved."
      />
    </Stack>
  );
}
