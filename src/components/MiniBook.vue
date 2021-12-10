<template>
  <v-container>
    <v-card>
      <v-img style="max-height: 500px" :src="book.image"></v-img>
      <v-card-title
        ><span style="word-break: break-word">{{ book.name }}</span>
      </v-card-title>
      <v-card-text style="min-heigth: 300px">
        <p>{{ annotation }}...</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MiniBook",
  data: () => ({
    annotation: "",
  }),
  props: {
    book: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.annotation = this.book.annotation.split(" ").slice(0, 24).join(" ");
  },
};
</script>

<style scoped>
</style>