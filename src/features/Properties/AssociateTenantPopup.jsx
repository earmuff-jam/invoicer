import { useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { isValid } from "features/Properties/utils";

export default function AssociateTenantPopup({
  handleSubmit,
  existingGroups,
  creatorId,
  data,
}) {
  const profiles = [
    {
      id: uuidv4(),
      emailAddress: "emily22@invoicer.gmail.com",
    },
  ];
  const loading = false;

  const [options, setOptions] = useState([]);
  const [tenants, setTenants] = useState([]);

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
