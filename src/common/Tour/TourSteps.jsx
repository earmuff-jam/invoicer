import { Box, Typography } from "@mui/material";

/**
 * ViewPdfHelpSteps
 *
 * User helpful steps in the view pdf page.
 */
const ViewPdfHelpSteps = [
  {
    title:
      "View created pdf from here. If you do not have any pdf to print, navigate to 'Edit Invoice' to create new invoices.",
  },
  {
    title:
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
    title:
      "Create or update a selected invoice. Invoices created are temporarily stored in the device so users can retrieve it easily.",
  },
  {
    title:
      "Fill in the title of the invoice. Sample: Rent for the month of January. ",
  },
  {
    title:
      "Invoice captions are more like a sub heading. Emphasize on what you expect. Sample: Invoice Due every 3rd of month",
  },
  {
    title:
      "Add additional notes that would be added beneath the Invoice. This is similar to footnote. Sample: No Additional payment due at this time.",
  },
  {
    title: "Select the start date and the end date for the selected invoice.",
  },
  {
    title:
      "Invoice Header is the small section on top of the invoice. This is used to give emphasis to the invoice. Sample: Rent Details.",
  },
  {
    title:
      "Add the standard tax rate. If you are unsure leave it at 0. Keep in mind that this does not include tax during calculations.",
  },
  {
    title:
      "Select the status of the invoice. This watermark will transpond on the actual paper. Choose between various options of your invoice.",
  },
  {
    title:
      "Add Item as a line item in the invoice. Each line item is customized and includes its own title and caption to allow users to provide more information.",
  },
  {
    title:
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
    title:
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
    title:
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
    title:
      "Welcome to your local dashboard view. Your most recent invoice data characteristics are displayed here. This is your standard layout. Press the 'Edit' button to edit or remove a selected widget.",
  },
  {
    title:
      "Select '+' to add widgets in the dashboard. You can add multiple of the same widgets as well.",
  },
  {
    title: "Reset your dashboard to remove clutter.",
  },
  {
    title:
      "View your added invoices here. If you do not have widgets, add widgets and restart the tutorial to proceed.",
  },
  {
    title:
      "This is the Invoice Timeline Chart Widget. This displays the posted payment and timeline of the posted payment.",
  },
  {
    title:
      "This is the Collected Tax and Totals Widget. This displays the monetary amount collected and taxes collected. View timeline chart if many invoices are selected.",
  },
  {
    title:
      "This is the Items and Service Type Widget. This displays the type of item the invoice was created for.",
  },
  {
    title:
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
  return staticSteps.map(({ title }, index) => ({
    id: index,
    selector: `[data-tour="${prefix}-${index}"]`,
    content: (
      <Box padding="0.2rem">
        <Typography variant="caption">{title}</Typography>
      </Box>
    ),
  }));
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
    title:
      "This help / guide is designed to aide you in learning how to view / print invoices? Feel free to restart the guide if necessary.",
    start: 0,
    end: ViewPdfHelpSteps.length,
  },
  "/edit": {
    title:
      "This help / guide is designed to aide you in learning how to edit / update invoice? Feel free to restart the guide if necessary. ",
    start: ViewPdfHelpSteps.length,
    end: ViewPdfHelpSteps.length + EditPdfHelpSteps.length,
  },
  "/sender": {
    title:
      "This help / guide is designed to aide you in learning how to edit / update sender information? Feel free to restart the guide if necessary. ",
    start: ViewPdfHelpSteps.length + EditPdfHelpSteps.length,
    end:
      ViewPdfHelpSteps.length +
      EditPdfHelpSteps.length +
      SenderInfoHelpSteps.length,
  },
  "/reciever": {
    title:
      "This help / guide is designed to aide you in learning how to edit / update reciever information? Feel free to restart the guide if necessary. ",
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
    title:
      "This help / guide is designed to aide you in learning how to view the dashboard for your inovice. Feel free to restart the guide anytime if necessary.",
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
