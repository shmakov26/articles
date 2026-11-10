<template>
  <v-card>
    <v-card-title>Comments Analytics</v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="dateFrom"
              label="Date From"
              type="date"
              variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="dateTo"
              label="Date To"
              type="date"
              variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-end">
          <v-btn
              color="primary"
              @click="fetchAnalytics"
              :loading="loading"
              :disabled="!dateFrom || !dateTo"
              block
          >
            <v-icon start>mdi-magnify</v-icon>
            Search
          </v-btn>
        </v-col>
      </v-row>

      <v-alert v-if="error" type="error" closable class="mt-4">{{ error }}</v-alert>

      <template v-if="analyticsData">
        <v-divider class="my-4"></v-divider>

        <v-alert type="info" variant="tonal">
          Found <strong>{{ analyticsData.totalComments }}</strong> comments
          from {{ formatDate(analyticsData.dateFrom) }} to {{ formatDate(analyticsData.dateTo) }}
        </v-alert>

        <div v-if="analyticsData.articles.length === 0" class="text-center pa-4">
          No comments found for this period
        </div>

        <v-expansion-panels v-else class="mt-4">
          <v-expansion-panel
              v-for="item in analyticsData.articles"
              :key="item.article.id"
          >
            <v-expansion-panel-title>
              <div class="d-flex align-center w-100">
                <v-icon class="mr-2">mdi-article</v-icon>
                <span class="font-weight-medium">{{ item.article.title }}</span>
                <v-spacer></v-spacer>
                <v-chip size="small" color="primary">
                  {{ item.comments.length }} comments
                </v-chip>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact">
                <v-list-item v-for="comment in item.comments" :key="comment.id">
                  <v-list-item-title>{{ comment.content }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ formatDateTime(comment.createdAt) }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Analytics',
  data() {
    return {
      dateFrom: '',
      dateTo: ''
    }
  },
  computed: {
    ...mapState('analytics', ['analyticsData', 'loading', 'error'])
  },
  methods: {
    ...mapActions('analytics', ['fetchCommentsByPeriod']),
    formatDate(dateStr) {
      if (!dateStr) return ''
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    formatDateTime(dateStr) {
      if (!dateStr) return ''
      return new Date(dateStr).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    async fetchAnalytics() {
      if (!this.dateFrom || !this.dateTo) return

      // Конвертируем даты в timestamp (секунды)
      const fromTimestamp = Math.floor(new Date(this.dateFrom).getTime() / 1000)
      const toTimestamp = Math.floor(new Date(this.dateTo + 'T23:59:59').getTime() / 1000)

      await this.fetchCommentsByPeriod({
        dateFrom: fromTimestamp,
        dateTo: toTimestamp
      })
    }
  },
  mounted() {
    // Устанавливаем даты по умолчанию: последний месяц
    const today = new Date()
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)

    this.dateTo = today.toISOString().split('T')[0]
    this.dateFrom = monthAgo.toISOString().split('T')[0]
  }
}
</script>