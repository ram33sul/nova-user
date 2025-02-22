import { Action } from "redux";
import { SET_USER } from "./types";
import { User } from "../../types/user";

const initialState: User | null = null;

interface UserAction extends Action {
  payload: User;
}

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
