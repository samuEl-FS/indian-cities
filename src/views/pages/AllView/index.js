import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import throttle from "lodash/throttle";

import {
  Container,
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  Button,
  Box,
  Backdrop,
  Modal,
  Fade
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import SplashScreen from "../../../component/SplashScreen";

import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { getData, setFIlteredData } from "../../../actions/dataActions";
import CustomTable from "../../../component/CustomTable";
import AddCity from "../../../component/AddCity";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginBottom: "30px"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const columns = [
  { id: "State", label: "State" },
  { id: "City", label: "City" },
  { id: "District", label: "District" },
  { id: "action", label: "Action" }
];

function AllView() {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState();

  const [modalState, setModalState] = React.useState(false);

  const handleOpen = () => {
    setModalState(true);
  };

  const handleClose = () => {
    setModalState(false);
  };

  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const { locationData, filteredLocationData } = useSelector(
    state => state.data
  );

  const filterSearch = () => {
    dispatch(setFIlteredData(searchValue));
  };

  const handleSearchChange = e => {
    setSearchValue(e.target.value);
  };

  const loadData = useCallback(() => {
    if (isMountedRef.current) {
      dispatch(getData());
    }
  }, [dispatch, isMountedRef]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!locationData) {
    return <SplashScreen />;
  }

  const tableRows = filteredLocationData || locationData;

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" m={1} p={1}>
        <Box p={1}>
          <Paper component="form" className={classes.searchRoot}>
            <InputBase
              className={classes.input}
              value={searchValue}
              placeholder="Search Cities,States,Districts"
              inputProps={{ "aria-label": "Search Cities,States,Districts" }}
              onChange={handleSearchChange}
            />
            <IconButton
              // type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={filterSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box p={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add City
          </Button>
        </Box>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalState}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modalState}>
          <AddCity onClose={handleClose} />
        </Fade>
      </Modal>
      <CustomTable columns={columns} rows={tableRows} />
    </Container>
  );
}

export default AllView;
