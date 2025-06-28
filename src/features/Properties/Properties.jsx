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
  Skeleton,
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

import { useAppTitle } from "hooks/useAppTitle";
import { fetchLoggedInUser } from "features/Properties/utils";

import {
  useCreatePropertyMutation,
  useDeletePropertyByIdMutation,
  useGetPropertiesByUserIdQuery,
} from "features/Api/propertiesApi";

import { useGetUserDataByIdQuery } from "src/features/Api/firebaseUserApi";

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
  const user = fetchLoggedInUser();

  const { data: properties = [], isLoading } = useGetPropertiesByUserIdQuery(
    user.uid,
    {
      skip: !user?.uid,
    }
  );

  const { data: userData, isLoading: isUserDataLoading } =
    useGetUserDataByIdQuery(user?.uid, {
      skip: !user?.uid,
    });

  const [createProperty] = useCreatePropertyMutation();
  const [deleteProperty] = useDeletePropertyByIdMutation();

  const [expanded, setExpanded] = useState(null);
  const [dialog, setDialog] = useState(defaultDialog);
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
    updatedFormData[id] = { ...updatedFormData[id], value, errorMsg };
    setFormData(updatedFormData);
  };

  const handleDelete = async (propertyId) => {
    if (!propertyId) return;
    await deleteProperty(propertyId);
  };

  const toggleAddPropertyPopup = () => {
    setDialog({
      title: "Add Property",
      type: AddPropertyTextString,
      display: true,
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

  const isDisabled = () => {
    return Object.values(formData).some(
      (field) =>
        field.errorMsg || (field.isRequired && field.value.trim() === "")
    );
  };

  const resetFormData = () => setFormData(BLANK_PROPERTY_DETAILS);

  const submit = async (ev) => {
    ev.preventDefault();
    const result = Object.entries(formData).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {});

    result.id = uuidv4();
    result["createdBy"] = user?.uid;
    result["createdOn"] = dayjs().toISOString();

    result["updatedBy"] = user?.uid;
    result["updatedOn"] = dayjs().toISOString();

    await createProperty(result);

    resetFormData();
    closeDialog();
  };

  useEffect(() => {
    // update form fields if present
    if (userData) {
      formData.owner_email.value = userData.googleEmailAddress;
    }
  }, [isUserDataLoading]);

  if (isLoading) return <Skeleton height="10rem" />;

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <RowHeader
          title="Properties"
          sxProps={{ fontWeight: "bold", color: "text.secondary" }}
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

      <Stack padding={1} spacing={1}>
        {properties.length === 0 ? (
          <EmptyComponent caption="Add new property to begin." />
        ) : (
          properties.map((property) => (
            <Accordion key={property.id} expanded={expanded === property.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreRounded />}
                onClick={() => handleExpand(property.id)}
              >
                <Stack flexGrow={1} spacing={0.5}>
                  <Typography variant="subtitle2" color="primary">
                    {property.name || "Unknown Property Name"}
                  </Typography>
                  <Typography variant="body2">{property.address}</Typography>
                  <Typography variant="body2">
                    {property.city} {property.state}, {property.zipcode}
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
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <ViewPropertyAccordionDetails property={property} />
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Stack>

      <Dialog
        open={dialog.display}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialog.title}</DialogTitle>
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
              closeDialog={closeDialog}
              property={dialog.property}
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
