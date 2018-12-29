

const signupReducer = (state = [], action) => {
    console.log('action is', action);
    switch (action.type) {
        case 'SIGNUP_USER':
            return state.concat(action.payload)
        default:
        return state;
    }
};

export default signupReducer;


