<template>
  <v-card>
    <v-card-title>Comments ({{ comments.length }})</v-card-title>

    <v-card-text>
      <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

      <div v-if="comments.length === 0 && !loading" class="text-center pa-4">
        No comments yet. Be the first to comment!
      </div>

      <v-list v-else>
        <v-list-item v-for="comment in comments" :key="comment.id" class="mb-2">
          <v-card variant="outlined" class="w-100">
            <v-card-text>
              <div class="d-flex justify-space-between align-start">
                <div class="flex-grow-1">
                  <div v-if="editingComment?.id === comment.id">
                    <v-textarea
                        v-model="editContent"
                        rows="3"
                        variant="outlined"
                        density="compact"
                    ></v-textarea>
                    <div class="d-flex gap-2 mt-2">
                      <v-btn size="small" color="primary" @click="saveEdit(comment)" :loading="saving">
                        Save
                      </v-btn>
                      <v-btn size="small" variant="outlined" @click="cancelEdit">Cancel</v-btn>
                    </div>
                  </div>
                  <div v-else>
                    <div>{{ comment.content }}</div>
                    <div class="text-caption text-grey mt-1">
                      {{ formatDate(comment.createdAt) }}
                    </div>
                  </div>
                </div>
                <div v-if="editingComment?.id !== comment.id" class="ml-2">
                  <v-btn icon size="small" @click="startEdit(comment)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon size="small" color="error" @click="confirmDelete(comment)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- Диалог подтверждения удаления -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Comment</v-card-title>
        <v-card-text>Are you sure you want to delete this comment?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteComment" :loading="deleting">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentList',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      editingComment: null,
      editContent: '',
      saving: false,
      deleteDialog: false,
      commentToDelete: null,
      deleting: false
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments.comments
    },
    loading() {
      return this.$store.state.comments.loading
    }
  },
  methods: {
    ...mapActions('comments', ['fetchComments', 'updateComment', 'deleteComment']),
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
    startEdit(comment) {
      this.editingComment = comment
      this.editContent = comment.content
    },
    cancelEdit() {
      this.editingComment = null
      this.editContent = ''
    },
    async saveEdit(comment) {
      if (!this.editContent.trim()) return

      this.saving = true
      try {
        await this.updateComment({
          articleId: this.articleId,
          commentId: comment.id,
          content: this.editContent
        })
        this.cancelEdit()
        this.fetchComments(this.articleId)
      } catch (error) {
        console.error('Error updating comment:', error)
      } finally {
        this.saving = false
      }
    },
    confirmDelete(comment) {
      this.commentToDelete = comment
      this.deleteDialog = true
    },
    async deleteComment() {
      this.deleting = true
      try {
        await this.$store.dispatch('comments/deleteComment', {
          articleId: this.articleId,
          commentId: this.commentToDelete.id
        })
        this.deleteDialog = false
        this.fetchComments(this.articleId)
      } catch (error) {
        console.error('Error deleting comment:', error)
      } finally {
        this.deleting = false
      }
    }
  },
  mounted() {
    this.fetchComments(this.articleId)
  }
}
</script>