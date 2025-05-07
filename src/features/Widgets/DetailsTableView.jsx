import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Stack } from "@mui/material";
import RowHeader from "src/common/RowHeader/RowHeader";
import {
  fakeDataset,
  noramlizeDetailsTableData,
} from "src/features/Widgets/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const DetailsTableView = ({ label, caption }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const draftDataList = JSON.parse(localStorage.getItem("invoiceDataList"));
    if (draftDataList === null || draftDataList?.length <= 0) {
      // temp fix to view widget data
      fakeDataset();
    }

    if (Array.isArray(draftDataList) && draftDataList.length > 0) {
      const formattedData = noramlizeDetailsTableData(draftDataList);
      setTableData(formattedData);
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "type",
        header: "Invoice Type",
        size: 150,
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
      },
      {
        accessorKey: "start_date",
        header: "Start Month",
        size: 150,
      },
      {
        accessorKey: "end_date",
        header: "End Month",
        size: 150,
      },
      {
        accessorKey: "total",
        header: "Total Collected",
        size: 150,
        Cell: ({ cell }) => `$${cell.getValue()}`,
      },
      {
        accessorKey: "invoice_status",
        header: "Invoice Status",
        size: 100,
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
      },
      {
        accessorKey: "payment_method",
        header: "Payment method",
        size: 150,
        Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
      },
      {
        accessorKey: "updated_on",
        header: "Updated on",
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
    muiTableContainerProps: {
      sx: {
        maxHeight: "16rem",
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

export default DetailsTableView;
