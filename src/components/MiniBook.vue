<template>
  <div class="ma-0">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          class="pa-1"
          max-width="250"
          max-height="400"
          :elevation="hover ? 10 : 4"
        >
          <v-container>
            <v-row>
              <v-col class="pa-0 ma-0">
                <v-img
                loading="lazy"
                  contain
                  :aspect-ratio="10 / 14"
                  :src="book.CoverPath"
                ></v-img>
              </v-col>
    
            </v-row>
          </v-container>
        </v-card>
      </template>
    </v-hover>
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