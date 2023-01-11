<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="handerMethod"
        :cell-style="{ 'text-align': 'center' }"
        @cell-click="cellClick"
        :span-method="objectSpanMethod"
      >
        <el-table-column label="摘要" width="150">
          <template #default="scope">
            <el-input v-model="tableData[scope.$index].name" />
          </template>
        </el-table-column>

        <el-table-column label="科目" width="150">
          <template #default="scope">
            <el-select v-model="tableData[scope.$index].province">
              <el-option
                v-for="(item) in subjectCateList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column v-for="(item) in listMap" :key="item.label">{{ item }}</el-table-column>
        <el-table-column label="借方金额">
          <!-- <template  slot-scope="scope"  v-if="tableData[scope.$index] && tableData[scope.$index].idEditDebit === true">
            <th prop="name2" :label="item.label" width="40" v-for="(item) in listMap" :key="item.index">
              {{item.label}}
            </th>
          </template>-->

          <!-- <template v-slot="scope"> -->

          <!-- </template> -->
          <!-- <el-table-column prop="name2" label="千" width="40">
          </el-table-column>-->
          <!-- <el-table-column label="亿" width="40">

            </el-table-column>
            <el-table-column prop="name2" label="千" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="百" width="40">
            </el-table-column>
            <el-table-column  label="十" width="40">
            </el-table-column>
            <el-table-column label="万" width="40">
            </el-table-column>
            <el-table-column label="千" width="40">
            </el-table-column>
            <el-table-column prop="num" label="百" width="40">
            </el-table-column>
            <el-table-column prop="num" label="十" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="元" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="角" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="分" width="40">
          </el-table-column>-->

          <!-- </template> -->
          <!--
          <template v-else>
            <el-table-column prop="name1" label="亿" width="40">
            </el-table-column>
            <el-table-column prop="name2" label="千" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="百" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="十" width="40">
            </el-table-column>
            <el-table-column prop="num" label="万" width="40">
            </el-table-column>
            <el-table-column prop="num" label="千" width="40">
            </el-table-column>
            <el-table-column prop="num" label="百" width="40">
            </el-table-column>
            <el-table-column prop="num" label="十" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="元" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="角" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="分" width="40">
            </el-table-column>
          </template>-->
        </el-table-column>

        <!-- <el-table-column label="贷方金额">
          <template slot-scope="scope">
            <template v-if="tableData[scope.$index].idEditDebit">
              <el-input v-model="form.sceneName" />
            </template>
          </template>

          <div class="row" @click="columnClick">
            <el-table-column prop="name1" label="亿" width="40">
            </el-table-column>
            <el-table-column prop="name2" label="千" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="百" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="十" width="40">
            </el-table-column>
            <el-table-column prop="num" label="万" width="40">
            </el-table-column>
            <el-table-column prop="num" label="千" width="40">
            </el-table-column>
            <el-table-column prop="num" label="百" width="40">
            </el-table-column>
            <el-table-column prop="num" label="十" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="元" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="角" width="40">
            </el-table-column>
            <el-table-column prop="name3" label="分" width="40">
            </el-table-column>
          </div>

        </el-table-column>-->
      </el-table>
    </el-form>

    <div class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <!-- <el-button v-if="dialogStatus =='create'" type="primary" @click="create('form')">确 定</el-button> -->
      <el-button type="primary" @click="update('form')">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { page, addObj, delObj, editObj } from "../api/index";

export default {
  name: "accountRecord",
  data() {
    return {
      idEditDebit: false, // 编辑借方金额
      isEditCreditor: false, // 编辑贷方金额
      form: {},
      rules: {},
      currentIndex: "",
      dataList: [],
      listMap: [
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
      tableData: [
        {
          index: 0,
          id: 1,
          date: "2016-05-03",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          num: 1,
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          index: 1,
          id: 2,
          date: "2016-05-02",
          name: "王小虎2",
          province: "上海",
          num: 1,
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          money: 11,
          num: 1,
          index: 2,
          id: 3,
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          index: 3,
          id: 4,
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      subjectCateList: [
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
  created() {
    // this.getList()
  },

  mounted() {
    // this.$nextTick(function () {
    //   this.setColSpan()
    // })
  },

  methods: {
    handerMethod({ row, column, rowIndex, columnIndex }) {
      if (row[0].level === 1) {
        // 这里有个非常坑的bug 必须是row[0]=0 row[1]=2才会生效
        // row[0].colSpan = 2
        // console.log(row[0])
        // if (columnIndex === 1) {
        //   return { display: 'none' }
        // }
        // if (columnIndex === 2) {
        //   return { display: 'none' }
        // }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if ()
      // 合并单元格
      if (columnIndex > 1) {
        return [1, 11];
      }
    },
    cellClick(row, column, cell) {
      console.log(cell);
      this.currentIndex = this.tableData.findIndex(item => item.id === row.id);
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          idEditDebit: row.id === item.id
        };
      });
      console.log(this.tableData);
      console.log(this.currentIndex);
    },
    setColSpan: function() {
      // 获取表头的所有单元格 将第二列表头单元格的colSpan设为4
      document
        .getElementById("inspector-ouzhiunit")
        .getElementsByClassName(
          "el-table__header"
        )[0].rows[2].cells[0].colSpan = 4;

      // 获取表头的所有单元格
      // let x = document.getElementsByClassName("el-table__header")[0].rows[0].cells
      // 将第二列表头单元格的colSpan设为2
      // x[1].colSpan = 2
    },
    clickRow(row) {
      console.log(row);
    },
    columnClick(e) {
      console.log(e);
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      // 让第一行的第二个元素占2行
      // if (rowIndex == 0) {
      //   row[1].rowSpan = 2
      // }
      // // 让第二行
      // if (rowIndex == 1) {
      //   row[0].colSpan = 0
      //   row[1].colSpan = 0
      //   if (columnIndex == 0 || columnIndex == 1) {
      //     return {
      //       display: 'none'
      //     }
      //   }
      // }
      // return {
      //   backgroundColor: "green",
      // };
    },
    cellMerge({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex);
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    handleChange(value) {
      this.form.pid = value && value.length ? value[value.length - 1] : "";
      this.$refs.cascaderRef.dropDownVisible = false;
    },

    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.rows;
        this.total = response.total;
        this.listLoading = false;
      });
    },

    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    handleCreate() {
      this.cascadeList = [...this.allCascadeList];
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      this.form = row;
      this.editId = row.id;
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },

    setDisabled(list, id) {
      list.map(item => {
        item.disabled = item.id === id;
        if (item.children && item.children > 0) {
          this.setDisabled(item.children, id);
        }
      });
      console.log(list);
      return list;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj({ id: row.id }).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        });
      });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
          addObj({
            ...this.form,

            pid: this.form.pid || ""
          }).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.getList();
    },
    update(formName) {
      const set = this.$refs;

      set[formName].validate(valid => {
        if (valid) {
          const param = {
            ...this.form,
            tableData: this.tableData
          };
          console.log(param);
          return;
          this.dialogFormVisible = false;
          this.form.password = undefined;
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
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {};
    }
  }
};
</script>
<style lang="scss">
.row {
  border: 1px solid red;
}

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
