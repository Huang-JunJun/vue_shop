<template>
        <!-- <el-button type="info" @click="exitLogin()">退出</el-button> -->
        <el-container class="home-container">
            <!-- 头部区域 -->
            <el-header>
                <div>
                    <img class="head-img" src="../assets/微信图片_20210602151323.png" alt="">
                    <span>电商后台管理系统</span>
                </div>
                <el-button type="info" @click="exitLogin()">退出</el-button>
            </el-header>
            <!-- 主体区域 -->
                <el-container>
                    <!-- 侧边栏 -->
                    <el-aside :width="isCollapse ? '64px' : '200px' ">
                        <div class="toggle-button" @click="toggleCollapse()">
                            |||
                        </div>
                        <el-menu
                            class="el-menu-vertical-demo"
                            background-color="#333744"
                            text-color="#fff"
                            active-text-color="#409EFF"
                            :collapse="isCollapse"
                            :collapse-transition="false"
                            :router="true"
                            :default-active="activepath">
                            <!-- 一级菜单 -->
                            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                                <!-- 一级菜单的模板区域 -->
                                <template slot="title">
                                    <!-- 图标 -->
                                <i :class="iconsObj[item.id]"></i>
                                <!-- 文本 -->
                                <span>{{item.authName}}</span>
                                </template>
                                <!-- 二级菜单 -->
                                <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                                @click="saveNavState('/' + subItem.path)"
                                >
                                    <template slot="title">
                                    <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                                </template>
                                </el-menu-item>
                            </el-submenu>
                            </el-menu>
                    </el-aside>
                    <!-- 主页 -->
                        <el-main>
                            <router-view></router-view>
                        </el-main>
                </el-container>
        </el-container>
    
</template>

<script>
export default {
    created() {
        this.getMeunList();
        this.activepath = window.sessionStorage.getItem('activepath')
        
        },

    data () {
        return {
            menulist: [
            ],
            iconsObj: {
                '125': 'iconfont icon-team',
                '103': 'iconfont icon-zoom',
                '101': 'iconfont icon-shopping',
                '102': 'iconfont icon-unorderedlist',
                '145': 'iconfont icon-barchart'
            },
            isCollapse: true,
            activepath: '',
        }
    },
    methods: {
        exitLogin() {
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
        async getMeunList() {
            const {data : res} = await this.$http.get('menus')
            console.log(res);
            if(res.meta.status !== 200) {
                this.$message({
                    message: res.meta.msg,
                    type: 'error'
                }) 
            } else {
                this.$message({
                    message: res.meta.msg,
                    type: 'success'
                }) 
            }
            this.menulist = res.data
        },
        // 切换菜单的折叠和展开
        toggleCollapse() { 
            this.isCollapse = !this.isCollapse
        },
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 接受激活状态
        saveNavState(activepath) {
            window.sessionStorage.setItem('activepath',activepath)
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.head-img {
    height: 95%;
}

.el-button{
    float: right;
    top: 15%;
}


.el-header {
    background-color:#373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
        div{
            display: flex;
            align-items: center;
            span  {
                margin-left: 15px;
            }
    }
}

.el-aside {
    background-color: #333744;
}

.el-main {
    background-color: #EAEDF1;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>