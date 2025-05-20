import { lazy } from "react";

import {
  DashboardCustomizeRounded,
  EditRounded,
  HomeRounded,
  Person2Rounded,
  PictureAsPdfRounded,
} from "@mui/icons-material";

const Overview = lazy(() => import("features/Landing/Overview"));
const Dashboard = lazy(() => import("features/Dashboard/Dashboard"));
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
    config: {
      displayHelpSelector: false,
      displayPrintSelector: false,
    },
  },
  {
    id: 2,
    label: "Dashboard",
    path: "/dashboard",
    element: <Dashboard />,
    icon: <DashboardCustomizeRounded fontSize="small" />,
    requiredFlags: ["invoicer", "invoicerPro"],
    config: {
      displayHelpSelector: false,
      displayPrintSelector: false,
    },
  },
  {
    id: 3,
    label: "View Invoice",
    path: "/view",
    element: <PdfViewer />,
    icon: <PictureAsPdfRounded fontSize="small" />,
    requiredFlags: ["invoicer"],
    config: {
      displayHelpSelector: true,
      displayPrintSelector: true,
    },
  },
  {
    id: 4,
    label: "Edit Invoice",
    path: "/edit",
    element: <EditPdf />,
    icon: <EditRounded fontSize="small" />,
    requiredFlags: ["invoicer"],
    config: {
      displayHelpSelector: true,
      displayPrintSelector: false,
    },
  },
  {
    id: 5,
    label: "Sender",
    path: "/sender",
    element: <SenderInfo />,
    icon: <Person2Rounded fontSize="small" />,
    requiredFlags: ["userInformation"],
    config: {
      displayHelpSelector: true,
      displayPrintSelector: false,
    },
  },
  {
    id: 6,
    label: "Reciever",
    path: "/reciever",
    element: <RecieverInfo />,
    icon: <Person2Rounded fontSize="small" />,
    requiredFlags: ["userInformation"],
    config: {
      displayHelpSelector: true,
      displayPrintSelector: false,
    },
  },
];
