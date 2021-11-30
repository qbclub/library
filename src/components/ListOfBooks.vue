<template>
  <v-container>
    <v-row class="justify">
      <!-- <v-col v-for="card in cards" :key="card.title" :cols="card.flex"> -->
      <v-col cols="2" class="justify-center">
        <v-card>
          <v-img
            src="https://picsum.photos/350/165?random"
            height="125"
            class="white--text align-end"
            ><v-card-title v-text="hello"></v-card-title>
            </v-img
          >

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text> Learn More </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>
<style scoped>
</style>
