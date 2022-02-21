<template>
  <v-container>
    <v-row>
      <button onclick="history.back()">
        <div>
          <span class="subtitle-1 fi fi-rr-angle-left"> </span>
        </div>
      </button>
    </v-row>
    <v-row class="justify-center text-center">
      <v-col cols="12">bookflow actions </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BookflowActions",
};
</script>

<style>
</style>