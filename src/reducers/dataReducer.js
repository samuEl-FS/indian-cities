/* eslint-disable no-param-reassign */
import produce from "immer";
import keyBy from "lodash/keyBy";
import {
  GET_DATA,
  SET_STATES,
  SET_DISTRICTS,
  SET_FILTERED_DATA,
  ADD_CITY,
  REMOVE_SINGLE_DATA,
  REMOVE_SHORLIST_DATA,
  SHORLIST_DATA,
  RESET_USER_ACTIONS,
  SET_SHORTLISTED_FILTERED_DATA
} from "../actions/dataActions";

const initialState = {
  locationData: [],
  states: null,
  districts: null,
  filteredLocationData: [],
  shortlistedData: null,
  removedData: null,
  shortlistedSingleData: null,
  searchResultNotFound: false,
  filteredShortListedData: [],
  filteredSearchResultNotFound: false,
  removedShotlistedData: null
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA: {
      const {
        payload: { data }
      } = action;
      return produce(state, draft => {
        draft.locationData = data;
      });
    }

    case SET_STATES: {
      const {
        payload: { states }
      } = action;
      return produce(state, draft => {
        draft.states = [...new Set(states)].sort();
      });
    }

    case SET_DISTRICTS: {
      const {
        payload: { districts }
      } = action;
      return produce(state, draft => {
        draft.districts = [...new Set(districts)].sort();
      });
    }

    case SET_FILTERED_DATA: {
      const {
        payload: { filterValue }
      } = action;
      return produce(state, draft => {
        const { locationData } = state;
        const filteredLocationData = [];
        if (filterValue) {
          locationData.forEach(ele => {
            if (ele.State.toLowerCase().includes(filterValue.toLowerCase())) {
              filteredLocationData.push(ele);
            } else if (
              ele.City.toLowerCase().includes(filterValue.toLowerCase())
            ) {
              filteredLocationData.push(ele);
            } else if (
              ele.District.toLowerCase().includes(filterValue.toLowerCase())
            ) {
              filteredLocationData.push(ele);
            }
          });
        }

        if (!filteredLocationData.length && filterValue) {
          draft.searchResultNotFound = true;
        } else {
          draft.searchResultNotFound = false;
        }
        draft.removedData = null;
        draft.shortlistedSingleData = null;
        draft.filteredLocationData = filteredLocationData;
      });
    }

    case ADD_CITY: {
      const {
        payload: { city, state: stateToAdd, district }
      } = action;
      return produce(state, draft => {
        const temp = [...state.locationData];
        const tempFiltered = [...state.filteredLocationData];
        temp.unshift({ City: city, State: stateToAdd, District: district });
        tempFiltered.unshift({
          City: city,
          State: stateToAdd,
          District: district
        });
        if (state.filteredLocationData.length) {
          draft.filteredLocationData = tempFiltered;
        }
        draft.removedData = null;
        draft.shortlistedSingleData = null;
        draft.locationData = temp;
      });
    }

    case REMOVE_SINGLE_DATA: {
      const {
        payload: { index }
      } = action;
      return produce(state, draft => {
        const temp = state.filteredLocationData.length
          ? [...state.filteredLocationData]
          : [...state.locationData];
        const removedData = temp.splice(index, 1);
        const tempShortlistedData = { ...state.shortlistedData };
        delete tempShortlistedData[removedData[0].City];

        if (state.filteredLocationData.length) {
          draft.filteredLocationData = temp;
        } else {
          draft.locationData = temp;
        }
        draft.shortlistedSingleData = null;
        draft.removedData = { ...removedData[0] };
        draft.shortlistedData = tempShortlistedData;
      });
    }

    case SHORLIST_DATA: {
      const {
        payload: { index }
      } = action;
      return produce(state, draft => {
        const temp = state.shortlistedData
          ? [...Object.values(state.shortlistedData)]
          : [];
        let shortlistedSingleData = null;
        if (state.filteredLocationData.length) {
          temp.push({ ...state.filteredLocationData[index] });
          const updateFilteredLocationData = [...state.filteredLocationData];

          updateFilteredLocationData[index] = {
            ...updateFilteredLocationData[index],
            shortListed: true
          };

          shortlistedSingleData = { ...state.filteredLocationData[index] };
          draft.filteredLocationData = updateFilteredLocationData;
        } else {
          temp.push({ ...state.locationData[index] });
          const updateLocationData = [...state.locationData];
          updateLocationData[index] = {
            ...updateLocationData[index],
            shortListed: true
          };
          shortlistedSingleData = { ...state.locationData[index] };
          draft.locationData = updateLocationData;
        }

        draft.removedData = null;
        draft.shortlistedData = keyBy(temp, "City");
        draft.shortlistedSingleData = shortlistedSingleData;
      });
    }

    case REMOVE_SHORLIST_DATA: {
      const {
        payload: { index }
      } = action;
      return produce(state, draft => {
        const temp = [...Object.values(state.shortlistedData)];
        const removedShotlistedData = temp.splice(index, 1);
        if (state.filteredLocationData.length) {
          const updateFilteredLocationData = [...state.filteredLocationData];
          const removedIndex = updateFilteredLocationData.findIndex(
            ele => ele.City === removedShotlistedData[0].City
          );

          updateFilteredLocationData[removedIndex] = {
            ...updateFilteredLocationData[removedIndex],
            shortListed: false
          };

          draft.filteredLocationData = updateFilteredLocationData;
        } else {
          const updateLocationData = [...state.locationData];
          const removedIndex = updateLocationData.findIndex(
            ele => ele.City === removedShotlistedData[0].City
          );

          updateLocationData[removedIndex] = {
            ...updateLocationData[removedIndex],
            shortListed: false
          };

          draft.locationData = updateLocationData;
        }

        if (temp.length) {
          draft.shortlistedData = keyBy(temp, "City");
          draft.removedShotlistedData = removedShotlistedData[0];
        } else {
          draft.shortlistedData = null;
        }
      });
    }

    case RESET_USER_ACTIONS: {
      return produce(state, draft => {
        draft.shortlistedSingleData = null;
        draft.removedData = null;
        draft.removedShotlistedData = null;
        draft.searchResultNotFound = false;
        draft.filteredLocationData = [];
        draft.filteredSearchResultNotFound = false;
        draft.filteredShortListedData = [];
      });
    }

    case SET_SHORTLISTED_FILTERED_DATA: {
      const {
        payload: { filterValue }
      } = action;
      return produce(state, draft => {
        const { shortlistedData } = state;
        const filteredShortListedData = [];
        if (filterValue) {
          Object.values(shortlistedData).forEach(ele => {
            if (ele.State.toLowerCase().includes(filterValue.toLowerCase())) {
              filteredShortListedData.push(ele);
            } else if (
              ele.City.toLowerCase().includes(filterValue.toLowerCase())
            ) {
              filteredShortListedData.push(ele);
            } else if (
              ele.District.toLowerCase().includes(filterValue.toLowerCase())
            ) {
              filteredShortListedData.push(ele);
            }
          });
        }

        if (!filteredShortListedData.length && filterValue) {
          draft.filteredSearchResultNotFound = true;
        } else {
          draft.filteredSearchResultNotFound = false;
        }

        draft.removedData = null;

        draft.filteredShortListedData = filteredShortListedData;
      });
    }

    default: {
      return state;
    }
  }
};

export default dataReducer;
