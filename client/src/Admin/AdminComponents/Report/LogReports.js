import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { Delete, ExpandMore } from "@material-ui/icons";
import moment from "moment";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  desc: {
    wordWrap: "break-word",
  },
}));

export default function FeedbackTemple(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dropReport = (id) => {
    Axios.delete(`/api/user/dropReport?id=${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Ooops something went wrong");
      });
  };

  return (
    <div className={classes.root}>
      {props.reported &&
        props.reported.map((item, index) => (
          <div key={index}>
            <Accordion
              expanded={expanded === `${item._id}`}
              onChange={handleChange(`${item._id}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2bh-content"
                id={item._id}
              >
                <Typography className={classes.heading}>
                  {item.user && `NAME : ${item.user.email}`}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {`${moment(item.createdAt).format("YYYY-MM-DD")}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1">
                  {item.user &&
                    `user : ${item.user.name}  ${item.user.lastname} `}
                  <br />
                  {`comment : ${item.comment}`}
                  <br />
                  <IconButton
                    color="secondary"
                    aria-label="Delete"
                    onClick={() => dropReport(item._id)}
                  >
                    <Delete />
                  </IconButton>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </div>
  );
}
