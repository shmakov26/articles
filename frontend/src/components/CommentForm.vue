<template>
  <v-card>
    <v-card-title>Add Comment</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="formValid" @submit.prevent="submitComment">
        <v-textarea
            v-model="content"
            label="Your comment"
            :rules="[v => !!v || 'Comment is required']"
            required
            rows="3"
            variant="outlined"
        ></v-textarea>

        <v-btn
            type="submit"
            color="primary"
            :disabled="!formValid"
            :loading="submitting"
        >
          Post Comment
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentForm',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      content: '',
      formValid: false,
      submitting: false
    }
  },
  methods: {
    ...mapActions('comments', ['createComment', 'fetchComments']),
    async submitComment() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      this.submitting = true
      try {
        await this.createComment({
          articleId: this.articleId,
          content: this.content
        })
        this.content = ''
        this.$refs.form.resetValidation()
        this.fetchComments(this.articleId)
        this.$emit('comment-added')
      } catch (error) {
        console.error('Error creating comment:', error)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>