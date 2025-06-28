import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";

import {
  AddPropertyTextString,
  BLANK_PROPERTY_DETAILS,
} from "features/Properties/constants";

import dayjs from "dayjs";
import AButton from "common/AButton";
import AddProperty from "features/Properties/AddProperty";
import { useUpdatePropertyByIdMutation } from "features/Api/propertiesApi";

import { fetchLoggedInUser } from "features/Properties/utils";

import CustomSnackbar from "common/CustomSnackbar/CustomSnackbar";

const defaultDialog = {
  title: "",
  type: "",
  display: false,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuickActions({ property }) {
  const user = fetchLoggedInUser();
  const [updateProperty] = useUpdatePropertyByIdMutation();

  const [dialog, setDialog] = useState(defaultDialog);
  const [showSnackbar, setShowSnackbar] = useState(false);
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
    updatedFormData[id] = { ...updatedFormData[id], value, errorMsg };
    setFormData(updatedFormData);
  };

  const closeDialog = () => setDialog(defaultDialog);

  const isDisabled = () => {
    return Object.values(formData).some(
      (field) =>
        field.errorMsg || (field.isRequired && field.value.trim() === "")
    );
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const result = Object.entries(formData).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {});

    result["id"] = property?.id; // do not let the user manipulate this
    result["updatedBy"] = user?.uid;
    result["updatedOn"] = dayjs().toISOString();

    await updateProperty(result);

    setShowSnackbar(true);
    closeDialog();
  };

  useEffect(() => {
    if (property?.id) {
      const draftFormData = { ...formData };
      draftFormData.name.value = property?.name;
      draftFormData.address.value = property?.address;
      draftFormData.city.value = property?.city;
      draftFormData.state.value = property?.state;
      draftFormData.zipcode.value = property?.zipcode;
      draftFormData.owner_email.value = property?.owner_email;
      draftFormData.units.value = property?.units;
      draftFormData.bathrooms.value = property?.bathrooms;
      draftFormData.rent.value = property?.rent;
      setFormData(draftFormData);
    }
  }, [property]);

  return (
    <Stack spacing={1}>
      <Button
        variant="outlined"
        fullWidth
        onClick={() =>
          setDialog({
            title: "Edit property",
            type: AddPropertyTextString,
            display: true,
          })
        }
      >
        Edit Property
      </Button>

      <Button variant="outlined" fullWidth>
        View Payment History
      </Button>
      <Button variant="outlined" fullWidth disabled>
        Add Maintenance Request
      </Button>
      <Button variant="outlined" fullWidth disabled>
        Generate Report
      </Button>

      {/* Edit property dialog  */}
      <Dialog
        open={dialog.display}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          {dialog.type === AddPropertyTextString && (
            <AddProperty
              isEditing
              formData={formData}
              handleChange={handleChange}
              isDisabled={isDisabled}
              submit={submit}
            />
          )}
        </DialogContent>
        <DialogActions>
          <AButton
            size="small"
            variant="outlined"
            onClick={closeDialog}
            label="Close"
          />
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        title="Changes saved."
      />
    </Stack>
  );
}
