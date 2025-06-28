import React, { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Stack,
  Paper,
  Badge,
  Tooltip,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
} from "@mui/material";

import {
  Home,
  LocationOn,
  Phone,
  Business,
  GroupOutlined,
} from "@mui/icons-material";

import AButton from "common/AButton";
import { useParams } from "react-router-dom";
import { useAppTitle } from "hooks/useAppTitle";

import Tenants from "features/Properties/Tenants";
import EmptyComponent from "common/EmptyComponent";
import RowHeader from "common/RowHeader/RowHeader";
import ViewDocuments from "features/Properties/ViewDocuments";
import AssociateTenantPopup from "features/Properties/AssociateTenantPopup";

import { useGetTenantByPropertyIdQuery } from "features/Api/tenantsApi";
import { useGetUserDataByIdQuery } from "features/Api/firebaseUserApi";
import { useGetPropertiesByPropertyIdQuery } from "features/Api/propertiesApi";
import QuickActions from "src/features/Properties/QuickActions";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Property = () => {
  const params = useParams();
  const { data: property, isLoading: isPropertyLoading } =
    useGetPropertiesByPropertyIdQuery(params?.id, {
      skip: !params?.id,
    });

  const { data: tenants = [], isLoading: isTenantsLoading } =
    useGetTenantByPropertyIdQuery(params?.id, {
      skip: !params?.id,
    });

  const { data: owner = {} } = useGetUserDataByIdQuery(property?.createdBy, {
    skip: !property?.createdBy,
  });

  useAppTitle(property?.name || "Selected Property");

  const [dialog, setDialog] = useState(false);

  const toggleAddPropertyPopup = () => setDialog(!dialog);

  // if home is SoR, then only each bedroom is counted as a unit
  const isAnyTenantSoR = tenants?.some((tenant) => tenant.isSoR);

  const formatCurrency = (amount) => {
    return `$${parseInt(amount).toLocaleString()}`;
  };

  /**
   * derieveTotalRent
   *
   * function used to retrieve the total rent of any given property. For homes
   * with a SoR, rent are calculated per room.
   * @param {boolean} isAnyTenantSoR - default false, denotes if any tenants are single occupants
   * @returns {float} - amount of rent in US Dollars
   */
  const derieveTotalRent = (isAnyTenantSoR) => {
    if (isAnyTenantSoR) {
      return tenants.reduce(
        (total, tenant) => total + parseInt(tenant.rent || 0),
        0
      );
    } else {
      return property?.rent || 0;
    }
  };

  const getOccupancyRate = (isAnyTenantSoR) => {
    if (isAnyTenantSoR) {
      const totalUnits = parseInt(property?.units || 0);
      const occupiedUnits = tenants.length;
      return totalUnits > 0
        ? Math.round((occupiedUnits / totalUnits) * 100)
        : 0;
    } else {
      return 100;
    }
  };

  return (
    <Stack>
      {/* Property Header */}
      <Paper elevation={0} sx={{ padding: 3, margin: "1rem 0rem" }}>
        {isPropertyLoading ? (
          <Skeleton height="5rem" />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Home color="primary" sx={{ fontSize: 40 }} />
            <Stack>
              <Typography variant="h4" gutterBottom>
                {property?.name}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <LocationOn />
                {property?.address}, {property?.city}, {property?.state}{" "}
                {property?.zipcode}
              </Typography>
            </Stack>
          </Box>
        )}
        {/* Property Stats */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            {isPropertyLoading ? (
              <Skeleton height="5rem" />
            ) : (
              <Card variant="outlined">
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h4" color="primary">
                    {property?.units}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isAnyTenantSoR ? "Total Units" : "Total Bedrooms"}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {isPropertyLoading ? (
              <Skeleton height="5rem" />
            ) : (
              <Card variant="outlined">
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h4" color="primary">
                    {/* {isAnyTenantSoR ? tenants?.length : (tentan1} */}
                    {tenants?.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isAnyTenantSoR ? "Occupied Units" : "Occupied Home"}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {isPropertyLoading ? (
              <Skeleton height="5rem" />
            ) : (
              <Card variant="outlined">
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h4" color="success.main">
                    {getOccupancyRate()}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Occupancy Rate
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {isPropertyLoading ? (
              <Skeleton height="5rem" />
            ) : (
              <Card variant="outlined">
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h4" color="success.main">
                    {formatCurrency(derieveTotalRent(isAnyTenantSoR))}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Revenue
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Financial Overview */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <RowHeader
                title="Financial Overview"
                caption="View your financial details about your property"
                sxProps={{ textAlign: "left", color: "text.secondary" }}
              />
              {isTenantsLoading ? (
                <Skeleton height="5rem" />
              ) : (
                <Stack spacing={2}>
                  <Stack direction="row">
                    <Stack textAlign="center" flexGrow={1}>
                      <Typography
                        variant="subtitle2"
                        color="success"
                        sx={{ fontSize: "2rem" }}
                      >
                        {formatCurrency(derieveTotalRent(isAnyTenantSoR))}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Monthly Revenue
                      </Typography>
                    </Stack>
                    <Stack textAlign="center" flexGrow={1}>
                      <Typography
                        variant="subtitle2"
                        color="success"
                        sx={{ fontSize: "2rem" }}
                      >
                        {formatCurrency(derieveTotalRent(isAnyTenantSoR) * 12)}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Projected Annual Revenue
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* Documents Overview */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <RowHeader
                title="Documents Overview"
                caption="View list of your documents assoicated with this property"
                sxProps={{ textAlign: "left", color: "text.secondary" }}
              />
              <Stack spacing={2}>
                {isPropertyLoading ? (
                  <Skeleton height="5rem" />
                ) : (
                  <ViewDocuments />
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Tenants Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ margin: "0rem 0rem 1rem 0rem" }}
              >
                <RowHeader
                  title="Tenants"
                  caption="Tenant details"
                  sxProps={{
                    alignItems: "flex-start",
                    color: "text.secondary",
                  }}
                />
                <Stack direction="row" spacing={1} alignItems="center">
                  {tenants.length !== 0 ? (
                    <Tooltip title="total tenants">
                      <Badge
                        badgeContent={tenants.length}
                        color="textSecondary"
                      >
                        <Typography
                          variant="h6"
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <GroupOutlined color="info" />
                        </Typography>
                      </Badge>
                    </Tooltip>
                  ) : null}
                  <Box>
                    <Tooltip title="Associate tenants">
                      <AButton
                        size="small"
                        variant="outlined"
                        onClick={() => toggleAddPropertyPopup()}
                        label="Associate tenants"
                      />
                    </Tooltip>
                  </Box>
                </Stack>
              </Stack>
              {isTenantsLoading ? (
                <Skeleton height="5rem" />
              ) : tenants.length === 0 ? (
                <EmptyComponent caption="Associate tenants to begin." />
              ) : (
                <Tenants tenants={tenants || []} />
              )}
            </CardContent>
          </Card>
          <Dialog
            open={dialog}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Associate Tenants </DialogTitle>
            <DialogContent>
              <AssociateTenantPopup
                closeDialog={toggleAddPropertyPopup}
                property={property}
              />
            </DialogContent>
            <DialogActions>
              <AButton
                size="small"
                variant="outlined"
                onClick={toggleAddPropertyPopup}
                label="Close"
              />
            </DialogActions>
          </Dialog>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Owner Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <RowHeader
                title="Property Owner"
                sxProps={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  gap: 1,
                  textAlign: "left",
                  variant: "subtitle2",
                  fontWeight: "bold",
                }}
                caption={<Business color="primary" />}
              />
              {isPropertyLoading ? (
                <Skeleton height="10rem" />
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      src={owner.googlePhotoURL}
                      sx={{ width: 56, height: 56 }}
                    >
                      {owner.first_name?.charAt(0)}
                      {owner.last_name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <RowHeader
                        title={
                          owner.googleDisplayName ||
                          `${owner.first_name || ""} ${owner.last_name || ""}`
                        }
                        caption={owner.email}
                        sxProps={{
                          textAlign: "left",
                        }}
                      />
                    </Box>
                  </Box>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Phone fontSize="small" color="action" />
                      <Typography variant="body2">{owner.phone}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">
                        {owner.city}, {owner.state} {owner.zipcode}
                      </Typography>
                    </Box>
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <RowHeader
                title="Property Details"
                sxProps={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                  gap: 1,
                  textAlign: "left",
                  variant: "subtitle2",
                  fontWeight: "bold",
                }}
                caption={<Business color="primary" />}
              />
              {isPropertyLoading ? (
                <Skeleton height="10rem" />
              ) : (
                <Stack spacing={2}>
                  <Stack direction="row">
                    <Stack textAlign="center" flexGrow={1}>
                      <Typography variant="h4" color="success.main">
                        {property?.units}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Bedrooms
                      </Typography>
                    </Stack>
                    <Stack textAlign="center" flexGrow={1}>
                      <Typography variant="h4" color="success.main">
                        {property?.bathrooms}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Bathrooms
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row">
                    <Stack textAlign="center" flexGrow={1}>
                      <Tooltip
                        title={dayjs(property?.createdOn).format(
                          "MMM DD, YYYY"
                        )}
                      >
                        <Stack>
                          <Typography variant="subtitle2">
                            {dayjs(property?.createdOn).format("MM DD YYYY")}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Created
                          </Typography>
                        </Stack>
                      </Tooltip>
                    </Stack>
                    <Stack textAlign="center" flexGrow={1}>
                      <Tooltip title={dayjs(property?.updatedOn)}>
                        <Stack>
                          <Typography variant="subtitle2">
                            {dayjs(property?.updatedOn).fromNow()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last Updated
                          </Typography>
                        </Stack>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <RowHeader
                title="Quick Actions"
                sxProps={{
                  textAlign: "left",
                  variant: "subtitle2",
                  fontWeight: "bold",
                }}
              />
              <QuickActions property={property} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Property;
