const initialState={
    uid:null,
    vatNo: null,
    userData:null,
    userEmail: null,
    hostUid:null
}

export const reducerr=(state=initialState,action)=>{
    switch (action.type){
        case 'UserLog':
            return {
                ...state,
                uid:action.payload
            }
        case 'UserData':
            return{
                ...state,
                userData: action.payload
            }
            case 'UserEmail':
                return{
                    ...state,
                    userEmail: action.payload,
                    
                }
        
        case 'VatNo':
                return{
                    ...state,
                    vatNo:action.payload
                }
        case 'Hostuid':
            return{
                ...state,
                hostUid:action.payload
            }
        default:
            return{ ...state}
    }
}