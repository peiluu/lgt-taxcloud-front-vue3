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
    <el-button class="filter-item" v-permission:function="['subjectManager:btn_add']" style="margin-left: 10px" @click="handleCreate" type="primary" size="mini" icon="el-icon-circle-plus">添加</el-button>
    <el-table :key="tableKey" :data="list" v-loading.body="listLoading" size="small" stripe highlight-current-row style="width: 100%; margin-top: 20px">
      <el-table-column align="center" label="序号" width="65">
        <div slot-scope="scop"> {{ scop.$index + 1 }} </div>
      </el-table-column>

      <el-table-column align="center" label="科目代码">
        <template slot-scope="scope">
          <span>{{ scope.row.subjectCode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="科目名称">
        <template slot-scope="scope">
          <span>{{ scope.row.cascadeSubjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="父级科目名称">
        <template slot-scope="scope">
          <span>{{ scope.row.parentName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="科目类别">
        <template slot-scope="scope">
          <span>{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="成本 / 收入">
        <template slot-scope="scope">
          <span>{{ scope.row.costIncome === 1 ? '成本' : scope.row.costIncome === 2 ? '收入' : '其它' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="会计准则">
        <template slot-scope="scope">
          <span>{{ accoutingStandardList.find(item => item.id === scope.row.accoutingStandard).name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.creatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{ scope.row.updatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button v-permission:function="['subjectManager:btn_edit']" size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-permission:function="['subjectManager:btn_del']" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <template slot="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageIndex" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </template>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

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
      listLoading: true,
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
    addAccountingVoucher() {
      addAccountingVoucher({
        accountSetId: 1, // 账套ID
        sceneId: 21, // 行业业务场景ID
        dkppfwje: 100, // 代开普票服务金额
        dkpphwje: 100, // 代开普票货物金额
        dkzpfwje: 100, // 代开专票服务金额
        dkzphwje: 100, // 代开专票货物金额
        wpfwje: 100, // 无票服务金额
        wphwje: 100, // 无票货物金额
        zkppfwje: 100, // 自开普票服务金额
        zkpphwje: 100, // 自开普票货物金额
        zkzpfwje: 100, // 自开专票服务金额
        zkzphwje: 100 // 自开专票货物金额
      })
    },
    findAccountingVoucher() {
      findAccountingVoucher({
        accountSetId: 1,
        sceneId: 21,
        time: ''
      }).then(response => {
        this.voucherIds = response
      })
    },
    addTaxInvoice() {
      addTaxInvoice({
        accountId: 1,
        sceneId: 21,
        billUrl: '',
        noteList: [],
        voucherIds: [11],
        invoiceList: [{
          invoiceType: 0, // 发票类型 0 :增值税发票，1: 普通发票
          invoiceNo: '144002109019', // 发票代码
          // invoiceNo: '031002100711', // 发票代码
          redOrBlue: 2, // 红蓝票标志 1：蓝票2：红票
          invoiceFlag: 1, // 自开/代开标志 0自开1代开
          invoiceTime: '', // 发票时间
          incomeFlag: 1, // 进项发票标志1：进项票2：销项票
          goodsList: [
            // goodsType 商品类型 0：劳务/货物1：服务2：固定资产销售
            { count: 1, goodsName: '纺织产品*散件', taxRate: 0.01, price: 50, unitPrice: 50, goodsType: 0 },
            { count: 1, goodsName: '纺织产品*夏被', taxRate: 0.01, price: 20, unitPrice: 20, goodsType: 0 }
            // { count: 1, goodsName: '纺织产品*枕芯', taxRate: 0.01, price: 48.51, unitPrice: 48.51485149, goodsType: 0 }
          ]
        }]
      })
    },

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
