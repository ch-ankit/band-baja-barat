const initialState={
    uid:null,
    vatNo: null
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
        case 'VatNo':
                return{
                    vatNo:action.payload
                }
        default:
            return state;
    }
}