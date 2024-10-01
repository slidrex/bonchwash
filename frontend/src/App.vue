<template>
  <div id="BonchWash">
    <BookingPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BookingPage from './components/BookingPage.vue';  // Импорт компонента страницы бронирования


export default defineComponent({
  name: 'App',
  components: {
    BookingPage,
  },
});
</script>

<style scoped>

</style>
