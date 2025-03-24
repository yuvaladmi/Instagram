import { storyReducer } from "./reducers/story.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"


import { createStore, combineReducers, compose } from 'redux'


const rootReducer = combineReducers({
    storyModule: storyReducer,
    userModule: userReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())




window.gStore = store