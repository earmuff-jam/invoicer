import {
  DashboardCustomizeRounded,
  EditRounded,
  HomeRounded,
  Person2Rounded,
  PictureAsPdfRounded,
} from "@mui/icons-material";
import { lazy } from "react";

const Overview = lazy(() => import("features/Landing/Overview"));
const PdfViewer = lazy(() => import("features/PdfViewer/PdfViewer"));
const EditPdf = lazy(() => import("features/PdfViewer/EditPdf"));
const SenderInfo = lazy(() => import("features/SenderInfo/SenderInfo"));
const RecieverInfo = lazy(() => import("features/RecieverInfo/RecieverInfo"));

/**
 * InvoicerRoutes
 *
 * used to build out the invoicer routes. required flags are array of string that are
 * required to be met as a client permission for the route to be in operation.
 */
export const InvoicerRoutes = [
  {
    id: 1,
    label: "Home",
    path: "/",
    element: <Overview />,
    icon: <HomeRounded fontSize="small" />,
    requiredFlags: ["invoicer"],
  },
  {
    id: 2,
    label: "Dashboard",
    path: "/dashboard",
    element: <div> Dashboard features </div>,
    icon: <DashboardCustomizeRounded fontSize="small" />,
    requiredFlags: ["invoicer", "invoicerPro"],
  },
  {
    id: 3,
    label: "View Invoice",
    path: "/view",
    element: <PdfViewer />,
    icon: <PictureAsPdfRounded fontSize="small" />,
    requiredFlags: ["invoicer"],
  },
  {
    id: 4,
    label: "Edit Invoice",
    path: "/edit",
    element: <EditPdf />,
    icon: <EditRounded fontSize="small" />,
    requiredFlags: ["invoicer"],
  },
  {
    id: 5,
    label: "Sender",
    path: "/sender",
    element: <SenderInfo />,
    icon: <Person2Rounded fontSize="small" />,
    requiredFlags: ["userInformation"],
  },
  {
    id: 6,
    label: "Reciever",
    path: "/reciever",
    element: <RecieverInfo />,
    icon: <Person2Rounded fontSize="small" />,
    requiredFlags: ["userInformation"],
  },
];
