import { Container, Stack, Typography } from "@mui/material";
import ReportTable from "./ReportTable";
import RowHeader from "../../common/RowHeader/RowHeader";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Salutation from "../../common/UserInfo/Salutation";

export default function PdfViewer() {
  const navigate = useNavigate();
  const senderInfo = JSON.parse(localStorage.getItem("senderInfo"));
  const recieverInfo = JSON.parse(localStorage.getItem("recieverInfo"));
  const invoice_form = JSON.parse(localStorage.getItem("pdfDetails"));

  const handleNavigate = () => navigate("/edit");

  if (!invoice_form) {
    return (
      <Stack textAlign={"center"}>
        <Typography>Sorry, no invoice found to display</Typography>
        <Typography variant="caption">
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
    <Container maxWidth="md">
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
          sx={{ color: "#666", fontStyle: "italic" }}
        >
          Period {invoice_form.start_date} to {invoice_form.end_date}
        </Typography>
        <ReportTable
          rows={invoice_form.items || []}
          taxRate={invoice_form.tax_rate}
          invoiceTitle={invoice_form.invoice_header}
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
