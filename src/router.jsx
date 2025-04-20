import { lazy } from "react";

const Overview = lazy(() => import("features/Landing/Overview"));
const PdfViewer = lazy(() => import("features/PdfViewer/PdfViewer"));

const EditPdf = lazy(() => import("features/PdfViewer/EditPdf"));
const SenderInfo = lazy(() => import("features/SenderInfo/SenderInfo"));
const RecieverInfo = lazy(() => import("features/RecieverInfo/RecieverInfo"));

export const InvoicerRoutes = [
  {
    path: "/",
    element: <Overview />,
  },
  {
    path: "/view",
    element: <PdfViewer />,
  },
  {
    path: "/edit",
    element: <EditPdf />,
  },
  {
    path: "/sender",
    element: <SenderInfo />,
  },
  {
    path: "/reciever",
    element: <RecieverInfo />,
  },
];
