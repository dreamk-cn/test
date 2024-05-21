<script setup lang="ts">
const userStore = useUserStore()
const account = ref('')
const pwd = ref('')
// 判断是否有token
if (userStore.token) {
  // 有token 跳转到我的页面
  // 获取userInfo
  userStore.getUserInfo().then(() => {
    uni.switchTab({ url: '/pages/index/index' })
  })
}

function handleLogin() {
  // 验证参数
  if (account.value.trim() === '') {
    uni.showToast({ icon: 'none', title: '请输入账号' })
    return
  }
  if (pwd.value.trim() === '') {
    uni.showToast({ icon: 'none', title: '请输入密码' })
    return
  }
  userStore.login(account.value.trim(), pwd.value.trim()).then(() => {
    // 登录成功 跳转到我的页面
    uni.switchTab({ url: '/pages/mine/index' })
  })
}
</script>

<template>
  <view class="bg-#F5F5F9 h-100vh">
    <view class="login-bg text-55rpx font-bold text-white flex-center h-520rpx w-full">
      LOGO
    </view>
    <view class="p-50rpx bg-#F5F5F9 rounded-t-30rpx transform-translate-y--50rpx">
      <view class="mb-50rpx text-40rpx font-bold text-#000333">
        教师端登录
      </view>
      <view class="p-26rpx mx-auto mb-25rpx bg-white rounded-20rpx flex h-90rpx w-650rpx items-center">
        <view class="i-carbon-user-filled text-38rpx text-#96a5b8" />
        <input v-model="account" class="uni-input placeholder-[#8F9AA8] ml-25rpx text-#000333 flex-1 h-full" focus placeholder="请输入手机号">
      </view>
      <view class="p-26rpx mx-auto mb-40rpx bg-white rounded-20rpx flex h-90rpx w-650rpx items-center">
        <view class="i-carbon-phone-block-filled text-38rpx text-#96a5b8" />
        <input v-model="pwd" class="uni-input placeholder-[#8F9AA8] ml-25rpx text-#000333 flex-1 h-full" password type="safe-password" placeholder="请输入密码">
      </view>
      <view class="mb-40rpx bg-#00A76E rounded-20rpx line-height-90rpx text-center text-white h-90rpx w-full" @tap="handleLogin">
        登录
      </view>
      <view class="text-24rpx text-center text-#8F9AA8">
        登录即代表阅读并同意
        <text class="text-#000333">
          《智慧作业用户协议》
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.login-bg {
  background-image: url("https://guodu-homework.oss-cn-beijing.aliyuncs.com/static/teacher/login_top_bg.png");
  background-size: 100% 530rpx;
  background-repeat: no-repeat;
  min-height: 530rpx;
}
</style>
