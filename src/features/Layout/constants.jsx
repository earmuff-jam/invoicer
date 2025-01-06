import { EditRounded, HomeRounded, Person2Rounded, PictureAsPdfRounded } from "@mui/icons-material";

export const NAVIGATION_LIST = [
  {
    id: 1,
    icon: <HomeRounded fontSize="small" />,
    label: "Home",
    to: "/",
  },
  {
    id: 2,
    icon: <PictureAsPdfRounded fontSize="small" />,
    label: "View Invoice",
    to: "/view",
  },
  {
    id: 3,
    icon: <EditRounded fontSize="small" />,
    label: "Edit Invoice",
    to: "/edit",
  },
  {
    id: 4,
    icon: <Person2Rounded fontSize="small" />,
    label: "Sender",
    to: "/sender",
  },
  {
    id: 5,
    icon: <Person2Rounded fontSize="small" />,
    label: "Reciever",
    to: "/reciever",
  },
];
