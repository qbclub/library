<template>
  <div class="ma-0">
    <v-card class="justify-center align-center">
      <v-img
        contain
        max-width="500"
        :aspect-ratio="10 / 16"
        :src="book.image"
      ></v-img>
      <div>
        <p
          class="text-body-2 mt-0 mb-0 h overflow-hidden"
          style="word-break: break-word"
        >
          {{ book.name }}
        </p>
        <span class="text-caption">
          Автор:
          {{ book.authors }}
        </span>
      </div>
    </v-card>
  </div>
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
};
</script>

<style scoped>
.h {
  height: 60px;
}
</style>