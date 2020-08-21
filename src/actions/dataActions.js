import dataService from "../services/dataService";

export const GET_DATA = "GET_DATA";
export const SET_STATES = "SET_STATES";
export const SET_DISTRICTS = "SET_DISTRICTS";
export const SET_FILTERED_DATA = "SET_FILTERED_DATA";
export const ADD_CITY = "ADD_CITY";
export const REMOVE_SINGLE_DATA = "REMOVE_SINGLE_DATA";
export const SHORLIST_DATA = "SHORLIST_DATA";
export const REMOVE_SHORLIST_DATA = "REMOVE_SHORLIST_DATA";
export const RESET_USER_ACTIONS = "RESET_USER_ACTIONS";

export function getData() {
  return async dispatch => {
    try {
      const states = [];
      const districts = [];
      const data = await dataService.getData();

      dispatch({
        type: GET_DATA,
        payload: {
          data
        }
      });
      data.forEach(ele => {
        states.push(ele.State);
        districts.push(ele.District);
      });

      dispatch({
        type: SET_STATES,
        payload: {
          states
        }
      });

      dispatch({
        type: SET_DISTRICTS,
        payload: {
          districts
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function setFIlteredData(filterValue) {
  return async dispatch => {
    try {
      dispatch({
        type: SET_FILTERED_DATA,
        payload: {
          filterValue
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function addCity({ city, state, district }) {
  return async dispatch => {
    try {
      dispatch({
        type: ADD_CITY,
        payload: {
          city,
          state,
          district
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function removeSingleData({ index }) {
  return async dispatch => {
    try {
      dispatch({
        type: REMOVE_SINGLE_DATA,
        payload: {
          index
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function shorlistData({ index }) {
  return async dispatch => {
    try {
      dispatch({
        type: SHORLIST_DATA,
        payload: {
          index
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function removeShorlistedData({ index }) {
  return async dispatch => {
    try {
      dispatch({
        type: REMOVE_SHORLIST_DATA,
        payload: {
          index
        }
      });
    } catch (error) {
      throw error;
    }
  };
}

export function resetUserActions() {
  return async dispatch => {
    try {
      dispatch({
        type: RESET_USER_ACTIONS
      });
    } catch (error) {
      throw error;
    }
  };
}
