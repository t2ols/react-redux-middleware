//counter reducer
//액션 타입
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수
export const increase = () => ({type : INCREASE });
export const decrease = () => ({type : DECREASE });


//redux - thunk
export const increaseAsync = () => dispatch => {
    console.log('thunk func increase Async')
    setTimeout(() => dispatch(increase()), 1000)
};

export const decreaseAsync = () => dispatch => {
    console.log('thunk func decrease Async')
    setTimeout(() => dispatch(decrease()), 1000)
};

//초깃값
const initialState = 0;

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE :
            return state + 1;
        case DECREASE :
            return state - 1;
        default :
            return state;
    }
}

