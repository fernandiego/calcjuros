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
              label="Initial Amount"
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
              label="Recurring Amount"
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
              label="Interest Rate (%)"
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
              label="Period (in Years)"
              v-model="period"
              type="number"
              outlined
              dense
              required
              class="input-field"
            ></v-text-field>
          </v-col>

          <v-col cols="12" v-if="periodicResults.length > 0" class="text-center mt-4">
            <v-alert type="success" class="result-alert">
              <h4>Results for Compound Interest</h4>
              <v-divider class="my-4"></v-divider>
              <div v-for="(result, index) in periodicResults" :key="index" class="period-result">
                <h5>Period {{ index + 1 }}</h5>
                <p><strong>Principal:</strong> R$ {{ result.principal }}</p>
                <p><strong>Recurring:</strong> R$ {{ result.recurring }}</p>
                <p><strong>Sum of Recurring Until This Period:</strong> R$ {{ result.recurringSum }}</p>
                <p><strong>Interest:</strong> R$ {{ result.interest }}</p>
                <p><strong>Total Interest Up to This Period:</strong> R$ {{ result.totalInterest }}</p>
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

const initialAmount = ref(1000); // Initial value
const recurringAmount = ref(100); // Initial value
const interestRate = ref(5); // Initial value
const period = ref(3); // Initial value in years
const periodicResults = ref([]);

const calculateInterest = () => {
  const principal = parseFloat(initialAmount.value) || 0;
  const recurring = parseFloat(recurringAmount.value) || 0;
  const rate = parseFloat(interestRate.value) / 100 || 0;
  let accumulatedPrincipal = principal;
  let totalInterestSum = 0;
  let recurringSum = 0;

  periodicResults.value = [];

  for (let i = 1; i <= period.value; i++) {
    let interest = accumulatedPrincipal * rate;
    totalInterestSum += interest;
    if (i > 1) {
      recurringSum += recurring;
      accumulatedPrincipal += recurring;
    }

    accumulatedPrincipal += interest;

    periodicResults.value.push({
      principal: (accumulatedPrincipal - interest - (i > 1 ? recurring : 0)).toFixed(2),
      recurring: (i > 1 ? recurring : 0).toFixed(2),
      recurringSum: recurringSum.toFixed(2),
      interest: interest.toFixed(2),
      totalInterest: totalInterestSum.toFixed(2),
      total: accumulatedPrincipal.toFixed(2),
    });
  }
};

// Watch inputs and trigger calculation
watch([initialAmount, recurringAmount, interestRate, period], calculateInterest, {immediate: true});
</script>

<style scoped>
.input-field {
  margin-bottom: 1rem;
  color: #ffffff;
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
  color: #ffffff;
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

