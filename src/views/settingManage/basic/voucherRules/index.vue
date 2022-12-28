<template>
  <div>
    <template slot="header">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px; margin-right: 20px" class="filter-item" placeholder="科目名称" v-model="listQuery.name" size="small">
      </el-input>
      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="small">搜索</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="search" @click="addAccountingVoucher" size="small">添加记账凭证信息</el-button>
      <el-button class="filter-item" type="primary" icon="search" @click="findAccountingVoucher" size="small">查询记账凭证信息</el-button>
      <el-button class="filter-item" type="primary" icon="search" @click="addTaxInvoice" size="small">添加发票</el-button> -->

    </template>
    <el-button class="filter-item" style="margin-left: 10px" @click="handleCreate" type="primary" size="mini" icon="el-icon-circle-plus">添加</el-button>
    <el-table :key="tableKey" :data="list" v-loading.body="listLoading" size="small" stripe highlight-current-row style="width: 100%; margin-top: 20px">
      <el-table-column align="center" label="序号" width="65">
        <div slot-scope="scop"> {{ scop.$index + 1 }} </div>
      </el-table-column>

      <el-table-column align="center" label="科目代码">
        <template v-slot="scope">
          <span>{{ scope.row.subjectCode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目名称">
        <template v-slot="scope">
          <span>{{ scope.row.cascadeSubjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="父级科目名称">
        <template v-slot="scope">
          <span>{{ scope.row.parentName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="科目类别">
        <template v-slot="scope">
          <span>{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="成本 / 收入">
        <template v-slot="scope">
          <span>{{ scope.row.costIncome === 1 ? '成本' : scope.row.costIncome === 2 ? '收入' : '其它' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="会计准则">
        <template v-slot="scope">
          <span>{{ accoutingStandardList.find(item => item.id === scope.row.accoutingStandard).name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template v-slot="scope">
          <span>{{ scope.row.creatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template v-slot="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改人">
        <template v-slot="scope">
          <span>{{ scope.row.updatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template v-slot="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150" fixed="right">
        <template v-slot="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <template slot="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:current-page="listQuery.pageIndex" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </template>

    <el-dialog :title="textMap[dialogStatus]" v-model:visible="dialogFormVisible">

      <el-form :model="form" :rules="rules" ref="form" label-width="100px">

        <el-form-item label="科目类别" prop="subjectCate">
          <el-select v-model="form.subjectCate" placeholder="请选择科目类别" @change="handleSubjectCatChange">
            <el-option v-for="(item) in subjectCateList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父级科目" prop="pid">
          <el-cascader v-model="form.pid" placeholder="请选择科目" :options="sujectCascadeList" clearable ref="cascaderRef" @change="handleChange" :props="props" popper-class='cascaderClass'></el-cascader>
        </el-form-item>

        <el-form-item label="科目代码" prop="subjectCode">
          <el-input v-model="form.subjectCode" placeholder="请输入科目代码"></el-input>
        </el-form-item>
        <el-form-item label="科目名称" prop="subjectName">
          <el-input v-model="form.subjectName" placeholder="请输入科目名称"></el-input>
        </el-form-item>
        <el-form-item label="成本 / 收入" prop="isSale">
          <el-select v-model="form.costIncome" placeholder="请选择">
            <el-option v-for="(item) in typeList" :key="item.key" :label="item.label" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会计准则" prop="accoutingStandard">
          <el-select v-model="form.accoutingStandard" placeholder="请选择会计准则">
            <el-option v-for="(item) in  accoutingStandardList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import { page, addObj, delObj, editObj, findTaxSubjectCascade, addTaxInvoice, findParentTaxSubject, addAccountingVoucher, findAccountingVoucher } from '../api/subject/index'

export default {
  name: 'subjectManager',
  data() {
    return {
      form: {},
      rules: {
        subjectCode: [
          {
            required: true,
            message: '请输入科目代码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        subjectName: [
          {
            required: true,
            message: '请输入科目名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        subjectCate: [
          {
            required: true,
            message: '请选择科目类别',
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
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },

      tableKey: 0,
      sujectCascadeList: [],
      subjectCateList: [],
      typeList: [
        { key: 1, label: '成本' },
        { key: 2, label: '收入' },
        { key: 3, label: '其他' }
      ],
      accoutingStandardList: [
        { id: 1, name: '小企业会计准则' },
        { id: 2, name: '企业会计准则' },
        { id: 3, name: '事业单位会计准则' }
      ],
      props: {
        label: 'subjectName',
        value: 'id',
        checkStrictly: true
      },
      editId: '',
      voucherIds: [],
      resetCascader: 0
    }
  },
  created() {
    // this.getList()
    // this.findParentTaxSubject()
  },
  computed: {
    ...mapGetters(['elements'])
  },
  watch: {
  },

  methods: {


    findParentTaxSubject() {
      findParentTaxSubject().then(response => {
        this.subjectCateList = response
      })
    },

    getList() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        this.list = response.rows
        this.total = response.total
        this.listLoading = false
      })
    },
    handleSubjectCatChange(val) {
      this.form.pid = ''
      this.findTaxSubjectCascade(val)
    },
    findTaxSubjectCascade(id) {
      findTaxSubjectCascade(id).then(response => {
        this.sujectCascadeList = response
      })
    },

    handleChange(value) {
      this.form.pid = value && value.length ? value[value.length - 1] : ''
      this.$refs.cascaderRef.dropDownVisible = false
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.form = { ...row }
      this.editId = row.id
      this.findTaxSubjectCascade(row.subjectCate)
      this.$nextTick(() => {
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj({ id: row.id }).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    },
    create(formName) {
      const set = this.$refs

      set[formName].validate(valid => {
        if (valid) {
          addObj({
            ...this.form,
            pid: this.form.pid || ''
          }).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
      // this.getList()
    },
    update(formName) {
      const set = this.$refs
      if (this.editId === this.form.pid) {
        this.$message.warining('请勿选择自己作为自己的父级科目！')
        return false
      }
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.form.password = undefined
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
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.form = {}
    },
    getParentsById(list, id) {
      for (const i in list) {
        if (list[i].id === id) {
          // 查询到就返回该数组对象的value
          return [list[i].id]
        }
        if (list[i].children) {
          const node = this.getParentsById(list[i].children, id)
          if (node !== undefined) {
            // 查询到把父节把父节点加到数组前面
            node.unshift(list[i].id)
            return node
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.el-select,
.el-cascader {
  width: 100%;
}

.cascaderClass {
  .el-radio__inner {
    top: -18px;
    left: -19px;
    border-radius: 0;
    border: 0;
    width: 170px;
    height: 34px;
    background-color: transparent;
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: transparent;
  }

}
</style>
