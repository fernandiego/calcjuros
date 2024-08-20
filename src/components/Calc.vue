<template>
  <v-container>
    <v-card class="mx-auto my-8 pa-4" max-width="700">
      <v-card-title class="text-h4 text-center font-weight-bold">
        Compound Interest Calculator
      </v-card-title>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Valor inicial / Initial Amount"
              v-model="initialAmount"
              type="number"
              prefix="R$"
              outlined
              dense
              required
              class="input-field"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Aporte recorrente / Recurring Amount"
              v-model="recurringAmount"
              type="number"
              prefix="R$"
              outlined
              dense
              class="input-field"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Taxa de Juros / Interest Rate (%)"
              v-model="interestRate"
              type="number"
              suffix="%"
              outlined
              dense
              required
              class="input-field"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Periodo / Period (Meses ou Anos / Months or Years)"
              v-model="period"
              type="number"
              outlined
              dense
              required
              class="input-field"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-4">
            <apexchart
              type="bar"
              :options="chartOptions"
              :series="chartSeries"
            ></apexchart>
          </v-col>

          <v-col cols="12" v-if="periodicResults.length > 0" class="text-center mt-4">
            <v-alert type="success" class="result-alert">
              <h1>Resultado / Results</h1>
              <v-divider class="my-4"></v-divider>
              <div
                v-for="(result, index) in periodicResults"
                :key="index"
                class="period-result"
              >
                <h2>Período {{ index + 1 }}</h2>
                <p><strong>Principal:</strong> R$ {{ result.principal }}</p>
                <p><strong>Soma dos aportes /Sum of Recurring:</strong> R$ {{ result.recurringSum }}</p>
                <p><strong>Juros / Interest:</strong> R$ {{ result.interest }}</p>
                <p><strong>Total de Juros / Total Interest:</strong> R$ {{ result.totalInterest }}</p>
                <p><strong>Total:</strong> R$ {{ result.total }}</p>
              </div>
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import {ref, watch} from 'vue';
import ApexCharts from 'vue3-apexcharts';

const initialAmount = ref(1000);
const recurringAmount = ref(100);
const interestRate = ref(10);
const period = ref(10);
const periodicResults = ref([]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    background: '#ffffff',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: false, // Disable individual data labels on bars
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    title: {
      text: 'R$ (Value)',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val, {dataPointIndex}) => {
        const principal = parseFloat(chartSeries.value[0].data[dataPointIndex]).toFixed(2);
        const recurringSum = parseFloat(chartSeries.value[1].data[dataPointIndex]).toFixed(2);
        const totalInterestSum = parseFloat(chartSeries.value[2].data[dataPointIndex]).toFixed(2);
        const totalForPeriod = (parseFloat(principal) + parseFloat(recurringSum) + parseFloat(totalInterestSum)).toFixed(2);

        return `
          Total for Period ${dataPointIndex + 1}: R$ ${totalForPeriod}<br>
          Principal: R$ ${principal}<br>
          Sum of Recurring: R$ ${recurringSum}<br>
          Sum of Interest: R$ ${totalInterestSum}
        `;
      },
    },
    theme: 'dark',
    style: {
      background: '#333',
      color: '#fff',
      fontSize: '12px',
    },
  },
});

const chartSeries = ref([
  {
    name: 'Principal',
    data: [],
  },
  {
    name: 'Recurring',
    data: [],
  },
  {
    name: 'Interest',
    data: [],
  },
]);

const calculateInterest = () => {
  const principal = parseFloat(initialAmount.value) || 0;
  const recurring = parseFloat(recurringAmount.value) || 0;
  const rate = parseFloat(interestRate.value) / 100 || 0;
  let accumulatedPrincipal = principal;
  let totalInterestSum = 0;
  let recurringSum = 0;

  periodicResults.value = [];
  chartOptions.value.xaxis.categories = [];
  chartSeries.value[0].data = []; // For Principal
  chartSeries.value[1].data = []; // For Recurring
  chartSeries.value[2].data = []; // For Interest

  for (let i = 1; i <= period.value; i++) {
    let interest = accumulatedPrincipal * rate;
    totalInterestSum += interest;

    if (i > 1) {
      recurringSum += recurring;
      accumulatedPrincipal += recurring;
    }

    accumulatedPrincipal += interest;

    periodicResults.value.push({
      principal: principal.toFixed(2),
      recurring: recurringSum.toFixed(2),
      recurringSum: recurringSum.toFixed(2),
      interest: interest.toFixed(2),
      totalInterest: totalInterestSum.toFixed(2),
      total: accumulatedPrincipal.toFixed(2),
    });

    console.log(i)

    chartOptions.value.xaxis.categories.push(i.toString());
    chartSeries.value[0].data.push(parseFloat(principal).toFixed(2));
    chartSeries.value[1].data.push(parseFloat(recurringSum).toFixed(2));
    chartSeries.value[2].data.push(parseFloat(totalInterestSum).toFixed(2));
    console.log(`Period ${i}: Principal=${principal}, RecurringSum=${recurringSum}, TotalInterest=${totalInterestSum}`); // Debug log
  }

  console.log('X-axis categories:', chartOptions.value.xaxis.categories); // Debug log
  chartOptions.value = {...chartOptions.value};
};

watch([initialAmount, recurringAmount, interestRate, period], calculateInterest, {immediate: true});
</script>

<style scoped>
.input-field {
  margin-bottom: 1rem;
}

.result-alert {
  padding: 2rem;
  border-radius: 12px;
  background-color: #424242;
  color: #ffffff;
}

.period-result {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #616161;
  border-radius: 8px;
  background-color: #757575;
}

h4, h5 {
  color: #ffca28;
  margin-bottom: 1rem;
  font-weight: bold;
}

p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

/* Light Mode */
@media (prefers-color-scheme: light) {
  .result-alert {
    background-color: #e3f2fd;
    color: #212121;
  }

  .period-result {
    background-color: #f5f5f5;
    border: 1px solid #bdbdbd;
  }

  h4, h5 {
    color: #1e88e5;
  }

  p {
    color: #212121;
  }
}
</style>
