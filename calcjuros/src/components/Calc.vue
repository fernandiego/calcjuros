<template>
  <v-container>
    <v-card class="mx-auto my-8 pa-4" max-width="600">
      <v-card-title class="text-h5">Interest Calculator</v-card-title>
      <v-form @submit.prevent="calculateInterest">
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
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Period (Number of Days/Months/Years)"
              v-model="period"
              type="number"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-select
              label="Select Interest Type"
              v-model="interestType"
              :items="['Simple Interest', 'Compound Interest']"
              outlined
              dense
              required
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-select
              label="Select Period"
              v-model="periodType"
              :items="['Day', 'Month', 'Year']"
              outlined
              dense
              required
            ></v-select>
          </v-col>

          <v-col cols="12" class="text-center mt-4">
            <v-btn color="primary" type="submit" class="px-6" large>
              Calculate
            </v-btn>
          </v-col>

          <v-col cols="12" v-if="result !== null" class="text-center mt-4">
            <v-alert type="info" class="text-h6">
              The calculated interest is <strong>R$ {{ result }}</strong>.
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import {ref} from 'vue';

const initialAmount = ref(0);
const recurringAmount = ref(0);
const interestRate = ref(0);
const period = ref(0);
const interestType = ref('Simple Interest');
const periodType = ref('Year');
const result = ref(null);

const calculateInterest = () => {
  // Ensure inputs are numeric
  const principal = parseFloat(initialAmount.value) || 0;
  const recurring = parseFloat(recurringAmount.value) || 0;
  const rate = parseFloat(interestRate.value) / 100 || 0;
  let time = parseFloat(period.value) || 0;

  // Adjust time based on period type
  switch (periodType.value) {
    case 'Day':
      time /= 365;
      break;
    case 'Month':
      time /= 12;
      break;
    case 'Year':
      break;
  }

  let total = 0;

  if (interestType.value === 'Simple Interest') {
    total = principal + (principal * rate * time);

    if (recurring > 0) {
      total += recurring * rate * time * (time + 1) / 2;
    }
  } else if (interestType.value === 'Compound Interest') {
    total = principal * Math.pow(1 + rate, time);

    if (recurring > 0) {
      total += recurring * (Math.pow(1 + rate, time) - 1) / rate;
    }
  }

  // Ensure total is a number before calling toFixed
  result.value = total && !isNaN(total) ? total.toFixed(2) : '0.00';
};
</script>

