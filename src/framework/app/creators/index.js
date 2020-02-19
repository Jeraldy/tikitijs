import { INCREMENT, DECREMENT } from "../constants/index";
import { dispatch } from '../store/index';

export const _increment = () => {
    return dispatch({ type: INCREMENT })
};

export const _decrement = () => {
    return dispatch({ type: DECREMENT })
};