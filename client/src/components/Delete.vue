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
        <div class="col-1">
          <select class="custom-select mr-sm-2" id="currency" v-model="currency">
            <option v-for="(currency, index) in currencies" :key="index">{{currency}}</option>
          </select>
        </div>
        <div class="col-auto my-2">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" required />
            <label
              class="form-check-label"
            >Are you sure you want to remove this currency from the database?</label>
          </div>
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
  name: "Delete",
  data() {
    return {
      alert: false,
      dangerAlert: false,
      error: null,
      currencies: null,
      currency: null,
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
      try {
        const res = await API.deleteCurrency(this.currency);
        /* eslint-disable no-console */
        // console.log(res.data);
        if (res.data.message) {
          this.error = errors.push(res.data.message);
          this.dangerAlert = true;
        } else {
          this.result = "Successfully updated the database";
          this.alert = true;
        }
        const currencies = await API.getCurrencies(); // Update the list
        this.currencies = currencies.data;
      } catch (error) {
        /* eslint-disable no-console */
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>