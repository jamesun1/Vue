<template>
    <div class="login-container">
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
            <h3 class="title">vue模板</h3>
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"></svg-icon>
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye" />
                </span>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                            登陆
                        </el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="primary" style="width:100%;" @click.native.prevent="zhuce">
                            注册
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <el-dialog title="注册" :modal="false" :visible.sync="InsWatch" width="60%" :append-to-body="true" :before-close="handleClose">
            <span>注册用户信息</span>
            <el-input type="text" v-model="formdata.user" placeholder="请输入用户名"></el-input>
            <el-input type="text" v-model="formdata.password" placeholder="请输入密 码"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="InsWatch = false">取 消</el-button>
                <el-button type="primary" @click="InsEnter">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
    name: "login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error("密码不能小于3位"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "sunxu",
                password: "admin"
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    { required: true, trigger: "blur", validator: validatePass }
                ]
            },
            loading: false,
            pwdType: "password",
            InsWatch: false,
            formdata: {}
        };
    },
    methods: {
        handleClose() {
            this.InsWatch = false;
        },
        InsEnter() {
            this.$store
                .dispatch("InsEnter", this.formdata)
                .then(() => {
                    Message.success("注册成功");
                    this.formdata = {};
                    this.InsWatch = false;
                })
                .catch((error) => {
                    Message.error(error);
                });
        },
        zhuce() {
            this.InsWatch = true;
        },
        showPwd() {
            if (this.pwdType === "password") {
                this.pwdType = "";
            } else {
                this.pwdType = "password";
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("Login", this.loginForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push({ path: "/" });
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
