<template>
    <div class="container">
        <div class="row content">
            <div class="col-md-4 left">
                <div class="col-md-1">
                    <el-button type="primary" @click="handlelogout">logout</el-button>
                </div>
                <div class="col-md-4 picture-col">
                    <el-upload class="avatar-uploader" :action="UPLOAD_URL" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imgurl" :src="imgurl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <div class="span">Edit Picture</div>
                </div>
            </div>
            <div class="col-md-8 right">
                <div class="row userContainer">
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-2">Name</div>
                            <div class="col-md-6"><el-input v-model="userForm.username"></el-input></div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">Email</div>
                            <div class="col-md-6"><el-input v-model="userForm.email"></el-input></div>
                        </div>
                        <div class="row">
                            <div class="col-md-2"><el-button type="primary" @click="handleSaveUser">Save</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row history-header">
                    <div class="col-md-5">POST HISTORY</div>
                </div>
                <div class="row POST">
                    
                    <div class="row post-item" v-for="review in userForm.reviews">
                        <div class="row company_name">{{ review.company_name }}</div>
                        <div class="row">comment:{{review.comment}}</div>
                        </div>
                    
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.container {
    .content {
        .left {
            align-items: center;
            justify-content: center;

            .picture-col {
                margin-top: 5rem;
                margin-left: 8rem;
                text-align: center;
                justify-content: center;
                align-items: center;

                .span {
                    margin-left: 1.1rem;
                }

                .avatar {
                    width: 10rem;
                    height: 10rem;
                    border-radius: 50%;
                    border: 0.1rem solid black;
                }

                .avatar-uploader-icon {
                    width: 10rem;
                    font-size: 10rem;
                    border-radius: 50%;
                    border: 0.1rem solid black;
                    transition: .3s;




                }

                &:hover {
                    color: #B2EBF2;

                }


            }
        }

        .right {
            padding-left: 3rem;
            padding-right: 3rem;
           
            .row {

                &.POST{
                margin-top: 1rem;
                border: 0.1rem solid black;
                border-radius: 1rem;
                padding-left: 2rem;
                padding-right: 2rem;
                padding-top: 1rem;
                max-height: 18rem;
                overflow-y: auto;
                
                .post-item{
                    border: 0.1rem solid black;
                    border-radius: 1rem;
                    margin-bottom: 1rem;
                    .company_name{
                        font-size: 1.2rem;
                        font-weight: bold;
                    }
                }
            }

                &.userContainer {
                    margin-top: 3rem;
                    justify-content: center;
                    align-items: center;

                    .col-md-9 {
                        border: 0.1rem solid black;
                        border-radius: 1rem;

                        .row {
                            margin-left: 5rem;
                            justify-content: center;
                            align-items: center;

                            &:first-child {
                                margin-top: 2rem;
                                margin-bottom: 3rem;
                            }

                            &:nth-child(2) {
                                margin-bottom: 0.9rem;
                            }

                            &:nth-child(3) {
                                margin-bottom: 0.9rem;
                            }
                        }

                    }


                }

                &.history-header {
                    margin-top: 2.5rem;
                    border: 0.1rem solid black;
                    border-radius: 1rem;
                    text-align: center;

                    .col-md-5 {
                        margin-top: 1rem;
                        margin-bottom: 1.2rem;
                        font-size: 1rem;
                        font-weight: bold;
                    }
                }


            }
        }

    }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProfile, saveProfile } from "../api/user"
import { useRouter } from 'vue-router';
const router=useRouter()
let UPLOAD_URL = import.meta.env.VITE_APP_BASE_API+import.meta.env.VITE_APP_UPLOAD_API
let handlelogout=()=>{
    localStorage.removeItem("TOKEN")
    router.push({
        path:"/home"
    })
}
let imgurl = ref("")
const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    let url = response.imgurl

    imgurl.value = url
    userForm.value.picture = url
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
let userForm = ref({
    username: "",
    email: "",
    picture: "",
    reviews: []
})

let handleGetProfile = async () => {
    let response = await getProfile()
    userForm.value = response.data.data
    imgurl.value = userForm.value.picture
}
onMounted(() => {
    handleGetProfile()
})


let handleSaveUser = async () => {
    let { username, email, picture } = userForm.value
    await saveProfile({ username, email, picture })
    handleGetProfile()
}

</script>