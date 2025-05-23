import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DarkModeRounded,
  HelpCenterRounded,
  LightModeRounded,
  MenuOutlined,
} from "@mui/icons-material";

import AButton from "common/AButton";
import AIconButton from "common/AIconButton";
import { DefaultTourStepsMapperObj } from "common/Tour/TourSteps";
import useSendEmail, { generateInvoiceHTML } from "hooks/useSendEmail";
import CustomSnackbar from "common/CustomSnackbar/CustomSnackbar";
import validateClientPermissions from "common/ValidateClientPerms";

export default function AppToolbar({
  currentUri,
  currentRoute,
  currentThemeIdx,
  setCurrentThemeIdx,
  handleDrawerOpen,
  handleDrawerClose,
  setDialog,
}) {
  const { sendEmail, reset, loading, error, success } = useSendEmail();

  // hide for landing page
  const showHelp = currentRoute.config.displayHelpSelector;
  const showPrint = currentRoute.config.displayPrintSelector;

  const userEnabledFlagMap = validateClientPermissions();
  const isSendEmailFeatureEnabled = userEnabledFlagMap.get("sendEmail");

  const handleSendEmail = () => {
    const draftPdfDetails = JSON.parse(localStorage.getItem("pdfDetails"));

    const draftInvoiceStatus = JSON.parse(
      localStorage.getItem("invoiceStatus")
    );

    const draftInvoiceHeader = draftPdfDetails?.invoice_header;
    const draftInvoiceStatusLabel = draftInvoiceStatus?.label;

    const draftRecieverUserInfo = JSON.parse(
      localStorage.getItem("recieverInfo")
    );

    sendEmail({
      to: draftRecieverUserInfo.email_address,
      subject: draftInvoiceHeader
        ? `Invoice Details - ${draftInvoiceHeader}`
        : "Invoice Details",
      text: "Please view your attached invoice.",
      html: generateInvoiceHTML(
        draftRecieverUserInfo,
        draftPdfDetails,
        draftInvoiceStatusLabel
      ),
    });
  };

  const handleHelp = () => {
    const draftDialogTitle = DefaultTourStepsMapperObj[currentUri]?.title;

    setDialog({
      title: draftDialogTitle,
      label: "Help and Support",
      type: "HELP",
      display: true,
      showWatermark: false,
    });

    handleDrawerOpen();
  };

  const handlePrint = () => {
    const draftDialogTitle =
      "Verify all information is correct before proceeding to print. Press print when ready.";

    setDialog({
      title: draftDialogTitle,
      label: "Verify Information",
      type: "PRINT",
      display: true,
      showWatermark: false,
    });

    handleDrawerClose();
  };

  const changeTheme = (_, currentThemeIdx) => {
    if (Number(currentThemeIdx) === 0) {
      localStorage.setItem("theme", 1);

      setCurrentThemeIdx(1);
      return;
    }

    localStorage.setItem("theme", 0);
    setCurrentThemeIdx(0);
  };

  return (
    <AppBar elevation={0} sx={{ padding: "0.25rem 0rem" }} className="no-print">
      <Toolbar>
        <IconButton onClick={handleDrawerOpen}>
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Invoicer
        </Typography>
        <Stack direction="row" spacing={1}>
          {showPrint ? (
            <>
              <AButton
                data-tour="view-pdf-1"
                variant="contained"
                onClick={handlePrint}
                className="no-print"
                label="Print"
              />
              {isSendEmailFeatureEnabled ? (
                <AButton
                  variant="contained"
                  onClick={handleSendEmail}
                  className="no-print"
                  label="Send Email"
                  loading={loading}
                />
              ) : null}
            </>
          ) : null}
          <Tooltip title="Change theme of the application.">
            <Box>
              <AIconButton
                data-tour="view-pdf-2"
                variant="outlined"
                onClick={(ev) => changeTheme(ev, currentThemeIdx)}
                className="no-print"
                label={
                  Number(currentThemeIdx) === 1 ? (
                    <LightModeRounded />
                  ) : (
                    <DarkModeRounded />
                  )
                }
              />
            </Box>
          </Tooltip>
          {showHelp && (
            <Tooltip title="Click here to learn more about this page.">
              <Box>
                <AIconButton
                  data-tour="view-pdf-3"
                  label={<HelpCenterRounded />}
                  onClick={handleHelp}
                  className="no-print"
                />
              </Box>
            </Tooltip>
          )}
        </Stack>
      </Toolbar>
      <CustomSnackbar
        showSnackbar={success || error !== null}
        setShowSnackbar={reset}
        severity={success ? "success" : "error"}
        title={
          success
            ? "Email sent successfully. Check spam."
            : "Error sending email."
        }
      />
    </AppBar>
  );
}
