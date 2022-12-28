<template>
  <div class='p-page'>
    <h2 class="m-title">{{ textMap[updateStatus] || '新增账套' }}</h2>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :disabled="updateStatus === 'detail'">

      <el-form-item label="账套名称" prop="subjectName">
        <el-input v-model="form.subjectName" placeholder="请输入账套名称" width="200px"></el-input>
      </el-form-item>

      <el-form-item label="启用期间" prop="time">
        <el-date-picker v-model="form.time" type="month" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="本位币" prop="dcdirection">
        <el-select v-model="form.dcdirection" disabled>
          <el-option :value="1" label="人民币（RMB）"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="会计制度" prop="dcdirection">
        <el-select v-model="form.dcdirection" disabled>
          <el-option :value="1" label="小企业会计准则（2013年颁布）"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="科目体系" prop="dcdirection">
        <el-select v-model="form.dcdirection" disabled>
          <el-option :value="1" label="简易科目"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择借贷方向">
          <el-option :value="1" label="开启"></el-option>
          <el-option :value="2" label="关闭"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="m-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button v-if="updateStatus !== 'detail'" type="primary" @click="handleSubmit">提交</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import { addObj, editObj } from './api/index.js'

export default {
  name: 'setManageDetail',
  data() {
    return {
      form: {
        dcdirection: 1,
        status: 1
      },
      rules: {
        subjectName: [
          {
            required: true,
            message: '请输入账套名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        time: [
          {
            required: true,
            message: '请选择启用期间',
            trigger: 'blur'
          }
        ],
        accoutingStandard: [
          {
            required: true,
            message: '请选择会计准则',
            trigger: 'blur'
          }
        ]
      },
      id: '',
      updateStatus: '',
      textMap: {
        update: '编辑账套',
        create: '新增账套',
        detail: '账套详情'
      }
    }
  },
  created() { },

  mounted() {
    // 查询详情
    const { id = '', updateStatus = '' } = this.$route.query
    this.id = id
    this.updateStatus = updateStatus
  },
  computed: {
    ...mapGetters(['elements'])
  },
  watch: {
    // 如果id 存在就去查询详情
    id(newV) {
      if (newV) {
        // this.findTaxSubjectCascade(newV)
      }
    }
  },
  methods: {
    cancel() {
      this.$router.replace({ path: '/setManage/list' })
    },
    // 提交表单
    handleSubmit() {
      const set = this.$refs
      set['form'].validate(valid => {
        if (!valid) return false

        if (this.updateStatus === 'create') {
          this.create()
        } else {
          this.update()
        }
      })
    },
    // 创建账套
    create() {
      addObj(this.form).then(() => {
        this.dialogFormVisible = false
        this.getList()
        this.$notify({
          title: '成功',
          message: '新建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 编辑账套
    update() {
      editObj(this.form).then(() => {
        this.dialogFormVisible = false
        this.getList()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.p-page {
  display: flex;
  align-items: center;
  flex-direction: column;

 .m-title{
  margin-bottom: 32px;
 }
  .el-input, .el-select {
   width: 400px;
  }
  .m-footer{
    padding-bottom: 32px;
  }
}
</style>
