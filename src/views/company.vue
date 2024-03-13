<template>
    <div class="row">
        <div class="col-md-2 left">
            <div class="filter">
                <div class="row">
                    <div class="col-md-12">
                        <el-form-item label="Industry:">
                            <el-select v-model="filterParams.industry" placeholder="Industry">
                                <el-option v-for="item in industryOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                    </div>

                </div>
                <div class="row">
                    <div class="col-md-12">
                        <el-form-item label="Rating:">
                            <el-select v-model="filterParams.rating" placeholder="Rating">
                                <el-option v-for="item in ratingOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                    </div>
                </div>

            </div>
            <div class="add">
                <div class="row">
                    <el-button :icon="Plus" @click="dialogFormVisible = true">Add Review</el-button>
                </div>
            </div>
        </div>
        <div class="col-md-10 right">
            <el-scrollbar class="scoll">
                <div class="container">

                    <div class="row">
                        <div class="col-md-9 search">
                            <div class="row">
                                <div class="col-md-9"><el-input v-model="filterParams.keyword" placeholder="Company Name"></el-input></div>
                                <div class="col-md-3"><el-button type="primary" @click="handleFilter">
                                        <el-icon style="vertical-align: middle">
                                            <Search />
                                        </el-icon>
                                        <span style="vertical-align: middle"> Search </span>
                                    </el-button></div>
                            </div>

                        </div>
                    </div>
                    <div class="row companys">

                        <div class="row company-info" v-for="company in company_list">
                            <div class="row">
                                <div class="col-md-3 companyname">{{ company.name }}</div>
                                <div class="col-md-3">average_rating: {{ company.average_rating.toFixed (2) }}</div>
                                <div class="col-md-3">Size: {{ company.size }}</div>
                                <div class="col-md-3">Industry: {{ company.industry }}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">{{ company.description }}</div>
                            </div>
                            <template v-if="company.average_review">
                                <div class="row">
                                <div class="col-md-12">average__review:</div>
                            </div>
                            <div class="row">
                                <div class="col-md-10">{{ company.average_review.comment}}</div>
                            </div>
                            
                            </template>
                           
                        </div>
                    </div>

                </div>
            </el-scrollbar>
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" width="500" center>
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass" class="title">Add Review</h4>

            </div>
        </template>
       
        <div class="container dialog-container">

            <div class="row">
                <div class="label col-md-4">
                    <span>Company</span>
                </div>
                <div class="col-md-6"><el-select v-model="reviewform.company_id" autocomplete="off" placeholder="Please select a Company">
                    <el-option :label="company.name" :value="company.company_id" v-for="company in company_list" :key="company.company_id"/>
                    </el-select></div>
            </div>
            <div class="row">
                <div class="label col-md-4">
                    <span>Rating</span>
                </div>
                <div class="col-md-6">
                        <el-rate v-model="reviewform.rating" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" /></div>
            </div>
            <div class="row">
                <div class="label col-md-4">
                    <span>Review</span>
                </div>
                <div class="col-md-6"><el-input v-model="reviewform.review" autocomplete="off" type="textarea"
                        :rows="3" />
                </div>
            </div>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleAddReview">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


<style lang="scss" scoped>
.dialog-container {
    border: 0.1rem solid #BDBDBD;
    border-radius: 1rem;

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
    justify-content: center;

    .left {
        .filter {
            margin-top: 10rem;

            .row {
                margin-bottom: 3rem;
            }

        }

        .add {
            margin-top: 9rem;

            .row {
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;


            }
        }
    }

    .right {
        height: 40rem;

        .container {
            padding: 2rem;
            border: 0.1rem solid black;
            border-radius: 2rem;

            .row {
                display: flex;
                justify-content: center;
                align-items: center;

                .search {
                    justify-content: center;
                    align-items: center;
                }


            }

            .companys {
                .company-info {
                    margin-top: 1rem;
                    border: 0.1rem solid black;
                    border-radius: 1rem;

                    .row:first-child {
                        margin-bottom: 3rem;

                        .companyname {
                            font-size: 1.2rem;
                            font-weight: bold;
                        }
                    }

                    .row:nth-child(2) {
                        margin-bottom: 2rem;
                    }

                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { getCompany,add_review } from '../api/company';

import { onMounted, ref } from 'vue';


let company_list = ref([])

let get_company_list = async (params) => {
    console.log(2)
    let result = await getCompany(params)
    company_list.value = result.data.data.company_list
}


onMounted(() => {
    console.log(1)
    get_company_list()
})

let filterParams = ref({
    keyword: "",
    industry: "",
    rating: ""
})
let industryOptions = [
    {
        label: "ALL",
        value: "ALL"
    },
    {
        label: "Computer",
        value: "Computer",
    },
    {
        label: "Construction",
        value: "Construction",
    },
    {
        label: "Finance",
        value: "Finance",
    },
    {
        label: "Management",
        value: "Management",
    },
    {
        label: "Catering",
        value: "Catering"
    }
]
let ratingOptions = [
    {
        label: "ALL",
        value: "ALL"
    },
    {
        label: "0-1",
        value: "0-1"
    },
    {
        label: "1-2",
        value: "1-2"
    },
    {
        label: "2-3",
        value: "2-3"
    },
    {
        label: "3-4",
        value: "3-4"
    },
    {
        label: "4-5",
        value: "4-5"
    },
]

let handleFilter = () => {
    get_company_list(filterParams.value)
}


let dialogFormVisible = ref(false)
let reviewform = ref({
    "company_id": "",
    "rating": 3,
    "review": ""

})
const handleAddReview=async()=>{
    await add_review(reviewform.value)
    reviewform.value={
    "company_id": "",
    "rating": 3,
    "review": ""
}
    dialogFormVisible.value=false
}


</script>