<template>
  <section class="app-main">
    <div class="main-page">
      <div class="breadcrumb-container">
        <span>当前位置：</span>
        <nx-breadcrumb></nx-breadcrumb>
      </div>

      <transition name="fade" mode="out-in">
        <!-- <tags-view></tags-view> -->
        <keep-alive :include="cachedViews">
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import nxBreadcrumb from '@/components/nx-breadcrumb'

export default {
  name: 'AppMain',
  components: {
    nxBreadcrumb
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  span{
    font-size: 14px;
    color: #97a8be;
  }
}
</style>
