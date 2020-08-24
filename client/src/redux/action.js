
export const actionCreate=(uid)=>{
    return {
        type:'UserLog',
        payload:uid
    }
}

export const actionvatNo=(vatNo)=>{
    return{
        type:'VatNo',
        payload:vatNo
    }
}

export const UserData=(userData)=>{
    return {
        type:'UserData',
        payload: userData
    }
}