const initialState={
    uid:null,
    vatNo: null,
    userData:null
}

export const reducerr=(state=initialState,action)=>{
    switch (action.type){
        case 'UserLog':
            return {
                uid:action.payload
            }
        case 'UserData':
            return{
                userData: action.payload
            }
        
        case 'VatNo':
                return{
                    vatNo:action.payload
                }
        default:
            return state;
    }
}