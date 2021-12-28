<template>
  <v-container>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">П.Н.</th>
                <th class="text-left">Дата</th>
                <th class="text-left">Книга</th>
                <th class="text-left">Статус</th>
                <th class="text-left">Пользователь</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bookEvent, i) in booksflow" :key="i">
                <td>{{ bookEvent.Bookid }}</td>
                <td>{{ bookEvent.TimeStamp }}</td>
                <td>
                  <div class="d-flex">
                    <div>
                      <v-img
                        :src="findBook(bookEvent.id)[0].image"
                        max-width="70"
                        contain
                      ></v-img>
                    </div>

                    <div class="pa-6">
                      <div ><b>Автор:</b> {{ findBook(bookEvent.id)[0].authors }}</div>
                      <div><b>Название:</b> {{ findBook(bookEvent.id)[0].name }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ bookEvent.BookStatus }}</td>
                <td>{{ bookEvent.Userid }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import booksflow from "../db/booksflow";
import books from "../db/books";
export default {
  data: () => ({
    booksflow,
    books,
    book: {},
  }),
  methods: {
    findBook: function (Bookid) {
      return (this.book = this.books.filter((book) => book.id == Bookid));
    },
    findUser:function(Userid){
      
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>