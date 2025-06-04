import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
    getLoggedinUser,
	getEmptyCredentials,
	followUser,
	unFollowUser,
	saveStory
}

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
	const user = await httpService.put(`user/${_id}`, { _id, score })

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
    if (loggedinUser._id === user._id) _saveLocalUser(user)

	return user
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
	if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	userCred.score = 10000

    const user = await httpService.post('auth/signup', userCred)
	return _saveLocalUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

async function followUser(targetUserId) {
	const user = await httpService.post(`user/${targetUserId}/follow`, targetUserId)
	if (user) return user
}

async function unFollowUser(targetUserId) {
	const user = await httpService.post(`user/${targetUserId}/unfollow`, targetUserId)
	if (user) return user
}

async function getLoggedinUser() {
	const loggedInUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
	console.log('loggedInUser:', loggedInUser)
    return getById(loggedInUser._id)
}

async function saveStory(storyId) {
	const user = await httpService.post(`user/${storyId}/savestory`, storyId)
	if (user) return user
}
function _saveLocalUser(user) {
	user = { _id: user._id, username: user.username, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score, isAdmin: user.isAdmin }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getEmptyCredentials() {
	return {
		username: "",
		password: "",
		fullname: "",
		email: ""
	};
}