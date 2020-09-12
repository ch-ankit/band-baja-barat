const initialState = {
    uid: null,
    vatNo: null,
    userData: null,
    userEmail: null,
    hostUid: null,
    updateMessage: null,
    paid: null
}

export const reducerr = (state = initialState, action) => {
    switch (action.type) {
        case 'UserLog':
            return {
                ...state,
                uid: action.payload
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

        case 'VatNo':
            return {
                ...state,
                vatNo: action.payload
            }
        case 'Hostuid':
            return {
                ...state,
                hostUid: action.payload
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
        default:
            return { ...state }
    }
}