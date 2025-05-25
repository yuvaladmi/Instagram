import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.js";
import { httpService } from "./http.service";

const STORAGE_KEY = "story";
export const storyService = {
	query,
	getById,
	save,
	remove,
	getEmptyStory,
	onRemoveStoryComment,
	//createComment,
	addStoryComment,
	addStoryLike,
	getDefaultFilter,
	addStoryStory,
	getStoriesByUser
};
window.ss = storyService;

function onRemoveStoryComment(storyId) {
	return storageService.remove(STORAGE_KEY, storyId);
}

async function query() {
	// const stories = await storageService.query(STORAGE_KEY);
	// if (!stories || !stories.length) _createSrories();
	// return stories;
	return httpService.get(`story`, null)
}

async function getById(storyId) {
	// return storageService.get(STORAGE_KEY, storyId);
	
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
	await storageService.remove(STORAGE_KEY, storyId);
}

async function save(story) {
	var savedStory;
	if (story._id) {
		savedStory = await storageService.put(STORAGE_KEY, story);
	} else {
		const user = userService.getLoggedinUser();
		story.by = {
			_id: user._id,
			username: user.username,
			fullname: user.fullname,
			imgUrl: user.imgUrl,
		};
		savedStory = await storageService.post(STORAGE_KEY, story);
	}
	return savedStory;
}

// function createComment(txt, user, storyId) {
// 	return {
// 		id: utilService.makeId(),
// 		by: {
// 			_id: user._id,
// 			username: user.username,
// 			fullname: user.fullname,
// 			imgUrl: user.imgUrl,
// 		},
// 		txt,
// 	};
// }
async function addStoryComment(txt, storyId) {
    const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
    return savedMsg
}
async function addStoryLike(storyId) {
    const savedLike = await httpService.post(`story/${storyId}/like`)
    return savedLike
}

async function addStoryStory(story) {
    const savedStory = await httpService.post(`story`, {story})
    return savedStory	
}


async function getStoriesByUser(userId) {
	return httpService.get(`story/userStories/${userId}`)
}

function getDefaultFilter() {
	return { txt: "" };
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
			imgUrl: "",
		},
	};
}

function _createSrories() {
	const story = [
		{
			_id: "s101",
			txt: "Best trip ever",
			imgUrl:
				"https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/leizynqlraftxdsvmem0.jpg",
			by: {
				_id: "Xma2l",
				fullname: "Koko Jambo",
				imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u105",
						fullname: "Bob",
						imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u105",
							fullname: "Bob",
							imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Dob",
						imgUrl: "http://some-img",
					},
					txt: "not good!",
				},
			],
			likedBy: [
				{
					_id: "u105",
					fullname: "Bob",
					imgUrl: "http://some-img",
				},
				{
					_id: "u106",
					fullname: "Dob",
					imgUrl: "http://some-img",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "s102",
			txt: "wonderfull view",
			imgUrl:
				"https://plus.unsplash.com/premium_photo-1666792561369-88127aa152ed?w=468&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHZpZXd8ZW58MHx8MHx8fDA%3D",
			by: {
				_id: "Xma2l",
				fullname: "Koko Jambo",
				imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u104",
						fullname: "Bob",
						imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Max Steward",
						imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
					},
					txt: "not good!",
				},
			],
			likedBy: [
				{
					_id: "u108",
					fullname: "Ted Rice",
					imgUrl: "https://randomuser.me/api/portraits/men/56.jpg",
				},
				{
					_id: "u106",
					fullname: "Dob",
					imgUrl: "http://some-img",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "s103",
			txt: "Beautiful sunrise!!!",
			imgUrl:
				"https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			by: {
				_id: "Xma2l",
				fullname: "Koko Jambo",
				imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u105",
						fullname: "Bob",
						imgUrl: "http://some-img",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u105",
							fullname: "Bob",
							imgUrl: "http://some-img",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Dob",
						imgUrl: "http://some-img",
					},
					txt: "not good!",
				},
			],
			likedBy: [
				{
					_id: "u105",
					fullname: "Bob",
					imgUrl: "http://some-img",
				},
				{
					_id: "u106",
					fullname: "Dob",
					imgUrl: "http://some-img",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "s104",
			txt: "Best trip ever",
			imgUrl:
				"https://cdn.pixabay.com/photo/2023/01/04/13/21/animals-7696695_640.jpg",
			by: {
				_id: "u101",
				fullname: "Ulash Ulashi",
				imgUrl: "http://some-img",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u105",
						fullname: "Bob",
						imgUrl: "http://some-img",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u105",
							fullname: "Bob",
							imgUrl: "http://some-img",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Dob",
						imgUrl: "http://some-img",
					},
					txt: "not good!",
				},
			],
			likedBy: [
				{
					_id: "u105",
					fullname: "Bob",
					imgUrl: "http://some-img",
				},
				{
					_id: "u106",
					fullname: "Dob",
					imgUrl: "http://some-img",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "s105",
			txt: "Best trip ever",
			imgUrl:
				"https://cdn.pixabay.com/photo/2023/01/04/13/21/animals-7696695_640.jpg",
			by: {
				_id: "u101",
				fullname: "Ulash Ulashi",
				imgUrl: "http://some-img",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u105",
						fullname: "Bob",
						imgUrl: "http://some-img",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u105",
							fullname: "Bob",
							imgUrl: "http://some-img",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Dob",
						imgUrl: "http://some-img",
					},
					txt: "not good!",
				},
			],
			likedBy: [
				{
					_id: "u105",
					fullname: "Bob",
					imgUrl: "http://some-img",
				},
				{
					_id: "u106",
					fullname: "Dob",
					imgUrl: "http://some-img",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "s106",
			txt: "off we goooooooooo...",
			imgUrl:
				"https://images.unsplash.com/photo-1527936599657-e6d24be0c95c?q=80&w=468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			by: {
				_id: "Xma2l",
				fullname: "Koko Jambo",
				imgUrl: "https://randomuser.me/api/portraits/women/16.jpg",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u104",
						fullname: "Bob",
						imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Max Steward",
						imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
					},
					txt: "not good!",
				},
				{
					id: "c1003",
					by: {
						_id: "u110",
						fullname: "Lydia Brewer",
						imgUrl: "https://randomuser.me/api/portraits/woman/56.jpg",
					},
					txt: "Have a nice trip!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
			],
			likedBy: [
				{
					_id: "u108",
					fullname: "Ted Rice",
					imgUrl: "https://randomuser.me/api/portraits/men/56.jpg",
				},
				{
					_id: "u106",
					fullname: "Max Steward",
					imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "s590",
			txt: "magnificent...",
			imgUrl:
				"https://plus.unsplash.com/premium_photo-1694475347672-560fa2f92fde?q=80&w=468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			by: {
				_id: "u107",
				fullname: "Joyce Lane",
				imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u104",
						fullname: "Bob",
						imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
					},
					txt: "good one!",
					likedBy: [
						// Optional
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Max Steward",
						imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
					},
					txt: "not good!",
				},
				{
					id: "c1003",
					by: {
						_id: "u110",
						fullname: "Lydia Brewer",
						imgUrl: "https://randomuser.me/api/portraits/woman/56.jpg",
					},
					txt: "Have a nice trip!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
			],
			likedBy: [
				{
					_id: "u108",
					fullname: "Ted Rice",
					imgUrl: "https://randomuser.me/api/portraits/men/56.jpg",
				},
				{
					_id: "u106",
					fullname: "Max Steward",
					imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "2134",
			txt: "lovely...",
			imgUrl:
				"https://plus.unsplash.com/premium_photo-1694475350267-3d15915d97af?q=80&w=468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			by: {
				_id: "u111",
				fullname: "Bernice Fox",
				imgUrl: "https://randomuser.me/api/portraits/women/19.jpg",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u104",
						fullname: "Bob",
						imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Max Steward",
						imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
					},
					txt: "not good!",
				},
				{
					id: "c1003",
					by: {
						_id: "u110",
						fullname: "Lydia Brewer",
						imgUrl: "https://randomuser.me/api/portraits/woman/56.jpg",
					},
					txt: "Have a nice trip!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
			],
			likedBy: [
				{
					_id: "u108",
					fullname: "Ted Rice",
					imgUrl: "https://randomuser.me/api/portraits/men/56.jpg",
				},
				{
					_id: "u106",
					fullname: "Max Steward",
					imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
				},
			],
			tags: ["fun", "romantic"],
		},
		{
			_id: "s245",
			txt: "I have a dream...",
			imgUrl:
				"https://images.unsplash.com/photo-1740309056732-d8d5f318b216?q=80&w=468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			by: {
				_id: "u111",
				fullname: "Bernice Fox",
				imgUrl: "https://randomuser.me/api/portraits/women/19.jpg",
			},
			loc: {
				// Optional
				lat: 11.11,
				lng: 22.22,
				name: "Tel Aviv",
			},
			comments: [
				{
					id: "c1001",
					by: {
						_id: "u104",
						fullname: "Bob",
						imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
					},
					txt: "good one!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
				{
					id: "c1002",
					by: {
						_id: "u106",
						fullname: "Max Steward",
						imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
					},
					txt: "👍",
				},
				{
					id: "c1003",
					by: {
						_id: "u110",
						fullname: "Lydia Brewer",
						imgUrl: "https://randomuser.me/api/portraits/woman/56.jpg",
					},
					txt: "Have a nice trip!",
					likedBy: [
						// Optional
						{
							_id: "u107",
							fullname: "Joyce Lane",
							imgUrl: "https://randomuser.me/api/portraits/women/3.jpg",
						},
					],
				},
			],
			likedBy: [
				{
					_id: "u108",
					fullname: "Ted Rice",
					imgUrl: "https://randomuser.me/api/portraits/men/56.jpg",
				},
				{
					_id: "u106",
					fullname: "Max Steward",
					imgUrl: "https://randomuser.me/api/portraits/men/54.jpg",
				},
			],
			tags: ["fun", "romantic"],
		},
	];

	// storageService._save(STORAGE_KEY, story)
	utilService.saveToStorage(STORAGE_KEY, story);
}
