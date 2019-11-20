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
        <h2>1</h2>
        <div class="col-1">
          <select class="custom-select mr-sm-2" id="from" v-model="from" @change="onChange()">
            <option v-for="(currency, index) in currencies" :key="index">{{currency}}</option>
          </select>
        </div>
        <h2>is</h2>
        <div class="col-1">
          <select class="custom-select mr-sm-2" id="to" v-model="to" @change="onChangeSecond()">
            <option
              v-for="(currency, index) in toCurrencies"
              :key="index"
              :value="currency"
            >{{currency}}</option>
          </select>
        </div>
        <div class="col-2">
          <input type="text" class="form-control" placeholder="Rate" id="rate" v-model="rate" />
        </div>
        <div class="col-auto">
          <b-button type="submit">Submit</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import iso from "../data/iso-codes.js";
import API from "../API/main.js";
export default {
  name: "Update",
  data() {
    return {
      alert: false,
      dangerAlert: false,
      error: null,
      currencies: null,
      from: null,
      to: null,
      rate: null,
      result: null,
      toCurrencies: null
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
      if (!this.rate || !this.from || !this.to) {
        // simple input handler to check if any of the parameters is missing
        if (
          !this.rate ||
          !this.rate == 0 ||
          !this.rate < 0 ||
          isNaN(this.rate)
        ) {
          // we want the amount to not be empty and a positive number
          errors.push(
            "Rate must be a positive number and not empty, 0 or a negative number."
          );
        }
        if (!this.from) {
          errors.push("You must select a currency from the first list.");
        }
        if (!this.to) {
          errors.push("You must select a currency from the second list.");
        }
        this.error = errors;
        return (this.dangerAlert = true);
      }
      try {
        const res = await API.updateRate(this.from, this.to, this.rate);
        /* eslint-disable no-console */
        // console.log(res.data);
        if (res.data.message) {
          this.error = errors.push(res.data.message);
          this.dangerAlert = true;
        } else {
          this.result = "Successfully updated the database";
          this.alert = true;
        }
      } catch (error) {
        /* eslint-disable no-console */
        console.log(error);
      }
    },
    // Same method we used in Main.vue
    async onChange() {
      const toCurrencies = await API.getToCurrencies(this.from);
      this.toCurrencies = toCurrencies.data;
    },
    async onChangeSecond() {
      const rate = await API.getRate(this.from, this.to);
      this.rate = rate.data[0];
    }
  }
};
</script>

<style>
</style>