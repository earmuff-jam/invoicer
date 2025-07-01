import {
  ReceiptLong,
  AccessTime,
  CloudDownload,
  SecurityRounded,
} from "@mui/icons-material";

/**
 * Authorized Roles
 *
 * Owner - the person who owns the property
 * Tenant - the person who is renting the property
 */
export const OwnerRole = "Owner";
export const TenantRole = "Tenant";

/**
 * Landing Page Details ...
 *
 */
export const LANDING_PAGE_DETAILS = {
  features: [
    {
      icon: <ReceiptLong color="primary" sx={{ fontSize: 40 }} />,
      title: "Simple Invoice Creation",
      description:
        "Create professional invoices in seconds with our intuitive interface.",
    },
    {
      icon: <SecurityRounded color="primary" sx={{ fontSize: 40 }} />,
      title: "Secure User Data",
      description: "Keep your personal information secure and private.",
    },
    {
      icon: <AccessTime color="primary" sx={{ fontSize: 40 }} />,
      title: "Time-Saving Templates",
      description: "Save previously used templates to save hours.",
    },
    {
      icon: <CloudDownload color="primary" sx={{ fontSize: 40 }} />,
      title: "Easy Exports",
      description:
        "Export invoices in multiple formats for accounting and record keeping.",
    },
  ],
  howItWorks: [
    {
      title: "No account, no sign up",
      description: "No sign up or sign in required. Simple and easy.",
    },
    {
      title: "Set up your profile",
      description: "Add your business information and save it for future use.",
    },
    {
      title: "Create your first invoice",
      description: "Use our intuitive editor to create professional invoices.",
    },
    {
      title: "Print and email invoices",
      description:
        "Print invoices directly and email them to your client of choice.",
    },
  ],
  testimonials: [
    {
      quote:
        "This invoicing app has transformed how I manage my freelance business. I save hours every week on invoicing tasks.",
      author: "Sarah J., Graphic Designer",
    },
    {
      quote:
        "The simplicity of this app is its greatest strength. I was able to send my first invoice within minutes.",
      author: "Mark T., Consultant",
    },
    {
      quote:
        "After trying several invoicing solutions, this is the only one that perfectly balances features with ease of use.",
      author: "Elena M., Marketing Agency",
    },
  ],
};
