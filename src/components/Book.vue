<template>
  <div class="book">
    <v-container>
      <span class="text-h6">{{ books[0].authors }}:{{ books[0].name }} </span>
      <v-row class="mt-2">
        <v-col>
          <v-container>
            <v-row>
              <v-col>
                <v-img
                  max-width="250"
                  :aspect-ratio="9 / 16"
                  contain
                  :src="books[0].image"
                ></v-img> </v-col
              ><v-col
                ><div class="text-caption">Автор: {{ books[0].authors }}</div>
                <div class="text-caption">
                  Издательство: {{ books[0].publisher }}, {{ books[0].date }} г.
                </div>
                <div class="text-caption">
                  Тематика: {{ books[0].direction }}
                </div>

                <div class="text-caption">ISBN: {{ books[0].ISBN }}</div>
                <div class="text-caption">
                  Страниц: {{ books[0].pagesCount }}
                </div>
                <v-btn
                  depressed
                  small
                  class="ma-4 secondary"
                  v-on:click="takeBook"
                  >Взять книгу</v-btn
                >
                <div class="">Состояние: {{ books[0].state }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col>
          <div class="text-caption">
            <b>Аннотация к книге "{{ books[0].name }}"</b>
          </div>
          <span class="text-caption">{{ books[0].annotation }}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import books from "../db/books";
export default {
  data: () => ({
    books,
  }),
  methods: {
    takeBook: function () {
      console.log(this.books[0].name);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
