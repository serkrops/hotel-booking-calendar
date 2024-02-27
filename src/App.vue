<template>
  <v-app>
    <v-container>
      <RoomSelect />
      <NavigationButtons />
      <BookingTable />
      <BookingDialog />
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import RoomSelect from "./components/RoomSelect.vue";
import NavigationButtons from "./components/NavigationButtons.vue";
import BookingTable from "./components/BookingTable.vue";
import BookingDialog from "./components/BookingDialog.vue";
export default {
  name: "App",
  components: {
    RoomSelect,
    NavigationButtons,
    BookingTable,
    BookingDialog,
  },
  methods: {
    ...mapActions(["fetchBookings"]),
  },
  created() {
    this.fetchBookings();
  },
};
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
  margin: 0;
}
.v-data-table > .v-data-table__wrapper > table {
  overflow: hidden;
  border: 1px solid #1976d2;
  border-right: none;
}
</style>
