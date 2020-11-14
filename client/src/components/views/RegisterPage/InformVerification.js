import React from "react";
import { Button, Box, Typography } from "@material-ui/core";

function InformVerification() {
  return (
    <div>
      <Box p={7}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Verification
          </Typography>
          <br />

          <Typography variant="h6" gutterBottom>
            Please Check your inbox, we have sent you a verification link
          </Typography>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.replace("/")}
          >
            Return to home
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default InformVerification;
