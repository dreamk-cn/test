import presetWeapp from 'unocss-preset-weapp'
import presetIcons from '@unocss/preset-icons'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import remToRpxPreset from './preset-rem-to-rpx'

export default {
  presets: [
    presetIcons({
      collections: {
        custom: FileSystemIconLoader(
          './src/icons',
          // 将fill属性转换为currentColor
          svg => svg.replace(/fill="[^"]*"/g, 'fill="currentColor"'),
        ),
      },
    }),
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    remToRpxPreset(),
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-left': 'flex justify-start items-center',
      'flex-between': 'flex justify-between items-center',
      'uno-btn': 'px-34rpx py-20rpx inline-block bg-white b b-1 border-[#C9CED9] rounded-33rpx border-solid text-26rpx leading-26rpx text-[#000333]',
      'btn-green': 'bg-[#00A76E] text-white border-transparent',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
}
