import React, { useEffect, useState } from "react";

import {
  AddRounded,
  DeleteRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from "@mui/material";

import AButton from "common/AButton";
import RowHeader from "common/RowHeader/RowHeader";
import AddProperty from "features/Properties/AddProperty";
import {
  AddPropertyTextString,
  AssociatePropertyTextString,
  BLANK_PROPERTY_DETAILS,
} from "features/Properties/constants";
import EmptyComponent from "common/EmptyComponent";
import ViewPropertyAccordionDetails from "features/Properties/ViewPropertyAccordionDetails";
import { v4 as uuidv4 } from "uuid";
import AssociateTenantPopup from "features/Properties/AssociateTenantPopup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tenants = [
  {
    id: "tenant123",
    propertyId: "", // the id of the property the tenant is associated with
    isPrimaryContact: true, // the main person to communicate with
    name: "John Doe",
    monthlyRent: 2750.0,
    dueDate: "2025-06-01",
    lastPaidDate: "2025-06-01",
    isPaid: true, // if there is no outstanding balance
    phone: "555-123-4567",
    email: "john1988@example.com",
  },
];

const defaultDialog = {
  title: "",
  type: "",
  data: "",
  display: false,
};

export default function Properties() {
  const [expanded, setExpanded] = useState(null);
  const [dialog, setDialog] = useState(defaultDialog);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [formData, setFormData] = useState(BLANK_PROPERTY_DETAILS);

  const closeDialog = () => setDialog(defaultDialog);

  const handleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
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

  const toggleAddPropertyPopup = () => {
    setDialog({
      title: "Add Property",
      type: AddPropertyTextString,
      display: true,
      property: null,
    });
  };

  const toggleAssociateTenantPopup = (property) => {
    setDialog({
      title: "Associate Tenants",
      type: AssociatePropertyTextString,
      display: true,
      property,
    });
  };

  const resetFormData = () => {
    setFormData(BLANK_PROPERTY_DETAILS);
  };

  const submit = (ev) => {
    ev.preventDefault();
    const result = Object.entries(formData).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {});

    result.id = uuidv4(); // create a new property id
    const draftPropertiesList = [...currentProperties, result];
    localStorage.setItem("properties", JSON.stringify(draftPropertiesList));
    resetFormData();
    closeDialog();
  };

  useEffect(() => {
    const draftPropertiesList = JSON.parse(localStorage.getItem("properties"));
    if (Array.isArray(draftPropertiesList) && draftPropertiesList.length >= 0) {
      setCurrentProperties(draftPropertiesList);
    }
  }, []);

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
          onClick={toggleAddPropertyPopup}
        >
          Add Property
        </Button>
      </Stack>

      {/* View list of properties */}
      <Stack padding={1} spacing={1}>
        {currentProperties.length === 0 ? (
          <EmptyComponent caption="Add new property to begin." />
        ) : (
          currentProperties.map((property) => (
            <Accordion
              elevation={0}
              key={property.id}
              expanded={expanded === property.id}
            >
              <AccordionSummary
                onClick={(e) => e.stopPropagation()}
                aria-controls={`${property.id}-content`}
                id={`${property.id}-header`}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    width: "100%",
                    padding: "0rem 1rem 0rem 0rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                }}
              >
                <Stack flexGrow={1}>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(property.id);
                      }}
                    >
                      <DeleteRounded fontSize="small" color="error" />
                    </IconButton>
                    <Typography variant="subtitle2" color="primary">
                      {property?.name || "Unknown Property Name"}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2" fontSize={12}>
                    {property?.address}
                  </Typography>
                  <Typography variant="subtitle2" fontSize={12}>
                    {property?.city} {property?.state}, {property?.zipcode}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <AButton
                    label="Associate Tenant"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row from toggling
                      toggleAssociateTenantPopup(property);
                    }}
                    size="small"
                    variant="outlined"
                    endIcon={<AddRounded />}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpand(property.id);
                    }}
                  >
                    <ExpandMoreRounded
                      sx={{
                        transform:
                          expanded === property.id
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </IconButton>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <ViewPropertyAccordionDetails tenants={tenants} />
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Stack>

      <Dialog
        open={
          dialog.type === AddPropertyTextString ||
          dialog.type === AssociatePropertyTextString
        }
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-describedby="alert-dialog-slide-box"
      >
        <DialogTitle sx={{ color: "text.secondary", textTransform: "initial" }}>
          {dialog?.title} for {dialog?.property?.name}
        </DialogTitle>
        <DialogContent>
          {dialog.type === AddPropertyTextString ? (
            <AddProperty
              formData={formData}
              handleChange={handleChange}
              isDisabled={isDisabled}
              submit={submit}
            />
          ) : (
            <AssociateTenantPopup
              creatorId={""}
              onClose={closeDialog}
              property={dialog.property}
              closeDialog={closeDialog}
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
    </Stack>
  );
}
