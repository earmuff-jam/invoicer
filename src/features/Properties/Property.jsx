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
} from "@mui/material";
import {
  Home,
  LocationOn,
  Person,
  Email,
  Phone,
  AttachMoney,
  CalendarToday,
  Business,
} from "@mui/icons-material";
import { useAppTitle } from "src/hooks/useAppTitle";
import { useGetPropertiesByPropertyIdQuery } from "src/features/Api/propertiesApi";
import { useParams } from "react-router-dom";

const Property = () => {
  const params = useParams();
  const { data: property, isLoading } = useGetPropertiesByPropertyIdQuery(
    params?.id,
    {
      skip: !params?.id,
    }
  );

  console.log(params?.id);

  useAppTitle(property?.name || "Selected Property");
  // Replace these with your RTK queries
  // const { data: property } = useGetPropertyQuery(propertyId);
  // const { data: tenants } = useGetTenantsByPropertyQuery(propertyId);
  // const { data: owner } = useGetOwnerQuery(property?.createdBy);

  const tenants = [
    {
      created: "2025-06-28T13:24:07.102Z",
      createdBy: "qBTwfdX4jDZLhFxPKcXyCuFbYIt1",
      email: "test@gmail.com",
      id: "47f03536-8a63-439e-8529-705e237e97ae",
      isPrimary: true,
      isSoR: false,
      propertyId: "f98124a0-2fa6-4e46-b51b-bca42a93f628",
      rent: "3000",
      start_date: "01-01-2025",
      tax_rate: "1",
      term: "1y",
      updatedBy: "qBTwfdX4jDZLhFxPKcXyCuFbYIt1",
      updated_on: "2025-06-28T13:24:07.102Z",
    },
  ];

  const owner = {
    city: "Bastrop",
    company_name: "",
    email: "mohit.paudyal@gmail.com",
    first_name: "Mohit",
    googleDisplayName: "Mohit Paudyal",
    googlePhotoURL:
      "https://lh3.googleusercontent.com/a/ACg8ocKX9MCjRqKGzd4pWzw6-ZI22hCD3Zv4IJNUqGiiw-JjUlA0sfGN-w=s96-c",
    last_name: "Paudyal",
    phone: "6018190596",
    state: "TX",
    street_address: "119 Charles Zanco Dr",
    zipcode: "78602",
  };

  // Helper functions
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

  const getOccupancyRate = () => {
    const totalUnits = parseInt(property?.units || 0);
    const occupiedUnits = tenants.length;
    return totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  };

  return (
    <Stack>
      {/* Property Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Home color="primary" sx={{ fontSize: 40 }} />
          <Box>
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
          </Box>
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
                  Total Units
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
                  Occupied Units
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Person color="primary" />
                  Tenants ({tenants.length})
                </Typography>
                <Button variant="outlined" size="small">
                  Add Tenant
                </Button>
              </Box>

              {tenants.length === 0 ? (
                <Typography
                  color="text.secondary"
                  sx={{ textAlign: "center", py: 3 }}
                >
                  No tenants found for this property
                </Typography>
              ) : (
                <List>
                  {tenants.map((tenant, index) => (
                    <React.Fragment key={tenant.id}>
                      {index > 0 && <Divider />}
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {tenant.email.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {tenant.email}
                              </Typography>
                              {tenant.isPrimary && (
                                <Chip
                                  label="Primary"
                                  size="small"
                                  color="primary"
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Rent: {formatCurrency(tenant.rent)} • Term:{" "}
                                {tenant.term}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Started: {formatDate(tenant.start_date)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
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
