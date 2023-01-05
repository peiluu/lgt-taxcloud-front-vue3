<template>
  <div>
    <el-form :model="listQuery" ref="form" :inline="true">
      <el-form-item label="科目余额账期" prop="status">
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
      <el-table border :data="list" v-loading.body="listLoading" highlight-current-row show-summary>
        <el-table-column align="center" label="科目编码">
          <template v-slot="scope">
            <el-button link type="primary" @click="goToDetail(scope.row.code)">{{scope.row.code}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="科目名称" prop="cateName" />

        <el-table-column align="center" label="期初余额">
          <el-table-column prop="number" label="借方" />
          <el-table-column prop="number" label="贷方" />
        </el-table-column>

        <el-table-column align="center" label="本期发生额">
          <el-table-column prop="number" label="借方" />
          <el-table-column prop="number" label="贷方" />
        </el-table-column>
        <el-table-column align="center" label="本年累计发生额">
          <el-table-column prop="number" label="借方" />
          <el-table-column prop="number" label="贷方" />
        </el-table-column>
        <el-table-column align="center" label="期末余额">
          <el-table-column prop="number" label="借方" />
          <el-table-column prop="number" label="贷方" />
        </el-table-column>
      </el-table>
      <div class="table-footer">共{{list.length}}条数据</div>
    </el-scrollbar>

    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:current-page="listQuery.pageIndex"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />-->
  </div>
</template>

<script>
import { page, delObj } from "../api/index.js";
import { getQuarterlyList } from "@/utils/util";

export default {
  name: "generalLedger",

  data() {
    return {
      form: {},
      list: [
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" },
        { code: 1001, cateName: "北京模型有限公司", number: "656  " },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "111" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" },
        { code: 1001, cateName: "北京模型有限公司", number: "41414" }
      ],
      total: 0,
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
    goToDetail(code) {}
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
