import React, { useEffect, useState } from "react";
import {
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";

import { addCity } from "../actions/dataActions";

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    position: "relative"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: 0,
    marginTop: 0
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer"
  },
  submit: {
    marginTop: "30px",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "row-reverse"
  }
}));

function AddCity(props) {
  const classes = useStyles();
  const { onClose } = props;

  const dispatch = useDispatch();

  const { states, districts } = useSelector(state => state.data);

  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrormessage] = useState();

  const onSubmit = e => {
    debugger;
    e.preventDefault();
    if (!city) {
      setErrormessage("City Cannot Be Empty");
      setFormError(true);
    } else if (!state) {
      setErrormessage("State Cannot Be Empty");
      setFormError(true);
    } else if (!district) {
      setErrormessage("district Cannot Be Empty");
      setFormError(true);
    } else {
      dispatch(addCity({ city, state, district }));
      onClose();
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <div className={classes.closeIcon} onClick={onClose}>
        <CloseIcon />
      </div>
      <h2>Add City</h2>
      <form
        className="w-percent-100 flex-full"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="city"
          value={city}
          label="City"
          variant="outlined"
          onChange={e => setCity(e.target.value)}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>State</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="State"
            value={state}
            onChange={e => setState(e.target.value)}
            label="Age"
          >
            {states.map(state => (
              <MenuItem value={state}>{state}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>District</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="District"
            value={district}
            onChange={e => setDistrict(e.target.value)}
            label="Age"
          >
            {districts.map(districtEle => (
              <MenuItem value={districtEle}>{districtEle}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.submit}>
          <Button type="submit" variant="outlined" color="primary">
            Add City
          </Button>
        </div>
        {formError && <Alert severity="error">{errorMessage}</Alert>}
      </form>
    </div>
  );
}

export default AddCity;
