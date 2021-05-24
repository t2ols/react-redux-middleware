//redux-logger
const Logger = store => next => action => {
    console.log(action);
    const result = next(action);

    console.log('\t', store.getState());
    return result;
}

export default Logger;