import request from "../util/request";

export const login=async (data)=>{
    let res=await request({
        url:"/login",
        method:"post",
        data
    })
    data=res.data
    if(data.status==200){
        let token=data.data.token
        localStorage.setItem("TOKEN",token)
        return data.message
    }
    return Promise.reject(data.message)
}
export const signup=async (data)=>{
    let res=await request({
        url:"/register",
        method:"post",
        data
    })
    data=res.data
    if(data.status==200){
        return data.message
    }
    return Promise.reject(data.message)
}


export const getProfile= () =>{
    return request({
        url:"/profile",
        method:"get"
    })
}
export const saveProfile= (data) =>{
    return request({
        url:"/profile",
        method:"post",
        data
    })
}