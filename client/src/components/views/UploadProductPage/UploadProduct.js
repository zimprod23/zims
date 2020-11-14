import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { InputLabel, Select } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { categories } from "./data";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../actions/productsAction";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Aoumy Store
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function UploadProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [category, setcategory] = useState(categories[0].name);
  const [description, setdescription] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [dimention, setdimention] = useState("");
  const handleDescriptionChange = (event) => {
    const desc = event.target.value;
    setdescription(desc);
  };
  const handlenameChange = (event) => {
    const name = event.target.value;
    setname(name);
  };
  const handlepriceChange = (event) => {
    const price = event.target.value;
    setprice(price);
  };
  const handledimentionChange = (event) => {
    const dim = event.target.value;
    setdimention(dim);
  };
  const handleChange = (event) => {
    const cat = event.target.value;
    setcategory(cat);
  };

  let dataToSubmit = {
    name: name,
    price: price,
    dimentions: dimention,
    description: description,
    categorie: category,
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(dataToSubmit));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={name}
            onChange={handlenameChange}
            fullWidth
            id="product_name"
            label="Product Name"
            name="product_name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={price}
            onChange={handlepriceChange}
            required
            fullWidth
            name="price"
            label="Price DH"
            id="price"
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            value={name}
            onChange={handlenameChange}
            required
            fullWidth
            name="stock"
            label="stock"
            id="stock"
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            value={dimention}
            onChange={handledimentionChange}
            required
            fullWidth
            name="dimention"
            label="dimention"
            id="dimention"
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Category
            </InputLabel>
            <Select
              native
              value={category}
              fullWidth
              id="category"
              onChange={handleChange}
              label="Category"
            >
              {categories.map((cat, index) => (
                <option value={cat.name}>{cat.name}</option>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rowsMax={4}
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Product
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
