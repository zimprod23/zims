import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import Axios from "axios";
import { AdminOps } from "../../../components/utils/AdminOptionsProvider";
import Upload from "../Upload/Upload";

function EmailTemplate() {
  const { image } = useContext(AdminOps);
  const [Images, setImages] = image;
  const [Subject, setSubject] = useState("");
  const [Body, setBody] = useState("");
  const [TargetEmail, setTargetEmail] = useState("");
  const [radioChange, setradioChange] = useState("ALL");
  const handleRadioChange = (event) => {
    setradioChange(event.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handletragetEmailChange = (e) => {
    setTargetEmail(e.target.value);
  };
  const handleSendMessage = () => {
    let dataToSubmit = {
      subject: Subject,
      body: Body,
      email: TargetEmail,
      images: Images,
      strategie: radioChange,
    };
    if (radioChange == "spEmail" && TargetEmail == "") {
      alert("Please fill the missing input");
    } else {
      if (!Subject || !Body) {
        alert("please fill the missing input");
      } else {
        Axios.post(`/api/user/sendEmail`, dataToSubmit)
          .then((res) => {
            alert("Email sent with success");
          })
          .catch((err) => {
            alert("Ooops something went wrong !!");
          });
      }
    }
  };
  return (
    <div>
      <Container maxWidth="lg">
        {" "}
        <TextField
          id="Email Subject"
          label="Email Subject"
          margin="normal"
          fullWidth
          required
          value={Subject}
          onChange={handleSubjectChange}
          variant="outlined"
        />
        <TextField
          id="body"
          label="body"
          margin="normal"
          multiline
          rowsMax={5}
          fullWidth
          required
          value={Body}
          onChange={handleBodyChange}
          variant="outlined"
        />
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={radioChange}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="ALL"
                control={<Radio />}
                label="Email Add"
              />
              <FormControlLabel
                value="spEmail"
                control={<Radio />}
                label="Target Email"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              id="email"
              label="target email"
              margin="normal"
              type="email"
              fullWidth
              required
              value={TargetEmail}
              onChange={handletragetEmailChange}
              disabled={radioChange === "ALL" ? true : false}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div style={{ margin: "5px", borderRadius: "6px" }}>
          <Upload />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          fullWidth
        >
          Send Email
        </Button>
      </Container>
    </div>
  );
}

export default EmailTemplate;
