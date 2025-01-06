import { Box } from "@mui/material";
import React from "react";

function CloudSvgResource() {
  return (
    <Box>
      <svg viewBox="0 0 105 105" style={{ height: "100%", width: "100%" }}>
        <path
          style={{
            fill: "#3498DB",
            stroke: "#3498DB",
            strokeWidth: 2,
            strokeLinejoin: "round",
          }}
          d="M 25,60 
             a 20,20 1 0,0 0,40 
             h 50 
             a 20,20 1 0,0 0,-40 
             a 10,10 1 0,0 -15,-10 
             a 15,15 1 0,0 -35,10  
             z"
        />
      </svg>
    </Box>
  );
}

export default CloudSvgResource;
