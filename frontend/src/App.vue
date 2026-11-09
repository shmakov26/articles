<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Articles App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/articles" text>Articles</v-btn>
      <v-btn to="/analytics" text>Analytics</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>