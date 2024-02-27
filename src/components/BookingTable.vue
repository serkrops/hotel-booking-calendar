<template>
  <v-simple-table v-if="filteredBookings.length > 0">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="room-td">
            <h3 class="selected-room-title">{{ selectedRoom }}</h3>
          </th>
          <th
            v-for="day in 7"
            :key="day"
            :class="{
              'present-day': isToday(new Date(getDayOfWeek(day))),
            }"
          >
            <h3 class="date">
              {{ getDayOfWeek(day) }}
            </h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="id in rooms[selectedRoom]" :key="id">
          <td class="room-td">
            <h4 class="room-td__title">{{ "Room №" + id }}</h4>
          </td>
          <td
            v-for="day in 7"
            :key="day"
            :class="{
              'present-day': isToday(new Date(getDayOfWeek(day))),
            }"
          >
            <BookingCell :id="id" :day="day" :getDayOfWeek="getDayOfWeek" />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BookingCell from "./BookingCell.vue";
export default {
  name: "BookingTable",
  components: {
    BookingCell,
  },
  computed: {
    ...mapState(["filteredBookings", "selectedRoom", "rooms", "currentDay"]),
  },
  methods: {
    ...mapMutations(["setDialogBooking", "setDialog"]),
    getDayOfWeek(day) {
      const date = new Date(this.currentDay);
      const dayOfWeek = date.getDay();
      const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      date.setDate(date.getDate() - difference + day - 1);
      return this.formatDate(date);
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = (1 + date.getMonth()).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    isToday(date) {
      const today = new Date();
      console.log(date);
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.present-day {
  background-color: rgb(221, 245, 235);
}
.selected-room-title {
  font-weight: bold;
  color: black;
  white-space: wrap;
  overflow: hidden;
  text-overflow: clip;
}

.v-data-table {
  > .v-data-table__wrapper {
    > table {
      > tbody {
        > tr {
          > td {
            padding: 0;
            height: 5.5rem;
            position: relative;
            border-right: 1px solid #1976d2;
          }
          > th {
            border-bottom: 1px solid #1976d2;
          }
        }
      }
    }
  }
}

th {
  border-right: 1px solid #1976d2;
}

.room-td {
  width: 80px;
  &__title {
    padding: 0.5rem;
  }
}
</style>
