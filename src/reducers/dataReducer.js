/* eslint-disable no-param-reassign */
import produce from "immer";
import {
  GET_DATA,
  SET_STATES,
  SET_DISTRICTS,
  SET_FILTERED_DATA,
  ADD_CITY
} from "../actions/dataActions";

const initialState = {
  locationData: null,
  states: null,
  districts: null,
  filteredLocationData: null
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
        draft.filteredLocationData = filteredLocationData;
      });
    }

    case ADD_CITY: {
      const {
        payload: { city, state: stateToAdd, district }
      } = action;
      return produce(state, draft => {
        const temp = [...state.locationData];
        temp.unshift({ City: city, State: stateToAdd, District: district });
        draft.locationData = temp;
      });
    }

    default: {
      return state;
    }
  }
};

export default dataReducer;
