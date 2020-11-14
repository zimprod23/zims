import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import { Rating } from "@material-ui/lab";

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

  return (
    <div className={classes.root}>
      {props.reportedProduct &&
        props.reportedProduct.map((item, index) => (
          <div key={index}>
            <Accordion
              expanded={expanded === `${item._id}`}
              onChange={handleChange(`${item._id}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id={item._id}
              >
                <Typography className={classes.heading}>
                  {item.product &&
                    `NAME : ${item.product.name} || VIEWS : ${item.product.views}`}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Rating
                    name="rating"
                    defaultValue={item.rating}
                    precision={0.5}
                    readOnly
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1">
                  {item.tester &&
                    `user : ${item.tester.name}  ${item.tester.lastname} `}
                  <br />
                  {item.tester && `email : ${item.tester.email}`}
                  <br />
                  {`date : ${moment(item.createdAt).format("YYYY-MM-DD")}`}
                  <br />
                  {`comment : ${item.comment}`}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </div>
  );
}
