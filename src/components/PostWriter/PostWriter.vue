<template>
  <div>
    <div class="columns">
      <div class="column">
        <ValidatorInput 
          v-model="title"
          type="text"
          :name="title"
          :validation="titleValidation"
          placeholder="Title"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-five-fifths">
        <div class="field is-grouped">
          <input 
            id="new-tag"
            v-model="newTag"
            type="text" 
            class="input is-small is-inline"
            placeholder="Enter a tag"
            @keyup.enter="handleAddTag"
          >
          <Tags 
            :tags="tags"
            @removeTag="handleRemoveTag"
          />
        </div>
      </div>

      <div class="column is-one-fifth">
        <button 
          data-test-preview
          type="submit" 
          class="button is-info is-light is-small is-pulled-right"
          @click="showPreview = !showPreview"
        > 
          {{ showPreview ? 'Hide Preview' : 'Show Preview' }}
        </button>
      </div>
    </div>

    <div class="columns">
      <div class="column one-half">
        <div 
          id="markdown"
          contenteditable
          @input="handleEdit"
        />
      </div>
      <div 
        v-show="showPreview" 
        class="column one-half"
      >
        <div 
          id="rendered-markdown"
          class="post-html"
          v-html="html"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="buttons is-pulled-right">
          <div class="button is-light">
            Save Draft
          </div>

          <div 
            class="button is-primary"
            @click="handleCreatePost"
          >
            Post
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { createComponent, ref, watch, onMounted } from '@vue/composition-api'
import marked from 'marked'

import Tags from './Tags.vue'
import ValidatorInput from '../ValidatorInput/ValidatorInput.vue'
import { minLength } from '../ValidatorInput/validation'
import { options } from '../../markedOptions'
import { Post } from '../../types'
import moment from 'moment'

let editableDiv: HTMLDivElement | null = null

export default createComponent({
  name: 'PostWriter',

  components: {
    Tags,
    ValidatorInput,
  },

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },

  setup(props, ctx) {
    const title = ref(props.post.title)
    const content = ref(props.post.content)
    const tags = ref(props.post.tags)
    const html = ref('')
    const titleValidation = [ minLength({ min: 5, max: 100 }) ]
    const newTag = ref('')
    const showPreview = ref(true)

    onMounted(() => {
      const div = ctx.root.$el.querySelector<HTMLDivElement>('#markdown')
      if (!div) {
        throw Error('Content Editiable not found')
      }

      editableDiv = div
      div.innerText = props.post.content
    })

    watch(() => content.value, (val) => {
      marked(content.value, options, (err, res) => {
        if (err) {
          return
        }
        html.value = res
      })
    })

    const handleEdit = (e: any) => {
      if (!editableDiv) {
        return
      }
      content.value = editableDiv.innerText
    }

    const handleAddTag = () => {
      if (tags.value.includes(newTag.value)) {
        return
      }

      tags.value.push(newTag.value)
      newTag.value = ''
    }

    const handleCreatePost = () => {
      const newPost: Post = {
        ...props.post,
        title: title.value,
        content: content.value,
        markdown: html.value,
        tags: tags.value,
      }
      ctx.emit('submitted', newPost)
    }

    const handleRemoveTag = (tag: string) => tags.value = tags.value.filter(x => x !== tag)

    return {
      content,
      html,
      title,
      newTag,
      tags,
      showPreview,
      handleEdit,
      handleAddTag,
      handleCreatePost,
      handleRemoveTag,
      titleValidation,
    }
  }
})
</script>

<style lang="scss">
@import '../markdown-style.scss';

.buttons {
  justify-content: flex-end;
}

#new-tag {
  margin: 0 8px 0 0;
}

#markdown, #rendered-markdown {
  min-height: 400px;
}

#markdown {
  white-space: pre-wrap;
  border: 1px solid #dbdbdb;
  padding: calc(0.75em - 1px);
  border-radius: 4px;
}

#rendered-markdown {
  padding: calc(0.75em - 1px);
  border: 1px solid;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
</style>