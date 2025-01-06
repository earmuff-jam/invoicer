import { createBrowserRouter } from "react-router-dom";
import RecieverInfo from "./features/RecieverInfo/RecieverInfo";
import SenderInfo from "./features/SenderInfo/SenderInfo";
import Layout from "./features/Layout/Layout";
import PdfViewer from "./features/PdfViewer/PdfViewer";
import EditPdf from "./features/PdfViewer/EditPdf";
import Overview from "./features/Landing/Overview";

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
