//Promise에 기반한 Thunk를 만들어주는 함수입니다.
export const createPromiseThunk = (type, promiseCreator) => {

    console.log(`call thunk ${type}`)

    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        //요청 시작
        dispatch({type, param});
        try {
            //결과물의 이름을 payload라는 이름으로 통일 시킵니다.
            const payload = await promiseCreator(param);
            dispatch({type : SUCCESS, payload}); //성공
        } catch (e) {
            dispatch({ type : ERROR, payload : e, error : true}); //실패
        }
    }
}

//리듀서에서 사용 할 수 있는 여러 유틸 함수들입니다.[refactoring]
export const reducerUtils = {
    //초기 상태. 토기 data 값은 기본적으로 null이지만
    //바꿀 수도 있습니다.
    initial : (initialdata = null) => ({
        loading : false,
        data : initialdata,
        error:null
    }),
    loading : (prevState  = null ) => ({
        loading : true,
        data : prevState,
        error: null
    }),
    success : payload => ({
        loading :false,
        data : payload,
        error:null
    }),
    error : error => ({
        loading : false,
        data : null,
        error : error
    })
}

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.[refactoring]
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type, key, keepData = false ) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (state, action) => {
        switch (action.type) {
            case type :
                return {
                    ...state,
                    [key]:reducerUtils.loading(keepData ? state[key].data : null)
                }
            case SUCCESS : 
                return {
                    ...state,
                    [key]:reducerUtils.success(action.payload)
                }
            case ERROR : 
                return {
                    ...state,
                    [key]:reducerUtils.error(action.payload)
                }
            default : return state;
        }
    }
}