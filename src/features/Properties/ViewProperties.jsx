import { Stack } from "@mui/material";
import EmptyComponent from "common/EmptyComponent";
import ViewProperty from "src/features/Properties/ViewProperty";

export default function ViewProperties({
  currentProperties = [],
  handleDelete,
}) {
  if (currentProperties?.length === 0)
    return <EmptyComponent caption="Add new property to begin." />;

  return (
    <Stack padding={1}>
      {currentProperties.map((property) => (
        <ViewProperty
          key={property?.id}
          property={property}
          handleDelete={handleDelete}
        />
      ))}
    </Stack>
  );
}
