<template>
    <div>
        <!-- 面包屑区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <!-- 搜索与添加区域 -->
            <div class="text item">
                <el-row>
                    <el-col :span="9">
                        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        </el-col>
                    <el-col :span="4">
                        <el-button type="primary" class="add-btn">添加用户</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.add-btn {
    margin-left: 30px;
}


</style>