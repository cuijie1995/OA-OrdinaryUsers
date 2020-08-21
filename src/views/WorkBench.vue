<template>
    <div class="workbench">
        <div class="top">
            <Header title="工作台"></Header>
        </div>
        <div class="content">
            <div>
                <h4>
                    流程
                </h4>
                <ul>
                    <!-- <a href="#/nopayment"> -->
                        <a @click="$router.push('nopayment')">

                        <li>
                            <i class="iconfont icondaiban" style="color: #2288ff;"></i>
                            <br>
                            <span>
                                待办任务
                            </span>

                        </li>
                    </a>
                    <a @click="$router.push('dopayment')">
                    <!-- <a href="#/dopayment"> -->
                    <!-- <a @click="dopayment()"> -->

                        <li style="padding-top:1%;">
                            <i class="iconfont iconwodeyibanrenwu" style="color: #22c67f;font-size:45px"></i>
                            <br>
                            <span>
                                已办任务
                            </span>

                        </li>
                    </a>
                </ul>
            </div>
            <div>
                <h4>
                    客户信息
                </h4>
                <ul>
                    <a @click="$router.push('customer')">
                        <li>
                            <i class="iconfont iconweibiaoti-_huaban" style="color: #4e83ff;"></i>
                            <br>
                            <span>
                                客户信息
                            </span>

                        </li>
                    </a>

                </ul>
            </div>
            <div>
                <h4>
                    订单管理
                </h4>
                <ul>
                    <a @click="$router.push('orderinquiry')">
                        <li>
                            <i class="iconfont iconicon01" style="color: #d4237a;"></i>
                            <br>
                            <span>
                                订单查询
                            </span>

                        </li>
                    </a>
                </ul>
            </div>
            <!-- <div>
                <h4>
                    联系人
                </h4>
                <ul>
                    <a @click="$router.push('contactinformation')">
                        <li>
                            <i class="iconfont iconcontact" style="color: #57bb93;"></i>
                            <br>
                            <span>
                                联系人信息
                            </span>

                        </li>
                    </a>
                    <a @click="$router.push('contactrecord')">
                        <li>
                            <i class="iconfont iconlianxijilu" style="color: #d63182;"></i>
                            <br>
                            <span>
                                联系记录
                            </span>

                        </li>
                    </a>
                    <a @click="$router.push('visit')">
                        <li>
                            <i class="iconfont iconweibiaoti-_huaban" style="color: #4e83ff;"></i>
                            <br>
                            <span>
                                走访记录
                            </span>

                        </li>
                    </a>
                </ul>
            </div> -->
        </div>
    </div>
</template>
<script>
    import Header from "../components/Header";
    export default {
        name: "WorkBench",
        data: function () {
            return {}
        },
        components: {
            Header
        },
        methods: {
            dopayment() {
                // this.$router.push({ path: '/dopayment' } + new Date())
            }
        },
    }

</script>
<style scoped>
    .top {
        width: 100%;
        height: 50px;
    }

    .content {
        padding-bottom: 30px
    }

    .content>div {
        margin-bottom: 30px
    }

    .content h4 {
        text-align: left;
        margin-left: 5%;
        margin-bottom: 15px;
        font-size: 16px;
        margin-top: 20px
    }

    .content ul {
        overflow: hidden;
        margin-bottom: 15px;
        padding-left: 20px
    }

    .content ul li {
        float: left;
        width: 25%;
        font-size: 14px;
        text-align: center;
    }

    .iconfont {
        font-size: 50px;
    }

    span {
        display: block;
        padding-top: 10px;
    }

    .workbench {
        height: calc(100% - 55px) !important;
    }
</style>