import React from 'react';
import PostContainer from '../containers/PostContainer';

function PostPage({match}){
    const {id} = match.params; //URL 파라미터 조회하기
    return <PostContainer postId={parseInt(id,10)}></PostContainer>;
}

export default PostPage;
