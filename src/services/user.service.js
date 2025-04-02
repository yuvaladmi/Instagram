import { storageService } from './async-storage.service'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    signupDemoUsers,
    updateUserInStorage,
    getUsers
}


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            // if (user && user.password !== password) return _setLoggedinUser(user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    if (!user.imgUrl) user.imgUrl = 'https://freesvg.org/img/abstract-user-flat-3.png'; 
    if (!user.bio) user.bio = '';
    if (!user.following) user.following = [];
    if (!user.followers) user.followers = [];
    if (!user.savedStoryIds) user.savedStoryIds = [];
    
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// function filterUsers(filterBy, users) {
//     if (!users.length) return
//     const regex = new RegExp(filterBy.txt, 'i')
//     users = users.filter(user => {
//         return regex.test(user.username)
//     })
//     return users
// }

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

function updateUserInStorage(user) {
    return storageService.put(STORAGE_KEY, user);
}


// function getEmptyUser() {
//     return {
//         username: "",
//         password: "",
//         fullname: "",
//         imgUrl: '',
//         bio: '',
//         following: [],
//         followers: [],
//         savedStoryIds: []
//     }
// }
function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


function signupDemoUsers() {
    return storageService.query(STORAGE_KEY)
        .then(users => !users.length || Promise.reject('Too Many Demo Users!'))
        .then(() => userService.signup({ username: 'admin', password: 'admin', fullname: 'Admin Adminov' }))
        .then(() => userService.signup({ username: 'popo', password: 'popo', fullname: 'Popo McPopo' }))
        .then(() => userService.signup({ username: 'nina', password: 'nina', fullname: 'Nina Simantov' }))
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