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
    <!-- </div> -->

    <div class="columns">
      <div class="column one-half">
        <textarea 
          id="markdown"
          class="textarea"
          v-model="content"
        />
      </div>
      <div 
       v-if="showPreview" 
        class="column one-half"
      >
        <div 
          class="post-html"
          id="rendered-markdown"
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
import { createComponent, ref, watch } from '@vue/composition-api'
import marked from 'marked'

import Tags from '@/components/Tags.vue'
import ValidatorInput from '@/components/ValidatorInput.vue'
import { minLength } from '@/components/validation'
import { options } from '@/markedOptions'

export default createComponent({
  name: 'NewPost',

  components: {
    Tags,
    ValidatorInput,
  },


  setup() {
    const title = ref('')
    const content = ref('')
    const html = ref('')
    const titleValidation = [ minLength({ min: 5, max: 100 }) ]
    const tags = ref<string[]>(['javascript', 'programming'])
    const newTag = ref('')
    const showPreview = ref(true)

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
      handleAddTag,
      handleRemoveTag,
      titleValidation,
    }
  }
})
</script>

<style lang="scss">
@import '../components/markdown-style.scss';

.buttons {
  justify-content: flex-end;
}

#new-tag {
  margin: 0 8px 0 0;
}

#markdown, #rendered-markdown {
  min-height: 400px;
}

#rendered-markdown {
  padding: calc(0.75em - 1px);
  border: 1px solid;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
</style>