import axios from "axios"
import { ElMessage } from 'element-plus'

import router from "../router/index.js"; // 这边进行路由的导入
console.log(import.meta.env)
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    headers: {
        'Content-Type': 'application/json', // 设置初始请求头
    },
    timeout: 5000
})

request.interceptors.request.use(config=>{
    config.headers.TOKEN=localStorage.getItem("TOKEN")
    return config
})
request.interceptors.response.use(
    response => {
        let data=response.data
        if(data.status==200){
            if(data.message=="success"){
                return response
            }
            ElMessage({
                type:"success",
                message:data.message
            })
            return response
        }
        
        ElMessage({
            type:"error",
            message:data.message
        })
        return Promise.reject(data.message);

        
        
        
    },
    error => {
        let response=error.response
        console.log(response)
        if(response.status==403){
            ElMessage({
                type:"error",
                message:response.data.detail
            })
            router.push({path:'/home', query:{next:'/company' }})
        }
        
 
        return Promise.reject(error);
    }
);

export default request
