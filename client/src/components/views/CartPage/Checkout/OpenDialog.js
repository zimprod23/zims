import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import { TgState } from "../ToogleState";
import Chekout from "./Checkout";

export default function ScrollDialog(props) {
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setToogle(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setToogle(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (Toogle) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [Toogle]);

  return (
    <div>
      <Dialog
        open={Toogle}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={"md"}
      >
        {/* <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent dividers={scroll === "body"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Chekout toPay={props.toPay} products={props.products} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
