import React, { useState } from "react";

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
  AssociatePropertyTextString,
  BLANK_PROPERTY_DETAILS,
} from "features/Properties/constants";

import { v4 as uuidv4 } from "uuid";
import AButton from "common/AButton";
import EmptyComponent from "common/EmptyComponent";
import RowHeader from "common/RowHeader/RowHeader";

import AddProperty from "features/Properties/AddProperty";
import QuickConnectMenu from "features/Properties/QuickConnectMenu";
import AssociateTenantPopup from "features/Properties/AssociateTenantPopup";
import ViewPropertyAccordionDetails from "features/Properties/ViewPropertyAccordionDetails";
import { useAppTitle } from "hooks/useAppTitle";
import { handleQuickConnectAction } from "features/Settings/TemplateProcessor";
import {
  useCreatePropertyMutation,
  useDeletePropertyByIdMutation,
  useGetPropertiesByUserIdQuery,
} from "features/Api/propertiesApi";
import { fetchLoggedInUser } from "features/Properties/utils";
import dayjs from "dayjs";
import CustomSnackbar from "src/common/CustomSnackbar/CustomSnackbar";

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
  useAppTitle("View Properties");

  const user = fetchLoggedInUser();
  const { data: properties, isLoading } = useGetPropertiesByUserIdQuery(
    user.uid
  );

  const [createProperty] = useCreatePropertyMutation();
  const [deleteProperty] = useDeletePropertyByIdMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const [dialog, setDialog] = useState(defaultDialog);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState(BLANK_PROPERTY_DETAILS);

  const isOpen = Boolean(anchorEl);
  const handleCloseQuickConnect = () => setAnchorEl(null);
  const handleOpenQuickConnect = (ev) => setAnchorEl(ev.currentTarget);

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
    setShowSnackbar(true);
    deleteProperty(propertyId);
  };

  const handleQuickConnectMenuItem = (action, property) => {
    handleQuickConnectAction(action, property);
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

  const submit = async (ev) => {
    ev.preventDefault();
    const result = Object.entries(formData).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {});

    result["id"] = uuidv4(); // create a new property id
    const currentDateTime = dayjs().toISOString();
    result["createdBy"] = user?.uid || "";
    result["createdOn"] = currentDateTime; // 1st time created == updated
    result["updatedOn"] = currentDateTime;

    try {
      await createProperty(result).unwrap();
      setShowSnackbar(true);
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error);
    }

    resetFormData();
    closeDialog();
  };

  if (isLoading) return <Skeleton height="10rem" />;

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
      {properties?.length <= 0 ? (
        <EmptyComponent caption="Add properties to begin" />
      ) : (
        <Stack padding={1} spacing={1}>
          {properties.length === 0 ? (
            <EmptyComponent caption="Add new property to begin." />
          ) : (
            properties.map((property) => (
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
      )}

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

      <CustomSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        title="Changes saved."
      />
    </Stack>
  );
}
