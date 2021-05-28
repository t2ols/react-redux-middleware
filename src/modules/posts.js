import * as postsAPI from '../api/posts';
import {reducerUtils
    //  , createPromiseThunk
     , handleAsyncActions
    //  , createPromiseThunkById
     , handleAsyncActionsById, 
    //  createPromiseThunk,
     createPromiseSaga,
     createPromiseSagaById} from '../lib/asyncUtils'

import {put, call, takeEvery} from 'redux-saga/effects'     

/* 액션 타입 */

//포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

//포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

const CLEAR_POST = 'CLEAR_POST'



// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
// cache 사용을 위해 post는 빈 객체
const initialState = {
    posts: reducerUtils.initial(),
    // post: {reducerUtils.initial()}
    post: {}
  };

/* thunk를 이용한 액션 함수 */

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.

export const clearPost = () => ( {type : CLEAR_POST });

//action function ReFactoring [make thunk function ]
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);


export const getPosts = () => ({ type: GET_POSTS });
// payload는 파라미터 용도, meta는 리듀서에서 id를 알기위한 용도
export const getPost = id => ({ type: GET_POST, payload: id, meta: id });



const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

// 사가들을 합치기
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsById(GET_POST, 'post', true);

export default function posts(state = initialState, action) {
    switch (action.type) {
      case GET_POSTS:
      case GET_POSTS_SUCCESS:
      case GET_POSTS_ERROR:
        return getPostsReducer(state, action);
      case GET_POST:
      case GET_POST_SUCCESS:
      case GET_POST_ERROR:
        return getPostReducer(state, action);
      case CLEAR_POST :
          return {
              ...state,
              post : reducerUtils.initial() /*기존 포스트 내용 초기화 처리 */
          }  
      default:
        return state;
    }
  }
