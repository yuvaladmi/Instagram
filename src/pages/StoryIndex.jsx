
import { StoriesList } from '../cmps/StoriesList.jsx'
import { Outlet } from "react-router";

export function StoryIndex() {
    
    return (
        <main className="story-index">
            <StoriesList />
            <Outlet />
        </main>

    )
}