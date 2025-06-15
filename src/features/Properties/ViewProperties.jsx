import { Stack } from "@mui/material";
import EmptyComponent from "common/EmptyComponent";

export default function ViewProperties({ currentProperties = [] }) {
  if (currentProperties?.length === 0)
    return <EmptyComponent caption="Add new property to begin." />;

  return <Stack>{JSON.stringify(currentProperties)}</Stack>;
}
