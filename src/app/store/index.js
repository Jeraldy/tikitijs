import rootReducer from '../reducers/index';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({reducer: rootReducer})

export const dispatch = (props) => {
    return store.dispatch(props)
}

export const updateState = (mapStoreToState, context) => {
    _updateState(mapStoreToState,context)
    store.subscribe(() => _updateState(mapStoreToState,context))
}

function _updateState(mapStoreToState,context) {
    var newState = mapStoreToState(store.getState())
    context.setState({ ...context.state, ...newState })
}
