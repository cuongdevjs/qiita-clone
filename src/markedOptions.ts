import marked from 'marked'
import hljs from 'highlight.js'

const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
  return `
    <h${level} class="markdown-h${level}">
      ${text}
    </h${level}>`
}

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