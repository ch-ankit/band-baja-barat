
export const actionCreate = (uid) => {
    return {
        type: 'UserLog',
        payload: uid
    }
}

export const EventData = (data) => {
    return {
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
export const HostEmail = (hostEmail) => {
    return {
        type: 'HostEmail',
        payload: hostEmail
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
    return {
        type: 'UpdatePaid',
        data: value
    }
}

export const SetAdmin = (value) => {
    return {
        type: 'SetAdmin',
        result: value
    }
}

export const Center = (value) => {
    return {
        type: 'Center',
        payload: {
            lat: value.latitude,
            lng: value.longitude
        }
    }
}

export const AdminLog = (value) => {
    return {
        type: 'AdminLog',
        value: value
    }
}

export const Search = (value) => {
    return {
        type: 'Search',
        payload: value
    }
}