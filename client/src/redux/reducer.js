const initialState={
    uid:null,
}

export const reducerr=(state=initialState,action)=>{
    switch (action.type){
        case 'UserLog':
            return {
                uid:action.payload
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