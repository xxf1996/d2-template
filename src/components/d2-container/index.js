// 组件
import D2ContainerFull from './D2ContainerFull.vue'
import D2ContainerFullBs from './D2ContainerFullBs.vue'
import D2ContainerGhost from './D2ContainerGhost.vue'
import D2ContainerGhostBs from './D2ContainerGhostBs.vue'
import D2ContainerCard from './D2ContainerCard.vue'
import D2ContainerCardBs from './D2ContainerCardBs.vue'

export default {
  name: 'D2Container',
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    },
    // 滚动优化
    betterScroll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    // 始终返回渲染组件
    component () {
      if (this.type === 'card' && !this.betterScroll) return D2ContainerCard
      if (this.type === 'card' && this.betterScroll) return D2ContainerCardBs
      if (this.type === 'ghost' && !this.betterScroll) return D2ContainerGhost
      if (this.type === 'ghost' && this.betterScroll) return D2ContainerGhostBs
      if (this.type === 'full' && !this.betterScroll) return D2ContainerFull
      if (this.type === 'full' && this.betterScroll) return D2ContainerFullBs
      else {
        return 'div'
      }
    }
  },
  render (h) {
    const slots = [
      h('div', this.$slots.default)
    ]
    if (this.$slots.header) slots.push(h('div', { slot: 'header' }, [ this.$slots.header ]))
    if (this.$slots.footer) slots.push(h('div', { slot: 'footer' }, [ this.$slots.footer ]))
    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs,
        on: {
          scroll: e => this.$emit('scroll', e)
        }
      }, slots)
    ])
  },
  methods: {
    // 返回顶部
    scrollToTop () {
      this.$refs.component.scrollToTop()
      // 如果开启了 better scroll 还需要手动触发一遍 scroll 事件
      const bs = this.$refs.component.BS
      if (bs) this.$refs.component.scroll()
    },
    // 用法同原生方法 scrollBy
    scrollBy (x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollBy(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollBy(x, y)
      }
    },
    // 用法同原生方法 scrollTo
    scrollTo (x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTo(x, y)
      }
    },
    // 用法同原生方法 scrollTop
    scrollTop (top = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(bs.x, -top, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTop = top
      }
    }
  }
}
