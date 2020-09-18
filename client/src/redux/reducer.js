const initialState = {
    uid: null,
    vatNo: null,
    userData: null,
    userEmail: null,
    hostUid: null,
    updateMessage: null,
    paid: null,
    eventData:null,
    isAdmin: null,
}

export const reducerr = (state = initialState, action) => {
    switch (action.type) {
        case 'UserLog':
            return {
                ...state,
                uid: action.payload,
                isAdmin: false
            }
        case 'UserData':
            return {
                ...state,
                userData: action.payload
            }
        case 'UserEmail':
            return {
                ...state,
                userEmail: action.payload,

            }
        case 'EventData':
            return{
                ...state,
                eventData: action.payload
            }

        case 'VatNo':
            return {
                ...state,
                vatNo: action.payload
            }
        case 'Hostuid':
            return {
                ...state,
                hostUid: action.payload,
                isAdmin: false
            }
        case 'UpdateSubtotal':
            return {
                ...state,
                updateMessage: action.message
            }
        case 'UpdatePaid':
            return {
                ...state,
                paid: action.data
            }
        case 'SetAdmin':
            return {
                ...state,
                isAdmin: action.result
            }
        default:
            return { ...state }
    }
}