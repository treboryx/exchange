<template>
  <div class="container">
    <form v-on:submit.prevent="onSubmit">
      <div v-for="(error, index) in error" :key="index">
        <b-alert v-model="dangerAlert" variant="danger" dismissible width="10px">{{error}}</b-alert>
      </div>
      <div v-if="result">
        <b-alert v-model="alert" variant="success" dismissible width="10px">{{result}}</b-alert>
      </div>

      <div class="form-row">
        <div class="col-auto">
          <input type="text" class="form-control" placeholder="Amount" id="amount" v-model="amount" />
        </div>
        <p>From:</p>
        <div class="col-1">
          <select class="custom-select mr-sm-2" id="from" v-model="from" @change="onChange()">
            <option v-for="(currency, index) in currencies" :key="index">{{currency}}</option>
          </select>
        </div>
        <p>To:</p>
        <div class="col-1">
          <select class="custom-select mr-sm-2" id="to" v-model="to">
            <option
              v-for="(currency, index) in toCurrencies"
              :key="index"
              :value="currency"
            >{{currency}}</option>
          </select>
        </div>
        <div class="col-auto">
          <b-button type="submit">Submit</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import API from "../API/main.js";

export default {
  name: "Main",
  data() {
    return {
      amount: null,
      from: null,
      to: null,
      dangerAlert: false,
      alert: false,
      currencies: null,
      toCurrencies: null,
      error: null,
      result: null
    };
  },
  async created() {
    // this method is initiated when the page loads
    const currencies = await API.getCurrencies(); // fetch the currencies in our database
    this.currencies = currencies.data;
  },
  methods: {
    async onSubmit() {
      let errors = [];
      if (!this.amount || !this.from || !this.to) {
        // simple input handler to check if any of the parameters is missing
        if (
          !this.amount ||
          !this.amount == 0 ||
          !this.amount < 0 ||
          isNaN(this.amount)
        ) {
          // we want the amount to not be empty and a positive number
          errors.push(
            "Amount must be a positive number and not empty, 0 or a negative number."
          );
        }
        if (!this.from) {
          errors.push("You must select a currency to convert from.");
        }
        if (!this.to) {
          errors.push("You must select a currency to convert to.");
        }
        this.error = errors;
        return (this.dangerAlert = true);
      }
      try {
        const res = await API.getExchange(this.amount, this.from, this.to);
        /* eslint-disable no-console */
        // console.log(res.data);
        if (res.data.message) {
          this.error = errors.push(res.data.message);
          this.dangerAlert = true;
        } else {
          this.result = `${this.amount} ${this.from} to ${this.to} = ${res.data.result}`;
          this.alert = true;
        }
      } catch (error) {
        /* eslint-disable no-console */
        console.log(error);
      }
    },
    // onChange method is triggered whenever the FROM currency is selected, when that happens we want to update
    // the TO list, making sure that it's a list of currencies the FROM currency is convertible to
    async onChange() {
      const toCurrencies = await API.getToCurrencies(this.from);
      this.toCurrencies = toCurrencies.data;
      /* eslint-disable no-console */
      console.log(this.from);
    }
  }
};
</script>

<style>
.container {
  margin: 1% 1%;
}
</style>