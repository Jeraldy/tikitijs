import { createStore } from 'redux';
import rootReducer from '../reducers/index';

let store = createStore(rootReducer)

export const dispatch = (props) => {
    return store.dispatch(props)
}


export const updateState = (mapStoreToState, context) => {
    store.subscribe(() => {
        var newState = mapStoreToState(store.getState())
        context.setState({ ...context.state, ...newState })
    })
}

