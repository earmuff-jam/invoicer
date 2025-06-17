import React, { useEffect, useState } from "react";

import { AddRounded } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";

import AButton from "common/AButton";
import RowHeader from "common/RowHeader/RowHeader";
import AddProperty from "features/Properties/AddProperty";
import ViewProperties from "features/Properties/ViewProperties";
import { BLANK_PROPERTY_DETAILS } from "features/Properties/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Properties() {
  const [dialog, setDialog] = useState(false);
  const [currentProperties, setCurrentProperties] = useState([]);
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

  const handleDelete = (propertyId) => {
    if (!propertyId) return;
    const draftCurrentProperties = currentProperties.filter(
      (property) => property.id === propertyId
    );
    setCurrentProperties(draftCurrentProperties);
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
    

    localStorage.setItem("properties", JSON.stringify([result]));
    closeDialog();
  };

  const closeDialog = () => setDialog(false);
  const toggleDialog = () => setDialog(!dialog);

  useEffect(() => {
    const draftPropertiesList = JSON.parse(localStorage.getItem("properties"));
    if (Array.isArray(draftPropertiesList) && draftPropertiesList.length >= 0) {
      setCurrentProperties(draftPropertiesList);
    }
  }, [dialog]);

  return (
    <Stack>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <RowHeader
          title="Properties"
          sxProps={{
            textAlign: "left",
            fontWeight: "bold",
            color: "text.secondary",
          }}
        />
        <Button
          size="small"
          variant="outlined"
          endIcon={<AddRounded fontSize="small" />}
          onClick={toggleDialog}
        >
          Add Property
        </Button>
      </Stack>

      {/* View list of properties */}
      <ViewProperties
        currentProperties={currentProperties}
        handleDelete={handleDelete}
      />

      {/* Add Property Dialog */}
      <Dialog
        open={dialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-describedby="alert-dialog-slide-add-property-box"
      >
        <DialogTitle>Add new property</DialogTitle>
        <DialogContent>
          <AddProperty
            formData={formData}
            handleChange={handleChange}
            isDisabled={isDisabled}
            submit={submit}
          />
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
    </Stack>
  );
}
