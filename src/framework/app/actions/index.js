import { _increment, _decrement } from '../creators/index';

export const increment = () => {
    _increment()
};

export const decrement = () => {
    _decrement()
};