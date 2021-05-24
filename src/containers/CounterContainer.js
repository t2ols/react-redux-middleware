import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { 
       //increase, decrease, 
         increaseAsync, decreaseAsync } from '../modules/counter'; //reducer

function CounterContainer(){
    const number = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const onIncrease = () => {
        // dispatch(increase());
        dispatch(increaseAsync());  //use thunk
    };

    const onDecrease = () => {
        // dispatch(decrease());
        dispatch(decreaseAsync());  //use thunk
    };

    return (
        <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
    );

}

export default CounterContainer;

