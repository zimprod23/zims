import React, { useState, useContext } from "react";
import { InputBase, makeStyles, fade, Button, Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { AdminOps } from "../../../../components/utils/AdminOptionsProvider";
import { getSelledProductInfo } from "../../../../actions/productsAction";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    margin: "15px auto",
    maxWidth: "500px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function SearchBar(props) {
  const { id } = useContext(AdminOps);
  const [productId, setproductId] = id;
  const classes = useStyles();
  const [searchKey, setsearchKey] = useState("");
  const dispatch = useDispatch();

  const handleSearchBarChange = (e) => {
    setsearchKey(e.target.value);
  };
  const SubmitSearch = (e) => {
    setproductId(searchKey);
    dispatch(getSelledProductInfo(searchKey));
  };
  return (
    <div>
      {/* <form onSubmit={SubmitSearch}> */}
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <Grid Container>
          <Grid item sm={12}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchKey}
              onChange={handleSearchBarChange}
            />
            <Button color="default" variant="contained" onClick={SubmitSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
      {/* </form> */}
    </div>
  );
}

export default SearchBar;
