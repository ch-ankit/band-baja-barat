const initialState={
    logIn:false,
    name:'Babin',
    signUp:false,
}

export const reducerr=(state=initialState,action)=>{
    switch (action.type){
        case 'LogIn':
            return {
                logIn:!state.logIn
            }
        case 'Name':
            return{
                name:'Bob'
            }
        case 'SignUp':
            return{
                signUp:!state.signUp
            }
        default:
            return state;
    }
}