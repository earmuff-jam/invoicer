import { Button } from "@mui/material";
import { useButtonAnalytics } from "src/hooks/useButtonAnalytics";

const analyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS;

/**
 * AButton
 *
 * Muiv5 button component setup with analytics tracking. Used to perform
 * analytics of the user location based on the route
 *
 * @param {string} label - the label of the button component
 * @param {function} onClick - the onClick handler to perform action on the button
 * @param {object} rest - the props passed in as a ...rest component
 *
 */
export default function AButton({ label, onClick, ...rest }) {
  const buttonAnalytics = useButtonAnalytics();

  const handleClick = (ev) => {
    // log data only if analytics is enabled
    analyticsEnabled.toLowerCase() === "true" && buttonAnalytics?.(label);
    onClick(ev);
  };

  return (
    <Button {...rest} onClick={handleClick}>
      {label}
    </Button>
  );
}
