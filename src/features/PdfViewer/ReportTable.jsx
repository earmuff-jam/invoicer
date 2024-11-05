import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";

export default function ReportTable({
  rows = [],
  taxRate = 0,
  invoiceTitle = "Rent Details",
}) {
  const numberFormatter = (number) => number.toFixed(2);
  const subtotal = rows
    .map(({ price }) => parseFloat(price))
    .reduce((sum, i) => sum + i, 0);

  const paymentRecieved = rows
    .map(({ payment }) => parseFloat(payment) || 0)
    .reduce((sum, i) => sum + i, 0);

  const invoiceSubtotal = subtotal - paymentRecieved;
  const formattedTax = parseFloat(taxRate) || 0;
  const invoiceTaxes = formattedTax * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              {invoiceTitle}
            </TableCell>
            <TableCell align="right">Price (USD) </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Payment Recieved</TableCell>
            <TableCell align="right">Balance Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Stack direction="row" spacing={1} alignItems="flex-end">
                  <Typography variant="subtitle">{row.descpription}</Typography>
                  <Typography variant="caption">{row.caption}</Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.payment}</TableCell>
              <TableCell align="right">
                {numberFormatter(row.price - row.payment)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">
              {numberFormatter(invoiceSubtotal)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell
              colSpan={1}
              align="right"
            >{`${formattedTax} %`}</TableCell>
            <TableCell align="right" colSpan={2}>
              {numberFormatter(formattedTax)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{numberFormatter(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
