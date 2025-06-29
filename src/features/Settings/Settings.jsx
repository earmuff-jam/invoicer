import { useEffect, useState } from "react";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  Chip,
  Tab,
  Tabs,
  Grid,
  Skeleton,
} from "@mui/material";

import {
  PersonRounded,
  EmailRounded,
  EditRounded,
  InfoRounded,
} from "@mui/icons-material";

import {
  BLANK_PROFILE_FORM_DATA,
  defaultTemplateData,
} from "features/Settings/constants";

import {
  useCreateUserMutation,
  useGetUserDataByIdQuery,
} from "features/Api/firebaseUserApi";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import RowHeader from "common/RowHeader/RowHeader";
import { fetchLoggedInUser } from "features/Properties/utils";
import TextFieldWithLabel from "common/UserInfo/TextFieldWithLabel";

import AButton from "common/AButton";
import CustomSnackbar from "common/CustomSnackbar/CustomSnackbar";
import { useAppTitle } from "hooks/useAppTitle";

dayjs.extend(relativeTime);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function OwnerSettingsPage() {
  useAppTitle("View Settings");
  const user = fetchLoggedInUser();

  const [createUser] = useCreateUserMutation();

  const [activeTab, setActiveTab] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [templates, setTemplates] = useState(defaultTemplateData);

  const [profileFormData, setProfileFormData] = useState(
    BLANK_PROFILE_FORM_DATA
  );

  const { data: userData, isLoading } = useGetUserDataByIdQuery(user?.uid, {
    skip: !user?.uid,
  });

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (ev) => {
    const { id, value } = ev.target;
    const updatedFormData = { ...profileFormData };
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
    setProfileFormData(updatedFormData);
  };

  const handleTemplateChange = (template, field) => (event) => {
    setTemplates((prev) => ({
      ...prev,
      [template]: { ...prev[template], [field]: event.target.value },
    }));
  };

  const isDisabled = () => {
    const containsErrors = Object.values(profileFormData).some(
      (field) => field.errorMsg
    );
    const requiredMissing = Object.values(profileFormData).some(
      (field) => field.isRequired && field.value.trim() === ""
    );
    return containsErrors || requiredMissing;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const draftData = Object.entries(profileFormData).reduce(
      (acc, [key, valueObj]) => {
        if (
          [
            "googleAccountLinkedAt",
            "googleDisplayName",
            "googleEmailAddress",
            "googleLastLoginAt",
            "googlePhotoURL",
          ].includes(key)
        ) {
          acc[key] = valueObj;
          return acc;
        }
        acc[key] = valueObj.value;
        return acc;
      },
      {}
    );

    draftData["uid"] = user?.uid;
    draftData["updated_on"] = dayjs().toISOString();

    try {
      await createUser(draftData).unwrap();
      setShowSnackbar(true);
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      const draftProfileDetails = { ...BLANK_PROFILE_FORM_DATA };
      draftProfileDetails.googleDisplayName = userData.googleDisplayName;
      draftProfileDetails.googleEmailAddress = userData.googleEmailAddress;
      draftProfileDetails.googlePhotoURL = userData.googlePhotoURL;
      draftProfileDetails.googleAccountLinkedAt =
        userData.googleAccountLinkedAt;
      draftProfileDetails.googleLastLoginAt = userData.googleLastLoginAt;

      // update form fields if present
      draftProfileDetails.email.value = userData.googleEmailAddress;
      draftProfileDetails.first_name.value = userData?.first_name || "";
      draftProfileDetails.last_name.value = userData?.last_name || "";
      draftProfileDetails.phone.value = userData?.phone || "";
      draftProfileDetails.street_address.value = userData?.street_address || "";
      draftProfileDetails.city.value = userData?.city || "";
      draftProfileDetails.state.value = userData?.state || "";
      draftProfileDetails.zipcode.value = userData?.zipcode || "";

      setProfileFormData(draftProfileDetails);
    }
  }, [isLoading]);

  if (isLoading) return <Skeleton height="10rem" />;

  return (
    <Stack spacing={1}>
      <RowHeader
        title="Account Settings"
        sxProps={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.secondary",
        }}
        caption="Manage your profile data, preferences, and communication templates."
      />

      {/* Navigation Tabs */}
      <Card elevation={0}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              minHeight: 64,
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
            },
          }}
        >
          <Tab
            label={
              <Typography variant="subtitle2" sx={{ textTransform: "initial" }}>
                Profile
              </Typography>
            }
            icon={<PersonRounded fontSize="small" />}
            iconPosition="start"
          />
          <Tab
            label={
              <Typography variant="subtitle2" sx={{ textTransform: "initial" }}>
                Templates
              </Typography>
            }
            icon={<EmailRounded fontSize="small" />}
            iconPosition="start"
          />
        </Tabs>
      </Card>

      {/* Profile Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ padding: 3, textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  fontSize: "2.5rem",
                  bgcolor: "primary.main",
                }}
                src={profileFormData?.googlePhotoURL || ""}
              />

              <Typography
                variant="h6"
                fontWeight={600}
                color="textSecondary"
                sx={{ textTransform: "initial" }}
              >
                {profileFormData.googleDisplayName}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={600}
                color="textSecondary"
                sx={{ textTransform: "initial" }}
              >
                {profileFormData.googleEmailAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Property Owner
              </Typography>
              <Chip
                label="Verified"
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: 2,
              }}
            >
              <RowHeader
                title="Personal Information"
                sxProps={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "text.secondary",
                }}
              />

              {/* First and Last Name */}
              <Stack direction="row" spacing={2}>
                <TextFieldWithLabel
                  label="First name *"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  value={profileFormData?.first_name.value || ""}
                  handleChange={handleChange}
                  errorMsg={profileFormData.first_name["errorMsg"]}
                />
                <TextFieldWithLabel
                  label="Last name *"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  value={profileFormData?.last_name.value || ""}
                  handleChange={handleChange}
                  errorMsg={profileFormData.last_name["errorMsg"]}
                />
              </Stack>

              {/* Email and Phone Number */}
              <Stack direction="row" spacing={2}>
                <TextFieldWithLabel
                  label="Email address *"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={profileFormData?.email.value || ""}
                  handleChange={handleChange}
                  isDisabled
                  errorMsg={profileFormData.email["errorMsg"]}
                  labelIcon={<InfoRounded fontSize="small" color="secondary" />}
                  labelIconHelper="Editing an email address is disabled by default."
                />
                <TextFieldWithLabel
                  label="Phone Number *"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={profileFormData?.phone.value || ""}
                  handleChange={handleChange}
                  errorMsg={profileFormData.phone["errorMsg"]}
                />
              </Stack>

              {/* Street Address */}
              <TextFieldWithLabel
                label="Street Address *"
                id="street_address"
                name="street_address"
                placeholder="Street Address"
                value={profileFormData?.street_address.value || ""}
                handleChange={handleChange}
                errorMsg={profileFormData.street_address["errorMsg"]}
              />

              {/* City, State, Zip Code */}
              <Stack direction="row" spacing={2}>
                <TextFieldWithLabel
                  label="City *"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={profileFormData?.city.value || ""}
                  handleChange={handleChange}
                  errorMsg={profileFormData.city["errorMsg"]}
                />
                <TextFieldWithLabel
                  label="State *"
                  id="state"
                  name="state"
                  placeholder="State"
                  value={profileFormData?.state.value || ""}
                  handleChange={handleChange}
                  errorMsg={profileFormData.state["errorMsg"]}
                />
                <TextFieldWithLabel
                  label="Zip Code *"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Zip Code"
                  value={profileFormData?.zipcode.value || ""}
                  handleChange={handleChange}
                  errorMsg={profileFormData.zipcode["errorMsg"]}
                />
              </Stack>

              <Box>
                <AButton
                  label="Save"
                  variant="contained"
                  onClick={onSubmit}
                  disabled={isDisabled()}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{ fontStyle: "italic", textTransform: "initial" }}
              >
                Last login{" "}
                {dayjs(profileFormData?.googleLastLoginAt).fromNow() ||
                  dayjs().fromNow()}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Templates Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          {Object.entries(templates).map(([key, template]) => (
            <Grid item xs={12} md={6} key={key}>
              <Card elevation={0} sx={{ p: 3, height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {key} Template
                  </Typography>
                  <IconButton size="small" sx={{ ml: "auto" }}>
                    <EditRounded fontSize="small" />
                  </IconButton>
                </Box>
                <Stack spacing={2}>
                  <TextField
                    label="Subject"
                    value={template.subject}
                    onChange={handleTemplateChange(key, "subject")}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label={
                      key === "maintenance" ? "Description" : "Message Body"
                    }
                    value={template.body || template.description}
                    onChange={handleTemplateChange(
                      key,
                      template.body ? "body" : "description"
                    )}
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Available variables are - tenantName, propertyAddress,
                    amount, dueDate
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    // onClick={() => handleSave(`template_${key}`)}
                  >
                    Save Template
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <CustomSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        title="Changes saved."
      />
    </Stack>
  );
}
