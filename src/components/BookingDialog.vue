<template>
  <v-dialog :value="dialog" max-width="300px" @click:outside="closeDialog">
    <v-card v-if="dialogBooking">
      <v-card-title class="headline">{{ dialogBooking.name }}</v-card-title>
      <v-card-text>
        <div class="card-text__wrapper">
          <p>{{ dialogBooking.phone }}</p>
          <p>{{ dialogBooking.email }}</p>
          <p>{{ dialogBooking.typeOfApartments }}</p>
          <h3>Number of Guests:</h3>
          <p>{{ "Adults: " + dialogBooking.guestInfo.adults }}</p>
          <p>{{ "Children: " + dialogBooking.guestInfo.children }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" elevation="2" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "BookingDialog",
  data() {
    return {
      internalDialog: this.dialog,
    };
  },
  computed: {
    ...mapState(["dialog", "dialogBooking"]),
  },
  methods: {
    ...mapMutations(["setDialog"]),
    closeDialog() {
      this.setDialog(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-text__wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    margin: 0;
  }

  h3 {
    color: black;
  }
}
</style>
