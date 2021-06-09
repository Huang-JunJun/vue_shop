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
                <el-row >
                    <el-col :span="9">
                        <el-input placeholder="输入关键字搜索" class="input-with-select" v-model="queryinfo.query" clearable @clear="getUserList()">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
                        </el-input>
                        </el-col>
                    <el-col :span="4">
                        <el-button type="primary" class="add-btn" @click="addDialogVisible = true">添加用户</el-button>
                    </el-col>
                </el-row>
                <!-- 用户列表区域 -->
                 <template>
                    <el-table
                    :data="this.userslist"
                    border
                    stripe
                    style="width: 100%;margin-top:30px">
                    <el-table-column
                        type="index"
                        label="#">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="电话号码">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="用户邮箱">
                    </el-table-column>
                    <el-table-column
                        prop="mg_state"
                        label="用户当前状态">
                        <template slot-scope="scope">
                            <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeUserStatus(scope.row)">
                        </el-switch>
                        </template>
                    </el-table-column>
                    <!-- 操作按钮 -->
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="medium"
                            class="el-btn">编辑</el-button>
                            <el-button
                            size="medium"
                            type="danger"
                            class="el-btn"
                            @click="deleteUser(scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                    <!-- 分页区域 -->
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryinfo.pagenum"
                        :page-size="queryinfo.pagesize"
                        :total="total"
                        :page-sizes="[1, 2, 5, 10]"
                        layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                </template>
            </div>
        </el-card>
        <!-- 添加用户对话框 -->
        <el-dialog  
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="30%">
            <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogVisible = false,addUser()">确认添加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryinfo: {
                query: '',
                // 当前页数
                pagenum: 1,
                // 当前每页出现多少条数据
                pagesize: 2,
            },
            userslist: [],
            total: 0,
            addDialogVisible : false,
            deleteDialogVisible: false,
            addForm: {
                username: '',
                password: '',
                email: '',
                mobile: '',
            },
            addFormRules: {
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
    created() {
        this.getUserList();
    },
    methods: {
        // 获取用户列表
        async getUserList() {
          const {data : res}  = await this.$http.get('users',{ params: this.queryinfo})
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
          this.userslist = res.data.users
          this.total = res.data.total
        },
        // 修改用户状态
        async changeUserStatus(userinfo) {
          const {data : res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
          if(res.meta.status !== 201) {
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
        },
        // 监听列表变化
        handleSizeChange(newSize) {
            this.queryinfo.pagesize = newSize
            this.getUserList()
        },
        // 监听页码值改变的事件
        handleCurrentChange(newPage) {
            this.queryinfo.pagenum = newPage
            this.getUserList()
        },
        // 添加用户 
        async addUser() {
          const {data : res} = await this.$http.post('users',this.addForm)
          console.log(res);
          if(res.meta.status !== 201) {
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
            this.getUserList()
        },
        async deleteUser(userinfo) {
            // 询问用户是否删除数据
            const deleteResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            console.log(deleteResult);
            if(deleteResult === 'confirm') {  
            const {data : res} = await this.$http.delete(`users/${userinfo.id}`)
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
            } else {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            }
            this.getUserList()
        },
    }
}
</script>

<style lang="less" scoped>
.add-btn {
    margin-left: 15px;
}

.el-btn {
    margin-right: 20px;
}


</style>