import { useEffect, useState } from "react";

import { Autocomplete, Button, Chip, Stack, TextField } from "@mui/material";

export default function AssociateTenantPopup({
  handleSubmit,
  existingGroups,
  creatorId,
}) {
  const profiles = [
    {
      id: "1",
      emailAddress: "janeDoe@gmail.com",
    },
  ];
  const loading = false;

  const [options, setOptions] = useState([]);
  const [tenants, setTenants] = useState([]);

  useEffect(
    () => {
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
    },
    [
      /* loading, profiles */
    ]
  );

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
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        onChange={(_, newValue) => {
          setTenants((prevItems) => [...prevItems, newValue]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Associate Tenants"
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                label={option.display}
                {...tagProps}
                disabled={option.value === creatorId}
              />
            );
          })
        }
      />
      <Button
        variant="text"
        onClick={() => handleSubmit(tenants)}
        disabled={tenants.length === 0}
      >
        Update Tenants
      </Button>
    </Stack>
  );
}
