import React from 'react';
import {Link} from 'react-router-dom'

function PostList({posts}) {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id} >
                    {post.title} <Link to={`/${post.id}`}> <button>이동</button> </Link>
                </li>
            ))}
        </ul>
    )
}

export default PostList;