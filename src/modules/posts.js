import * as postsAPI from '../api/posts';
import {reducerUtils, createPromiseThunk, handleAsyncActions } from '../lib/asyncUtils'

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

// const initialState = {
//     posts : {
//         loading : false,
//         data : null,
//         error:null
//     },
//     post : {
//         loading : false,
//         data : null,
//         error : null
//     }
// }

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
    posts: reducerUtils.initial(),
    post: reducerUtils.initial()
  };

/* thunk를 이용한 액션 함수 */

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
/* 
export const getPosts = () => async dispatch => {
    dispatch({ type: GET_POSTS});

    try {
        const posts = await postsAPI.getPosts();
        dispatch({ type : GET_POSTS_SUCCESS, posts});
    } catch (e) {
        dispatch({type : GET_POSTS_ERROR, error : e})
    }
}

export const getPost = (id) => async dispatch => {
    dispatch({ type: GET_POST});

    try {
        const post = await postsAPI.getPost();
        dispatch({ type : GET_POST_SUCCESS, post});
    } catch (e) {
        dispatch({type : GET_POST_ERROR, error : e})
    }
}
*/

//action function ReFactoring [make thunk function ]
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById)

export const clearPost = () => ( {type : CLEAR_POST });

//Reducer
//original reducer
/*export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS :
            return {
                ...state,
                posts : {
                    loading :true,
                    data : null,
                    error:null
                }
            };
        case GET_POSTS_SUCCESS :
            return {
                ...state,
                posts : {
                    loading :false,
                    data : action.posts,
                    error:null
                }
            };
        case GET_POSTS_ERROR :
            return {
                ...state,
                posts : {
                    loading :false,
                    data : null,
                    error:action.error
                }
            };
        case GET_POST :
            return {
                ...state,
                post : {
                    loading :true,
                    data : null,
                    error:null
                }
            };
        case GET_POST_SUCCESS :
            return {
                ...state,
                post : {
                    loading :false,
                    data : action.post,
                    error:null
                }
            };
        case GET_POST_ERROR :
            return {
                ...state,
                post : {
                    loading :false,
                    data : null,
                    error:action.error
                }
            };

        default : return state;
    }
}
*/
//reducer simple  
/*export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS :
            return {
                ...state,
                posts : reducerUtils.loading()
            };
        case GET_POSTS_SUCCESS :
            return {
                ...state,
                posts : reducerUtils.success(action.payload)
            };
        case GET_POSTS_ERROR :
            return {
                ...state,
                posts : reducerUtils.error(action.error)
            };
        case GET_POST :
            return {
                ...state,
                post :reducerUtils.loading()
            };
        case GET_POST_SUCCESS :
            return {
                ...state,
                post :reducerUtils.success(action.payload)
            };
        case GET_POST_ERROR :
            return {
                ...state,
                post : reducerUtils.error(action.error)
            };

        default : return state;
    }
}
*/

export default function posts(state = initialState, action) {
    switch (action.type) {
    // case GET_POSTS:
    // case GET_POSTS_SUCCESS:
    // case GET_POSTS_ERROR:
    //     const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
    //     return postsReducer(state, action);
      case GET_POSTS:
      case GET_POSTS_SUCCESS:
      case GET_POSTS_ERROR:
        return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
      case GET_POST:
      case GET_POST_SUCCESS:
      case GET_POST_ERROR:
        return handleAsyncActions(GET_POST, 'post')(state, action);
      case CLEAR_POST :
          return {
              ...state,
              post : reducerUtils.initial() /*기존 포스트 내용 초기화 처리 */
          }  
      default:
        return state;
    }
  }