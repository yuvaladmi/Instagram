import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { followUser, unFollowUser } from "../store/actions/user.actions"

export function FollowBtn({ targetUserId }) {
//   const dispatch = useDispatch()
  const currentUser = useSelector(store => store.userModule.loggedInUser)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (currentUser?.following) {
      setIsFollowing(currentUser.following.includes(targetUserId))
    }
  }, [currentUser, targetUserId])

  async function handleClick() {
    try {
        if(!isFollowing)
            await followUser(targetUserId)
        else await unFollowUser(targetUserId)
    } catch (err) {
      console.error('Failed to toggle follow:', err)
    }
  }

  return (
    <button onClick={handleClick}>
      <p>{isFollowing ? "Unfollow" : "Follow"}</p>
    </button>
  )
}
