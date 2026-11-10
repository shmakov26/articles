<template>
  <v-card>
    <v-card-title>{{ isEdit ? 'Edit Article' : 'Create Article' }}</v-card-title>

    <v-card-text>
      <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

      <v-alert v-if="error" type="error" closable>{{ error }}</v-alert>

      <v-form ref="form" v-model="formValid" @submit.prevent="submitForm">
        <v-text-field
            v-model="form.title"
            label="Title"
            :rules="[v => !!v || 'Title is required']"
            required
            variant="outlined"
        ></v-text-field>

        <v-textarea
            v-model="form.content"
            label="Content"
            :rules="[v => !!v || 'Content is required']"
            required
            rows="10"
            variant="outlined"
        ></v-textarea>

        <div class="d-flex gap-2">
          <v-btn
              type="submit"
              color="primary"
              :disabled="!formValid"
              :loading="submitting"
          >
            {{ isEdit ? 'Update' : 'Create' }}
          </v-btn>
          <v-btn variant="outlined" @click="cancel">Cancel</v-btn>
        </div>
      </v-form>
    </v-card-text>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ArticleForm',
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      formValid: false,
      submitting: false,
      loading: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      }
    }
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id
    },
    articleId() {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions('articles', ['fetchArticle', 'createArticle', 'updateArticle']),
    async loadArticle() {
      if (!this.isEdit) return

      this.loading = true
      try {
        await this.fetchArticle(this.articleId)
        const article = this.$store.state.articles.currentArticle
        if (article) {
          this.form.title = article.title
          this.form.content = article.content
        }
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Error loading article',
          color: 'error'
        }
      } finally {
        this.loading = false
      }
    },
    async submitForm() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      this.submitting = true
      try {
        if (this.isEdit) {
          await this.updateArticle({
            id: this.articleId,
            articleData: this.form
          })
          this.snackbar = {
            show: true,
            text: 'Article updated successfully',
            color: 'success'
          }
        } else {
          await this.createArticle(this.form)
          this.snackbar = {
            show: true,
            text: 'Article created successfully',
            color: 'success'
          }
        }
        setTimeout(() => this.$router.push('/articles'), 1000)
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Error saving article',
          color: 'error'
        }
      } finally {
        this.submitting = false
      }
    },
    cancel() {
      this.$router.push('/articles')
    }
  },
  mounted() {
    this.loadArticle()
  }
}
</script>