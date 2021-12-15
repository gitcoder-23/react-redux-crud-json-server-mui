import * as types from '../actions/actionType';
const initialState = {
  allUsers: [],
  singleUser: {},
  loading: true,
  isError: true,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false,
        isError: false,
      };
    case types.DELETE_USER:
      return {
        ...state,
        loading: false,
        isError: false,
      };
    case types.ADD_USER:
      return {
        ...state,
        loading: false,
        isError: false,
      };
    case types.GET_SINGLE_USER:
      return {
        ...state,
        singleUser: action.payload,
        loading: false,
        isError: false,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        loading: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default usersReducers;
