import { createComponent, } from '@vue/composition-api'


export default createComponent({
  setup(props, ctx) {
    console.log(
      props
    )

    const hide = () => {
      ctx.emit('hide')
    }

    return {
      hide
    }
  },
})