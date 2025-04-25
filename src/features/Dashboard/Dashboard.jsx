import { Button, IconButton, Stack } from "@mui/material";

import { AddRounded, RestartAltRounded } from "@mui/icons-material";

import RowHeader from "src/common/RowHeader/RowHeader";

export default function Dashboard() {
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader
          sxProps={{ textAlign: "left" }}
          title="Dashboard layout"
          caption="Displaying 3 out of 5 widgets"
        />
        <Stack direction="row" spacing={2}>
          <IconButton>
            <AddRounded fontSize="small" />
          </IconButton>
          <Button variant="outlined" endIcon={<RestartAltRounded />}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
