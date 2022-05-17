<template>
  <v-container>
  <BackArrow></BackArrow>
    <v-row class="justify-center text-center">
      <v-col cols="12">bookflow actions </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BackArrow from "../BackArrow.vue";
export default {
  name: "BookflowActions",
   components: {
    BackArrow,
  },
};
</script>

<style>
</style>