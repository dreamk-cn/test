export function handleToPage(name: string) {
  if (name !== '') {
    uni.navigateTo({
      url: `/pages/${name}/index`,
    })
  }
}

export function handleBackPage() {
  uni.navigateBack()
}
