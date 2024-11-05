import { Stack } from "@mui/material";
import TextFieldWithLabel from "../../common/UserInfo/TextFieldWithLabel";

export default function EditPdfLineItem({
  index,
  formData,
  handleLineItemChange,
}) {
  return (
    <Stack>
      {/* Description */}
      <TextFieldWithLabel
        label="Description"
        id="descpription"
        name="descpription"
        placeholder="Description of charge"
        value={formData?.descpription.value || ""}
        handleChange={(ev) => handleLineItemChange(ev, index)}
        errorMsg={formData.descpription["errorMsg"]}
      />

      {/* Caption */}
      <TextFieldWithLabel
        label="Caption"
        id="caption"
        name="caption"
        placeholder="Additional details"
        value={formData?.caption.value || ""}
        handleChange={(ev) => handleLineItemChange(ev, index)}
        errorMsg={formData.caption["errorMsg"]}
      />

      {/* Quantity and Price */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="Quantity *"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          value={formData?.quantity.value || ""}
          handleChange={(ev) => handleLineItemChange(ev, index)}
          errorMsg={formData.quantity["errorMsg"]}
        />
        <TextFieldWithLabel
          label="Price *"
          id="price"
          name="price"
          placeholder="Total cost of current item"
          value={formData?.price.value || ""}
          handleChange={(ev) => handleLineItemChange(ev, index)}
          errorMsg={formData.price["errorMsg"]}
        />
      </Stack>

      {/* Payment and Mode of Payment */}
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          label="Payment *"
          id="payment"
          name="payment"
          placeholder="Amount paid"
          value={formData?.payment.value || ""}
          handleChange={(ev) => handleLineItemChange(ev, index)}
          errorMsg={formData.payment["errorMsg"]}
        />
        <TextFieldWithLabel
          label="Mode of Payment*"
          id="payment_method"
          name="payment_method"
          placeholder="Payment Method, eg., Zelle, Money Order"
          value={formData?.payment_method.value || ""}
          handleChange={(ev) => handleLineItemChange(ev, index)}
          errorMsg={formData.payment_method["errorMsg"]}
        />
      </Stack>
    </Stack>
  );
}
