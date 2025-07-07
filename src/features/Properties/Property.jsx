import React, { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
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

import { Home, LocationOn, Business, GroupOutlined } from "@mui/icons-material";

import dayjs from "dayjs";
import AButton from "common/AButton";
import { useParams } from "react-router-dom";
import { useAppTitle } from "hooks/useAppTitle";

import Tenants from "features/Properties/Tenants";
import EmptyComponent from "common/EmptyComponent";
import RowHeader from "common/RowHeader/RowHeader";

import QuickActions from "features/Properties/QuickActions";
import ViewDocuments from "features/Properties/ViewDocuments";
import AssociateTenantPopup from "features/Properties/AssociateTenantPopup";

import { useGetTenantByPropertyIdQuery } from "features/Api/tenantsApi";
import { useGetPropertiesByPropertyIdQuery } from "features/Api/propertiesApi";

import {
  derieveTotalRent,
  formatCurrency,
  getOccupancyRate,
} from "features/Properties/utils";

import PropertyOwnerInfoCard from "features/Properties/PropertyOwnerInfoCard";
import ViewRentalPaymentSummary from "src/features/Properties/ViewRentalPaymentSummary";
import { useGetRentsByPropertyIdQuery } from "src/features/Api/rentApi";

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

  const { data: rentList = [], isLoading: isRentListForPropertyLoading } =
    useGetRentsByPropertyIdQuery(property?.id, {
      skip: !property?.id,
    });

  useAppTitle(property?.name || "Selected Property");

  const [dialog, setDialog] = useState(false);

  const toggleAddPropertyPopup = () => setDialog(!dialog);

  // if home is SoR, then only each bedroom is counted as a unit
  const isAnyTenantSoR = tenants?.some((tenant) => tenant.isSoR);

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
                    {getOccupancyRate(property, tenants, isAnyTenantSoR)}%
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
                    {formatCurrency(
                      derieveTotalRent(property, tenants, isAnyTenantSoR)
                    )}
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
                        {formatCurrency(
                          derieveTotalRent(property, tenants, isAnyTenantSoR)
                        )}
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
                        {formatCurrency(
                          derieveTotalRent(property, tenants, isAnyTenantSoR) *
                            12
                        )}
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
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box>
                    {tenants.length !== 0 ? (
                      <Tooltip title="total tenants">
                        <Badge
                          badgeContent={tenants.length}
                          color="textSecondary"
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <GroupOutlined color="info" />
                          </Typography>
                        </Badge>
                      </Tooltip>
                    ) : null}
                  </Box>
                  <RowHeader
                    title="Tenants"
                    caption="Tenant details"
                    sxProps={{
                      alignItems: "flex-start",
                      color: "text.secondary",
                    }}
                  />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
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
                <Tenants tenants={tenants || []} property={property} />
              )}
            </CardContent>
          </Card>

          {/* Rental Payment Overview */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <RowHeader
                title="Payments Overview"
                caption="View list of all payment summaries for this property"
                sxProps={{ textAlign: "left", color: "text.secondary" }}
              />
              <Stack spacing={2}>
                {isRentListForPropertyLoading ? (
                  <Skeleton height="5rem" />
                ) : (
                  <ViewRentalPaymentSummary rentData={rentList} />
                )}
              </Stack>
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
                tenants={tenants}
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
          <PropertyOwnerInfoCard
            property={property}
            isPropertyLoading={isPropertyLoading}
          />

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
