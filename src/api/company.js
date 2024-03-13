import request from "../util/request";
export const getCompany=(params)=>{
    return request({
        url:"/company",
        method:"get",
        params
    })
}
export const add_review=(data)=>{
    return request({
        url:"/company",
        method:"post",
        data
    })
}