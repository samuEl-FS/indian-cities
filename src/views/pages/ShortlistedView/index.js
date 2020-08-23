import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  Button,
  Box
} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

import SearchIcon from "@material-ui/icons/Search";
import ReplayIcon from "@material-ui/icons/Replay";
import DeleteIcon from "@material-ui/icons/Delete";

import Alert from "@material-ui/lab/Alert";

import {
  removeShorlistedData,
  setShortListFIlteredData,
  resetUserActions
} from "../../../actions/dataActions";
import CustomTable from "../../../component/CustomTable";

const useStyles = makeStyles(theme => ({
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    //marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "150px"
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function ShortlistedView() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const {
    shortlistedData,
    filteredSearchResultNotFound,
    filteredShortListedData,
    removedShotlistedData
  } = useSelector(state => state.data);

  const onSubmit = e => {
    e.preventDefault();
    filterSearch();
  };

  const filterSearch = () => {
    dispatch(setShortListFIlteredData(searchValue));
  };

  const removeRowData = index => {
    dispatch(removeShorlistedData({ index }));
  };

  const handleSearchChange = e => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    return () => {
      dispatch(resetUserActions());
    };
  }, [dispatch]);

  if (!shortlistedData) {
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Alert severity="info">No shortlisted Data Available</Alert>;
      </Box>
    );
  }

  const tableRows = filteredShortListedData.length
    ? filteredShortListedData
    : Object.values(shortlistedData);

  const columns = [
    { id: "State", label: "State" },
    { id: "City", label: "City" },
    { id: "District", label: "District" },
    {
      id: "Action",
      label: "Action",
      align: "center"
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Box>
          <Box display="flex" alignItems="center">
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
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
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
      </Box>
      {removedShotlistedData && (
        <Box display="flex" m={1} p={1}>
          <Alert severity="error">{`Removed Data  City='${removedShotlistedData.City}'  State='${removedShotlistedData.State}'  District='${removedShotlistedData.District}' successfully`}</Alert>
        </Box>
      )}
      {filteredSearchResultNotFound && (
        <Box display="flex" m={1} p={1}>
          <Alert severity="info">No Data Matched the Search</Alert>
        </Box>
      )}
      <CustomTable
        columns={columns}
        rows={tableRows}
        renderRows={(row, rowIndex) =>
          columns.map((column, columnIndex) => {
            const value = row[column.id];
            if (column.id === "Action") {
              return (
                <TableCell
                  className={classes.action}
                  key={columnIndex}
                  align={column.align}
                >
                  <div
                    onClick={() => {
                      removeRowData(rowIndex);
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </TableCell>
              );
            }
            return (
              <TableCell key={columnIndex} align={column.align}>
                {column.format && typeof value === "number"
                  ? column.format(value)
                  : value}
              </TableCell>
            );
          })
        }
      />
    </Container>
  );
}

export default ShortlistedView;
