<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

    <v-alert v-if="error" type="error" closable>{{ error }}</v-alert>

    <template v-if="article && !loading">
      <v-card class="mb-4">
        <v-card-title class="d-flex align-center">
          <span>{{ article.title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="primary" :to="`/article/${article.id}/edit`">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="confirmDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-subtitle>
          Created: {{ formatDate(article.createdAt) }}
          <span v-if="article.updatedAt !== article.createdAt">
            | Modified: {{ formatDate(article.updatedAt) }}
          </span>
        </v-card-subtitle>

        <v-card-text>
          <div style="white-space: pre-wrap;">{{ article.content }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn variant="outlined" to="/articles">
            <v-icon start>mdi-arrow-left</v-icon>
            Back to Articles
          </v-btn>
        </v-card-actions>
      </v-card>

      <CommentForm :article-id="article.id" class="mb-4" @comment-added="refreshComments" />

      <CommentList :article-id="article.id" />
    </template>

    <!-- Диалог подтверждения удаления -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Article</v-card-title>
        <v-card-text>
          Are you sure you want to delete this article? All comments will be deleted too.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteArticle" :loading="deleting">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CommentList from '../components/CommentList.vue'
import CommentForm from '../components/CommentForm.vue'

export default {
  name: 'ArticleView',
  components: {
    CommentList,
    CommentForm
  },
  data() {
    return {
      deleteDialog: false,
      deleting: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      }
    }
  },
  computed: {
    article() {
      return this.$store.state.articles.currentArticle
    },
    loading() {
      return this.$store.state.articles.loading
    },
    error() {
      return this.$store.state.articles.error
    },
    articleId() {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions('articles', ['fetchArticle', 'deleteArticle']),
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    confirmDelete() {
      this.deleteDialog = true
    },
    async deleteArticle() {
      this.deleting = true
      try {
        await this.$store.dispatch('articles/deleteArticle', this.articleId)
        this.snackbar = {
          show: true,
          text: 'Article deleted successfully',
          color: 'success'
        }
        setTimeout(() => this.$router.push('/articles'), 1000)
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Error deleting article',
          color: 'error'
        }
      } finally {
        this.deleting = false
      }
    },
    refreshComments() {
      this.$store.dispatch('comments/fetchComments', this.articleId)
    }
  },
  mounted() {
    this.fetchArticle(this.articleId)
  }
}
</script>