import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import DeleteIcon from "@material-ui/icons/Delete";

import { removeShorlistedData } from "../../../actions/dataActions";
import CustomTable from "../../../component/CustomTable";

function ShortlistedView() {
  const dispatch = useDispatch();

  const { shortlistedData } = useSelector(state => state.data);

  const removeRowData = index => {
    dispatch(removeShorlistedData({ index }));
  };

  if (!shortlistedData) {
    return <Alert severity="info">No shortlisted Data Available</Alert>;
  }

  const tableRows = Object.values(shortlistedData);

  const columns = [
    { id: "State", label: "State" },
    { id: "City", label: "City" },
    { id: "District", label: "District" },
    {
      id: "action",
      label: "Action",
      contents: [
        {
          actionContent: <DeleteIcon />,
          actionEvent: index => {
            const removeShortListIndex = Object.values(shortlistedData)[index]
              .index;
            removeRowData(removeShortListIndex);
          }
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg">
      <CustomTable columns={columns} rows={tableRows} />
    </Container>
  );
}

export default ShortlistedView;
