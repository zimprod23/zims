import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { InputLabel, Select, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { categories, keywords } from "./data";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../actions/productsAction";
import UploadPicture from "./Upload";
import { AdminOps } from "../../../components/utils/AdminOptionsProvider";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  const { image } = useContext(AdminOps);
  const [Images, setImages] = image;
  const classes = useStyles();
  const dispatch = useDispatch();

  const reductionLevel = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  const [category, setcategory] = useState(categories[0].name);
  const [description, setdescription] = useState("");
  const [name, setname] = useState("");
  //const [price, setprice] = useState("");
  const [reduction, setreduction] = useState("");
  const [dimention, setdimention] = useState("");
  const [descOverview, setdescOverview] = useState("");
  const [originalPrice, setoriginalPrice] = useState("");
  const [strictPrice, setstrictPrice] = useState("");
  const [stock, setstock] = useState("");
  const [brand, setbrand] = useState("");
  const [productKeyWords, setproductKeyWords] = useState([]);
  const handleDescriptionChange = (event) => {
    const desc = event.target.value;
    setdescription(desc);
  };
  const handleStockChange = (e) => {
    setstock(e.target.value);
  };
  const handleDescOverview = (e) => {
    const descOverview = e.target.value;
    setdescOverview(descOverview);
  };
  const handleStrictPriceChange = (e) => {
    setstrictPrice(e.target.value);
  };
  const handleOriginalPriceChange = (e) => {
    setoriginalPrice(e.target.value);
  };
  const handleBrandChange = (e) => {
    setbrand(e.target.value);
  };
  const handlenameChange = (event) => {
    const name = event.target.value;
    setname(name);
  };
  // const handlepriceChange = (event) => {
  //   const price = event.target.value;
  //   setprice(price);
  // };
  const handledimentionChange = (event) => {
    const dim = event.target.value;
    setdimention(dim);
  };
  const handleChange = (event) => {
    const cat = event.target.value;
    setcategory(cat);
  };
  const handleReductionChange = (e) => {
    setreduction(e.target.value);
  };
  let dataToSubmit = {
    name: name,
    //price: price,
    dimentions: dimention,
    description: description,
    categorie: category,
    descOverview: descOverview,
    originalPrice: originalPrice,
    strictPrice: strictPrice,
    reduction: reduction,
    brand: brand,
    keywords: productKeyWords.map((item, index) => {
      return item.key;
    }),
    picture: Images,
    overview: Images[0],
  };

  const handleSubmit = (e) => {
    if (Images.length > 0) {
      e.preventDefault();
      dispatch(addProduct(dataToSubmit));
      window.location.reload();
    } else {
      alert("Please add images");
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container>
        <Grid item xs={6}>
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
                value={brand}
                onChange={handleBrandChange}
                required
                fullWidth
                name="brand"
                label="brand name"
                id="brand"
              />

              <TextField
                variant="outlined"
                margin="normal"
                value={stock}
                onChange={handleStockChange}
                required
                fullWidth
                name="stco"
                label="in Stock"
                id="stock"
              />

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

              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  first reduction
                </InputLabel>
                <Select
                  native
                  value={reduction}
                  fullWidth
                  id="reduction"
                  onChange={handleReductionChange}
                  label="Reduction"
                >
                  {reductionLevel.map((red, index) => (
                    <option value={red}>{red}</option>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                rows={3}
                rowsMax={4}
                fullWidth
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Description Overview"
                margin="normal"
                multiline
                rowsMax={2}
                fullWidth
                value={descOverview}
                onChange={handleDescOverview}
                variant="outlined"
              />
              <TextField
                id="opr"
                label="Original Price $"
                margin="normal"
                multiline
                fullWidth
                required
                value={originalPrice}
                onChange={handleOriginalPriceChange}
                variant="outlined"
              />
              <TextField
                id="spr"
                label="first overview Price $"
                margin="normal"
                multiline
                fullWidth
                required
                value={strictPrice}
                onChange={handleStrictPriceChange}
                variant="outlined"
              />
              <Autocomplete
                multiple
                id="tags-outlined"
                options={keywords}
                getOptionLabel={(option) => option.key}
                defaultValue={[keywords[19]]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="select keywords"
                    placeholder="Favorites"
                  />
                )}
                value={productKeyWords}
                onChange={(event, newValue) => {
                  setproductKeyWords(newValue);
                }}
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
        </Grid>
        <Grid item xs={6}>
          <Box p={5}>
            <UploadPicture />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
