import type { Directive } from 'vue'

type EventNameList = (keyof HTMLElementEventMap)[]

const preventDefaultAndStopPropagation = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
}

/**
 * @description 批量注册事件监听器
 * @param eventNameList 事件名列表
 * @param handler 事件处理函数
 */
const batchAddEventListener = (
  el: HTMLElement,
  eventNameList: EventNameList,
  handler: (...args: any[]) => any,
  useCapture?: boolean,
) => {
  useCapture = useCapture ?? false
  eventNameList.forEach(eventName =>
    el.addEventListener(eventName, handler, useCapture),
  )
}

// 让元素变得可放置
const makeElDroppable = (el: HTMLElement) => {
  batchAddEventListener(
    el,
    ['dragenter', 'dragover', 'dragleave', 'drop'],
    preventDefaultAndStopPropagation,
  )
}

/**
 * @description 有可拖拽元素进入时让可放置元素高亮
 * @param el 元素
 * @param highlightClassName 高亮时添加的类名
 */
const makeElHighlight = (el: HTMLElement, highlightClassName: string) => {
  // 进入和移动时添加 highlightClassName
  batchAddEventListener(el, ['dragenter', 'dragover'], () => {
    el.classList.add(highlightClassName)
  })

  // 离开和放下时移除 highlightClassName
  batchAddEventListener(el, ['dragleave', 'drop'], () => {
    el.classList.remove(highlightClassName)
  })
}

/**
 * @description 让元素变得可放置
 */
export const vDroppable: Directive<
  HTMLElement,
  { highlightClassName?: string } | undefined
> = (el, binding) => {
  // 默认不高亮
  const highlight = binding.modifiers?.highlight ?? false
  // 高亮时添加的类名 -- 交给外界自定义类名及其样式 提高通用性
  const highlightClassName = binding.value?.highlightClassName ?? 'highlight'

  makeElDroppable(el)

  if (highlight) {
    makeElHighlight(el, highlightClassName)
  }
}
