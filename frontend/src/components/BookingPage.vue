<template>
  <div class="booking-page">
    <div class="date-and-data">
      <div class="date-selector">
        <button @click="selectDate('today')" :class="['date-button', isSelected('today') ? 'selected' : '']">
          <span>Сегодня</span>
          <small>{{ todayDate }}</small>
        </button>
        <button @click="selectDate('tomorrow')" :class="['date-button', isSelected('tomorrow') ? 'selected' : '']">
          <span>Завтра</span>
          <small>{{ tomorrowDate }}</small>
        </button>
        <button @click="selectDate('dayAfterTomorrow')" :class="['date-button', isSelected('dayAfterTomorrow') ? 'selected' : '']">
          <span>Послезавтра</span>
          <small>{{ dayAfterTomorrowDate }}</small>
        </button>
      </div>
      <div class="user-data">
        <p>Имя Фамилия, к. 666</p>
      </div>
    </div>


    <div class="booking-table">
      <table>
        <thead>
        <tr>
          <th v-for="machine in machines" :key="machine">{{ machine }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="time in times" :key="time">
          <td v-for="machine in machines" :key="machine" @click="highlightCell">{{ time }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'BookingPage',
  setup() {
    const machines = ['1', '2', '3', '4', '5', '6', '7'];
    const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

    const selectedDate = ref('today');

    const selectDate = (day: string) => {
      selectedDate.value = day;
    };

    const isSelected = (day: string) => {
      return selectedDate.value === day;
    };

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}.${month}`;
    };

    const todayDate = computed(() => {
      const today = new Date();
      return formatDate(today);
    });

    const tomorrowDate = computed(() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return formatDate(tomorrow);
    });

    const dayAfterTomorrowDate = computed(() => {
      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      return formatDate(dayAfterTomorrow);
    });

    const highlightCell = (event: Event) => {
      const target = event.target as HTMLElement;
      target.classList.add('highlight');
    };

    return {
      selectedDate,
      selectDate,
      isSelected,
      todayDate,
      tomorrowDate,
      dayAfterTomorrowDate,
      machines,
      times,
      highlightCell
    };
  }
});
</script>

<style scoped>
.booking-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}


.date-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50px;
  margin-top: 2vh;
}

.date-button {
  font-family: Inter,system-ui;
  font-style: normal;
  font-weight: 100;
  padding: 15px 20px;
  font-size: 2.7vh;
  letter-spacing: .1rem;
  background-color: white;
  border: none;
  color: #000000;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.selected {
  box-shadow: inset -3px 2px 4px rgba(0, 0, 0, 0.2), inset 3px -2px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(1px);
}

.date-button:first-child {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.date-button:last-child {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

small {
  font-size: 12px;
  color: #888;
  letter-spacing: 0;
}

.user-data {
  font-family: Inter,system-ui;
  font-style: normal;
  position: absolute;
  top: 3.1vh;
  right: 2%;
  display: flex;
  justify-content: center;
  color: #ffffff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  height: 5vh;
  background-color: #ff7000;
  padding: 5px 40px;
  border-radius: 35px;
  align-items: center;
  box-shadow: inset -3px 2px 4px rgba(0, 0, 0, 0.2), inset 3px -2px 5px rgba(0, 0, 0, 0.2);
}

p {
  margin: 0;
  padding: 0;

}

.booking-table {
  width: 60%;
  overflow-x: auto;
  overflow-y: hidden;

}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', system-ui;
  background-color: white;
}

th, td {

  font-weight: 100;
  padding: 0;
  text-align: center;
  width: 131px;
  height: 65px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

th {
  font-weight: bold;
}

thead {
  background-color: #f0f0f0;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
td:hover {
  transform: translateY(1px);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

td.highlight {
  background-color: #55fb55;
  transition: background-color 0.5s ease;
}

@media (max-width: 1080px) {
  .date-and-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .user-data{
    order: -1;
  }

  .date-selector, .user-data {
    width: fit-content;
    text-align: center;
    margin: 0;
  }

  .booking-table {
    width: 90%;
  }

}
</style>