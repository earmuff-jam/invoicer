import { EditRounded, HomeRounded, Person2Rounded } from "@mui/icons-material";

export const NAVIGATION_LIST = [
  {
    id: 1,
    icon: <HomeRounded fontSize="small" />,
    label: "Home",
    to: "/",
  },
  {
    id: 2,
    icon: <EditRounded fontSize="small" />,
    label: "Edit PDF",
    to: "/edit",
  },
  {
    id: 3,
    icon: <Person2Rounded fontSize="small" />,
    label: "Sender",
    to: "/sender",
  },
  {
    id: 4,
    icon: <Person2Rounded fontSize="small" />,
    label: "Reciever",
    to: "/reciever",
  },
];
