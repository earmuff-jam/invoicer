import dayjs from "dayjs";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";

const typeLabels = {
  feature: "Features",
  improvement: "Improvements",
  fix: "Fixes",
};

function groupChangesByType(changes) {
  return changes.reduce((acc, change) => {
    const type = change.type || "other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(change);
    return acc;
  }, {});
}

const updates = [
  {
    version: 1.01,
    date: "2025-05-25T00:00:00Z",
    changes: [
      {
        type: "feature",
        value: "Added PDF export support for invoices",
        caption: "You can now download invoices directly as PDF.",
      },
      {
        type: "improvement",
        value: "Improved dashboard performance",
        caption: "Dashboard loads faster especially for large datasets.",
      },
      {
        type: "fix",
        value: "Fixed client validation issue",
        caption:
          "Resolved an error when saving clients with special characters.",
      },
    ],
  },
];

export default function ReleaseNotes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/release-docs.json")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <>
      <Box margin="2rem 1rem">
        <Typography variant="h5" component="h2" gutterBottom>
          Release Notes
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textTransform="initial"
        >
          View the latest updates and changes to Invoicer.
        </Typography>
      </Box>

      {data.map((update, index) => {
        const grouped = groupChangesByType(update.notes);

        return (
          <Box key={index} mb={4} px={2}>
            <Typography variant="subtitle2" gutterBottom>
              Version {update.version} &mdash;{" "}
              <em>Released on {dayjs(update.date).format("MMMM-DD-YYYY")}</em>
            </Typography>

            {Object.entries(grouped).map(([type, items]) => (
              <Box key={type} mt={2}>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  {typeLabels[type] || type}
                </Typography>

                <List dense disablePadding>
                  {items.map((change, idx) => (
                    <ListItem key={idx} disableGutters alignItems="center">
                      <ListItemIcon sx={{ minWidth: 24, mt: 0.5 }}>
                        <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                          >
                            {change.value}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {change.caption}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        );
      })}
    </>
  );
}
