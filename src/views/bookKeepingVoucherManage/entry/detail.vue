<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" inline disabled>
    <h2>记账凭证</h2>
    <el-form-item label="凭证记" prop="code">
      <el-select v-model="form.status">
        <el-option :value="1" />
      </el-select>
      <el-input-number v-model="form.code" style="margin: 0 8px" :min="1" />号
    </el-form-item>

    <el-form-item prop="quarter">
      <el-select v-model="form.quarter">
        <el-option
          v-for="item in quarterlyList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="日期" prop="date">
      <el-date-picker v-model="dateValue" value-format="YYYY-MM-DD" placeholder="选择日期" />
    </el-form-item>
    <table>
      <thead>
        <tr>
          <th rowspan="2" width="100">摘要</th>
          <th rowspan="2">会计科目</th>
          <th colspan="11">借方金额</th>
          <th colspan="11">贷方金额</th>
        </tr>
        <tr>
          <th v-for="item in debitUnitMap" :key="item.label">{{item.label}}</th>
          <th v-for="item in creditUnitMap" :key="item.label">{{item.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableList" :key="index">
          <td>
            <el-input v-model="item.abstract" />
          </td>
          <td>
            <el-select v-model="item.subject" style="margin: 0 8px">
              <el-option
                v-for="(subItem, subIndex) in subjectList"
                :key="subIndex"
                :value="subItem.value"
                :label="subItem.name"
              />
            </el-select>
          </td>
          <!-- 借方金额 -->
          <td
            v-for="(debitItem, subIndex) in debitUnitMap"
            :key="subIndex"
          >{{getValue(item.debitAmount, subIndex)}}</td>
          <!-- 贷方金额 -->
          <td
            v-for="(creditItem, subIndex) in creditUnitMap"
            :key="subIndex"
          >{{getValue(item.creditAmount, subIndex)}}</td>
        </tr>

        <!-- 合计行 -->
        <tr>
          <td colspan="2" width="100">合计：</td>
          <td
            v-for="(debitItem,subIndex) in debitUnitMap"
            :key="subIndex"
          >{{getTotalValue('debitAmount', subIndex)}}</td>

          <td
            v-for="(creditItem, subIndex) in creditUnitMap"
            :key="subIndex"
          >{{getTotalValue('creditAmount', subIndex)}}</td>
        </tr>
      </tbody>
    </table>
    <div class="table-footer">
      <div>创建人：admin</div>
      <div>
        <el-button link type="primary" size="large">原始单据</el-button>
        <span>已添加 2 张</span>
      </div>
    </div>

    <div class="m-footer">
      <el-button @click="cancel">返回</el-button>
      <el-button v-if="updateStatus !== 'detail'" type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </el-form>
</template>

<script>
import { getQuarterlyList } from "@/utils/util";

import { addObj, editObj } from "../api/index.js";

export default {
  name: "oinvoiceDetail",
  data() {
    return {
      form: {
        dcdirection: 1,
        status: 1
      },
      updateStatus: "",

      rules: {},
      // 借方金额列表
      debitUnitMap: [
        {
          label: "亿",
          prop: "name2"
        },
        {
          label: "千",
          prop: "name2"
        },
        {
          label: "百",
          prop: "name2",
          value: 1
        },
        {
          label: "十",
          prop: "name2"
        },
        {
          label: "万",
          prop: "name2"
        },
        {
          label: "千",
          prop: "name2"
        },
        {
          label: "百",
          prop: "name2"
        },
        {
          label: "十",
          prop: "name2"
        },
        {
          label: "元",
          prop: "name2"
        },
        {
          label: "角",
          prop: "name2"
        },
        {
          label: "分",
          prop: "name2"
        }
      ],
      // 贷方金额列表
      creditUnitMap: [
        {
          label: "亿",
          prop: "name2"
        },
        {
          label: "千",
          prop: "name2"
        },
        {
          label: "百",
          prop: "name2",
          value: 1
        },
        {
          label: "十",
          prop: "name2"
        },
        {
          label: "万",
          prop: "name2"
        },
        {
          label: "千",
          prop: "name2"
        },
        {
          label: "百",
          prop: "name2"
        },
        {
          label: "十",
          prop: "name2"
        },
        {
          label: "元",
          prop: "name2"
        },
        {
          label: "角",
          prop: "name2"
        },
        {
          label: "分",
          prop: "name2"
        }
      ],
      // 表格数据
      tableList: [
        {
          index: 0,
          id: 1,
          subject: 11111,
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 124155.1111
        },
        {
          index: 1,
          id: 2,
          subject: "普陀区",
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 181515.41
        },
        {
          date: "2016-05-04",
          id: 3,
          subject: 11111,
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 11111.1111
        },
        {
          id: 3,
          subject: 11111,
          abstract: "摘要",
          debitAmount: 56789.11,
          creditAmount: 11111.1111
        }
      ],
      subjectList: [
        {
          name: "库存现金",
          value: 111
        },
        {
          name: "其他项目",
          value: 222
        }
      ]
    };
  },
  created() {},

  mounted() {
    // 查询详情
    const { id = "", updateStatus = "" } = this.$route.query;
    this.id = id;
    this.updateStatus = updateStatus;
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
      console.log(day);
      return (
        year +
        "-" +
        (mon > 9 ? mon : "0" + mon) +
        "-" +
        (day > 9 ? day : "0" + day)
      );
    }
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
    getValue(amount, index) {
      const arr = (amount + "").split(".");
      // 小数点前，将字符串翻转
      const reverseArr = arr[0].split("").reverse();
      // 几位数
      if (9 - reverseArr.length <= index && index < 9) {
        return reverseArr[9 - index];
      } else {
        // 小数点后
        return arr[1][index - 9];
      }
    },
    // 计算合计
    getTotalValue(key, index) {
      const total = this.tableList.reduce((sum, item) => {
        return sum + item[key];
      }, 0);
      return this.getValue(total, index);
    },
    cancel() {
      this.$router.replace({
        path: "/originalVoucherManage/invoiceList"
      });
    },
    handleRemove(uploadFile) {
      console.log(this.fileList);
      console.log(uploadFile);
    },

    // 提交表单
    handleSubmit() {
      console.log(this.tableList);
      // debugger
      const set = this.$refs;
      set["form"].validate(valid => {
        if (!valid) return false;
        if (this.updateStatus === "create") {
          this.create();
        } else {
          this.update();
        }
      });
    },
    // 创建账套
    create() {
      addObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "新建成功",
          type: "success",
          duration: 2000
        });
      });
    },
    // 编辑账套
    update() {
      editObj(this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000
        });
      });
    }
  }
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
//  background: #f5f7fa;
}

th {
  background-color: #eff3f5;
}

table tr td {
  word-break: break-all;
}

tr:nth-child(odd) {
  //  background-color: #f5f6f7;
}
.m-footer {
  margin: 48px 0 32px 33%;
}
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  span {
    margin-left: 4px;
  }
}
</style>
