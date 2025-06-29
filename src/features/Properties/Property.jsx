import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Divider,
  Stack,
  Paper,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Home,
  LocationOn,
  Person,
  Phone,
  AttachMoney,
  Business,
  GroupOutlined,
} from "@mui/icons-material";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useGetPropertiesByPropertyIdQuery } from "src/features/Api/propertiesApi";
import { useParams } from "react-router-dom";
import { useGetTenantByPropertyIdQuery } from "src/features/Api/tenantsApi";
import { useGetUserDataByIdQuery } from "src/features/Api/firebaseUserApi";
import RowHeader from "src/common/RowHeader/RowHeader";
import EmptyComponent from "src/common/EmptyComponent";
import Tenants from "src/features/Properties/Tenants";

const Property = () => {
  const params = useParams();
  const { data: property, isLoading } = useGetPropertiesByPropertyIdQuery(
    params?.id,
    {
      skip: !params?.id,
    }
  );

  const { data: tenants = [], isLoading: isTenantsLoading } =
    useGetTenantByPropertyIdQuery(params?.id, {
      skip: !params?.id,
    });

  const { data: owner = {}, isLoading: isOwnerLoading } =
    useGetUserDataByIdQuery(property?.createdBy, {
      skip: !property?.createdBy,
    });

  useAppTitle(property?.name || "Selected Property");

  // if home is SoR, then only each bedroom is counted as a unit
  const isAnyTenantSoR = tenants?.some((tenant) => tenant.isSoR);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `$${parseInt(amount).toLocaleString()}`;
  };

  const getTotalRent = () => {
    return tenants.reduce(
      (total, tenant) => total + parseInt(tenant.rent || 0),
      0
    );
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

        {/* Property Stats */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" color="primary">
                  {tenants.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isAnyTenantSoR ? "Occupied Units" : "Occupied Home"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" color="success.main">
                  {formatCurrency(getTotalRent())}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly Revenue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Tenants Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" sx={{margin: '0rem 0rem 1rem 0rem'}}>
                <RowHeader
                  title="Tenants"
                  caption="Tenant details"
                  sxProps={{
                    alignItems: "flex-start",
                    color: "text.secondary",
                  }}
                />
                <Tooltip title="total tenants">
                  <Badge badgeContent={tenants.length} color="textSecondary">
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <GroupOutlined color="info" />
                    </Typography>
                  </Badge>
                </Tooltip>
              </Stack>

              {tenants.length === 0 ? (
                <EmptyComponent caption="Associate tenants to begin." />
              ) : (
                <Tenants tenants={tenants || []} />
              )}
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AttachMoney color="primary" />
                Financial Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Revenue
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {formatCurrency(getTotalRent())}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Annual Revenue (Projected)
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {formatCurrency(getTotalRent() * 12)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Owner Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Business color="primary" />
                Property Owner
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  src={owner.googlePhotoURL}
                  sx={{ width: 56, height: 56 }}
                >
                  {owner.first_name?.charAt(0)}
                  {owner.last_name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {owner.googleDisplayName ||
                      `${owner.first_name} ${owner.last_name}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {owner.email}
                  </Typography>
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
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Property Details
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Bathrooms
                  </Typography>
                  <Typography variant="body1">{property?.bathrooms}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(property?.createdOn)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(property?.updatedOn)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Stack spacing={1}>
                <Button variant="outlined" fullWidth>
                  Edit Property
                </Button>
                <Button variant="outlined" fullWidth>
                  Add Maintenance Request
                </Button>
                <Button variant="outlined" fullWidth>
                  View Payment History
                </Button>
                <Button variant="outlined" fullWidth>
                  Generate Report
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Property;
