import { useState } from "react";
import { Stack, Button } from "@mui/material";
import { BLANK_PROPERTY_DETAILS } from "features/Properties/constants";
import TextFieldWithLabel from "common/UserInfo/TextFieldWithLabel";

export default function AddProperty() {
  const [formData, setFormData] = useState(BLANK_PROPERTY_DETAILS);

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

  const isDisabled = () => {
    const containsErrors = Object.values(formData).some(
      (field) => field.errorMsg
    );
    const requiredMissing = Object.values(formData).some(
      (field) => field.isRequired && field.value.trim() === ""
    );
    return containsErrors || requiredMissing;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const result = Object.entries(formData).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {});
    /* eslint-disable no-console */
    console.log("Submitted Property:", result);
  };

  return (
    <Stack direction="column" spacing={1}>
      {/* Property Name */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="Property Name *"
          id="name"
          name="name"
          placeholder="Property Name"
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

      {/* City and State */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="City *"
          id="city"
          name="city"
          placeholder="Austin"
          value={formData.city.value}
          handleChange={handleChange}
          errorMsg={formData.city.errorMsg}
        />
        <TextFieldWithLabel
          label="State *"
          id="state"
          name="state"
          placeholder="TX"
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
          errorMsg={formData.owner_email.errorMsg}
        />
      </Stack>

      {/* Number of units */}
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

      <Button variant="contained" disabled={isDisabled()} onClick={submit}>
        Add Property
      </Button>
    </Stack>
  );
}
