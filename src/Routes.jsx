import { lazy } from "react";

import {
  ContactSupportRounded,
  CottageRounded,
  DashboardCustomizeRounded,
  DashboardRounded,
  EditRounded,
  HomeRounded,
  LiveHelpRounded,
  Person2Rounded,
  PictureAsPdfRounded,
  ReceiptRounded,
  SettingsRounded,
  WhatshotRounded,
} from "@mui/icons-material";
import Property from "src/features/Properties/Property";

const Overview = lazy(() => import("features/Landing/Overview"));
const Dashboard = lazy(() => import("features/Dashboard/Dashboard"));
const PdfViewer = lazy(() => import("features/PdfViewer/PdfViewer"));

const EditPdf = lazy(() => import("features/PdfViewer/EditPdf"));
const SenderInfo = lazy(() => import("features/SenderInfo/SenderInfo"));
const RecieverInfo = lazy(() => import("features/RecieverInfo/RecieverInfo"));
const FaqSection = lazy(() => import("features/HelpAndSupport/FaqSection"));
const ReleaseNotes = lazy(() => import("features/HelpAndSupport/ReleaseNotes"));

const Properties = lazy(() => import("features/Properties/Properties"));
const Settings = lazy(() => import("features/Settings/Settings"));

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
    label: "My Properties",
    path: "/properties",
    element: <Properties />,
    icon: <CottageRounded fontSize="small" />,
    requiredFlags: ["invoicer", "invoicerPro"],
    config: {
      breadcrumb: {
        value: "My properties",
        icon: <CottageRounded fontSize="small" />,
      },
      isLoggedInFeature: true, // only display if logged in
      displayInNavBar: true,
      displayHelpSelector: false,
      displayPrintSelector: false,
    },
  },
  {
    id: 4,
    label: "View Invoice",
    path: "/invoice/view",
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
    id: 5,
    label: "Edit Invoice",
    path: "/invoice/edit",
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
    id: 6,
    label: "Sender",
    path: "/invoice/sender",
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
    id: 7,
    label: "Reciever",
    path: "/invoice/reciever",
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
    id: 8,
    label: "Settings",
    path: "/settings",
    element: <Settings />,
    icon: <SettingsRounded fontSize="small" />,
    requiredFlags: ["invoicer", "invoicerPro"],
    config: {
      breadcrumb: {
        value: "My settings",
        icon: <SettingsRounded fontSize="small" />,
      },
      isLoggedInFeature: true, // only display if logged in
      displayInNavBar: true,
      displayHelpSelector: true,
      displayPrintSelector: false,
    },
  },
  {
    id: 9,
    label: "Release Notes",
    path: "/notes",
    element: <ReleaseNotes />,
    icon: <WhatshotRounded fontSize="small" />,
    requiredFlags: ["invoicer"],
    config: {
      breadcrumb: {
        value: "Release Notes",
        icon: <WhatshotRounded fontSize="small" />,
      },
      displayInNavBar: false,
      displayHelpSelector: false,
      displayPrintSelector: false,
    },
  },
  {
    id: 10,
    label: "FAQ",
    path: "/faq",
    element: <FaqSection />,
    icon: <LiveHelpRounded fontSize="small" />,
    requiredFlags: ["invoicer"],
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
  {
    id: 11,
    label: "My Properties",
    path: "/property/:id",
    element: <Property />,
    icon: <CottageRounded fontSize="small" />,
    requiredFlags: ["invoicer", "invoicerPro"],
    config: {
      breadcrumb: {
        value: "My properties",
        icon: <CottageRounded fontSize="small" />,
      },
      isLoggedInFeature: true, // only display if logged in
      displayInNavBar: false,
      displayHelpSelector: true,
      displayPrintSelector: true,
    },
  },
];
