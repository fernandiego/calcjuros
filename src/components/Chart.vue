<template>
  <v-container>
    <v-card class="mx-auto my-8 pa-4" max-width="700">
      <v-card-title class="text-h4 text-center font-weight-bold">
        Test Chart
      </v-card-title>
      <v-col cols="12" class="mt-4">
        <apexchart :options="chartOptions" :series="chartSeries"></apexchart>
      </v-col>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import ApexCharts from 'vue3-apexcharts';

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
  },
  xaxis: {
    categories: ['Period 1', 'Period 2', 'Period 3'],
  },
});

const chartSeries = ref([
  {
    name: 'Principal',
    data: [1000, 1200, 1400],
  },
  {
    name: 'Recurring',
    data: [100, 100, 100],
  },
  {
    name: 'Interest',
    data: [50, 75, 100],
  },
]);
</script>
