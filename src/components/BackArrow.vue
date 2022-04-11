<template>
  <v-row>
    <v-col>
      <button onclick="history.back()">
        <div>
          <span class="fi fi-rr-arrow-small-left"> </span>
        </div>
      </button>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
span{
  font-size: 30px;
}
.navicons {
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>