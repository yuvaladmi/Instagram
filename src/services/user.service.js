import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser,
    filterUsers,
    getEmptyCredentials
}

window.userService = userService

function filterUsers(filterBy, users) {
    if (!users.length) return
    const regex = new RegExp(filterBy.txt, 'i')
    users = users.filter(user => {
        return regex.test(user.username)
    })
    return users
}

async function getUsers(filterBy = { txt: '' }) {
    var users = await storageService.query('user').then(users => users)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        users = users.filter(user => {
            return regex.test(user.username)
        })
        // users = users.filter(user => regex.test(user.unername) || regex.test(car.description))
    }
    return users
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(userToUpdate) {
    const user = await storageService.get('user', userToUpdate._id)
    await storageService.put('user', user)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://freesvg.org/img/abstract-user-flat-3.png'
;
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
    return {
        username: "",
        password: "",
        fullname: "",
        imgUrl: '',
        bio: '',
        following: [],
        followers: [],
        savedStoryIds: []
    }
}
function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

/*
const user = {
    _id: "u101",
    username: "Muko",
    password: "mukmuk",
    fullname: "Muki Muka",
    imgUrl: "http://some-img",
    following: [
      {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img"
      }
    ],
    followers: [
      {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img"
      }
    ],
    savedStoryIds: ["s104", "s111", "s123"] // can also use mini-stories
  }
*/