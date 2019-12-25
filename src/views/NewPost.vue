<template>
  <div>
    <ValidatorInput 
      v-model="title"
      type="text"
      :validation="titleValidation"
      placeholder="Title"
    />
    <Tags />
    <div class="columns">
      <div class="column one-half">
        <textarea 
          id="markdown"
          class="textarea"
          v-model="content"
        />
      </div>
      <div class="column one-half">
        <div 
          id="rendered-markdown"
          v-html="html"
        />

        <br />
        <div class="buttons">
          <div class="button is-light">
            Save Draft
          </div>

          <div class="button is-primary">
            Post
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import Tags from '@/components/Tags.vue'
import ValidatorInput from '@/components/ValidatorInput.vue'
import { minLength } from '@/components/validation'

export default createComponent({
  name: 'NewPost',

  props: {},

  components: {
    Tags,
    ValidatorInput,
  },


  setup() {
    const renderer = new marked.Renderer();
    renderer.heading = (text, level) => {
      return `
        <h${level} class="markdown-h${level}">
          ${text}
        </h${level}>`
    }

    const options: marked.MarkedOptions = {
      gfm: true,
      breaks: true,
      highlight: (code: string) => {
        return hljs.highlightAuto(code).value
      },
      renderer
    }

    const title = ref('')
    const content = ref('')
    const html = ref('')
    const titleValidation = [ minLength({ min: 5, max: 100 }) ]

    watch(() => content.value, (val) => {
      marked(content.value, options, (err, res) => {
        if (err) {
          return
        }
        html.value = res
      })
    })

    return {
      content,
      html,
      title,
      titleValidation,
    }
  }
})
</script>

<style>
.buttons {
  justify-content: flex-end;
}

#markdown, #rendered-markdown {
  min-height: 400px;
}

.markdown-h1 { font-size: 1.6rem !important; }
.markdown-h2 { font-size: 1.5rem !important; }
.markdown-h3 { font-size: 1.4rem !important; }
.markdown-h4 { font-size: 1.3rem !important; }
.markdown-h5 { font-size: 1.2rem !important; }
.markdown-h6 { font-size: 1.1rem !important; }

#rendered-markdown {
  padding: calc(0.75em - 1px);
  border: 1px solid;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
</style>