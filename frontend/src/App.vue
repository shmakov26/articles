<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>
        <v-icon start>mdi-book-open-variant</v-icon>
        Articles App
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/articles" prepend-icon="mdi-format-list-bulleted">
        Articles
      </v-btn>
      <v-btn to="/analytics" prepend-icon="mdi-chart-bar">
        Analytics
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-6">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app class="bg-grey-lighten-3 text-center pa-3">
      <div>Articles App © 2026</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>