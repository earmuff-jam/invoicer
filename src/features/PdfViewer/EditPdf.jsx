import {
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextFieldWithLabel from "../../common/UserInfo/TextFieldWithLabel";
import {
  BLANK_INVOICE_DETAILS_FORM,
  BLANK_INVOICE_LINE_ITEM_FORM,
} from "./constants";
import { AddRounded, Save, SaveRounded } from "@mui/icons-material";
import EditPdfLineItemAccordion from "./EditPdfLineItemAccordion";
import dayjs from "dayjs";
import { produce } from "immer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

export default function EditPdf({
  title = "Edit Pdf",
  caption = "Edit data to populate invoice",
}) {
  const navigate = useNavigate();
  const [lineItems, setLineItems] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState(BLANK_INVOICE_DETAILS_FORM);

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
    localStorage.setItem("pdfDetails", JSON.stringify(draftData));
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
        backgroundColor: "#f8f9fa",
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
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#333" }}>
            {title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#666" }}>
            {caption}
          </Typography>
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
            label="Invoice Caption "
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

        {/* Line items */}
        <Stack alignItems={"flex-end"}>
          <Button onClick={() => addLineItems()} startIcon={<AddRounded />}>
            Add Item
          </Button>
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
        <Button variant="contained" onClick={submit} disabled={isDisabled()}>
          Save
        </Button>
      </Stack>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Changes saved.
          <Typography
            component="span"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            View PDF
          </Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
}
