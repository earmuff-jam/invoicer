import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import TextFieldWithLabel from "src/common/UserInfo/TextFieldWithLabel";
import {
  BLANK_INVOICE_DETAILS_FORM,
  BLANK_INVOICE_LINE_ITEM_FORM,
} from "src/features/PdfViewer/constants";
import EditPdfLineItemAccordion from "src/features/PdfViewer/EditPdfLineItemAccordion";
import dayjs from "dayjs";
import { produce } from "immer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "src/common/CustomSnackbar/CustomSnackbar";
import AButton from "src/common/AButton";
import {
  AddRounded,
  SaveRounded,
  CancelRounded,
  CheckRounded,
  DraftsRounded,
  LocalAtmRounded,
  PaidRounded,
  PaymentsRounded,
} from "@mui/icons-material";

const defaultOptions = [
  {
    id: 1,
    label: "Paid",
    icon: <PaidRounded />,
    selected: true,
  },
  {
    id: 2,
    label: "Draft",
    icon: <DraftsRounded />,
    selected: false,
  },
  {
    id: 3,
    label: "Overdue",
    icon: <LocalAtmRounded />,
    selected: false,
  },
  {
    id: 4,
    label: "Partially paid",
    icon: <PaymentsRounded />,
    selected: false,
  },
  {
    id: 5,
    label: "Void / Cancelled",
    icon: <CancelRounded />,
    selected: false,
  },
];

export default function EditPdf({
  title = "Edit Pdf",
  caption = "Edit data to populate invoice",
}) {
  const navigate = useNavigate();

  const [lineItems, setLineItems] = useState([]);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const [options, setOptions] = useState(defaultOptions);
  const [formData, setFormData] = useState(BLANK_INVOICE_DETAILS_FORM);

  const handleSelection = (label) => {
    setOptions((prevItems) =>
      produce(prevItems, (draft) => {
        draft.forEach((item) => {
          item.selected = item.label === label;
        });
      })
    );
  };

  const handleChange = (ev) => {
    const { id, value } = ev.target;
    const updatedFormData = { ...formData };
    let errorMsg = "";
    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }
    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };
    setFormData(updatedFormData);
  };

  const handleDateTime = (ev, id) => {
    const value = dayjs(ev).format("MM-DD-YYYY");
    const updatedFormData = { ...formData };
    let errorMsg = "";
    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }
    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };
    setFormData(updatedFormData);
  };

  const handleLineItemChange = (ev, index) => {
    const { id, value } = ev.target;

    setLineItems((prevItems) =>
      produce(prevItems, (draft) => {
        let errorMsg = "";

        const currentItem = draft[index];
        const field = currentItem[id];

        for (const validator of field.validators) {
          if (validator.validate(value)) {
            errorMsg = validator.message;
            break;
          }
        }

        currentItem[id] = {
          ...field,
          value,
          errorMsg,
        };
      })
    );
  };

  const handleDelete = (index) => {
    const updatedLineItems = lineItems.filter((v, idx) => idx !== index);
    setLineItems(() => [...updatedLineItems]);
  };

  const addLineItems = () => {
    setLineItems((prevItems) => [...prevItems, BLANK_INVOICE_LINE_ITEM_FORM]);
  };

  const submit = (ev) => {
    ev.preventDefault();
    const draftData = Object.entries(formData).reduce(
      (acc, [key, valueObj]) => {
        acc[key] = valueObj.value;
        return acc;
      },
      {}
    );

    const draftLineItemData = lineItems.map((lineItem) => {
      return Object.entries(lineItem).reduce((acc, [key, valueObj]) => {
        acc[key] = valueObj.value;
        return acc;
      }, {});
    });

    draftData["items"] = draftLineItemData;
    draftData["updated_on"] = dayjs().toISOString();

    const invoiceStatus = options.find((option) => option.selected)?.label;

    localStorage.setItem("pdfDetails", JSON.stringify(draftData));
    localStorage.setItem("invoiceStatus", JSON.stringify(invoiceStatus));
    setShowSnackbar(true);
  };

  const isLineItemsDisabled = () => {
    return lineItems.some((lineItem) => {
      const containerErrInLineItem = Object.values(lineItem).some(
        (el) => el.errorMsg
      );

      const requiredFormFieldsInLineItem = Object.values(lineItem).filter(
        (v) => v.isRequired
      );
      const isRequiredFieldsEmptyInLineItem = requiredFormFieldsInLineItem.some(
        (el) => el.value.trim() === ""
      );

      return containerErrInLineItem || isRequiredFieldsEmptyInLineItem;
    });
  };

  const isDisabled = () => {
    const containsErr = Object.values(formData).some((el) => el.errorMsg);

    const requiredFormFields = Object.values(formData).filter(
      (v) => v.isRequired
    );
    const isRequiredFieldsEmpty = requiredFormFields.some(
      (el) => el.value.trim() === ""
    );

    return (
      containsErr ||
      isRequiredFieldsEmpty ||
      lineItems.length <= 0 ||
      isLineItemsDisabled()
    );
  };

  useEffect(() => {
    const existingInvoiceStatus = localStorage.getItem("invoiceStatus");
    const parsedExistingInvoiceStatus = JSON.parse(existingInvoiceStatus);

    if (parsedExistingInvoiceStatus) {
      handleSelection(parsedExistingInvoiceStatus);
    }

    const localValues = localStorage.getItem("pdfDetails");
    const parsedValues = JSON.parse(localValues);

    if (parsedValues) {
      const draftPdfDetails = produce(BLANK_INVOICE_DETAILS_FORM, (draft) => {
        draft.title.value = parsedValues.title || "";
        draft.caption.value = parsedValues.caption || "";
        draft.note.value = parsedValues.note || "";
        draft.start_date.value = parsedValues.start_date || "";
        draft.end_date.value = parsedValues.end_date || "";
        draft.tax_rate.value = parsedValues.tax_rate || "";
        draft.invoice_header.value = parsedValues.invoice_header || "";
      });
      setFormData(draftPdfDetails);

      const draftLineItems = parsedValues.items.map((element) =>
        produce(BLANK_INVOICE_LINE_ITEM_FORM, (draft) => {
          draft.descpription.value = element.descpription || "";
          draft.caption.value = element.caption || "";
          draft.quantity.value = element.quantity || "";
          draft.price.value = element.price || "";
          draft.payment.value = element.payment || "";
          draft.payment_method.value = element.payment_method || "";
        })
      );
      setLineItems(draftLineItems);
    }
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        padding: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack spacing={2}>
        <Stack>
          <IconButton
            onClick={submit}
            color="primary"
            size="small"
            sx={{ alignSelf: "flex-end" }}
            disabled={isDisabled()}
          >
            <SaveRounded />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="subtitle2">{caption}</Typography>
        </Stack>
        {/* First and Last Name */}
        <Stack direction="row" spacing={2}>
          <TextFieldWithLabel
            label="Invoice Title"
            id="title"
            name="title"
            placeholder="The title of the invoice. Eg, Rent for the month of"
            value={formData?.title.value || ""}
            handleChange={handleChange}
            errorMsg={formData.title["errorMsg"]}
          />
          <TextFieldWithLabel
            label="Invoice Caption"
            id="caption"
            name="caption"
            placeholder="The description below the title of invoice"
            value={formData?.caption.value || ""}
            handleChange={handleChange}
            errorMsg={formData.caption["errorMsg"]}
          />
        </Stack>
        <TextFieldWithLabel
          label="Additional Notes "
          id="note"
          name="note"
          placeholder="Additional notes for the sender to add"
          value={formData?.note.value || ""}
          handleChange={handleChange}
          errorMsg={formData.note["errorMsg"]}
          multiline={true}
          maxRows={3}
        />

        {/* Start and end dates */}
        <Stack direction="row" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date *"
              id="start_date"
              name="start_date"
              placeholder="Start Date"
              value={dayjs(formData?.start_date.value)}
              onChange={(ev) => handleDateTime(ev, "start_date")}
              errorMsg={formData.start_date["errorMsg"]}
              slotProps={{
                textField: {
                  helperText: "Start date for the selected bill",
                  size: "small",
                  sx: { flexGrow: 1 },
                },
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date *"
              id="end_date"
              name="end_date"
              placeholder="End Date"
              value={dayjs(formData?.end_date.value)}
              onChange={(ev) => handleDateTime(ev, "end_date")}
              errorMsg={formData.end_date["errorMsg"]}
              slotProps={{
                textField: {
                  helperText: "Due date for the selected bill",
                  size: "small",
                  sx: { flexGrow: 1 },
                },
              }}
            />
          </LocalizationProvider>
        </Stack>
        {/* Invoice Header */}
        <TextFieldWithLabel
          label="Invoice Header "
          id="invoice_header"
          name="invoice_header"
          placeholder="The title of the bill. Eg., Rent Details"
          value={formData?.invoice_header.value || ""}
          handleChange={handleChange}
          errorMsg={formData.invoice_header["errorMsg"]}
        />
        {/* Tax Rate */}
        <TextFieldWithLabel
          label="Tax Rate "
          id="tax_rate"
          name="tax_rate"
          placeholder="Standard tax rate."
          value={formData?.tax_rate.value || ""}
          handleChange={handleChange}
          errorMsg={formData.tax_rate["errorMsg"]}
        />

        <Paper sx={{ padding: "1rem" }}>
          <Typography sx={{ fontWeight: "bold", marginTop: "1rem" }}>
            Invoice status
          </Typography>
          <MenuList>
            {options.map(({ id, label, icon, selected }) => (
              <MenuItem key={id} onClick={() => handleSelection(label)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{label}</ListItemText>
                {selected ? <CheckRounded /> : null}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>

        {/* Line items */}
        <Stack alignItems={"flex-end"}>
          <AButton
            onClick={() => addLineItems()}
            startIcon={<AddRounded />}
            variant="outlined"
            label="Add Item"
          />
        </Stack>
        {lineItems.map((item, index) => (
          <EditPdfLineItemAccordion
            key={index}
            title={`Edit line ${index + 1}`}
            lineItem={item}
            index={index}
            handleLineItemChange={handleLineItemChange}
            handleDelete={handleDelete}
          />
        ))}
        <AButton
          variant="contained"
          onClick={submit}
          disabled={isDisabled()}
          label="Save"
        />
      </Stack>
      <CustomSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        title="Changes saved."
        caption="View Invoice"
        onClick={() => navigate("/view")}
      />
    </Container>
  );
}
