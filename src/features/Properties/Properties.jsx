import React, { useState } from "react";

import { AddRounded } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";

import AButton from "common/AButton";
import RowHeader from "common/RowHeader/RowHeader";
import AddProperty from "features/Properties/AddProperty";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Properties() {
  const [dialog, setDialog] = useState(false);

  const closeDialog = () => setDialog(false);
  const toggleDialog = () => setDialog(!dialog);

  return (
    <Stack>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <RowHeader
          title="Properties"
          sxProps={{
            textAlign: "left",
            fontWeight: "bold",
            color: "text.secondary",
          }}
        />
        <Button
          size="small"
          variant="outlined"
          endIcon={<AddRounded fontSize="small" />}
          onClick={toggleDialog}
        >
          Add Property
        </Button>
      </Stack>

      <Dialog
        open={dialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        aria-describedby="alert-dialog-slide-add-property-box"
      >
        <DialogTitle>Add new property</DialogTitle>
        <DialogContent>
          <AddProperty />
        </DialogContent>
        <DialogActions>
          <AButton
            size="small"
            variant="outlined"
            onClick={closeDialog}
            label="Close"
          />
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
