import { useMemo, useState } from "react";

import dayjs from "dayjs";

import { Stack } from "@mui/material";
import EmptyComponent from "common/EmptyComponent";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

dayjs.extend(relativeTime);

const ViewRentalPaymentSummary = ({ rentData = [] }) => {
  const [tableData] = useState(rentData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "tenantEmail",
        header: "Tenant Email",
        size: 200,
        Cell: ({ cell }) => cell.getValue() || "-",
      },
      {
        accessorKey: "amountPaid",
        header: "Amount Paid ($)",
        size: 120,
        Cell: ({ cell }) => Number(cell.getValue()).toFixed(2),
      },
      {
        accessorKey: "method",
        header: "Payment Method",
        size: 100,
        Cell: ({ cell }) => cell.getValue() || "-",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => cell.getValue() || "-",
      },
      {
        accessorKey: "rentMonth",
        header: "Rent Month",
        size: 100,
        Cell: ({ cell }) => cell.getValue() || "-",
      },
      {
        accessorKey: "paidOn",
        header: "Paid On",
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue() ? dayjs(cell.getValue()).fromNow() : "-",
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableColumnActions: false,
    enableTopToolbar: false,
    initialState: {
      density: "compact",
    },
    renderEmptyRowsFallback: () => (
      <EmptyComponent sxProps={{ textTransform: "initial" }} />
    ),
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.transparent.main,
    }),
    muiTableContainerProps: {
      sx: {
        maxHeight: "16rem",
        boxShadow: "none",
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        boxShadow: "none",
      },
    },
  });

  return (
    <Stack spacing={2}>
      <MaterialReactTable table={table} />
    </Stack>
  );
};

export default ViewRentalPaymentSummary;
