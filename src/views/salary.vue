<template>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="title col-md-4">
                    Salary Visualizations
                </div>
            </div>

            <div class="row">
                <div class="col-md-3"><span>Sort By</span></div>
                <div class="col-md-3"><el-select v-model="salaryFilter.role" placeholder="Role">
                                <el-option v-for="item in role_name" :key="item.role" :label="item.role_description"
                                    :value="item.role" />
                            </el-select></div>
                <div class="col-md-3"><el-select v-model="salaryFilter.company" placeholder="CompanyName">
                                <el-option v-for="item in company_name" :key="item.id" :label="item.name"
                                    :value="item.id" />
                            </el-select></div>
                <div class="col-md-2"><el-button :icon="Plus" @click="dialogFormVisible=true">Add Salary</el-button></div>
            </div>
            <div class="row split">

            </div>
            <div class="row">
                <div class="col-md-12 chart" ref="chart"></div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" width="500" center>
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass" class="title">Add Salary</h4>

            </div>
        </template>
       
        <div class="container dialog-container">

            <div class="row">
                <div class="label col-md-4">
                    <span>Company</span>
                </div>
                <div class="col-md-6"><el-select v-model="salaryform.company" autocomplete="off" placeholder="Please select a Company">
                    <el-option :label="company.name" :value="company.id" v-for="company in company_name" :key="company.id"/>
                    </el-select></div>
            </div>
            <div class="row">
                <div class="label col-md-4">
                    <span>Role</span>
                </div>
                <div class="col-md-6"><el-select v-model="salaryform.role" autocomplete="off" placeholder="Please select a Level">
                    <el-option :label="role.role_description" :value="role.role" v-for="role in role_name" :key="role.role"/>
                    </el-select></div>
            </div>
            <div class="row">
                <div class="label col-md-4">
                    <span>Base Pay</span>
                </div>
                <div class="col-md-6"><el-input v-model.number="salaryform.basepay"></el-input></div>
            </div>
            <div class="row">
                <div class="label col-md-4">
                    <span>Bonus Pay</span>
                </div>
                <div class="col-md-6"><el-input v-model.number="salaryform.bonuspay"></el-input></div>
            </div>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleAddSalary">
                    Submit
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


<style lang="scss" scoped>
.dialog-container {

    .row {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-evenly;

        &:first-child {
            margin-top: 1rem;
        }

        .label {
            border: 0.1rem solid #757575;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.my-header {
    display: flex;
    justify-content: center;

    .title {
        text-align: center;
    }
}
.row {
    .col-md-12 {
        .row {

            &:first-child {
                justify-content: center;
                text-align: center;
                margin-top: 2rem;

                .title {
                    font-size: 2rem;
                    font-weight: bold;
                }
            }

            &:nth-child(2) {
                justify-content: center;
                margin-bottom: 1rem;
                .col-md-2{
                    align-items: center;
                    justify-content: center;
                    // border: 1rem solid black;
                    margin-left: 2rem;

                }
                .col-md-3 {
                   
                    height: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;

                    
                }

                .col-md-3:first-child {
                    border: none;
                }

                .col-md-3:nth-child(2) {
                    margin-right: 4rem;
                }
            }

            &:nth-child(3) {
                height: 1rem;
                border: 0.2rem solid #212121;
                border-left: none;
                border-right: none;
            }

            &:nth-child(4) {
                justify-content: center;

                .chart {
                    height: 30rem;
                    margin-top: 1rem;
                }
            }

        }
    }
}
</style>

<script setup lang="ts">
import { onMounted, ref,watchEffect } from "vue"
import * as echarts from 'echarts';
import {getSalary,get_company_name,get_role_name,addSalary} from "../api/salary"
import { Plus } from '@element-plus/icons-vue'
let chart = ref();

let myChart;
let salary_split_list=["0-2000","2000-4000","4000-6000","6000-8000","8000-10000","10000-12000","12000-14000","14000-16000"]
let current_human_counts=ref([0,0,0,0,0,0,0,0])
let all_human_counts=ref([0,0,0,0,0,0,0,0])
let setOption=()=>{
    // 设置图表的配置项
    let option = {
        title: {
            text: 'Comparison of industry data'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['The value of the industry', 'Company']
        },
        xAxis: {
            type:"value",
            name:"Number of People",
           
        },
        yAxis: {
            type: 'category',
            name:"Salary(GBP)",
            data:salary_split_list
        },
        series: [
            {
                name: 'The value of the industry',
                type: 'bar',
                data: all_human_counts.value
            },
            {
                name: 'Company',
                type: 'bar',
                data: current_human_counts.value
            }
        ]
    };
    // 使用配置项设置图表
    myChart.setOption(option);
}
onMounted(() => {
    // 初始化 ECharts 实例
    myChart = echarts.init(chart.value,"dark");
    watchEffect(()=>{
        setOption()
    })
    
    window.onresize=()=>{myChart.resize()}
})


let company_name=ref([])
let role_name=ref([])
let salaryFilter=ref({
    role:"",
    company:"",
})

let handleSalary=async()=>{
    let response=await getSalary(salaryFilter.value)
    current_human_counts.value=response.data.data[0]
    all_human_counts.value=response.data.data[1]
}
onMounted(async()=>{
    let response=await get_company_name()
    company_name.value=response.data.data

    response=await get_role_name()
    role_name.value=response.data.data
    
    salaryFilter.value["company"]=company_name.value[0]["id"]
    salaryFilter.value["role"]=role_name.value[0]["role"]
    watchEffect(()=>{
        handleSalary()
    })
})


let salaryform=ref({
    role:"",
    company:"",
    basepay:"",
    bonuspay:""
})

let dialogFormVisible=ref(false)
let handleAddSalary=async()=>{
    await addSalary(salaryform.value)
    salaryform.value={
        role:"",
        company:"",
        basepay:"",
        bonuspay:""
    }
    dialogFormVisible.value=false
    handleSalary()
}
</script>