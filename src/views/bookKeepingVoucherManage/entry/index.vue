<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" inline>
    <h2>记账凭证</h2>
    <el-form-item label="凭证记" prop="code">
      <el-select v-model="form.status">
        <el-option :value="1" />
      </el-select>
      <el-input-number v-model="form.code" style="margin: 0 8px" :min="1" />号
    </el-form-item>

    <el-form-item prop="quarter">
      <el-select v-model="form.quarter">
        <el-option v-for="item in quarterlyList" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </el-form-item>
    <el-form-item label="日期" prop="date">
      <el-date-picker v-model="dateValue" value-format="YYYY-MM-DD" placeholder="选择日期" />
    </el-form-item>

    <div class="m-table">
      <div v-if="!isDetail">
        <el-icon @click="addLine" color="red">
          <Plus />
        </el-icon>
        <el-icon>
          <Delete @click="deleteLine" color="red" />
        </el-icon>
      </div>
      <table>
        <thead>
          <tr>
            <th rowspan="2" width="300">摘要</th>
            <th rowspan="2" width="300">会计科目</th>
            <th colspan="11">借方金额</th>
            <th colspan="11">贷方金额</th>
          </tr>
          <tr>
            <th v-for="item in debitUnitMap" :key="item.label">
              {{ item.label }}
            </th>
            <th v-for="item in creditUnitMap" :key="item.label">
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableList" :key="index">
            <td>
              <template v-if="isDetail">{{ item.abstract }}</template>
              <el-input v-else v-model="item.abstract" />
            </td>
            <td>
              <template v-if="isDetail">{{ item.subject }}</template>
              <el-select v-else v-model="item.subject" style="margin: 0 8px">
                <el-option v-for="(subItem, subIndex) in subjectList" :key="subIndex" :value="subItem.value" :label="subItem.name" />
              </el-select>
            </td>
            <!-- 借方金额 -->
            <template v-if="item.isDebitEdit">
              <td colspan="11">
                <el-input v-model="item.debitAmount" @blur="onInputBlur" v-focuss :key="index" />
              </td>
            </template>
            <td v-else v-for="(debitItem, subIndex) in debitUnitMap" :key="subIndex" @click="handleClick('isDebitEdit', index)">
              {{ getValue(item.debitAmount, subIndex) }}
            </td>
            <!-- 贷方金额 -->
            <template v-if="item.isCreditEdit">
              <td colspan="11">
                <el-input v-model="item.creditAmount" @blur="onInputBlur" v-focus :key="index" />
              </td>
            </template>
            <td v-else v-for="(creditItem, subIndex) in creditUnitMap" :key="subIndex" @click="handleClick('isCreditEdit', index)">
              {{ getValue(item.creditAmount, subIndex) }}
            </td>
          </tr>

          <!-- 合计行 -->
          <tr>
            <td colspan="2">合计：</td>
            <td v-for="(debitItem, subIndex) in debitUnitMap" :key="subIndex">
              {{ getTotalValue("debitAmount", subIndex) }}
            </td>

            <td v-for="(creditItem, subIndex) in creditUnitMap" :key="subIndex">
              {{ getTotalValue("creditAmount", subIndex) }}
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <div :class="{ 'table-footer': true, disabled: isDetail }">
      <div v-if="!isDetail">创建人：admin</div>
      <div>
        <el-button v-if="isDetail" link type="primary" size="large">原始单据</el-button>
        <el-button v-else link type="primary" size="large" @click="showDialog(true)">添加原始单据</el-button>
        <span>已添加 2 张</span>
      </div>
    </div>
    <el-dialog center title="选择添加的原始单据类型" v-model="dialogTableVisible" width="20%">
      <!-- :disabled="isDetail" -->
      <el-button type="primary" @click="addOriginalVoucher('invoice')">发票</el-button>
      <el-button type="primary" @click="addOriginalVoucher('other')">其他</el-button>
      <el-button @click="showDialog(false)">取消</el-button>
    </el-dialog>

    <div class="m-footer">
      <el-button @click="back">返回</el-button>
      <!-- :disabled="isDetail" -->
      <el-button v-if="!isDetail" type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </el-form>
</template>

<script>
import { getQuarterlyList } from "@/utils/util";
import { addObj, editObj } from "../api/index.js";

export default {
  name: "oinvoiceDetail",
  directives: {
    focuss: {
      inserted(el) {
        console.log(el)
        el.focus()
      }
    }
  },
  data() {
    return {
      form: {
        dcdirection: 1,
        status: 1,
      },
      // 是否是查看详情
      isDetail: false,
      dialogTableVisible: false,

      rules: {},
      // 借方金额列表
      debitUnitMap: [
        {
          label: "亿",
          prop: "name2",
        },
        {
          label: "千",
          prop: "name2",
        },
        {
          label: "百",
          prop: "name2",
          value: 1,
        },
        {
          label: "十",
          prop: "name2",
        },
        {
          label: "万",
          prop: "name2",
        },
        {
          label: "千",
          prop: "name2",
        },
        {
          label: "百",
          prop: "name2",
        },
        {
          label: "十",
          prop: "name2",
        },
        {
          label: "元",
          prop: "name2",
        },
        {
          label: "角",
          prop: "name2",
        },
        {
          label: "分",
          prop: "name2",
        },
      ],
      // 贷方金额列表
      creditUnitMap: [
        {
          label: "亿",
          prop: "name2",
        },
        {
          label: "千",
          prop: "name2",
        },
        {
          label: "百",
          prop: "name2",
          value: 1,
        },
        {
          label: "十",
          prop: "name2",
        },
        {
          label: "万",
          prop: "name2",
        },
        {
          label: "千",
          prop: "name2",
        },
        {
          label: "百",
          prop: "name2",
        },
        {
          label: "十",
          prop: "name2",
        },
        {
          label: "元",
          prop: "name2",
        },
        {
          label: "角",
          prop: "name2",
        },
        {
          label: "分",
          prop: "name2",
        },
      ],
      // 表格数据
      tableList: [
        {
          index: 0,
          id: 1,
          subject: 11111,
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 124155.1111,
        },
        {
          index: 1,
          id: 2,
          subject: "普陀区",
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 181515.41,
        },
        {
          date: "2016-05-04",
          id: 3,
          subject: 11111,
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 11111.1111,
        },
        {
          id: 3,
          subject: 11111,
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 11111.1111,
        },
      ],
      subjectList: [
        {
          name: "库存现金",
          value: 111,
        },
        {
          name: "其他项目",
          value: 222,
        },
      ],
    };
  },
  created() { },

  mounted() {
    // 查询详情
    const { id = "", isDetail = false } = this.$route.query;
    this.id = id;
    this.isDetail = isDetail;
    // this.$set(this.form, "date", this.dateValue);
  },
  computed: {
    quarterlyList() {
      return getQuarterlyList(2);
    },
    dateValue() {
      const date = new Date();
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      return (
        year +
        "-" +
        (mon > 9 ? mon : "0" + mon) +
        "-" +
        (day > 9 ? day : "0" + day)
      );
    },
  },
  watch: {
    // 如果id 存在就去查询详情
    id(newV) {
      if (newV) {
        // this.findTaxSubjectCascade(newV)
      }
    },
  },
  methods: {
    // 增加一行
    addLine() {
      this.tableList.push({})
    },
    // 删除一行
    deleteLine() {
      // 至少保留一行
      if (this.tableList.length <= 1) return
      this.tableList.splice(this.tableList.length - 1, 1)
    },

    // 单元格点击事件，
    handleClick(key, index) {
      // 查看详情时单元格点击无效
      if (this.isDetail) return;
      // 取借方或贷方的另一个
      const otherKey = key === 'isDebitEdit' ? 'isCreditEdit' : 'isDebitEdit'
      this.tableList = this.tableList.map((subItem, subIndex) => {
        return {
          // 点击的当前行的借方或贷方的编辑属性设置成true，其余的重置为false
          ...subItem,
          [key]: index === subIndex,
          [otherKey]: false
        }
      })
    },
    // 金额输入框失去焦点
    onInputBlur() {
      this.tableList = this.tableList.map((subItem) => {
        return {
          ...subItem,
          isDebitEdit: false,
          isCreditEdit: false,
        }
      })
    },

    // 获取单元格的值，按金额单位划分
    getValue(amount, index) {
      const arr = (amount + "").split(".");
      // 小数点前，将字符串翻转
      const reverseArr = arr[0].split("").reverse();
      // 几位数
      if (9 - reverseArr.length <= index && index < 9) {
        return reverseArr[9 - index];
      } else if (arr[1] && arr[1].length) {
        // 小数点后，正向连续取值
        return arr[1][index - 9];
      }
    },
    // 计算合计
    getTotalValue(key, index) {
      const total = this.tableList.reduce((sum, item) => {
        return sum + parseFloat(item[key])
      }, 0);
      return this.getValue(total, index);
    },
    // 返回凭证列表
    back() {
      this.$router.replace({
        path: "/bookKeepingVoucherManage/query",
      });
    },
    // 添加原始单据
    addOriginalVoucher(type) {
      const path = type === 'invoice' ? '/originalVoucherManage/invoiceDetail' : '/originalVoucherManage/originalVouchereDetail';
      this.$router.push({
        path
      });
    },
    showDialog(flag) {
      this.dialogTableVisible = flag
    },

    // 提交表单
    handleSubmit() {
      // debugger
      const set = this.$refs;
      set["form"].validate((valid) => {
        if (!valid) return false;
        if (this.updateStatus === "create") {
          this.create();
        } else {
          this.update();
        }
      });
    },
    // 创建
    create() {
      addObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "新建成功",
          type: "success",
          duration: 2000,
        });
      });
    },
    // 编辑
    update() {
      editObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000,
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.m-title {
  margin: 0 16px 24px;
}

h2 {
  padding-bottom: 24px;
  text-align: center;
}

s .m-footer {
  margin: 48px 0 32px 33%;
}

.el-card {
  margin-bottom: 16px;

  &:first-child {
    /deep/ .el-card__body {
      display: flex;
      align-items: flex-end;

      span {
        padding-left: 8px;
      }
    }
  }
}

table {
  border: 1px solid #e6e6e6;
  border-collapse: collapse;
  border-spacing: 1px;
  width: 100%;
}

th,
td {
  border: 1px solid #e6e6e6;
  padding: 8px 16px;
  text-align: center;
}

th {
  background-color: #eff3f5;
}

table tr td {
  word-break: break-all;
}


.m-table {
  display: flex;

  >div:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 4px 3% 0;

    .el-icon {
      margin-top: 4px;
      cursor: pointer;
    }

  }
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  &.disabled {
    justify-content: flex-end;
  }

  span {
    margin-left: 4px;
  }
}

/deep/ .el-dialog__body {
  display: flex;
  justify-content: center;
}

.m-footer {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
