<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
              <img src="../assets/logo.png" alt="">
          </div>
          <!-- 登录表单区域 -->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
              <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user1"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-lock"></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="Login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 这是登录表单的数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            // 这是表单的验证规则对象
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 15, message: '密码在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 点击重置按钮重置表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        Login() {
            this.$refs.loginFormRef.validate(async valid => {
                if(!valid) return;
                const { data : res } = await this.$http.post('login',this.loginForm);
                if(res.meta.status !== 200){
                    this.$message({  //  message需要在配置文件中以原型的方式添加
                        message: '登录失败',
                        type: 'error'
                    })
                }else {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    })
                    // 1. 将登录成功之后的token，保存到客户端的sessionStorage中
                    //   1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
                    //   1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
                    // 2. 通过编程式导航到后台主页，路由地址是/home
                }
                window.sessionStorage.setItem("token",res.data.token)
                this.$router.push("/home")
            }); // 接收回调函数
        }
    }
    
}
</script>

<style lang="less" scoped>
.login_container {
    background-color:rgb(78, 78, 150);
    height: 100%;
}

.login_box {//将盒子放置在正中央
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.avatar_box {
    position: absolute;
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
//less 代表这个节点中支持Less语法 scoped是一个指令 用于这个节点下的样式只在这个组件内生效，如果scoped去掉，样式将在全局内生效
//防止组件内部样式冲突
</style>
