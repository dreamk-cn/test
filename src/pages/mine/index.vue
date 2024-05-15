<script setup lang="ts">
const userStore = useUserStore()
function handleLogout() {
  userStore.logout().then(() => {
    // 重定向到登录页面
    uni.redirectTo({
      url: '/pages/login/index',
    })
  })
}
</script>

<template>
  <div class="top-bg p-3">
    <div class="mt-60rpx text-xl font-bold">
      我的
    </div>
    <div class="my-5 flex flex-col w-full items-center">
      <div class="p-5rpx bg-white rounded-full h-160rpx w-160rpx">
        <image class="rounded-full h-150rpx w-150rpx" src="https://guodu-homework.oss-cn-beijing.aliyuncs.com/static/student/avatar.jpg" />
      </div>
      <div class="mt-3 font-bold">
        张小虎同学
      </div>
    </div>
    <div class="py-30rpx">
      <button @tap="handleLogout">
        退出登录
      </button>
    </div>
  </div>
</template>
