<template>
  <div>
    <v-card>
      <v-card-title class="d-flex align-center">
        <span>Articles</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/article/new" prepend-icon="mdi-plus">
          New Article
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

        <v-alert v-if="error" type="error" closable>{{ error }}</v-alert>

        <v-table v-if="!loading">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Comments</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.id }}</td>
            <td>
              <router-link :to="`/article/${article.id}`" class="text-decoration-none">
                {{ article.title }}
              </router-link>
            </td>
            <td>{{ article.commentsCount || 0 }}</td>
            <td>{{ formatDate(article.createdAt) }}</td>
            <td>
              <v-btn icon size="small" color="primary" :to="`/article/${article.id}/edit`">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" color="error" @click="confirmDelete(article)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
          <tr v-if="articles.length === 0">
            <td colspan="5" class="text-center">No articles found</td>
          </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Диалог подтверждения удаления -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Article</v-card-title>
        <v-card-text>
          Are you sure you want to delete "{{ articleToDelete?.title }}"?
          All comments will be deleted too.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteArticle" :loading="deleting">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar для уведомлений -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ArticlesList',
  data() {
    return {
      deleteDialog: false,
      articleToDelete: null,
      deleting: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      }
    }
  },
  computed: {
    ...mapState('articles', ['articles', 'loading', 'error'])
  },
  methods: {
    ...mapActions('articles', ['fetchArticles', 'deleteArticle']),
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    confirmDelete(article) {
      this.articleToDelete = article
      this.deleteDialog = true
    },
    async deleteArticle() {
      this.deleting = true
      try {
        await this.$store.dispatch('articles/deleteArticle', this.articleToDelete.id)
        this.snackbar = {
          show: true,
          text: 'Article deleted successfully',
          color: 'success'
        }
        this.deleteDialog = false
        this.fetchArticles()
      } catch (error) {
        this.snackbar = {
          show: true,
          text: 'Error deleting article',
          color: 'error'
        }
      } finally {
        this.deleting = false
      }
    }
  },
  mounted() {
    this.fetchArticles()
  }
}
</script>