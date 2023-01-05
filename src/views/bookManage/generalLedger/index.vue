<template>
  <div>
    <el-form :model="listQuery" ref="form" :inline="true">
      <el-form-item label="总账账期" prop="status">
        <el-select v-model="listQuery.status">
          <el-option
            v-for="item in quarterlyList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="getList">查询</el-button>
      </el-form-item>

      <el-form-item style="float: right">
        <el-button @click="handleUpdate('', 'create')">导出</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="handleUpdate('', 'create')">打印</el-button>
      </el-form-item>
    </el-form>

    <el-scrollbar height="600px">
      <el-table
        border
        :data="list"
        v-loading.body="listLoading"
        highlight-current-row
        :span-method="objectSpanMethod"
      >
        <el-table-column align="center" label="科目编码" prop="cateName" />
        <el-table-column align="center" label="科目名称" prop="time" />

        <el-table-column align="center" label="期间" prop="time" />

        <el-table-column align="center" label="摘要" prop="time">
          <template v-slot="scope">{{scope.row.time}}</template>
        </el-table-column>

        <el-table-column align="center" label="借方金额" prop="time" />

        <el-table-column align="center" label="贷方金额" prop="time" />

        <el-table-column align="center" label="方向" prop="time" />

        <el-table-column align="center" label="余额" prop="time" />
      </el-table>
      <div class="table-footer">共{{list.length}}条数据</div>
    </el-scrollbar>

  </div>
</template>

<script>
import { page, delObj } from "../api/index.js";
import { getQuarterlyList } from "@/utils/util";

export default {
  name: "subjectBalanceTable",
  data() {
    return {
      form: {},
      list: [
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "656  " },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "656  " },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "656  " },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "111" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "41414" },
        { cateName: "北京模型有限公司", time: "656  " }
      ],
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        type: 1
      },
      dialogFormVisible: false,
      dialogStatus: "",
      deleteList: [],
      quarterlyList: []
    };
  },
  watch: {
    "listQuery.type"() {
      this.getList();
    }
  },
  mounted() {
    this.quarterlyList = getQuarterlyList(2);
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.rows;
        this.total = response.total;
        this.listLoading = false;
      });
    },
    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 0，1，2列合并三行
      if (columnIndex < 3) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-right: 16px;
}
.table-footer {
  padding: 16px;
  text-align: center;
}
</style>
