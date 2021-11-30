<template>
  <div class="book">
    <v-card class="mx-auto" width="50%">
      <div class="content">
        <div>
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="150"
            max-width="250"
            src="https://picsum.photos/id/11/500/300"
          ></v-img><p>Author: John Lenain</p>
        </div>
        <div>asd</div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined rounded text> Button </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
}
</style>
