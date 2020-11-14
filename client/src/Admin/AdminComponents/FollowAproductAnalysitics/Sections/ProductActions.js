import React, { useState } from "react";
import {
  Button,
  Grid,
  ThemeProvider,
  createMuiTheme,
  TextField,
} from "@material-ui/core";
import { Delete, FlashOn, Star, Add } from "@material-ui/icons";
import { yellow } from "@material-ui/core/colors";
import Axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";

const theme = createMuiTheme({
  palette: {
    primary: yellow,
  },
});

function ProductActions(props) {
  const Reduction = [
    { num: "10" },
    { num: "20" },
    { num: "30" },
    { num: "40" },
    { num: "50" },
    { num: "60" },
    { num: "70" },
    { num: "80" },
    { num: "90" },
  ];
  const [ReductionLevel, setReductionLevel] = useState(null);
  const [newStock, setnewStock] = useState();
  const handleKill = async () => {
    await Axios.delete(`/api/product/killproduct?riproduct=${props.productId}`)
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleRecommande = async () => {
    await Axios.patch(
      `/api/product/recommandProduct?productId=${props.productId}`
    )
      .then((res) => {
        alert(res.data.state);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const hadlePromote = async () => {
    const data = { promotion: ReductionLevel };
    await Axios.patch(`/api/product/promoteproduct?id=${props.productId}`, data)
      .then((res) => {
        alert("success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleFillStock = async () => {
    const data = {
      newStock: newStock,
      oldStock: props.product.stock,
    };
    await Axios.patch(`/api/product/fillStockage?id=${props.productId}`, data)
      .then((res) => {
        alert("success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            fullWidth
            onClick={handleKill}
            startIcon={<Delete />}
          >
            kill
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Button
            variant="contained"
            color="default"
            // className={classes.button}
            fullWidth
            startIcon={<FlashOn />}
            onClick={hadlePromote}
          >
            Promote
          </Button>
          <Autocomplete
            id="combo-box-demo"
            options={Reduction}
            fullWidth
            getOptionLabel={(option) => option.num}
            renderInput={(params) => (
              <TextField {...params} label="reduction" variant="outlined" />
            )}
            inputValue={ReductionLevel}
            onInputChange={(event, newValue) => setReductionLevel(newValue)}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Button
            variant="contained"
            color="default"
            // className={classes.button}
            fullWidth
            onClick={handleFillStock}
            startIcon={<Add />}
          >
            Fill Stock
          </Button>
          <Autocomplete
            id="combo-box-demo"
            options={Reduction}
            fullWidth
            getOptionLabel={(option) => option.num}
            renderInput={(params) => (
              <TextField {...params} label="New Stock" variant="outlined" />
            )}
            inputValue={newStock}
            onInputChange={(event, newValue) => setnewStock(newValue)}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3}>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              // className={classes.button}
              fullWidth
              startIcon={<Star />}
              onClick={handleRecommande}
            >
              Recommande
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductActions;
