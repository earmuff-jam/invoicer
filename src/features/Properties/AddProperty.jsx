import { InfoRounded } from "@mui/icons-material";
import { Stack, Button, Tooltip, Typography } from "@mui/material";
import TextFieldWithLabel from "common/UserInfo/TextFieldWithLabel";

export default function AddProperty({
  register,
  errors,
  onSubmit,
  isDisabled = false,
  isEditing = false,
}) {
  return (
    <form onSubmit={onSubmit}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={2}>
          <TextFieldWithLabel
            label="Property Name *"
            id="name"
            placeholder="Name of your property"
            errorMsg={errors.name?.message}
            inputProps={{ ...register("name") }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextFieldWithLabel
            label="Address *"
            id="address"
            placeholder="123 Main St"
            errorMsg={errors.address?.message}
            inputProps={{ ...register("address") }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextFieldWithLabel
            label="City *"
            id="city"
            placeholder="Richmond"
            errorMsg={errors.city?.message}
            inputProps={{ ...register("city") }}
          />
          <TextFieldWithLabel
            label="State *"
            id="state"
            placeholder="NC"
            errorMsg={errors.state?.message}
            inputProps={{ ...register("state") }}
          />
          <TextFieldWithLabel
            label="ZIP Code *"
            id="zipcode"
            placeholder="78701"
            errorMsg={errors.zipcode?.message}
            inputProps={{ ...register("zipcode") }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextFieldWithLabel
            label="Owner Email Address *"
            id="owner_email"
            placeholder="owner@example.com"
            inputProps={{ ...register("owner_email"), disabled: true }}
            errorMsg={errors.owner_email?.message}
            labelIcon={<InfoRounded fontSize="small" color="secondary" />}
            labelIconHelper="Editing an email address is disabled by default."
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextFieldWithLabel
            label="Number of Units / Bedroom *"
            id="units"
            placeholder="e.g. 4"
            errorMsg={errors.units?.message}
            inputProps={{ ...register("units") }}
          />
          <TextFieldWithLabel
            label="Number of Bathrooms *"
            id="bathrooms"
            placeholder="e.g. 2"
            errorMsg={errors.bathrooms?.message}
            inputProps={{ ...register("bathrooms") }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextFieldWithLabel
            label="Monthly Rent Amount *"
            id="rent"
            placeholder="2750.00"
            errorMsg={errors.rent?.message}
            inputProps={{ ...register("rent") }}
          />
          <TextFieldWithLabel
            label={
              <Stack direction="row" alignItems="center">
                <Tooltip title="Any extra charges assigned to the tenant such as floor replacement.">
                  <InfoRounded
                    color="secondary"
                    fontSize="small"
                    sx={{ fontSize: "1rem", margin: "0.2rem" }}
                  />
                </Tooltip>
                <Typography variant="subtitle2">
                  Monthly additional charges
                </Typography>
              </Stack>
            }
            id="additional_rent"
            placeholder="400.00"
            errorMsg={errors.additional_rent?.message}
            inputProps={{ ...register("additional_rent") }}
          />
        </Stack>

        <Button variant="contained" disabled={isDisabled} type="submit">
          {isEditing ? "Edit Property" : "Add Property"}
        </Button>
      </Stack>
    </form>
  );
}
