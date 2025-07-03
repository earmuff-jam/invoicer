import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Stack,
  Paper,
  Tooltip,
  Skeleton,
  Chip,
} from "@mui/material";

import { Home, LocationOn, Phone, Business } from "@mui/icons-material";

import dayjs from "dayjs";
import { useAppTitle } from "hooks/useAppTitle";
import RowHeader from "common/RowHeader/RowHeader";
import ViewDocuments from "features/Properties/ViewDocuments";

import {
  useGetTenantByEmailIdQuery,
  useGetTenantByPropertyIdQuery,
} from "features/Api/tenantsApi";

import { useGetUserDataByIdQuery } from "features/Api/firebaseUserApi";
import { useGetPropertiesByPropertyIdQuery } from "features/Api/propertiesApi";

import {
  derieveTotalRent,
  fetchLoggedInUser,
  formatCurrency,
  getOccupancyRate,
} from "features/Properties/utils";
import EmptyComponent from "src/common/EmptyComponent";

// TODO : handle un-identified tenants route gracefully
// TODO : https://github.com/earmuff-jam/invoicer/issues/79

const MyRental = () => {
  const user = fetchLoggedInUser();

  const { data: renter, isLoading } = useGetTenantByEmailIdQuery(
    user?.googleEmailAddress,
    {
      skip: !user?.googleEmailAddress,
    }
  );
  const { data: property, isLoading: isPropertyLoading } =
    useGetPropertiesByPropertyIdQuery(renter?.propertyId, {
      skip: !renter?.propertyId,
    });

  const { data: owner = {} } = useGetUserDataByIdQuery(property?.createdBy, {
    skip: !property?.createdBy,
  });

  const { data: tenants, isLoading: isTenantsLoading } =
    useGetTenantByPropertyIdQuery(property?.id, {
      skip: !property?.id,
    });

  useAppTitle(property?.name || "My Rental Unit");

  // if home is SoR, then only each bedroom is counted as a unit
  const isAnyTenantSoR = tenants?.some((tenant) => tenant.isSoR);

  if (isLoading) return <Skeleton height="10rem" />;

  if (!property)
    return (
      <EmptyComponent caption="No properties have been assigned to you as a tenant. Contact your admin for more details." />
    );

  return (
    <Stack>
      {/* Property Header */}
      <Paper elevation={0} sx={{ padding: 3, margin: "1rem 0rem" }}>
        {isPropertyLoading ? (
          <Skeleton height="5rem" />
        ) : (
          <Stack spacing={1}>
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
            <Box>
              {renter?.isPrimary ? (
                <Chip label="Primary Renter" />
              ) : (
                <Chip label="Secondary Renter" />
              )}
            </Box>
          </Stack>
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
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MyRental;
