<template>
  <div>
    <div class="columns">
      <div class="column">
        <ValidatorInput 
          v-model="title"
          type="text"
          :validation="titleValidation"
          placeholder="Title"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field is-grouped">
          <input 
            id="new-tag"
            v-model="newTag"
            @keyup.enter="handleAddTag"
            type="text" 
            class="input is-small is-inline"
            placeholder="Enter a tag"
          >
          <Tags 
            :tags="tags"
            @removeTag="handleRemoveTag"
          />
        </div>
      </div>

      <div class="column">
        <button 
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
          @keyup="handleEdit"
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

          <div class="button is-primary">
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

import Tags from '@/components/Tags.vue'
import ValidatorInput from '@/components/ValidatorInput.vue'
import { minLength } from '@/components/validation'
import { options } from '@/markedOptions'
import { IArticle } from '@/types'

export default createComponent({
  name: 'PostWriter',

  components: {
    Tags,
    ValidatorInput,
  },

  props: {
    post: {
      type: Object as () => IArticle,
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
      // @ts-ignore
      ctx.root.$el.querySelector('#markdown')!.innerText = props.post.content
    })

    const handleEdit = (e: any) => {
      // @ts-ignore
      content.value = ctx.root.$el.querySelector('#markdown')!.innerText
    }

    watch(() => content.value, (val) => {
      marked(content.value, options, (err, res) => {
        if (err) {
          return
        }
        html.value = res
      })
    })

    const handleAddTag = () => {
      if (tags.value.includes(newTag.value)) {
        return
      }

      tags.value.push(newTag.value)
      newTag.value = ''
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
}

#rendered-markdown {
  padding: calc(0.75em - 1px);
  border: 1px solid;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
</style>