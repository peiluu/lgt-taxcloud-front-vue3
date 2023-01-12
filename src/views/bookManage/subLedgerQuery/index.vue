<template>
  <div>
    <lgtQuarterlySelect
      @export="handleExport"
      @print="handlePrint"
      @query="handleQuery"
      formLabel="明细账期"
    />

    <div class="m-section">
      <el-card>
        <template #header>科目：{{currentSubject.code }} {{currentSubject.name}}</template>
        <el-table border stripe :data="list" v-loading.body="listLoading" highlight-current-row>
          <el-table-column align="center" label="日期" prop="code" />
          <el-table-column align="center" label="凭证字号" prop="cateName" />
          <el-table-column align="center" label="摘要" prop="number" />
          <el-table-column align="center" label="借方金额" prop="number" />
          <el-table-column align="center" label="贷方金额" prop="number" />
          <el-table-column align="center" label="方向" prop="number" />

          <el-table-column align="center" label="余额" prop="number" />
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:current-page="listQuery.pageIndex"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
      </el-card>

      <el-card>
        <template #header>
          <el-input v-model="inputVal" suffix-icon="Search" />
        </template>
        <div
          v-for="item in subjectList"
          :key="item.code"
          :class="{'item': true, 'active': item.code === currentSubject.code}"
          @click="currentSubject = item"
        >
          <el-icon color="#87DDF7">
            <Document />
          </el-icon>
          {{item.name}}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getQuarterlyList } from "@/utils/util";

import lgtQuarterlySelect from "@/components/lgt-quarter-select/index.vue";
import { page, delObj } from "../api/index.js";

export default {
  name: "setManageList",
  components: { lgtQuarterlySelect },
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
      subjectList: [],

      originSubjectList: [
        { code: 1001, name: "库存现金" },
        { code: 1002, name: "银行存款" },
        { code: 1003, name: "应付账款" },
        { code: 1004, name: "材料采购" }
      ],
      total: 0,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      quarterlyList: [],
      currentSubject: {},
      inputVal: ""
    };
  },
  mounted() {
    // this.getList()
    this.quarterlyList = getQuarterlyList(2);
    // 根据传入的code值查找当前的科目项，默认值为列表第一项
    this.currentSubject =
      this.originSubjectList.find(
        item => item.code == this.$route.query.code
      ) || this.originSubjectList[0];
    // 当前展示的科目列表
    this.subjectList = [...this.originSubjectList];
  },
  watch: {
    inputVal(val) {
      // 根据搜索内容模糊筛选科目列表
      this.subjectList = this.originSubjectList.filter(item =>
        item.name.includes(val)
      );
    }
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
    // 重置表单
    reset() {
      this.listQuery = {
        pageIndex: 1,
        pageSize: 10
      };
      this.getList();
    },

    handleAddChange(value) {
      this.form.subjectId =
        value && value.length ? value[value.length - 1] : "";
      this.$refs.cascaderRef.dropDownVisible = false;
    },

    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },

    handleUpdate(id = "", updateStatus = "") {
      this.$router.push({
        path: "/setManage/detail",
        query: {
          id,
          updateStatus
        }
      });
    },
    handleExport() {
      console.log("导出");
    },
    handlePrint() {
      console.log("打印");
    },
    handleQuery(data) {
      console.log("查询", data);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-right: 16px;
}
.m-section {
  display: flex;
}
.el-card {
  flex-basis: 70%;
  &:last-child {
    flex-basis: 30%;
    .item {
      display: flex;
      align-items: center;
      margin-top: 8px;
      padding: 4px;
      cursor: pointer;
      &.active {
        background: #ffebc0;
      }
    }
    .el-icon {
      margin-right: 4px;
    }
  }
  /deep/ .el-card__body {
    padding: 0 20px 20px;
  }
}
</style>
