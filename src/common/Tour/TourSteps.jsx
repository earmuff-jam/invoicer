import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AButton from "src/common/AButton";
import { createHelperSentences } from "src/common/utils";

/**
 * ViewPdfHelpSteps
 *
 * User helpful steps in the view pdf page.
 */
const ViewPdfHelpSteps = [
  {
    element:
      "View created pdf from here. If you do not have any pdf to print, navigate to 'Edit Invoice' to create new invoices.",
  },
  {
    element:
      "Use options to help navigate or perform certain actions on specific pages. Such as Sending Email, Printing etc.",
  },
];

/**
 * EditPdfHelpSteps
 *
 * User helpful steps in the edit invoice / pdf page. This is where the users can create new invoices or update existing invoices.
 */
const EditPdfHelpSteps = [
  {
    element:
      "Create or update a selected invoice. Invoices created are temporarily stored in the device so users can retrieve it easily.",
  },
  {
    element:
      "Fill in the element of the invoice. Sample: Rent for the month of January. ",
  },
  {
    element:
      "Invoice captions are more like a sub heading. Emphasize on what you expect. Sample: Invoice Due every 3rd of month",
  },
  {
    element:
      "Add additional notes that would be added beneath the Invoice. This is similar to footnote. Sample: No Additional payment due at this time.",
  },
  {
    element: "Select the start date and the end date for the selected invoice.",
  },
  {
    element:
      "Invoice Header is the small section on top of the invoice. This is used to give emphasis to the invoice. Sample: Rent Details.",
  },
  {
    element:
      "Add the standard tax rate. If you are unsure leave it at 0. Keep in mind that this does not include tax during calculations.",
  },
  {
    element:
      "Select the status of the invoice. This watermark will transpond on the actual paper. Choose between various options of your invoice.",
  },
  {
    element:
      "Add Item as a line item in the invoice. Each line item is customized and includes its own element and caption to allow users to provide more information.",
  },
  {
    element:
      "After meeting the requirements and adding sufficient line items to your liking, press 'Save' button. Navigate to 'View Invoice' to view the look and feel of your invoice.",
  },
];

/**
 * SenderInfoHelpSteps
 *
 * User helpful steps in the sender info page. This is where you can upload information about the sender of the invoice. Leaving this empty
 * should render no salutation in the view page.
 */
const SenderInfoHelpSteps = [
  {
    element:
      "Sender biographic information. Store details for selected sender. Sender is the person who is requesting to send the invoice.",
  },
];

/**
 * RecieverInfoHelpSteps
 *
 * User helpful steps in the reciever info page. This is where you can upload information about the reciever of the invoice. Leaving this
 * empty should render no salutation in the view page.
 */
const RecieverInfoHelpSteps = [
  {
    element:
      "Reciever biographic information. Store details for selected reciever. Reciever is the person who will be recieving this invoice.",
  },
];

/**
 * DashboardHelpSteps
 *
 * User helpful steps in the dashboard page. This is where users can view a breakdown of how their invoice performed with a help of couple
 * of widgets.
 */
const DashboardHelpSteps = [
  {
    element:
      "Welcome to your local dashboard view. Your most recent invoice data characteristics are displayed here. This is your standard layout. Press the 'Edit' button to edit or remove a selected widget.",
  },
  {
    element:
      "Select '+' to add widgets in the dashboard. You can add multiple of the same widgets as well.",
  },
  {
    element: "Reset your dashboard to remove clutter.",
  },
  {
    element:
      "View your added invoices here. If you do not have widgets, add widgets and restart the tutorial to proceed.",
  },
  {
    element:
      "This is the Invoice Timeline Chart Widget. This displays the posted payment and timeline of the posted payment.",
  },
  {
    element:
      "This is the Collected Tax and Totals Widget. This displays the monetary amount collected and taxes collected. View timeline chart if many invoices are selected.",
  },
  {
    element:
      "This is the Items and Service Type Widget. This displays the type of item the invoice was created for.",
  },
  {
    element:
      "This is the Item Details Table. We can view details about the imported invoices in the list form. If you have many invoices, you can view them in a list form.",
  },
];

/**
 * derieveTourSteps
 *
 * used to build the necessary object from the steps to render the tour correctly.
 * @param {Array} staticSteps - an array of steps
 * @param {String} prefix - the prefix string to attach to the selector. Used to associate with certain page.
 * @returns Array of steps with combined values of id, selector and content to build the tour properly.
 */
const derieveTourSteps = (staticSteps, prefix) => {
  return staticSteps.map(({ element }, index) => ({
    id: index,
    selector: `[data-tour="${prefix}-${index}"]`,
    content: <Box padding="0.2rem">{element}</Box>,
  }));
};

/**
 * DisplaySubHelperSection
 *
 * used to populate the faq and what's new section for the invoicer
 */
const DisplaySubHelperSection = () => {
  const handleClick = (to) => {
    window.location.href = to;
  };

  return (
    <Typography variant="caption">
      View{" "}
      <Box
        component="span"
        onClick={() => handleClick("/new")}
        sx={{
          color: "primary.main",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        role="link"
        tabIndex={0}
      >
        What's New
      </Box>{" "}
      to stay up to date with all the latest features. Stuck in a problem? Visit{" "}
      <Box
        component="span"
        onClick={() => handleClick("/faq")}
        sx={{
          color: "primary.main",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        role="link"
        tabIndex={0}
      >
        FAQ
      </Box>{" "}
      to view our frequently asked questions.
    </Typography>
  );
};

/**
 * DefaultTourStepsMapperObj
 *
 * Mapper object to build out the tour. This tool creates start and end pages for tour based on
 * routes of the application. Based on where the user is within the app, the tour steps are created / updated
 * and are displayed for the user.
 */
export const DefaultTourStepsMapperObj = {
  "/view": {
    element: (
      <>
        {createHelperSentences("view / print", "invoices")}
        {DisplaySubHelperSection()}
      </>
    ),
    start: 0,
    end: ViewPdfHelpSteps.length,
  },
  "/edit": {
    element: (
      <>
        {createHelperSentences("edit / update", "invoices")}
        {DisplaySubHelperSection()}
      </>
    ),
    start: ViewPdfHelpSteps.length,
    end: ViewPdfHelpSteps.length + EditPdfHelpSteps.length,
  },
  "/sender": {
    element: (
      <>
        {createHelperSentences("edit / update", "sender information")}
        {DisplaySubHelperSection()}
      </>
    ),
    start: ViewPdfHelpSteps.length + EditPdfHelpSteps.length,
    end:
      ViewPdfHelpSteps.length +
      EditPdfHelpSteps.length +
      SenderInfoHelpSteps.length,
  },
  "/reciever": {
    element: (
      <>
        {createHelperSentences("edit / update", "reciever information")}
        {DisplaySubHelperSection()}
      </>
    ),
    start:
      ViewPdfHelpSteps.length +
      EditPdfHelpSteps.length +
      SenderInfoHelpSteps.length,
    end:
      ViewPdfHelpSteps.length +
      EditPdfHelpSteps.length +
      SenderInfoHelpSteps.length +
      RecieverInfoHelpSteps.length,
  },
  "/dashboard": {
    element: (
      <>
        {createHelperSentences("interpret", " the dashboard ")}
        {DisplaySubHelperSection()}
      </>
    ),
    start:
      ViewPdfHelpSteps.length +
      EditPdfHelpSteps.length +
      SenderInfoHelpSteps.length +
      RecieverInfoHelpSteps.length,
    end:
      ViewPdfHelpSteps.length +
      EditPdfHelpSteps.length +
      SenderInfoHelpSteps.length +
      RecieverInfoHelpSteps.length +
      DashboardHelpSteps.length,
  },
};

/**
 * GeneratedTourSteps
 *
 * Generates tour steps based on router pathname and its criteria. Prefix the page with the associated
 * prefix string below and co-ordinate with data-tour options and props in each component.
 */
export const GeneratedTourSteps = [
  ...derieveTourSteps(ViewPdfHelpSteps, "view-pdf"),
  ...derieveTourSteps(EditPdfHelpSteps, "edit-pdf"),
  ...derieveTourSteps(SenderInfoHelpSteps, "sender"),
  ...derieveTourSteps(RecieverInfoHelpSteps, "reciever"),
  ...derieveTourSteps(DashboardHelpSteps, "dashboard"),
];
