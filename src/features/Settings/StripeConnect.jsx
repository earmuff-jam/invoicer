// TODO: disabling eslint until this feature is connected.

/* eslint-disable */

import { useState } from "react";
import {
  AccountBalanceRounded,
  CheckCircleRounded,
  ErrorOutlineRounded,
  LinkOffRounded,
  PaymentRounded,
  SettingsRounded,
  HelpOutlineRounded,
  SupportAgentRounded,
  SecurityRounded,
} from "@mui/icons-material";

import {
  Alert,
  Switch,
  FormControlLabel,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  Box,
  Typography,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import TextFieldWithLabel from "src/common/UserInfo/TextFieldWithLabel";
import RowHeader from "src/common/RowHeader/RowHeader";

export default function StripeConnect() {
  const [stripeConnected, setStripeConnected] = useState(false);
  const [stripeAccountData, setStripeAccountData] = useState(null);
  const [paymentSettings, setPaymentSettings] = useState({
    feeHandling: "tenant_pays",
    lateFee: "",
    gracePeriod: "3",
    allowPartialPayments: false,
    autoReminders: true,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);

  const handleConnectStripe = () => {
    // Redirect to Stripe Connect OAuth flow
    window.location.href = "/api/stripe/connect";
  };

  const handleDisconnectStripe = () => {
    // API call to disconnect Stripe account
  };

  const handlePaymentSettingsChange = (event) => {
    const { name, value, checked, type } = event.target;
    setPaymentSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSavePaymentSettings = () => {
    // API call to save payment settings
  };

  const handleManageStripeAccount = () => {
    // Redirect to Stripe Express dashboard
  };

  const handleViewAllTransactions = () => {
    // handleViewAllTransactions
  };
  return (
    <Grid container spacing={3}>
      {/* Connection Status Card */}
      <Grid item xs={12}>
        <Card elevation={0} sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Stripe Payment Connection
            </Typography>
            <Box
              sx={{
                ml: "auto",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {stripeConnected ? (
                <>
                  <Chip
                    label="Connected"
                    color="success"
                    size="small"
                    sx={{ padding: "0.5rem" }}
                    icon={<CheckCircleRounded fontSize="small" />}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={handleDisconnectStripe}
                    title="Disconnect Stripe"
                  >
                    <LinkOffRounded fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <Chip
                  label="Not Connected"
                  color="default"
                  size="small"
                  sx={{ padding: "0.5rem" }}
                  icon={<ErrorOutlineRounded fontSize="small" />}
                />
              )}
            </Box>
          </Box>

          {!stripeConnected && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Connect your Stripe account to enable online rent payments from
              your tenants. Stripe handles secure payment processing and
              deposits funds directly to your bank account.
            </Alert>
          )}

          {stripeConnected ? (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your Stripe account is connected and ready to accept payments.
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2">
                  <strong>Account ID:</strong> {stripeAccountData?.accountId}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {stripeAccountData?.status}
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<AccountBalanceRounded />}
              onClick={handleConnectStripe}
              sx={{ mt: 2 }}
            >
              Connect with Stripe
            </Button>
          )}
        </Card>
      </Grid>

      {/* Payment Settings */}
      <Grid item xs={12} md={6}>
        <Card elevation={0} sx={{ p: 3, height: "100%" }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Payment Settings
          </Typography>

          <Stack spacing={2}>
            <TextFieldWithLabel
              label="Processing Fee Handling"
              id="fee_handling"
              name="fee_handling"
              value={paymentSettings?.feeHandling || "tenant_pays"}
              handleChange={handlePaymentSettingsChange}
              helperText="Who pays the Stripe processing fees?"
            >
              <MenuItem value="tenant_pays">
                Tenant pays fees (recommended)
              </MenuItem>
              <MenuItem value="owner_pays">Owner absorbs fees</MenuItem>
            </TextFieldWithLabel>

            <TextFieldWithLabel
              label="Late Payment Fee"
              id="late_fee"
              name="late_fee"
              placeholder="0.00"
              value={paymentSettings?.lateFee || ""}
              handleChange={handlePaymentSettingsChange}
              helperText="Additional fee for late payments (optional)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />

            <TextFieldWithLabel
              label="Grace Period (Days)"
              id="grace_period"
              name="grace_period"
              type="number"
              placeholder="3"
              value={paymentSettings?.gracePeriod || ""}
              handleChange={handlePaymentSettingsChange}
              helperText="Days after due date before late fee applies"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={paymentSettings?.allowPartialPayments || false}
                  onChange={handlePaymentSettingsChange}
                  name="allow_partial_payments"
                />
              }
              label="Allow partial payments"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={paymentSettings?.autoReminders || true}
                  onChange={handlePaymentSettingsChange}
                  name="auto_reminders"
                />
              }
              label="Send automatic payment reminders"
            />
          </Stack>

          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={handleSavePaymentSettings}
            disabled={!stripeConnected}
          >
            Save Settings
          </Button>
        </Card>
      </Grid>

      {/* Bank Account Information */}
      <Grid item xs={12} md={6}>
        <Card elevation={0} sx={{ p: 3, height: "100%" }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Payout Information
          </Typography>

          {stripeConnected ? (
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Payout Schedule:</strong>{" "}
                  {stripeAccountData?.payoutSchedule || "Weekly"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Bank Account:</strong> ****
                  {stripeAccountData?.bankAccountLast4 || "****"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Next Payout:</strong>{" "}
                  {stripeAccountData?.nextPayout || "Pending"}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                size="small"
                startIcon={<SettingsRounded />}
                onClick={handleManageStripeAccount}
              >
                Manage in Stripe Dashboard
              </Button>
            </Stack>
          ) : (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Connect your Stripe account to view payout information and
                manage your bank account details.
              </Typography>
              <Alert severity="warning" size="small">
                You'll need to complete identity verification and add a bank
                account in Stripe before you can receive payments.
              </Alert>
            </Box>
          )}
        </Card>
      </Grid>

      {/* Transaction History Preview */}
      <Grid item xs={12}>
        <Card elevation={0} sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Recent Transactions
            </Typography>
            <Button
              size="small"
              sx={{ ml: "auto" }}
              onClick={handleViewAllTransactions}
              disabled={!stripeConnected}
            >
              View All
            </Button>
          </Box>

          {stripeConnected ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Tenant</TableCell>
                    <TableCell>Property</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTransactions?.length > 0 ? (
                    recentTransactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {dayjs(transaction.date).format("MMM DD, YYYY")}
                        </TableCell>
                        <TableCell>{transaction.tenantName}</TableCell>
                        <TableCell>{transaction.propertyAddress}</TableCell>
                        <TableCell align="right">
                          ${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.status}
                            size="small"
                            color={
                              transaction.status === "succeeded"
                                ? "success"
                                : transaction.status === "pending"
                                ? "warning"
                                : "error"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body2" color="text.secondary">
                          No transactions yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <PaymentRounded
                sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                Connect Stripe to view transaction history
              </Typography>
            </Box>
          )}
        </Card>
      </Grid>

      {/* Help & Support */}
      <Grid item xs={12}>
        <Card elevation={0} sx={{ p: 3, bgcolor: "background.paper" }}>
          <RowHeader
            title="Need Help?"
            caption="Select how can we help you best."
            sxProps={{ textAlign: "left" }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <HelpOutlineRounded
                  sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                />
                <Typography variant="subtitle2" fontWeight={600}>
                  Setup Guide
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Step-by-step instructions for connecting Stripe
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    window.open(
                      "https://dashboard.stripe.com/register/connect",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  View Guide
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <SupportAgentRounded
                  sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                />
                <Typography variant="subtitle2" fontWeight={600}>
                  Contact Support
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Get help with payment processing issues
                </Typography>
                <Button size="small" variant="outlined">
                  Contact Us
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <SecurityRounded
                  sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                />
                <Typography variant="subtitle2" fontWeight={600}>
                  Security & Compliance
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Learn about payment security and PCI compliance
                </Typography>
                <Button size="small" variant="outlined">
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
