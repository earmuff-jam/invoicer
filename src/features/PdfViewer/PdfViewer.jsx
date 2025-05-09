import { Container, Stack, Typography } from "@mui/material";
import ReportTable from "src/features/PdfViewer/ReportTable";
import RowHeader from "src/common/RowHeader/RowHeader";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Salutation from "src/common/UserInfo/Salutation";
import { useAppTitle } from "src/hooks/useAppTitle";

export default function PdfViewer() {
  useAppTitle("View Invoice");

  const navigate = useNavigate();

  const senderInfo = JSON.parse(localStorage.getItem("senderInfo"));
  const recieverInfo = JSON.parse(localStorage.getItem("recieverInfo"));
  const invoice_form = JSON.parse(localStorage.getItem("pdfDetails"));
  const invoiceStatus = JSON.parse(localStorage.getItem("invoiceStatus"));

  const handleNavigate = () => navigate("/edit");

  if (!invoice_form) {
    return (
      <Stack textAlign={"center"}>
        <Typography sx={{ textTransform: "initial" }}>
          Sorry, no invoice found to display
        </Typography>
        <Typography variant="caption" sx={{ textTransform: "initial" }}>
          Create new invoice form
          <Typography
            component={"span"}
            variant="caption"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={handleNavigate}
          >
            {" "}
            here.
          </Typography>
        </Typography>
      </Stack>
    );
  }

  return (
    <Container maxWidth="md" data-tour="view-pdf-0">
      <Stack spacing={"2rem"}>
        {recieverInfo ? <Salutation userInfo={recieverInfo} /> : null}
        <RowHeader
          title={invoice_form.title}
          caption={invoice_form.caption}
          showDate={true}
          createdDate={dayjs(invoice_form.updated_on.fromNow).format(
            "DD-MM-YYYY"
          )}
        />
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          Period {invoice_form.start_date} to {invoice_form.end_date}
        </Typography>
        <ReportTable
          rows={invoice_form.items || []}
          taxRate={invoice_form.tax_rate}
          invoiceTitle={invoice_form.invoice_header}
        />
        <Typography
          color="error.light"
          sx={{
            transform: "rotate(-45deg)",
            textTransform: "uppercase",
            fontSize: "6rem",
            textAlign: "center",
          }}
        >
          {invoiceStatus}
        </Typography>
        {invoice_form?.note.length > 0 && (
          <Typography variant="caption" fontStyle="italic" fontWeight="medium">
            Note: {invoice_form?.note}
          </Typography>
        )}
      </Stack>

      {senderInfo ? <Salutation isEnd={true} userInfo={senderInfo} /> : null}
    </Container>
  );
}
