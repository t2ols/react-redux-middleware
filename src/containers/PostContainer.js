import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, clearPost } from '../modules/posts'; //redux thunk
import Post from '../components/Post';

function PostContainer({postId}) {
    const { data, loading, error } = useSelector(state => state.posts.post);    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(postId));

        //unmount 할때 호출 됨 postId 변경되기 전
        return () => {
            dispatch(clearPost());
        }
    }, [postId, dispatch] );

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;
  
    return <Post post={data} />;
}

export default PostContainer;