<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="m-left">
      <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nx-hamburger>
      <!-- <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb> -->
      <div class="m-list">
        <div>当前主体 <span class="name"> {{ comName }}</span> <span class="btn">切换</span></div>
        <template v-for="(item) in list" v-if="showChange" :key="item.name">
          <div >{{ item.name }}</div>
        </template>
      </div>  
    </div>
    
    <div class="right-menu">
      <!--<error-log class="errLog-container right-menu-item"></error-log>-->

      <!--<nx-github style="margin-top:2px" class="nx-help right-menu-item"></nx-github>-->
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <!--<nx-help class="nx-help right-menu-item" />-->
      <nx-top-lock style="cursor:pointer" class="nx-help"></nx-top-lock>
      <!-- <el-tooltip effect="dark" content="全屏" placement="bottom">
        <nx-full-screen class="screenfull right-menu-item"></nx-full-screen>
      </el-tooltip> -->

      <!-- <lang-select class="international right-menu-item"></lang-select> -->
      <!--<nx-lang-select class="international right-menu-item"></nx-lang-select>-->

      <!--<el-tooltip effect="dark" content="主题" placement="bottom">
        &lt;!&ndash; <theme-picker class="theme-switch right-menu-item"></theme-picker> &ndash;&gt;
        <nx-skin class="theme-switch right-menu-item"></nx-skin>
      </el-tooltip>-->

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://mgbq.github.io/nx-admin-site/home.png">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!--<a target='_blank' href="https://github.com/mgbq/nx-admin/">
            <el-dropdown-item>
              github地址
            </el-dropdown-item>
          </a>-->
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import nxTopLock from '@/components/nx-top-lock'
import nxHamburger from '@/components/nx-hamburger'
// import nxFullScreen from '@/components/nx-full-screen/index'

export default {
  name: 'navBar',
  components: {
   
    nxHamburger,

    // nxFullScreen,

    nxTopLock,
    
  },
  data() {
    return {
      showChange: false,
      comName: '北京罗格科技有限公司',
      list: [{
        name: '北京罗格科技有限公司2'
      }, {
        name: '北京罗格科技有限公司3'
      }]
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-radius: 0px !important;

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .m-left {
    display: flex;
  }

  .m-list {
    width: 100%;
    display: flex;
    color: #7F7F7F;
    font-size: 14px;
    font-weight: bold;

    .name {
      color: #6981FF;
    }

    .btn {
      margin-left: 8px;
      cursor: pointer;
      color: #E96979;
    }
  }


  .nx-help {
    display: inline-block;
    vertical-align: top;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {

    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }

    .screenfull {
      height: 20px;
    }

    .international {
      vertical-align: top;
    }

    .theme-switch {
      vertical-align: 15px;
    }

    .avatar-container {
      height: 50px;
      margin-right: 30px;

      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
