import { ref } from 'vue'
import { useComponentColor } from '../../../../hooks'

import type { RateProps } from '../rate'
import type { RateItemData } from '../types'

const useRateItemData = (props: RateProps) => {
  const rateItemData = ref<RateItemData[]>([])

  // 生成RateItemData数据
  const generateRateItemData = () => {
    const {
      max,
      inactiveIcon,
      activeIcon,
      inactiveColor,
      activeColor,
      customData,
    } = props

    const defaultConfig = {
      inactiveIcon,
      activeIcon,
      inactiveColor,
      activeColor,
    }
    const data: RateItemData[] = []
    for (let i = 0; i < max; i++) {
      const configData = { ...defaultConfig, ...(customData?.[i] ?? {}) }
      // 解析颜色值
      const [inactiveColorClass, inactiveColorStyle] = useComponentColor(
        configData.inactiveColor,
        'text'
      )
      const [activeColorClass, activeColorStyle] = useComponentColor(
        configData.activeColor,
        'text'
      )

      data.push({
        active: {
          icon: configData.activeIcon,
          color: {
            class: activeColorClass.value,
            style: activeColorStyle.value,
          },
        },
        inactive: {
          icon: configData.inactiveIcon,
          color: {
            class: inactiveColorClass.value,
            style: inactiveColorStyle.value,
          },
        },
      })
    }
    rateItemData.value = data
  }
  generateRateItemData()

  return {
    rateItemData,
  }
}

export default useRateItemData