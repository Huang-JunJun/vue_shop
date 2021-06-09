<template>
    <div>
        <!-- 面包屑区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
             <template>
                    <el-table
                    :data="this.rightsList"
                    border
                    stripe
                    style="width: 100%;margin-top:30px">
                    <el-table-column
                        type="index"
                        label="#">
                    </el-table-column>
                    <el-table-column
                        prop="authName"
                        label="权限名称">
                    </el-table-column>
                    <el-table-column
                        prop="path"
                        label="路径">
                    </el-table-column>
                    <el-table-column
                        prop="level"
                        label="权限等级">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.level === '0'" type="primary">一级权限</el-tag>
                            <el-tag v-else-if="scope.row.level === '1'" type="success">二级权限</el-tag>
                            <el-tag v-else-if="scope.row.level === '2'" type="warning">三级权限</el-tag>
                        </template>
                    </el-table-column>
                    </el-table>
                </template>
        </el-card>
    </div>
</template>

<script>
export default {
    created() {
        // 获取权限列表
        this.getRightsList();
    },
    data () {
        return {
            rightsList: []
        }
    },
    methods: {
        // 获取权限列表函数
        async getRightsList() {
          const {data : res} = await this.$http.get(`rights/list`)
          console.log(res);
          if(res.meta.status !== 200) {
                this.$message({
                    message: res.meta.msg,
                    type: 'error'
                }) 
            } else {
                this.rightsList = res.data
                this.$message({
                    message: res.meta.msg,
                    type: 'success'
                }) 
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>