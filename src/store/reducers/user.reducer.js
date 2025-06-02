import { userService } from "../../services/user.service.remote.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const LOADING_START = 'LOADING_START'
export const SET_USERS = 'SET_USERS'
export const LOADING_DONE = 'LOADING_DONE'


const initialState = {
    count: 101,
    loggedInUser: await userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case SET_USERS:
            return { ...state, users: cmd.users }
        case LOADING_START:
        return {
            ...state,
            count: state.count + cmd.diff
        }
        case LOADING_DONE:
        return {
            ...state,
            count: state.count + cmd.diff
        }
        default:
            return state

    }
}