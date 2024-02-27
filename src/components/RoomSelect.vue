<template>
  <v-select
    :items="namesOfRooms"
    filled
    label="Apartments"
    @change="onChange"
  ></v-select>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["namesOfRooms"]),
  },
  methods: {
    ...mapMutations(["selectRoom", "filterBookings", "setCurrentDay"]),
    selectRoomValue(value) {
      this.selectRoom(value);
      this.filterBookings(value);
    },
    onChange(value) {
      this.selectRoomValue(value);
      this.setCurrentDay(new Date());
    },
  },
};
</script>

<style lang="scss" scoped></style>
