export function handleToPage(name: string) {
  if (name === '')
    return

  uni.navigateTo({
    url: `/pages/${name}/index`,
  })
}
