import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Layout = lazy(() => import("features/Layout/Layout"));
const Overview = lazy(() => import("features/Landing/Overview"));
const PdfViewer = lazy(() => import("features/PdfViewer/PdfViewer"));

const EditPdf = lazy(() => import("features/PdfViewer/EditPdf"));
const SenderInfo = lazy(() => import("features/SenderInfo/SenderInfo"));
const RecieverInfo = lazy(() => import("features/RecieverInfo/RecieverInfo"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
    ],
  },
]);
