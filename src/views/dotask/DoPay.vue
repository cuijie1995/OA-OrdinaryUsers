<template>
    <div>
        <van-nav-bar title="收款查看" left-text="返回" left-arrow @click-left="$router.push('dopayment')" />
        <div class="content">
            <van-collapse v-model="activeNames" v-for="(item,index) in datas" :key="index">
                <van-collapse-item :name="index">
                    <div slot="title">
                        <ul class="name">
                            <li>{{item.ctransubject}}</li>
                            <li>{{item.cpaymentname}}</li>
                        </ul>
                    </div>
                    <ul class="detail">
                        <li>
                            <p>收款银行</p>
                            <span>{{item.cbanknamerec}}</span>
                        </li>
                        <li>
                            <p>收款币别：</p>
                            <span>{{item.ccurrency}}</span>
                        </li>
                        <li>
                            <p>收款金额</p>
                            <span>{{item.nforeignamt}}</span>
                        </li>
                    </ul>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="no" v-if="datas.length == 0" style="text-align: center;">
            暂无信息
        </div>
    </div>
</template>
<script>
    export default {
        name: "DoPay",
        data() {
            return {
                activeNames: [],
                oid: "",
                datas: []
            }
        },
        mounted() {
            this.getPage()
        },
        methods: {
            getPage() {
                this.oid = localStorage.getItem("id")
                this.$axios.get(this.url +"/api/Payment/PayInformation", { params: { KEYOID: this.oid } }).then(res => {
                    this.datas = res.data
                }).catch(err => {
                    console.log(err)
                })
            }

        },
    }
</script>
<style scoped>
    .no {
        padding-top: 60px
    }

    .content .name {
        overflow: hidden;
        margin-top: 15px
    }

    .content .name li {
        float: left;
        font-size: 14px;
        padding: 8px 0;
        text-align: center;

    }

    .content .name li:first-child {
        width: 60%;

    }

    .content .detail li {
        font-size: 0.8rem;
        border-bottom: 1px solid #cccacb;
        padding: 5px 0;
    }

    .content .detail li p {
        display: inline-block;
        width: 30%;
        padding-left: 8%;
        margin: 0;

    }

    .content .detail li p:first-child {
        text-align: left
    }
</style>
<style>
    .van-cell {
        padding: 0;
    }

    .van-cell__right-icon {
        display: none
    }
</style>