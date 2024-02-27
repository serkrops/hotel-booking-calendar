<template>
  <div v-if="selectedRoom" class="navigation">
    <v-btn color="primary" @click="prevWeek">&#8592;</v-btn>
    <v-btn color="primary" @click="nextWeek">&#8594;</v-btn>
    <v-btn color="primary" @click="setCurrentDay"><h3>Today</h3></v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["selectedRoom"]),
  },
  methods: {
    ...mapMutations(["prevWeek", "nextWeek", "setCurrentDay"]),
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem 0;
}
</style>
