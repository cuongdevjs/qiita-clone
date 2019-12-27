import marked from 'marked'
import hljs from 'highlight.js'

const renderer = new marked.Renderer();
const options: marked.MarkedOptions = {
  gfm: true,
  highlight: (code: string) => {
    return hljs.highlightAuto(code).value
  },
  renderer
}

export {
  options,
}