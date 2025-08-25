import { useNavigate, useOutletContext } from "react-router-dom";

import { Container, Stack, Typography } from "@mui/material";
import RowHeader from "common/RowHeader/RowHeader";
import Salutation from "common/UserInfo/Salutation";
import dayjs from "dayjs";
import EmptyPdfViewer from "features/InvoiceWorks/components/PdfViewer/EmptyPdfViewer";
import ReportTable from "features/InvoiceWorks/components/PdfViewer/ReportTable";
import { useAppTitle } from "hooks/useAppTitle";

export default function PdfViewer() {
  useAppTitle("View Invoice");

  const navigate = useNavigate();
  const [showWatermark] = useOutletContext();

  const senderInfo = JSON.parse(localStorage.getItem("senderInfo"));
  const recieverInfo = JSON.parse(localStorage.getItem("recieverInfo"));
  const invoice_form = JSON.parse(localStorage.getItem("pdfDetails"));
  const invoiceStatus = JSON.parse(localStorage.getItem("invoiceStatus"));

  const handleNavigate = () => navigate("/invoice/edit");

  if (!invoice_form) {
    return <EmptyPdfViewer handleNavigate={handleNavigate} />;
  }

  return (
    <Container maxWidth="md" data-tour="view-pdf-0">
      <Stack spacing={"2rem"}>
        {recieverInfo ? <Salutation userInfo={recieverInfo} /> : null}
        <RowHeader
          title={invoice_form.title}
          caption={invoice_form.caption}
          showDate={true}
          createdDate={dayjs(invoice_form?.updatedOn?.fromNow).format(
            "DD-MM-YYYY",
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
          invoiceStatus={invoiceStatus}
          showWatermark={showWatermark}
        />

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
