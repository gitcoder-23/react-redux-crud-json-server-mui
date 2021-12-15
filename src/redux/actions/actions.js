import * as types from './actionType';
import axios from 'axios';
import { rootApi } from '../../constants';

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
});

const userAdded = () => ({
  type: types.ADD_USER,
});

const getOneUser = (oneUser) => ({
  type: types.GET_SINGLE_USER,
  payload: oneUser,
});

const userUpdated = () => ({
  type: types.UPDATE_USER,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${rootApi}/users`)
      .then((resp) => {
        // console.log('loadUsers->', resp);
        dispatch(getUsers(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${rootApi}/users/${id}`)
      .then((resp) => {
        // console.log('deleteUser->', resp);
        dispatch(userDeleted());
        // after deleted get all user
        dispatch(loadUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addNewUser = (newUser) => {
  return function (dispatch) {
    axios
      .post(`${rootApi}/users`, newUser)
      .then((resp) => {
        // console.log('addNewUser->', resp);
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${rootApi}/users/${id}`)
      .then((resp) => {
        // console.log('getSingleUser->', resp);
        dispatch(getOneUser(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateSingleUser = (editUser, id) => {
  return function (dispatch) {
    axios
      .put(`${rootApi}/users/${id}`, editUser)
      .then((resp) => {
        // console.log('updateSingleUser->', resp);
        dispatch(userUpdated());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
