<template>
  <div>
    <div class="m-section">
      <h3>选择企业</h3>
      <div class="list">
        <el-card class="item item-qy" v-for="(item) in enterpriseList" :key="item.id" @click="updateEnterpriseStatus(item)">
          <template #header>{{ item.qymc }}</template>
          <div class="item-name">联系人：{{ item.lxr || '暂无数据' }} </div>
          <div>联系电话：{{ item.lxdh || '暂无数据' }}</div>
          <div class="item-icon" v-if="activeQyId == item.id">
            <el-icon :size="40">
              <Check />
            </el-icon>
          </div>
        </el-card>
        <el-card class="item " @click="addObj('/businessManage/detail')">
          <div class="item-add">
            <el-icon :size="50" color="#000">
              <CirclePlus />
            </el-icon>
            <div class="add-text">新增企业</div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="m-section">
      <h3>选择账套</h3>
      <div class="list">
        <el-card class="item" v-for="(item) in accountSetList" :key="item.id">
          <template #header>
            {{ item.accountSetName }}
            <el-icon :size="24" v-if="activeAccountSetId == item.id">
              <CircleCheck />
            </el-icon>

          </template>
          <div class="item-name">会计准则：{{ item.kjzd }} </div>
          <div>账套启用时间：{{ item.qysj }}</div>
          <div class="item-btn"><span @click="handleEnter(item)">进入账套</span>
            <span v-if="activeAccountSetId != item.id" @click="handleDelete(item)">删除账套</span>
          </div>
        </el-card>
        <el-card class="item" @click="addObj('/setManage/detail')">
          <div class="item-add">
            <el-icon :size="50" color="#000">
              <CirclePlus />
            </el-icon>
            <div class="add-text">新增账套</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>


<script>
import cookies from "@/utils/cookies";
import { page, updateEnterpriseStatus } from "@/views/businessManage/api/index.js";
import { delObj, findAccountSet } from "@/views/setManage/api/index.js";

export default {
  name: 'chooseAccountSet',
  components: {
  },
  data() {
    return {
      activeQyId: '',
      activeAccountSetId: '',
      enterpriseList: [],
      accountSetList: [],
    }
  },
  created() {
  },
  watch: {
    // 监听默认企业的变化
    activeQyId(qyId) {
      if (qyId) {
        this.findAccountSet()
        const { qymc = '' } = this.enterpriseList.find((item => item.id == qyId))
        cookies.set('qyId', qyId)
        cookies.set('qymc', qymc)
        this.$store.commit("SET_USERINFO", {
          qyId,
          qymc
        });

      }
    }
  },
  // computed: {
  //   // accountSetId() {
  //   //   return cookies.get('accountSetId')
  //   // }
  // },
  mounted() {
    this.getList()
  },
  methods: {
    // 查询企业列表
    getList() {
      page({
        pageIndex: 1,
        pageSize: 0
      }).then(response => {
        this.enterpriseList = response.rows;
        // 查询默认主体企业
        const { id = '' } = response.rows.find((item => item.sfmr == 1)) || {}
        // 存储主体企业信息
        this.activeQyId = id
      });
    },

    // 切换为默认企业
    updateEnterpriseStatus({ id = '' }) {
      // 不能重复点击，调用接口
      if (id == this.activeQyId) {
        return
      }
      updateEnterpriseStatus({
        id
      }).then(() => {
        this.activeQyId = id
        this.getList();
      });
    },

    // 根据所选企业查询所有账套
    findAccountSet() {
      findAccountSet({
        pageIndex: 1,
        pageSize: 0,
        qyId: this.activeQyId
      }).then(response => {
        this.accountSetList = response.rows;
        const { id = '', accountSetName = '' } = response.rows[0] || {}
        this.activeAccountSetId = id
        // if (!cookies.get('accountSetId')) {
        //   this.saveData(id, accountSetName)
        // }
        this.saveData(id, accountSetName)

      });
    },

    // 新增企业 / 账套
    addObj(path) {
      this.$router.push({
        path,
        query: {
          id: '',
          updateStatus: 'create',
          backToChoose: true
        }
      });
    },

    // 进入账套
    handleEnter({ id, accountSetName }) {
      this.$store.commit("SET_USERINFO", {
        accountSetId: id,
        accountSetName
      });
      this.saveData(id, accountSetName)
      this.$router.push({
        path: "/taxclude/home",
        query: {
          id
        }
      });
    },
    saveData(accountSetId, accountSetName) {
      cookies.set('accountSetId', accountSetId);
      cookies.set('accountSetName', accountSetName);
      this.$store.commit("SET_USERINFO", {
        accountSetId,
        accountSetName
      });
    },

    // 删除账套
    handleDelete(row) {
      this.$confirm('你确定要删除这行内容吗?', '提示', {
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
          this.findAccountSet()
        })
      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  padding-bottom: 16px;
}

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

      .item-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        background: #fbd700;
        border-radius: 4px;
      }
    }
  }

  .item-name {
    margin-bottom: 12px;
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
    margin-top: 9%;

    .add-text {
      margin-top: 8px;
    }
  }

  .el-icon-circle-plus::before {
    font-size: 80px;
  }

  /deep/ .el-card__header {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }

}
</style>
