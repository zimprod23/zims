import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Rating } from "@material-ui/lab";
import { sendFeedBack } from "../../../../actions/productsAction";
import { useDispatch } from "react-redux";
import { TgState } from "../../CartPage/ToogleState";

export default function Vote(props) {
  const dispatch = useDispatch();
  const [comment, setcomment] = useState("");
  const [rating, setrating] = useState(null);
  const [hover, setHover] = useState(-1);
  const { toogle } = useContext(TgState);
  const [Toogle, setToogle] = toogle;
  const OnSendFeedBackClick = () => {
    let infos = {
      rating: rating,
      comment: comment,
    };
    if (comment.length === 0 || rating === 0) {
      alert("Please give your review");
    } else {
      dispatch(sendFeedBack(infos, props.productId))
        .then((res) => {
          console.log("Success");
          setToogle(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const onCommentChange = (event) => {
    setcomment(event.target.value);
  };
  const onRatingChange = (event) => {
    setrating(event.target.value);
  };

  const handleClose = () => {
    setToogle(false);
  };

  return (
    <div>
      <Dialog
        open={Toogle}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            onChange={onCommentChange}
            value={comment}
            fullWidth
          />
          <div style={{ textAlign: "center" }}>
            <Rating
              name="hover-feedback"
              defaultValue={0}
              value={rating}
              precision={0.5}
              size="large"
              onChange={onRatingChange}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button onClick={OnSendFeedBackClick} color="primary">
            Send FeedBack
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
