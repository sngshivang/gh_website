<template>
    <div class="container">
        <myheader :current="current" @changecurrent="changecurrent"></myheader>
        <router-view></router-view>
    </div>
</template>


<style lang="scss" scoped>
    
</style>

<script setup lang="ts">
import myheader from '../components/myheader.vue';
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
let router=useRouter()

let current=ref("Company")
watchEffect(()=>{
    let path=router.currentRoute.value.path.replace("/","")
    current.value=path.slice(0,1).toUpperCase() +path.slice(1)
}
   
)

let changecurrent=(value)=>{
    router.push({
        path:"/"+value.toLowerCase()
    })
}
</script>