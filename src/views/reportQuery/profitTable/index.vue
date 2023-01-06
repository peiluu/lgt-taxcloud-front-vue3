<template>
  <div>
    <lgtQuarterlySelect
      @export="handleExport"
      @print="handlePrint"
      @query="handleQuery"
      formLabel="利润表周期"
    >
      <el-form-item prop="periods">
        <el-select v-model="form.periods">
          <el-option key="1" value="1" label="月报" />
          <el-option key="2" value="2" label="季报" />
          <el-option key="3" value="3" label="半年报" />
        </el-select>
      </el-form-item>
    </lgtQuarterlySelect>

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
import { getQuarterlyList } from "@/utils/util";
import lgtQuarterlySelect from "@/components/lgt-quarter-select/index.vue";
import { page } from "../api/index.js";

export default {
  name: "profitTable",
  components: { lgtQuarterlySelect },
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
    handleExport() {
      console.log("导出");
    },
    handlePrint() {
      console.log("打印");
    },
    handleQuery(data) {
      console.log("查询", data);
    },
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
