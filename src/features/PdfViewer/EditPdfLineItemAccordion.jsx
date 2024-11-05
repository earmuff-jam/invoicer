import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditPdfLineItem from "./EditPdfLineItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DeleteRounded } from "@mui/icons-material";

export default function EditPdfLineItemAccordion({
  lineItem,
  title,
  index,
  handleDelete,
  handleLineItemChange,
}) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Stack alignItems={"center"} direction="row">
          <IconButton size="small" onClick={() => handleDelete(index)}>
            <DeleteRounded fontSize="small" color="error" />
          </IconButton>
          <Typography>{title}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <EditPdfLineItem
          index={index}
          formData={lineItem}
          handleLineItemChange={handleLineItemChange}
        />
      </AccordionDetails>
    </Accordion>
  );
}
