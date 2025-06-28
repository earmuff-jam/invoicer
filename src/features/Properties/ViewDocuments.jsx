import dayjs from "dayjs";
import { useMemo, useState } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { Stack } from "@mui/material";

import RowHeader from "common/RowHeader/RowHeader";
import relativeTime from "dayjs/plugin/relativeTime";
import EmptyComponent from "common/EmptyComponent";

dayjs.extend(relativeTime);

// TODO : https://github.com/earmuff-jam/invoicer/issues/77
// Fetch data from S3 / wherever we store docusign stuffs.
const ViewDocuments = ({ label, caption }) => {
  const [tableData] = useState([]);

  //   useEffect(() => {
  //     const draftData = JSON.parse(localStorage.getItem("pdfDetails"));
  //     const draftInvoiceStatus = JSON.parse(
  //       localStorage.getItem("invoiceStatus")
  //     );

  //     let formattedData;
  //     formattedData = { ...draftData };

  //     if (draftInvoiceStatus) {
  //       formattedData = {
  //         ...formattedData,
  //         invoice_status: draftInvoiceStatus?.label,
  //       };
  //     }

  //     if (draftData) {
  //       const data = noramlizeDetailsTableData([formattedData]);
  //       setTableData(data);
  //     }
  //   }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 40,
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
      },
      {
        accessorKey: "fileName",
        header: "Attachment Filename",
        size: 200,
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
      },

      {
        accessorKey: "updated_on",
        header: "Last updated",
        size: 150,
        Cell: ({ cell }) => dayjs(cell.getValue()).fromNow(),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableColumnActions: false,
    enableTopToolbar: false,
    initialState: {
      density: "comfortable",
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
      <RowHeader
        title={label}
        caption={caption}
        sxProps={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.secondary",
        }}
      />
      <MaterialReactTable table={table} />
    </Stack>
  );
};

export default ViewDocuments;
