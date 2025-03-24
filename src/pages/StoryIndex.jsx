import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from "react-router-dom";
import { loadStories } from '../store/actions/story.actions.js'
import { StoriesList } from '../cmps/StoriesList.jsx'
// import { LikesModal } from '../cmps/likes-modal';
// import { LoginSwitch } from '../cmps/login-switch';
import { loadUsers } from  '../store/actions/user.actions.js';
// import { Suggestions } from '../cmps/sugesstion';
import { LoginSignup } from '../cmps/LoginSignup.jsx';

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const user = useSelector(storeState => storeState.userModule.user)
    const [likes, likesIsOpen] = useState([])
    const [userSwitch, switchIsOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (stories.length && user) return
        const fetchData = async () => {
            await loadStories()
            await loadUsers()
        }
        fetchData()
    }, [])

    function goToProfile() {
        navigate('/profile')
    }
    console.log('STORIES HEREEE', stories)
    console.log('USER HEREEE', user)

    // if (stories.length && !user) return <LoginSignup />

    if (!stories.length) return <div className="loading-page"><span className="loading"></span></div>
    return (
        <Fragment>
            <div className="nested-route">
                <Outlet />
            </div>
            {likes.length ? <LikesModal likesIsOpen={likesIsOpen} likes={likes} /> : null}
            {userSwitch ? <LoginSwitch switchIsOpen={switchIsOpen} /> : null}

            <div className='contant'>
                <StoriesList stories={stories} likesIsOpen={likesIsOpen} />
                {/* <StoriesList stories={stories.reverse()} likesIsOpen={likesIsOpen} /> */}
                {/* <Suggestions user={user} goToProfile={goToProfile} switchIsOpen={switchIsOpen} /> */}
            </div>
        </Fragment>
    )
}