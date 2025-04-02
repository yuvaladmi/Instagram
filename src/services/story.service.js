
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'story'
export const storyService = {
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  onRemoveStoryComment,
  createComment,
  getDefaultFilter
}
window.ss = storyService

function onRemoveStoryComment(storyId) {
  return storageService.remove(STORAGE_KEY, storyId)
}

async function query() {
  const stories = await storageService.query(STORAGE_KEY)
  if (!stories || !stories.length) _createSrories()
  return stories
}

function getById(storyId) {
  return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
  await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
  var savedStory
  if (story._id) {
    savedStory = await storageService.put(STORAGE_KEY, story)
  } else {
    const user = userService.getLoggedinUser()
    story.by = {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      imgUrl: user.imgUrl
    }
    savedStory = await storageService.post(STORAGE_KEY, story)
  }
  return savedStory
}

function createComment(txt, user) {
  return {
    id: utilService.makeId(),
    by: {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      imgUrl: user.imgUrl
    },
    txt
  }
}

function getDefaultFilter() {
  return { txt: '' }
}

function getEmptyStory() {
  return {
    // _id: "",
    txt: "",
    imgUrl: [],
    comments: [],
    likedBy: [],
    by: {
      _id: "",
      username: "",
      fullname: "",
      imgUrl: ""
    },
  }
}

function _createSrories() {
  const story = [{
        _id: "s101",
        txt: "Best trip ever",
        imgUrl: "https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/leizynqlraftxdsvmem0.jpg", 
        by: {
          _id: "u101",
          fullname: "Ulash Ulashi",
          imgUrl: "http://some-img"
        },
        loc: { // Optional
          lat: 11.11, 
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
              {
                "_id": "u105",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              }
            ]
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img"
            },
            txt: "not good!",
          }
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
          }
        ],
        tags: ["fun", "romantic"]
      },
      {
        _id: "s101",
        txt: "Best trip ever",
        imgUrl: "https://cdn.pixabay.com/photo/2023/01/04/13/21/animals-7696695_640.jpg", 
        by: {
          _id: "u101",
          fullname: "Ulash Ulashi",
          imgUrl: "http://some-img"
        },
        loc: { // Optional
          lat: 11.11, 
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
              {
                "_id": "u105",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              }
            ]
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img"
            },
            txt: "not good!",
          }
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
          }
        ],
        tags: ["fun", "romantic"]
      }  ,
      {
        _id: "s101",
        txt: "Best trip ever",
        imgUrl: "https://cdn.pixabay.com/photo/2023/01/04/13/21/animals-7696695_640.jpg", 
        by: {
          _id: "u101",
          fullname: "Ulash Ulashi",
          imgUrl: "http://some-img"
        },
        loc: { // Optional
          lat: 11.11, 
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
              {
                "_id": "u105",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              }
            ]
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img"
            },
            txt: "not good!",
          }
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
          }
        ],
        tags: ["fun", "romantic"]
      }  ,
      {
        _id: "s101",
        txt: "Best trip ever",
        imgUrl: "https://cdn.pixabay.com/photo/2023/01/04/13/21/animals-7696695_640.jpg", 
        by: {
          _id: "u101",
          fullname: "Ulash Ulashi",
          imgUrl: "http://some-img"
        },
        loc: { // Optional
          lat: 11.11, 
          lng: 22.22,
          name: "Tel Aviv"
        },
        comments: [
          {
            id: "c1001",
            by: {
              _id: "u105",
              fullname: "Bob",
              imgUrl: "http://some-img"
            },
            txt: "good one!",
            likedBy: [ // Optional
              {
                "_id": "u105",
                "fullname": "Bob",
                "imgUrl": "http://some-img"
              }
            ]
          },
          {
            id: "c1002",
            by: {
              _id: "u106",
              fullname: "Dob",
              imgUrl: "http://some-img"
            },
            txt: "not good!",
          }
        ],
        likedBy: [
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "http://some-img"
          },
          {
            _id: "u106",
            fullname: "Dob",
            imgUrl: "http://some-img"
          }
        ],
        tags: ["fun", "romantic"]
      }          
  ]

  // storageService._save(STORAGE_KEY, story)
  utilService.saveToStorage(STORAGE_KEY, story)
}