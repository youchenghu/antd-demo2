<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu 
            mode="inline" 
            :open-keys="openKeys" 
            :default-selected-keys="defaultSelectedKeys"
            @openChange="onOpenChange" 
            @click='handleChangeSubItem'>
            <a-sub-menu key="options1">
                <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
                <a-menu-item key="options1-1">
                菜单1-1
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="options2">
                <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
                <a-menu-item key="options2-1">
                菜单2-1
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb> -->
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            <a-spin tip="Loading..." v-if="showloading">
            </a-spin>
                <iframe  :src='currentRouter' frameborder="0" class="content" ></iframe>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
        collapsed: false,
        currentRouter: 'options1-1',
        rootSubmenuKeys: ['options1', 'options2'],
        openKeys: ['options1'],
        defaultSelectedKeys: ['options1-1'],
        rootSubmenuKeysItem1: ['options1-1'],
        rootSubmenuKeysItem2: ['options2-1'],
        showloading: true
    }
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    handleChangeSubItem(subItem) {
        this.showloading = true;
        this.currentRouter = subItem.key;
        setTimeout(() => {
            this.showloading = false;
        }, 200)
    }
  },
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.content {
    width: 100%;
    height: 100vh;
}
</style>
