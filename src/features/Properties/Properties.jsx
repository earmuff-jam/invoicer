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

import {
  AddPropertyTextString,
  AssociateTenantTextString,
  BLANK_PROPERTY_DETAILS,
} from "features/Properties/constants";

import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import AButton from "common/AButton";
import EmptyComponent from "common/EmptyComponent";
import RowHeader from "common/RowHeader/RowHeader";

import AddProperty from "features/Properties/AddProperty";
import AssociateTenantPopup from "features/Properties/AssociateTenantPopup";
import ViewPropertyAccordionDetails from "features/Properties/ViewPropertyAccordionDetails";
import { useNavigate } from "react-router-dom";
import { useAppTitle } from "hooks/useAppTitle";

import { useAppTitle } from "hooks/useAppTitle";
import { fetchLoggedInUser } from "features/Properties/utils";
import CustomSnackbar from "src/common/CustomSnackbar/CustomSnackbar";

import {
  useCreatePropertyMutation,
  useDeletePropertyByIdMutation,
  useGetPropertiesByUserIdQuery,
} from "features/Api/propertiesApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultDialog = {
  title: "",
  type: "",
  data: "",
  display: false,
};

export default function Properties() {
  useAppTitle("View Properties");
  
  const navigate = useNavigate();
  const user = fetchLoggedInUser();

  const { data: properties, isLoading } = useGetPropertiesByUserIdQuery(
    user.uid
  );
  
  const [createProperty] = useCreatePropertyMutation();
  const [deleteProperty] = useDeletePropertyByIdMutation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [dialog, setDialog] = useState(defaultDialog);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [formData, setFormData] = useState(BLANK_PROPERTY_DETAILS);

  const closeDialog = () => setDialog(defaultDialog);
  const handleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

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
      (property) => property.id !== propertyId
    );
    setCurrentProperties(draftCurrentProperties);
    localStorage.setItem("properties", JSON.stringify(draftCurrentProperties));
  };

  const handleQuickConnectMenuItem = (action, property) => {
    /* eslint-disable no-console */
    console.log("Selected action:", action, "for property:", property);
    // Handle the selected action here
    switch (action) {
      case "CREATE_INVOICE":
        navigate("/invoice/edit");
        break;
      case "PAYMENT_REMINDER":
        // Handle payment reminder
        break;
      case "MAINTENANCE_REQUEST":
        // Handle maintenance request
        break;
      case "GENERAL_NOTICE":
        // Handle general notice
        break;
    }
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
      type: AssociateTenantTextString,
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
                        e.stopPropagation();
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
                    label="Quick Connect"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuickConnect(e);
                    }}
                    size="small"
                    variant="standard"
                    endIcon={<ExpandMoreRounded />}
                  />
                  <QuickConnectMenu
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleCloseQuickConnect}
                    property={property}
                    onMenuItemClick={handleQuickConnectMenuItem}
                  />

                  <AButton
                    label="Associate Tenant"
                    onClick={(e) => {
                      e.stopPropagation();
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
          dialog.type === AssociateTenantTextString
        }
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-describedby="alert-dialog-slide-box"
      >
        <DialogTitle sx={{ color: "text.secondary", textTransform: "initial" }}>
          {dialog.type === AssociateTenantTextString
            ? `${dialog?.title} for ${dialog?.property?.name}`
            : "Add Property"}
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