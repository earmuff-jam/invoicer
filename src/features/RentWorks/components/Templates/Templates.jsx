import { useState } from "react";

import { InfoRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import RowHeader from "common/RowHeader/RowHeader";
import { DefaultTemplateData } from "features/RentWorks/components/Settings/common";

export default function Templates() {
  const [templates, setTemplates] = useState(DefaultTemplateData);

  const handleTemplateChange = (template, field) => (event) => {
    setTemplates((prev) => ({
      ...prev,
      [template]: { ...prev[template], [field]: event.target.value },
    }));
  };

  const handleSave = () => {
    const formattedTemplates = JSON.stringify(templates);
    localStorage.setItem("templates", formattedTemplates);
  };

  return (
    <Grid container spacing={3}>
      {Object.entries(templates).map(([key, template]) => (
        <Grid item xs={12} md={6} key={key}>
          <Card elevation={0} sx={{ p: 3, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <RowHeader
                title={template?.label || "Template"}
                caption="Supports html styling as well."
                sxProps={{
                  textAlign: "left",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                }}
              />
            </Box>
            <Stack spacing={2}>
              <TextField
                label="Subject"
                value={template.subject}
                onChange={handleTemplateChange(key, "subject")}
                fullWidth
                size="small"
              />
              <TextField
                label="Message Body"
                value={template.body || template.description}
                onChange={handleTemplateChange(
                  key,
                  template.body ? "body" : "description",
                )}
                fullWidth
                multiline
                rows={3}
                size="small"
              />
              <TextField
                label="Message HTML"
                value={template.html || template.description}
                onChange={handleTemplateChange(
                  key,
                  template.html ? "html" : "description",
                )}
                fullWidth
                multiline
                rows={15}
                size="small"
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "flex-start" }}
              >
                <Tooltip title="Customize the above template with text of your choice. You can even directly use html markup in the above template. Use the variables listed on the side to bring your templates to life.">
                  <InfoRounded color="secondary" fontSize="small" />
                </Tooltip>
                <Typography variant="caption" color="text.secondary">
                  Available fields to use - currentDate, month, year,
                  tenantName, propertyAddress, amount, dueDate, ownerName,
                  leaseEndDate, noticeOfLeaseDays, newSemiAnnualRent,
                  oneYearRentChange, responseDeadline, ownerPhone, ownerEmail
                </Typography>
              </Stack>
              <Button variant="outlined" size="small" onClick={handleSave}>
                Save Template
              </Button>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
