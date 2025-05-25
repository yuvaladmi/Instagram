import { userService } from "../../services/user.service.remote.js";
import {
	SET_USER,
	SET_USER_SCORE,
	SET_USERS,
} from "../reducers/user.reducer.js";
import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer.js";
import { store } from "../store.js"

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export function login(credentials) {
	return userService
		.login(credentials)
		.then(user => {
			store.dispatch({ type: SET_USER, user });
		})
		.catch(err => {
			console.log("user actions -> Cannot login", err);
			throw err;
		});
}

export function signup(credentials) {
	return userService
		.signup(credentials)
		.then(user => {
			store.dispatch({ type: SET_USER, user });
		})
		.catch(err => {
			console.log("user actions -> Cannot signup", err);
			throw err;
		});
}

export function logout() {
	return userService
		.logout()
		.then(() => {
			store.dispatch({ type: SET_USER, user: null });
		})
		.catch(err => {
			console.log("user actions -> Cannot logout", err);
			throw err;
		});
}

export function savedStoryUser(storyId, userId) {
        userService.getById(userId)
            .then((userFromStorage) => {
                // debugger;
                const isSavedByUser = userFromStorage.savedStoryIds.some(savedStoryId => savedStoryId === storyId);
                const updatedSavedByUser = isSavedByUser ? userFromStorage.savedStoryIds.filter(usersaved => usersaved !== storyId) // Remove user
                                        : [...userFromStorage.savedStoryIds, storyId]; // Add user

                userFromStorage = { ...userFromStorage, savedStoryIds: updatedSavedByUser };

                userService.updateUserInStorage(userFromStorage)
                    .then((updatedUser) => {
                        store.dispatch({ type: SET_USER, user: updatedUser })
                    
                    }) 
                    .catch ((err) => {
                        console.log('UserActions: err in updateUserInStorage', err)
                    })
            })
            .catch(err => {
                console.log('user actions -> Cannot signup', err)
                throw err
            })
}
