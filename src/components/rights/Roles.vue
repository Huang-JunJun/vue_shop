<template>
    <div>
        <!-- 面包屑区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <!-- 搜索与添加区域 -->
            <div class="text item">
                <!-- 角色列表区域 -->
                 <template>
                    <el-table
                    :data="this.roleslist"
                    border
                    stripe
                    style="width: 100%;margin-top:30px">
                    <el-table-column
                        type="index"
                        label="#">
                    </el-table-column>
                    <el-table-column
                        prop="roleName"
                        label="角色名称">
                    </el-table-column>
                    <el-table-column
                        prop="roleDesc"
                        label="角色描述">
                    </el-table-column>
                    <!-- 操作按钮 -->
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="medium"
                            class="el-btn"
                            @click="editRoleVisible = true,getEditRole(scope.row.id)">编辑</el-button>
                            <el-button
                            size="medium"
                            type="danger"
                            class="el-btn"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-card>
        <el-dialog
        title="修改角色信息"
        :visible.sync="editRoleVisible"
        width="50%"
        >
        <!-- 内容主体 -->
        <el-form
            :model="editRoleForm"
            ref="editRoleFormRef"
            :rules="editRoleFormRules"
            label-width="70px"
        >
            <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editRoleForm.roleName" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editRoleForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editRoleVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRoles()">确定修改</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
    created() {
        // 获取角色列表
        this.getRolesList()
    },
    data() {
        return {
            roleslist: [],
            // 编辑角色数据
            editRoleVisible: false,
            editRoleForm: {},
            editRoleFormRules: {
            roleName: [
                { required: true, message: '请输入角色名称', trigger: 'blur' }
            ],
                roleDesc: [
                { required: true, message: '请输入角色描述', trigger: 'blur' }
            ]
        },
        }
    },
    methods: {
        // 获取角色列表
        async getRolesList() { 
           const {data : res} = await this.$http.get('roles')
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
            this.roleslist = res.data
        },
        // 编辑角色
        async getEditRole(id) {
            const {data : res} = await this.$http.put('roles/' + id)
            if (res.meta.status !== 200) {
                return this.$message.error('查询角色信息失败！')
            }
            this.editRoleForm = res.data
            this.editRoleVisible = true
        },
         editRoles () {
            // 提交请求前，表单预验证
            this.$refs.editRolesFormRef.validate(async valid => {
                // console.log(valid)
                // 表单预校验失败
                if (!valid) return
                const { data: res } = await this.$http.put(
                'oles/' + this.editRolesForm.id,
                {
                    email: this.editRolesForm.email,
                    mobile: this.editRolesForm.mobile
                }
                )
                if (res.meta.status !== 200) {
                this.$message.error('更新用户信息失败！')
                }
                // 隐藏添加用户对话框
                this.editDialogVisible = false
                this.$message.success('更新用户信息成功！')
                this.getRolesList()
            })
        }
        // editDialogClos
    }
    
}
</script>

<style lang="less" scoped>

</style>