export function handleToPage(name: string) {
  if (name !== '') {
    uni.navigateTo({
      url: `/pages/${name}`,
    })
  }
}

export function handleBackPage() {
  uni.navigateBack()
}
