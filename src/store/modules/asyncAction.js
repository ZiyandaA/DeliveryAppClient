const AsyncAction = (
    type,
    promise,
    successCallback = () => {},
    failureCallBack = () => {}
) => dispatch =>{
    dispatch({ type: `${type}_PENDING`});
    return promise
        .then((response) => {
            dispatch({ type: `${type}_FULFILLED`, payload: response.data});
            successCallback(response.data, dispatch);
            return response.data;
        })
        .catch((err) => {
            console.log('error:', err);
            console.log(err && err.response && err.response.data);
            dispatch({
                type: `${type}_REJECTED`,
                error: true,
                payload: err && err.response && err.response.data,
            });
            failureCallBack(err && err.response && err.response.data);
            return err;
        })
};

export default AsyncAction;
