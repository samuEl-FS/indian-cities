import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplayIcon from "@material-ui/icons/Replay";

import SplashScreen from "../../../component/SplashScreen";

import useIsMountedRef from "../../../hooks/useIsMountedRef";
import {
  getData,
  setFIlteredData,
  shorlistData,
  removeSingleData,
  resetUserActions
} from "../../../actions/dataActions";
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

function AllView() {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");

  const [modalState, setModalState] = React.useState(false);

  const handleOpen = () => {
    setModalState(true);
  };

  const handleClose = () => {
    setModalState(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    filterSearch();
  };

  const isMountedRef = useIsMountedRef();

  const dispatch = useDispatch();

  const {
    locationData,
    filteredLocationData,
    removedData,
    shortlistedSingleData,
    searchResultNotFound
  } = useSelector(state => state.data);

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

  const removeRowData = index => {
    dispatch(removeSingleData({ index }));
  };

  const shortListData = index => {
    dispatch(shorlistData({ index }));
  };

  useEffect(() => {
    if (!locationData.length) {
      loadData();
    }
  }, [loadData, locationData, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUserActions());
    };
  }, [dispatch]);

  if (!locationData.length) {
    return <SplashScreen />;
  }

  const tableRows = filteredLocationData.length
    ? filteredLocationData
    : locationData;

  const columns = [
    { id: "State", label: "State" },
    { id: "City", label: "City" },
    { id: "District", label: "District" },
    {
      id: "action",
      label: "Action",
      contents: [
        {
          actionContent: (
            <Button variant="outlined" color="primary">
              Shortlist
            </Button>
          ),
          actionEvent: index => {
            shortListData(index);
          }
        },
        {
          actionContent: <DeleteIcon />,
          actionEvent: index => {
            removeRowData(index);
          }
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" m={1} p={1}>
        <Box p={1}>
          <Box display="flex">
            <form autoComplete="off" onSubmit={onSubmit}>
              <Paper className={classes.searchRoot}>
                <InputBase
                  className={classes.input}
                  value={searchValue}
                  placeholder="Search Cities,States,Districts"
                  inputProps={{
                    "aria-label": "Search Cities,States,Districts"
                  }}
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
            </form>
            <Box p={1}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ReplayIcon />}
                onClick={() => {
                  setSearchValue("");
                  dispatch(resetUserActions());
                }}
              >
                Reset Search
              </Button>
            </Box>
          </Box>
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
      {removedData && (
        <Box display="flex" m={1} p={1}>
          <Alert severity="error">{`Removed Data  City='${removedData.City}'  State='${removedData.State}'  District='${removedData.District}' successfully`}</Alert>
        </Box>
      )}
      {shortlistedSingleData && (
        <Box display="flex" m={1} p={1}>
          <Alert severity="success">{`Shortlisted Data  City='${shortlistedSingleData.City}'  State='${shortlistedSingleData.State}'  District='${shortlistedSingleData.District}' successfully`}</Alert>
        </Box>
      )}
      {searchResultNotFound && (
        <Box display="flex" m={1} p={1}>
          <Alert severity="info">No Data Matched the Search</Alert>
        </Box>
      )}
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
