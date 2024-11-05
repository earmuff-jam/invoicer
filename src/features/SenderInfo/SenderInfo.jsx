import { useEffect, useState } from "react";
import { BLANK_INDIVIDUAL_INFORMATION_DETAILS } from "../../common/UserInfo/constants";
import UserInfoViewer from "../../common/UserInfo/UserInfoViewer";
import RowHeader from "../../common/RowHeader/RowHeader";
import { Stack } from "@mui/material";
import dayjs from "dayjs";

export default function SenderInfo() {
  const [formData, setFormData] = useState(
    BLANK_INDIVIDUAL_INFORMATION_DETAILS
  );

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

  const submit = (ev) => {
    ev.preventDefault();
    const draftData = Object.entries(formData).reduce(
      (acc, [key, valueObj]) => {
        acc[key] = valueObj.value;
        return acc;
      },
      {}
    );
    draftData["updated_on"] = dayjs();
    localStorage.setItem("senderInfo", JSON.stringify(draftData));
  };

  useEffect(() => {
    const localValues = localStorage.getItem("senderInfo");
    const parsedValues = JSON.parse(localValues);
    if (parsedValues) {
      const draftProfileDetails = { ...BLANK_INDIVIDUAL_INFORMATION_DETAILS };
      draftProfileDetails.first_name.value = parsedValues.first_name;
      draftProfileDetails.last_name.value = parsedValues.last_name;
      draftProfileDetails.email_address.value = parsedValues.email_address;
      draftProfileDetails.phone_number.value = parsedValues.phone_number;
      draftProfileDetails.street_address.value = parsedValues.street_address;
      draftProfileDetails.city.value = parsedValues.city;
      draftProfileDetails.state.value = parsedValues.state;
      draftProfileDetails.zipcode.value = parsedValues.zipcode;
      draftProfileDetails.updated_on = parsedValues.updated_on;
      setFormData(draftProfileDetails);
    }
  }, []);

  return (
    <Stack spacing={1} alignItems="center">
      <RowHeader
        title="Add details about the sender"
        caption="Required fields are marked with an * "
      />
      <UserInfoViewer
        title="Sender Information"
        caption="Add details about the sender"
        formData={formData}
        handleChange={handleChange}
        onSubmit={submit}
      />
    </Stack>
  );
}
