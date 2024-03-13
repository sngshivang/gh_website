import request from "../util/request";
export const getSalary=(params)=>{
    return request({
        url:"/salary",
        method:"get",
        params
    })
}
export const addSalary=(data)=>{
    return request({
        url:"/salary",
        method:"post",
        data
    })
}
export const get_company_name=()=>{
    return request({
        url:"/company_name",
        method:"get"
    })
}
export const get_role_name=()=>{
    return request({
        url:"/role_name",
        method:"get"
    })
}
