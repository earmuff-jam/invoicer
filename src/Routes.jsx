import { lazy } from "react";

import {
  ContactSupportRounded,
  DashboardCustomizeRounded,
  DashboardRounded,
  EditRounded,
  HomeRounded,
  LiveHelpRounded,
  Person2Rounded,
  PictureAsPdfRounded,
  ReceiptRounded,
  WhatshotRounded,
} from "@mui/icons-material";

const Overview = lazy(() => import("features/Landing/Overview"));
const Dashboard = lazy(() => import("features/Dashboard/Dashboard"));
const PdfViewer = lazy(() => import("features/PdfViewer/PdfViewer"));

const EditPdf = lazy(() => import("features/PdfViewer/EditPdf"));
const SenderInfo = lazy(() => import("features/SenderInfo/SenderInfo"));
const RecieverInfo = lazy(() => import("features/RecieverInfo/RecieverInfo"));
const FaqSection = lazy(() => import("features/HelpAndSupport/FaqSection"));
const WhatsNewSection = lazy(() =>
  import("features/HelpAndSupport/WhatsNewSection")
);

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
      breadcrumb: {
        value: "",
        icon: "",
      },
      displayInNavBar: true,
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
      breadcrumb: {
        value: "View Dashboard",
        icon: <DashboardRounded fontSize="small" />,
      },
      displayInNavBar: true,
      displayHelpSelector: true,
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
      breadcrumb: {
        value: "View Invoice",
        icon: <ReceiptRounded fontSize="small" />,
      },
      displayInNavBar: true,
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
      breadcrumb: {
        value: "Edit Invoice",
        icon: <EditRounded fontSize="small" />,
      },
      displayInNavBar: true,
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
      breadcrumb: {
        value: "Sender Information",
        icon: <Person2Rounded fontSize="small" />,
      },
      displayInNavBar: true,
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
      breadcrumb: {
        value: "Reciever Information",
        icon: <Person2Rounded fontSize="small" />,
      },
      displayInNavBar: true,
      displayHelpSelector: true,
      displayPrintSelector: false,
    },
  },
  {
    id: 7,
    label: "What's New",
    path: "/new",
    element: <WhatsNewSection />,
    icon: <WhatshotRounded fontSize="small" />,
    requiredFlags: ["invoicer", "invoicerPro"],
    config: {
      breadcrumb: {
        value: "Whats' New",
        icon: <WhatshotRounded fontSize="small" />,
      },
      displayInNavBar: false,
      displayHelpSelector: false,
      displayPrintSelector: false,
    },
  },
  {
    id: 8,
    label: "FAQ",
    path: "/faq",
    element: <FaqSection />,
    icon: <LiveHelpRounded fontSize="small" />,
    requiredFlags: ["invoicer", "invoicerPro"],
    config: {
      breadcrumb: {
        value: "Frequently Asked Questions",
        icon: <ContactSupportRounded fontSize="small" />,
      },
      displayInNavBar: false,
      displayHelpSelector: false,
      displayPrintSelector: false,
    },
  },
];
