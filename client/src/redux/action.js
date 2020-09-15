
export const actionCreate = (uid) => {
    return {
        type: 'UserLog',
        payload: uid
    }
}

export const EventData=(data)=>{
    return{
        type: 'EventData',
        payload: data
    }
}
export const actionvatNo = (vatNo) => {
    return {
        type: 'VatNo',
        payload: vatNo
    }
}

export const UserData = (userData) => {
    return {
        type: 'UserData',
        payload: userData
    }
}
export const UserEmail = (userEmail) => {
    return {
        type: 'UserEmail',
        payload: userEmail
    }
}
export const Hostuid = (uid) => {
    return {
        type: 'Hostuid',
        payload: uid
    }
}

export const UpdateSubtotal = (message) => {
    return {
        type: 'UpdateSubtotal',
        message: message
    }
}
export const UpdatePaid = (value) => {
    console.log(value)
    return {
        type: 'UpdatePaid',
        data: value
    }
}
