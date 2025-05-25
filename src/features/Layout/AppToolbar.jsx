import { MenuOutlined } from "@mui/icons-material";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import { DefaultTourStepsMapperObj } from "common/Tour/TourSteps";
import useSendEmail, { generateInvoiceHTML } from "hooks/useSendEmail";
import CustomSnackbar from "common/CustomSnackbar/CustomSnackbar";
import validateClientPermissions from "common/ValidateClientPerms";
import { useGenerateUserData } from "hooks/useGenerateUserData";
import MenuOptions from "features/Layout/MenuOptions";

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

  const {
    data,
    recieverInfo,
    draftInvoiceHeader,
    draftInvoiceStatusLabel,
    draftRecieverUserEmailAddress,
    isDisabled,
  } = useGenerateUserData();

  // hide for landing page
  const showHelp = currentRoute.config.displayHelpSelector;
  const showPrint = currentRoute.config.displayPrintSelector;

  const userEnabledFlagMap = validateClientPermissions();
  const isSendEmailFeatureEnabled = userEnabledFlagMap.get("sendEmail");

  const handleSendEmail = () => {
    sendEmail({
      to: draftRecieverUserEmailAddress,
      subject: draftInvoiceHeader
        ? `Invoice Details - ${draftInvoiceHeader}`
        : "Invoice Details",
      text: "Please view your attached invoice.",
      html: generateInvoiceHTML(recieverInfo, data, draftInvoiceStatusLabel),
    });
  };

  const handleHelp = () => {
    const draftDialogTitle = DefaultTourStepsMapperObj[currentUri]?.element;

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
        <MenuOptions
          showPrint={showPrint}
          handleHelp={handleHelp}
          handlePrint={handlePrint}
          handleSendEmail={handleSendEmail}
          handleTheme={() => changeTheme("", currentThemeIdx)}
          isSendEmailFeatureEnabled={isSendEmailFeatureEnabled} // email feature check
          isDisabled={isDisabled} // valid data check
          isLightTheme={Number(currentThemeIdx) === 1}
          showHelpAndSupport={showHelp}
          isSendEmailLoading={loading}
        />
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
