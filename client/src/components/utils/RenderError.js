import React, { useState } from "react";
import { Snackbar, Button } from "@material-ui/core";

function RenderError(props) {
  const [snackBarpos, setsnackBarpos] = useState({
    open: true,
    vertical: "Bottom",
    horizontal: "left",
  });
  const action = (
    <Button color="secondary" size="small">
      error
    </Button>
  );
  const handleClose = () => {
    setsnackBarpos({ ...snackBarpos, open: false });
  };
  setTimeout(() => {
    setsnackBarpos(false);
  }, 7000);
  const { vertical, horizontal, open } = snackBarpos;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={props.message}
        key={vertical + horizontal}
        action={action}
      />
    </div>
  );
}

export default RenderError;
