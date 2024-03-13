<template>
    <div class="row">
        <div class="col-md-1"><logo></logo></div>
        <div class="col-md-3 item" :class="{ active: current=='Company'}" @click="changecurret('Company')"><div class="name">Company</div></div>
        <div class="col-md-3 item" :class="{ active: current=='Salary'}" @click="changecurret('Salary')"><div class="name">Salary</div></div>
        <div class="col-md-3 item" :class="{ active: current=='Profile'}" @click="changecurret('Profile')"><div class="name">Profile</div></div>
    </div>
</template>


<style lang="scss" scoped>
    .item{
       
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 3rem;
        transition: .3s;
        cursor: pointer;
        border: 0.1rem solid  #BDBDBD;
        &:nth-child(2){
            margin-left: 3rem;
        }
        
        &:hover{
            background-color: #0097A7;
        }
        &.active{
            background-color: #B2EBF2;
            border: 0.1rem solid #757575;
        }
        .name{
            font-size: 2rem;
            font-weight: bold;
        }
    }
</style>

<script setup lang="ts">
import logo from './logo.vue';
import { ref} from 'vue';
defineProps(["current"])
const emit=defineEmits(["changecurrent"])

let changecurret=(value)=>{
    console.log(1,value)
    emit("changecurrent",value)
}

</script>