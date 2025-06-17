import {
  AddRounded,
  DeleteRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AButton from "src/common/AButton";

import ViewPropertyAccordionDetails from "src/features/Properties/ViewPropertyAccordionDetails";

const tenants = [
  {
    id: "tenant123",
    propertyId: "", // the id of the property the tenant is associated with
    isPrimaryContact: true, // the main person to communicate with
    name: "John Doe",
    monthlyRent: 2750.0,
    dueDate: "2025-06-01",
    lastPaidDate: "2025-06-01",
    isPaid: true, // if there is no outstanding balance
    phone: "555-123-4567",
    email: "john1988@example.com",
  },
];

export default function ViewProperty({ property, handleDelete }) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          "& .MuiAccordionSummary-content": {
            width: "100%",
            padding: "0rem 1rem 0rem 0rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <Stack flexGrow={1}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <IconButton size="small" onClick={() => handleDelete(property.id)}>
              <DeleteRounded fontSize="small" color="error" />
            </IconButton>
            <Typography variant="subtitle2" color="primary">
              {property?.name || "Unknown Property Name"}
            </Typography>
          </Stack>
          <Typography variant="subtitle2" fontSize={12}>
            {property?.address}
          </Typography>
          <Typography variant="subtitle2" fontSize={12}>
            {property?.city} {property?.state}, {property?.zipcode}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <AButton
            label="Associate Tenant"
            onClick={() => {}}
            size="small"
            variant="outlined"
            endIcon={<AddRounded />}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <ViewPropertyAccordionDetails tenants={tenants} />
      </AccordionDetails>
    </Accordion>
  );
}
