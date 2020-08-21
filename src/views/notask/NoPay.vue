<template>
    <div class="nopay">
        <van-nav-bar title="收款查看" left-text="返回" left-arrow @click-left="$router.push('nopayment')" />
        <div class="content">
            <van-collapse v-model="activeNames" v-for="(item,index) in datas" :key="index" @change="onChange(index)"
                class="van" :class="{ul:keyIndex=== index && show}">
                <van-collapse-item :name="index">
                    <div slot="title">
                        <div v-if="index % 2 == 0" class="name">
                            <p style="font-size: 4vw;font-weight:600;">{{item.ctransubject}}</p>
                            <span style="font-size: 1.5vw;">{{item.cpaymentname}}</span>
                        </div>
                        <div v-if="index % 2 !== 0" class="nameli">
                            <p>{{item.ctransubject}}</p>
                            <span style="font-size: 1.5vw;">{{item.cpaymentname}}</span>
                        </div>
                    </div>
                    <ul class="detail">
                        <li>
                            <p style="display: inline-block;margin: 0;">收款银行：</p>
                            <span>{{item.cbanknamerec}}</span>
                        </li>
                        <li>
                            <p style="display: inline-block;margin: 0;">收款币别：</p>
                            <span>{{item.ccurrency}}</span>
                        </li>
                        <li>
                            <p style="display: inline-block;margin: 0;">收款金额：</p>
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
        name: "NoPay",
        data() {
            return {
                activeNames: [],
                show: false,
                keyIndex: "",
                oid: "",
                datas: [],
            }
        },
        mounted() {
            this.getPage()
        },
        methods: {
            getPage() {
                this.oid = localStorage.getItem("id")
                this.$axios.get(this.url + "/api/Payment/PayInformation", { params: { KEYOID: this.oid } }).then(res => {
                    this.datas = res.data
                }).catch(err => {
                    console.log(err)
                })


            },
            getList() {
                this.oid = localStorage.getItem("id")
                this.$axios.post(this.url + "/api/Payment/GetDocdatas?input=" + this.oid).then(res => {
                    // console.log(res.data.items)

                })
            },
            onChange(index) {
                self.show = !self.show;
                self.keyIndex = index;

            },

        },
    }
</script>
<style scoped>
    .no {
        padding-top: 60px
    }


    .content {
        height: 100%;
        overflow: hidden;
        padding-top: 40px;
        /* overflow-y: scroll; */
    }

    .cont {
        min-height: 100%;
        padding-top: 40px;
        position: relative;
        overflow-y: scroll;
    }

    .content .name {
        overflow: hidden;
        padding: 3% 10%;
    }

    .content .nameli {
        background: #f3eded !important;
        height: 100%;
        padding: 3% 10%;

    }

    .content .van .name,
    .content .van .nameli {
        p {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 2vw 0;
            font-size: 4vw;
            font-weight: 600;
            line-height: 100%;
        }

        span {
            font-size: 1.5vw;
        }
    }

    .content .ul .name,
    .content .ul .nameli {
        p {
            width: 100%;
            white-space: pre-wrap !important;
            margin: 2vw 0;
            font-size: 4vw;
            font-weight: 600;
        }

        span {
            font-size: 1.5vw;
        }


    }

    .content .detail {
        background: #ebebeb;
        padding: 15px 30px 15px 30px;
    }


    .content .detail li {
        font-size: 0.8rem;
        border-bottom: 1px solid #cccacb;
        padding: 5px 0;

        p {
            display: inline-block !important;
            width: 30%;
            padding-left: 8%;
            margin: 0;
            /* color:red */

        }

        p:first-child {
            text-align: left
        }

    }
</style>
<style lang="scss">
    .nopay {
        .van-cell {
            padding: 0;
            line-height: 3vw;
        }

        .van-cell__right-icon {
            display: none
        }

        .van-collapse-item__content {
            padding: 0;
        }

        .van-nav-bar {
            position: fixed;
            width: 100%;
            background: #f7f7f7;
        }

        .van-cell__title {
            width: 100%;
        }

        .van-cell__title>div {
            height: 100%;
        }
    }
</style>