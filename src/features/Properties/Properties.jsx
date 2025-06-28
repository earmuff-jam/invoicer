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
  ButtonBase,
} from "@mui/material";

import {
  AddPropertyTextString,
  BLANK_PROPERTY_DETAILS,
} from "features/Properties/constants";

import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import AButton from "common/AButton";
import EmptyComponent from "common/EmptyComponent";
import RowHeader from "common/RowHeader/RowHeader";

import AddProperty from "features/Properties/AddProperty";
import ViewPropertyAccordionDetails from "features/Properties/ViewPropertyAccordionDetails";

import { useAppTitle } from "hooks/useAppTitle";
import { fetchLoggedInUser } from "features/Properties/utils";

import {
  useCreatePropertyMutation,
  useDeletePropertyByIdMutation,
  useGetPropertiesByUserIdQuery,
} from "features/Api/propertiesApi";

import { useGetUserDataByIdQuery } from "features/Api/firebaseUserApi";
import CustomSnackbar from "common/CustomSnackbar/CustomSnackbar";
import { useNavigate } from "react-router-dom";
import { produce } from "immer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultDialog = {
  title: "",
  type: "",
  display: false,
};

export default function Properties() {
  useAppTitle("View Properties");

  const navigate = useNavigate();
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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState(BLANK_PROPERTY_DETAILS);

  const closeDialog = () => {
    setDialog(defaultDialog);
    setFormData(BLANK_PROPERTY_DETAILS);
  };
  const handleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const handleChange = (ev) => {
    const { id, value } = ev.target;

    const updatedFormData = produce(formData, (draft) => {
      let errorMsg = "";
      for (const validator of updatedFormData[id].validators) {
        if (validator.validate(value)) {
          errorMsg = validator.message;
          break;
        }
      }
      draft[id].value = value;
      draft[id].errorMsg = errorMsg;
    });

    setFormData(updatedFormData);
  };

  const handleDelete = async (propertyId) => {
    if (!propertyId) return;
    await deleteProperty(propertyId);
    setShowSnackbar(true);
  };

  const toggleAddPropertyPopup = () => {
    setDialog({
      title: "Add Property",
      type: AddPropertyTextString,
      display: true,
    });
  };

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

    result.id = uuidv4();
    result["createdBy"] = user?.uid;
    result["createdOn"] = dayjs().toISOString();

    result["updatedBy"] = user?.uid;
    result["updatedOn"] = dayjs().toISOString();

    await createProperty(result);

    setShowSnackbar(true);
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
            <Accordion
              key={property.id}
              expanded={expanded === property.id}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreRounded />}
                onClick={() => handleExpand(property.id)}
              >
                <Stack flexGrow={1} spacing={0.5}>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Stack spacing={0.25}>
                      <Stack direction="row" alignItems="center">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(property.id);
                          }}
                        >
                          <DeleteRounded fontSize="small" color="error" />
                        </IconButton>
                        <ButtonBase
                          onClick={(ev) => {
                            ev.stopPropagation();
                            navigate(`/property/${property?.id}`);
                          }}
                          sx={{
                            justifyContent: "left",
                            textAlign: "left",
                            padding: "0.5rem",
                            borderRadius: 1,
                            width: "100%",
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                          }}
                        >
                          <Typography variant="subtitle2" color="primary">
                            {property.name || "Unknown Property Name"}
                          </Typography>
                        </ButtonBase>
                      </Stack>
                      <ButtonBase
                        onClick={(ev) => {
                          ev.stopPropagation();
                          navigate(`/property/${property?.id}`);
                        }}
                        sx={{
                          justifyContent: "left",
                          textAlign: "left",
                          padding: "0.5rem",
                          borderRadius: 1,
                          width: "100%",
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                      >
                        <Stack>
                          <Typography variant="subtitle2">
                            {property.address}
                          </Typography>
                          <Typography variant="subtitle2">
                            {property.city} {property.state}, {property.zipcode}
                          </Typography>
                        </Stack>
                      </ButtonBase>
                    </Stack>
                  </Stack>
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
          {dialog.type === AddPropertyTextString && (
            <AddProperty
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
