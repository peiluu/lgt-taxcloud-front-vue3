<template>
  <div class="com-quarterly-selection">
    <el-icon @click="goForword(-1)">
      <ArrowLeft />
    </el-icon>

    <el-tabs v-model="currnentItem" type="card">
      <el-tab-pane
        v-for="item in currentList"
        :label="item.label"
        :name="item.value"
        :key="item.value"
      >{{item.label}}</el-tab-pane>
    </el-tabs>

    <el-icon @click="goForword(1)">
      <ArrowRight />
    </el-icon>
  </div>
</template>

<script>
export default {
  name: "quarterlySelection",
  data() {
    return {
      originList: [], // 完整列表
      currentList: [], // 当前展示的列表
      currnentItem: "",
      originIndex: 0 // 当前的列表在完整列表中的索引
    };
  },

  mounted() {
    this.getQuarterlyList();
  },
  watch: {
    currnentItem(val) {
      this.$emit("dateChange", val);
    }
  },
  methods: {
    goForword(val) {
      const list = [...this.originList];
      // 移动到末尾不再移动
      if (
        (this.originIndex === 0 && val < 0) ||
        (this.originIndex === list.length - 4 && val > 0)
      )
        return;
      this.currentList = [...list.splice(this.originIndex + val, 4)];
      this.originIndex = this.originIndex + val;
    },

    /**
     * @description 获取季度列表
     * @param number 倒推的年数，默认值为2
     */
    getQuarterlyList(number) {
      const date = new Date();
      var year = date.getFullYear();
      const list = [];
      // 倒推之后的第一年
      const firstYear = year - (number || 2);
      const push = (i, j) => {
        list.push({
          label: `${i}年第${j}季度`,
          value: `${i}-${j}`
        });
      };
      // 获取季度数
      const quarter = Math.floor((date.getMonth() + 3) / 3);
      for (let i = firstYear; i <= year; i++) {
        for (let j = 1; j <= 4; j++) {
          // 如果是起始年份，只有当前季度往后的季度
          if (i === firstYear && j >= quarter) {
            push(i, j);
          }
          // 如果是起始年份，只有当前季度往前的季度
          else if (i === year && quarter >= j) {
            push(i, j);
          }
          // 如果是中间的年份，有完整的季度
          else if (i !== year && i !== firstYear) {
            push(i, j);
          }
        }
      }
      // 完整列表
      this.originList = [...list];
      this.originIndex = list.length - 4;
      // 目前的展示列表
      this.currentList = [...list.splice(list.length - 4, 4)];
      this.$nextTick(() => {
        this.currnentItem = this.currentList[3].value;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.com-quarterly-selection {
  display: flex;
  align-items: center;
  padding-bottom: 16px;
}
.el-icon {
  cursor: pointer;
}
.el-tabs {
  margin: 0 12px;

  /deep/ .el-tabs__header {
    margin: 0;
  }
  .el-tab-pane {
    display: none;
  }
}
</style>
