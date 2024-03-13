<template>
    <div class="row logo-row">
        <div class="col-md-2 logo">
            <logo></logo>
        </div>
    </div>

    <div class="row header-row">
        <div class="col-md-3 header">
            SignUp
        </div>
    </div>
    <div class="container page">

        <div class="content">

            <div class="row">
                <div class="col-md-4 picture-col">
                    <el-upload class="avatar-uploader" :action="UPLOAD_URL" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <span>Upload Picture</span>
                </div>
                <div class="col-md-6">
                    <el-form :model="signupform">
                        <el-form-item label="Name" :label-width="120">
                            <el-input v-model="signupform.username" autocomplete="off" placeholder="Name" />
                        </el-form-item>
                        <el-form-item label="Email" :label-width="120">
                            <el-input v-model="signupform.email" autocomplete="off" placeholder="Email" />
                        </el-form-item>
                        <el-form-item label="Password" :label-width="120">
                            <el-input v-model="signupform.password" placeholder="Password" type="password" />
                        </el-form-item>
                        <el-form-item label="EnsurePassword" :label-width="120">
                            <el-input v-model="signupform.password_sure" placeholder="EnsurePassword" type="password" />
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3 footer">
                    <el-button type="primary" @click="handleRegister">
                        SignUp
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

            .footer {
                display: flex;
                justify-content: center;
            }

            &:first-child {
                margin: 5rem;
            }

            & {
                margin-bottom: 2rem;
            }

            &.logo-row {
                justify-content: flex-start;

            }

        }

        .picture-col {
            text-align: center;

            .avatar {
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                border: 0.1rem solid black;
            }

            .avatar-uploader-icon {
                width: 8rem;
                font-size: 8rem;
                border-radius: 50%;
                border: 0.1rem solid black;
                transition: .3s;

               
                

            }
             &:hover {
                    color: #0288D1;
                    
                }

            
        }


    }
}

.logo {
    margin-left: 2rem;
    margin-bottom: 1rem;
}

.header-row {
    display: flex;
    justify-content: center;
    align-items: center;

    .header {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
    }
}
</style>

<script setup lang="ts">
import { ref } from "vue"
import logo from "../components/logo.vue";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { signup } from "../api/user";
import { useRouter } from "vue-router";
const router=useRouter()
let query=router.currentRoute.value.query
let signupform = ref({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    password_sure:""
})
let UPLOAD_URL = import.meta.env.VITE_APP_BASE_API+import.meta.env.VITE_APP_UPLOAD_API
const imageUrl = ref('')

const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    let url=response.imgurl
    imageUrl.value = url
    signupform.value.imageUrl=url
}

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

const handleRegister=async()=>{
  
    console.log(signupform.value)
    let result=await signup(signupform.value)
   
    router.push({
        path:"/login",
        query
    })
    

}
</script>