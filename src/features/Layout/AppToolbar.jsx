import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";

import { MenuOutlined, QuestionMarkRounded } from "@mui/icons-material";

import AButton from "src/common/AButton";
import AIconButton from "src/common/AIconButton";
import { DefaultTourStepsMapperObj } from "src/common/TourSteps";

export default function AppToolbar({
  currentUri,
  currentThemeIdx,
  setCurrentThemeIdx,
  handleDrawerOpen,
  handleDrawerClose,
  setDialog,
}) {
  const showHelp = currentUri !== "/";
  const showPrint = currentUri === "/view";

  const handleHelp = () => {
    const draftDialogTitle = DefaultTourStepsMapperObj[currentUri]?.title;

    setDialog({
      title: draftDialogTitle,
      label: "Help and Support",
      type: "HELP",
      display: true,
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
    <AppBar elevation={0} sx={{ padding: "0.25rem 0rem" }}>
      <Toolbar>
        <IconButton onClick={handleDrawerOpen}>
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Invoicer
        </Typography>
        <Stack direction="row" spacing={1}>
          {showPrint ? (
            <AButton
              data-tour="view-pdf-1"
              variant="contained"
              onClick={handlePrint}
              className="no-print"
              label="Print"
            />
          ) : null}
          <AButton
            data-tour="view-pdf-2"
            size="small"
            variant="outlined"
            onClick={(ev) => changeTheme(ev, currentThemeIdx)}
            className="no-print"
            label="Change Theme"
          />
          {showHelp && (
            <AIconButton
              data-tour="view-pdf-3"
              size="small"
              label={<QuestionMarkRounded />}
              onClick={handleHelp}
              className="no-print"
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
