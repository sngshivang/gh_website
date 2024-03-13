<template>
  <div class="container page">
 
    <div class="content">
        <div class="row logo-row">
            <div class="col-md-3 logo"><logo></logo></div>
        </div>
        <div class="row">
            <div class="signIn col-md-3 button"><button class="btn btn-primary" @click="handlesignup">sign up</button></div>
        </div>
        <div class="row">
            <div class="signUp col-md-3 button"><button class="btn btn-primary"  @click="handlelogin">sign in</button></div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
   .page{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #0288D1;
    .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 0.1rem solid black;
    border-radius: 1rem;
    background-color: #B3E5FC;
    .row{
        display: flex;
        justify-content: center;
        font-size: 2rem;
        .button{
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            button{
                width: 9rem;
                font-size: 1.3rem;
            }
        }
        &:first-child
        {
            margin: 5rem;
        }
        &{
            margin-bottom: 2rem;
        }
    }
   }
   }
   
</style>

<script setup lang="ts">
import logo from "../components/logo.vue"
import {ref} from "vue"
import { useRouter } from "vue-router";
const router=useRouter()
let query=router.currentRoute.value.query

let handlesignup=()=>{
    router.push(
        {
            path:"/register",
            query
        }
    )
}
let handlelogin=()=>{
    router.push(
        {
            path:"/login",
            query
        }
    )
}

</script>