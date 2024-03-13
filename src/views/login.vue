<template>
    <div class="row logo-row">
            <div class="col-md-2 logo">
                <logo></logo>
            </div>
            </div>

    <div class="row header-row">
        <div class="col-md-3 header">
            Log In
        </div>
    </div>
    <div class="container page">
        <div class="row">
            <el-button type="primary" :icon="ArrowLeft" @click="toSignup">signup</el-button>
        </div>
        <div class="content">
            <div class="row">
                <div class="col-md-4">
                    <el-form :model="loginform">
                        <el-form-item label="Email" :label-width="120">
                            <el-input v-model="loginform.email" autocomplete="off" placeholder="Email" />
                        </el-form-item>
                        <el-form-item label="Password" :label-width="120">
                            <el-input v-model="loginform.password" placeholder="Password" type="password" />
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3 footer">
                        <el-button type="primary" @click="handleLogin">
                            Log In
                        </el-button>
                </div>

            </div>
        </div>

    </div>
</template>



<style lang="scss" scoped>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0288D1;

    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        border: 0.1rem solid black;
        border-radius: 1rem;
        background-color: #B3E5FC;

        .row {
            display: flex;
            justify-content: center;
            font-size: 2rem;

            .footer{
                display: flex;
                justify-content: center;
        }

            &:first-child {
                margin: 5rem;
            }

            & {
                margin-bottom: 2rem;
            }

            &.logo-row{
                justify-content: flex-start;
                
            }
           
        }
       
    }
}
.logo{
            margin-left: 2rem;
            margin-bottom: 1rem;
        }

.header-row{
    display: flex;
    justify-content: center;
    align-items: center;
    .header{
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}
}        

</style>

<script setup lang="ts">
import { ref } from "vue"
import logo from "../components/logo.vue";
import { login } from "../api/user";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
import {ArrowLeft} from "@element-plus/icons-vue"
const router=useRouter()
let query=router.currentRoute.value.query
let loginform = ref({
    email: "",
    password: ""
})
let toSignup=()=>{
    router.push(
        {
            path:"/register",
            query
        }
    )
}
let handleLogin=async()=>{
   
    let result=await login(loginform.value)
    
    router.push({
        path:query&&query.next?query.next:"/"
    })

    
    

}
</script>