import React, { useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { TgState } from "../ToogleState";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm() {
  const { buyer } = useContext(TgState);
  const [BuyerData, setBuyerData] = buyer;

  const [infos, setinfos] = useState({
    name: "",
    lastName: "",
    adress1: "",
    adress2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setinfos({ ...infos, name: e.target.value });
        break;
      case "lastName":
        setinfos({ ...infos, lastName: e.target.value });
        break;
      case "address1":
        setinfos({ ...infos, adress1: e.target.value });
        break;
      case "address2":
        setinfos({ ...infos, adress2: e.target.value });
        break;
      case "city":
        setinfos({ ...infos, city: e.target.value });
        break;
      case "state":
        setinfos({ ...infos, state: e.target.value });
        break;
      case "zip":
        setinfos({ ...infos, zip: e.target.value });
        break;
      case "country":
        setinfos({ ...infos, country: e.target.value });
        break;
    }
  };
  useEffect(() => {
    setBuyerData(infos);
  }, [infos]);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={infos.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={infos.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            value={infos.adress1}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            value={infos.adress2}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={infos.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={infos.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={infos.zip}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={infos.country}
            onChange={handleInputChange}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
