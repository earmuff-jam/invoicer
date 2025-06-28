import { InfoRounded } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import TextFieldWithLabel from "common/UserInfo/TextFieldWithLabel";

export default function AddProperty({
  formData,
  handleChange,
  isDisabled,
  submit,
  isEditing = false, // used when users are editing this form
}) {
  return (
    <Stack direction="column" spacing={1}>
      {/* Property Name */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="Property Name *"
          id="name"
          name="name"
          placeholder="Name of your property"
          value={formData.name.value}
          handleChange={handleChange}
          errorMsg={formData.name.errorMsg}
        />
      </Stack>

      {/* Address */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="Address *"
          id="address"
          name="address"
          placeholder="123 Main St"
          value={formData.address.value}
          handleChange={handleChange}
          errorMsg={formData.address.errorMsg}
        />
      </Stack>

      {/* City and State and Apt Number*/}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="City *"
          id="city"
          name="city"
          placeholder="Richmond"
          value={formData.city.value}
          handleChange={handleChange}
          errorMsg={formData.city.errorMsg}
        />
        <TextFieldWithLabel
          label="State *"
          id="state"
          name="state"
          placeholder="NC"
          value={formData.state.value}
          handleChange={handleChange}
          errorMsg={formData.state.errorMsg}
        />
        <TextFieldWithLabel
          label="Apt number"
          id="apt"
          name="APT"
          placeholder="192"
          value={formData.apt.value}
          handleChange={handleChange}
          errorMsg={formData.apt.errorMsg}
        />
      </Stack>

      {/* Zipcode */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="ZIP Code *"
          id="zipcode"
          name="zipcode"
          placeholder="78701"
          value={formData.zipcode.value}
          handleChange={handleChange}
          errorMsg={formData.zipcode.errorMsg}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        {/* Owner email address */}
        <TextFieldWithLabel
          label="Owner Email Address *"
          id="owner_email"
          name="owner_email"
          placeholder="owner@example.com"
          value={formData.owner_email.value}
          handleChange={handleChange}
          isDisabled={true} // email form fields are disabled by default
          errorMsg={formData.owner_email.errorMsg}
          labelIcon={<InfoRounded fontSize="small" color="secondary" />}
          labelIconHelper="Editing an email address is disabled by default."
        />
      </Stack>

      {/* Number of units / bathrooms */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="Number of Units / Bedroom *"
          id="units"
          name="units"
          placeholder="e.g. 4"
          value={formData.units.value}
          handleChange={handleChange}
          errorMsg={formData.units.errorMsg}
        />
        <TextFieldWithLabel
          label="Number of Bathrooms *"
          id="bathrooms"
          name="bathrooms"
          placeholder="e.g. 2"
          value={formData.bathrooms.value}
          handleChange={handleChange}
          errorMsg={formData.bathrooms.errorMsg}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="Monthly Rent Amount *"
          id="rent"
          name="rent"
          placeholder="Rent in dollar amount. e.g. 2750.00"
          value={formData.rent.value}
          handleChange={handleChange}
          errorMsg={formData.rent.errorMsg}
        />
      </Stack>

      <Button variant="contained" disabled={isDisabled()} onClick={submit}>
        {isEditing ? "Edit Property" : "Add Property"}
      </Button>
    </Stack>
  );
}
