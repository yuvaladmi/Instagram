import { storyService } from "../../services/story.service.js"


//* Cars
export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UNDO_STORIES = 'UNDO_STORIES'
export const ADD_STORY_COMMENT = 'ADD_STORY_COMMENT'
export const ADD_STORY_LIKE = 'ADD_STORY_LIKE'
export const SET_STORIES_PROFILE = 'SET_STORIES_PROFILE'


const initialState = {
    stories: [],
    filterBy: storyService.getDefaultFilter(),
    isLoading: false,
    story: null,
    loggedInUserStories: []
}


export function storyReducer(state = initialState, cmd = {}) {
    var newState = state
    switch (cmd.type) {
        case SET_STORIES:
            newState = {
                ...state,
                stories: cmd.stories
            }
            break
        case REMOVE_STORY:
            newState = {
                ...state,
                stories: state.stories.filter(story => story._id !== cmd.storyId),
                lastStories: [...state.stories]
            }
            break
        case ADD_STORY:
            newState = {
                ...state,
                stories: [cmd.story, ...state.stories]
            }
            break
        case UPDATE_STORY:
            newState = {
                ...state,
                stories: state.stories.map(story => story._id === cmd.story._id ? cmd.story : story)
            }
            break
        case SET_FILTER_BY:
            newState = {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
            break
        case SET_IS_LOADING:
            newState = {
                ...state,
                isLoading: cmd.isLoading
            }
            break
        case UNDO_STORIES:
            newState = {
                ...state,
                stories: [...state.lastStories]
            }
            break
        case ADD_STORY_COMMENT: 
            newState = { 
                ...state,
                stories: state.stories.map(story =>
                    story._id === cmd.storyId
                    ? { ...story, comments: [...(story.comments || []), cmd.comment] }
                    : story
                )
            }
            
            break
        case ADD_STORY_LIKE:
            newState = { 
                ...state,
                stories: state.stories.map(story =>
                    story._id === cmd.storyId
                    ? { ...story, likedBy: cmd.like.likedBy }
                    : story
                )
            }
            console.log(newState)
            break;
        case SET_STORIES_PROFILE:
            newState = {
                ...state, 
                loggedInUserStories: cmd.loggedInUserStories
            }
            break;
        default:
        }
        return newState
    }


