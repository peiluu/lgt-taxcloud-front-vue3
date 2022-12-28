<template>
  <div class="p-page">
    <div class="m-section">
      <h3>选择企业</h3>
      <div class="list">
        <el-card class="item item-qy" v-for="(item) in qylist" :key="item.id" @click.native="choseQy(item.id)">
          <div slot="header" class="clearfix">
            <span>{{ item.name }}</span>
          </div>
          <div class="item-name">联系人：{{ item.person }} </div>
          <div>联系电话：{{ item.telphone }}</div>
          <div class="item-icon" v-if="activeQyId === item.id"><i class="el-icon-check"></i></div>
        </el-card>
        <el-card class="item" @click.native="addQy">
          <div class="item-add">
            <div><i class="el-icon-circle-plus"></i></div>
            <div class="add-text">新增企业</div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="m-section">
      <h3>选择账套</h3>
      <div class="list">
        <el-card class="item" v-for="(item) in qylist" :key="item.id">
          <div slot="header" class="clearfix">
            <span>{{ item.name }}</span>
          </div>
          <div class="item-name">会计准则：{{ item.person }} </div>
          <div>账套启用时间：{{ item.telphone }}</div>
          <div class="item-btn"><span>进入账套</span><span @click="handleDelete(item)">删除账套</span></div>

        </el-card>

        <el-card class="item" @click.native="addQy">
          <div class="item-add">
            <div><i class="el-icon-circle-plus"></i></div>
            <div class="add-text">新增账套</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      activeQyId: '',
      qylist: [{
        id: 1,
        name: 'AAAAA企业名称',
        person: '赵冬',
        telphone: '139212323221'
      },
      {
        id: 2,
        name: 'AAAAA企业名称1',
        person: '赵冬',
        telphone: '139212323221'
      }, {
        id: 3,
        name: 'AAAAA企业名称2',
        person: '赵冬',
        telphone: '139212323221'
      }
      ]
    }
  },
  created() { },
  watch: {},
  mounted() { },
  methods: {
    choseQy(id) {
      this.activeQyId = id
    },
    addQy() { },
    handleDelete(row) {
      this.$confirm('你确定要删除这行内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // delObj({ id: row.id }).then(() => {
        //   this.$notify({
        //     title: '成功',
        //     message: '删除成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        //   this.getList()
        // })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.p-page {
  .list {
    display: flex;
    flex-wrap: wrap;

    .item {
      flex-basis: 23%;
      cursor: pointer;
      margin: 0 24px 24px 0;

      position: relative;

      &.item-qy {
        padding-bottom: 12px;
      }
    }

    .item-name {
      margin-bottom: 12px;
    }

    .item-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      background: #fbd700;
      border-radius: 4px;

      .el-icon-check::before {
        font-size: 36px;

      }
    }

    .item-btn {
      display: flex;
      justify-content: flex-end;
      color: #6981FF;
      margin-top: 12px;

      span {
        margin-left: 8px;
        font-size: 14px;
      }
    }

    .item-add {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .add-text {
        margin-top: 8px;
      }
    }

    .el-icon-circle-plus::before {
      font-size: 80px;
    }
  }
}
</style>
