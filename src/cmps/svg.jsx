export const storySvg = {
    threeDots: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="three-dots"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
        </svg>
    ),
    save: (color = "none") => (
        // <svg 
        //     xmlns="http://www.w3.org/2000/svg" 
        //     fill={color} 
        //     viewBox="0 0 24 24" 
        //     strokeWidth="1.5" 
        //     stroke="currentColor" 
        //     className="size-6"
        // >
        //     <path 
        //         strokeLinecap="round" 
        //         strokeLinejoin="round" 
        //         d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" 
        //     />
        // </svg>

        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            aria-label="Save" 
            className="x1lliihq x1n2onr6 x5n08af" 
            fill={color} 
            height="24" 
            role="img" 
            viewBox="0 0 24 24" 
            width="24">
            <polygon 
                fill={color} 
                points="20 21 12 13.44 4 21 4 3 20 3 20 21" 
                stroke="currentColor" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"/>
        </svg>
    ),
    comment: (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            aria-label="Comment" 
            className="x1lliihq x1n2onr6 x5n08af" 
            fill="currentColor" 
            height="24" 
            role="img" 
            viewBox="0 0 24 24" 
            width="24">
            <path 
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" 
                fill="none" 
                stroke="currentColor" 
                stroke-linejoin="round" 
                stroke-width="2"/>
        </svg>
    ),
    like: (color = "none") => (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill={color} 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke={color === "red" ? color : "currentColor"}>
            
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
            />
        </svg>

        // <svg
        // fill="currentColor" className="like-icon" 
        //     xmlns="http://www.w3.org/2000/svg" 
        //     aria-label="Like" 
        //     height="24" 
        //     role="img" 
        //     viewBox="0 0 24 24"
        //     width="24">
        //     <path 
        //         d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
        // </svg>
    )
};
