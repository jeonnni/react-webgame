import { useState } from "react"

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    return (
        <button onClick={ () => setLiked(true)} >
            {liked ? 'You like this.' : 'Like'}
        </button>
    )
}

export default LikeButton;