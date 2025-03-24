import { storyService } from "../../services/story.service.js"


//* Cars
export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UNDO_STORIES = 'UNDO_STORIES'


const initialState = {
    stories: [],
    lastCars: [],
    filterBy: storyService.getDefaultFilter(),
    isLoading: false,
    shoppingCart: [],
    isCartShown: false,
}


export function storyReducer(state = initialState, cmd = {}) {
    //* Stories
    switch (cmd.type) {
        case SET_STORIES:
            return {
                ...state,
                stories: cmd.stories
            }
        case REMOVE_STORY:
            return {
                ...state,
                stories: state.stories.filter(story => story.id !== cmd.storyId),
                lastStories: [...state.stories]
            }
        case ADD_STORY:
            return {
                ...state,
                stories: [...state.stories, cmd.story]
            }
        case UPDATE_STORY:
            return {
                ...state,
                stories: state.stories.map(story => story.id === cmd.story.id ? cmd.story : story)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case UNDO_STORIES:
            return {
                ...state,
                stories: [...state.lastStories]
            }
        default:
            return state


    }
}

