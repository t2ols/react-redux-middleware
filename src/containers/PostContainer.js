import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../modules/posts';
import Post from '../components/Post';
import { reducerUtils } from '../lib/asyncUtils';

function PostContainer({postId}) {
    const { data, loading, error } = useSelector(
        state => state.posts.post[postId] || reducerUtils.initial()
    ); //초기 빈값에 대한 처리 필요
    const dispatch = useDispatch();

    useEffect(() => {

        if (data) return ; //기존 로딩 후 데이터가 좀재하면
        dispatch(getPost(postId));

        //unmount 할때 호출 됨 postId 변경되기 전
        // return () => {
        //     // dispatch(clearPost());
        // }
    }, [postId, dispatch, data] );

    
    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;
  
    return <Post post={data} />;
}

export default PostContainer;