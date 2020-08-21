<template>
    <div class="visit">
        <el-form ref="form" :model="form">
            <el-form-item label="走访目的：">
                <el-input type="textarea" autosize v-model="form.cobjective"></el-input>
            </el-form-item>
            <el-form-item label="走访时间：">
                <el-date-picker v-model="form.dinterviewdate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="走访人员：">
                <el-input v-model="form.cinterviewpeo"></el-input>
            </el-form-item>
            <el-form-item label="走访地址：">
                <el-input v-model="form.cinterviewaddress"></el-input>
            </el-form-item>
            <el-form-item label="接待人姓名：">
                <el-input v-model="form.creceive"></el-input>
            </el-form-item>
            <el-form-item label="接待人职位：">
                <el-input v-model="form.creceivedept"></el-input>
            </el-form-item>
            <el-form-item label="现场是否正常办公：">
                <el-radio-group v-model="form.bwork">
                    <el-radio label="true">是</el-radio>
                    <el-radio label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="口述员工人数：">
                <el-input v-model="form.nsongpeocount"></el-input>
            </el-form-item>
            <el-form-item label="现场员工人数：">
                <el-input v-model="form.npeocount"></el-input>
            </el-form-item>
            <el-form-item label="走访情况说明：">
                <el-input type="textarea" autosize v-model="form.cremark"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="button">
                    <el-button @click="$router.push('customer')">返回</el-button>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: "AddVisit",
        data() {
            return {
                form: {
                    cobjective: '',
                    dinterviewdate: '',
                    cinterviewpeo: '',
                    cinterviewaddress: '',
                    creceive: '',
                    creceivedept: '',
                    bwork: false,
                    nsongpeocount: '',
                    npeocount: '',
                    cremark: '',
                    zrBasContactFk: ""
                }
            }
        },
        mounted() {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);    //false阻止默认事件    this.fun是指返回按建实际要执行的方法
            }
        },
        destroyed() {
            window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
        },
        methods: {
            goBack() {
                this.$router.push({ path: 'visit' });
            },
            onSubmit() {
                this.form.zrBasContactFk = localStorage.getItem("id");
                this.$axios.post(this.url + "/api/Payment/ADDupdateInterViewLIst"
                    , this.form, {
                    headers: {
                        'content-type': 'application/json;charset=UTF-8'
                    }
                }
                ).then(res => {
                    this.$message({
                        message: "走访记录添加成功",
                        type: 'success'
                    })
                    this.$router.push("customer")

                    localStorage.removeItem("id")

                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style scoped>
    .el-form-item {
        margin-bottom: 1.2vw
    }

    .el-input {
        height: 7vw;
    }

    .visit {
        padding: 10vw 3.7vw 3.7vw 3.7vw;
    }

    .el-button {
        padding: 1.5vw 3vw;
        font-size: 3vw;
    }

    .button {
        text-align: center
    }
</style>
<style lang="scss">
    .visit {
        .el-form-item__label {
            font-size: 3vw;
            line-height: 4vw
        }

        .el-form-item__content {
            margin-left: 0 !important;
            line-height: 10vw
        }

        .el-input__inner {
            height: 7vw;
            line-height: 7vw;
            font-size: 3vw;
        }

        .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--datetime {
            width: 100%;
        }

        .el-form .el-form-item:nth-child(7) .el-form-item__content {
            line-height: 4vw;
        }

        textarea.el-textarea__inner {
            min-height: 7vw !important;
            height: 7vw !important;
        }

        .el-radio__label {
            font-size: 3vw !important;
        }

        .el-radio__inner {
            width: 3vw;
            height: 3vw;
        }
    }
</style>