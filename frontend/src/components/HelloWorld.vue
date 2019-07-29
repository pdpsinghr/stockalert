<template>
  <div class="hello">
    <button @click="checkAllAlert()" class="buttonc">Check All Alert</button>
    <div class="container">
      <h1>Please Enter Your Info</h1>
      <label>Your email</label>
      <input type="email" v-model="email" placeholder="enter your email" />
      <label>Your no.</label>
      <input type="number" v-model="contactNo" placeholder="enter your no" />
      <label>Select currency</label>
      <select v-model="currency" >
        <option disabled value="">Please select one</option>
        <option v-for="currency in currencyType" :key="currency">{{currency}}</option>
      </select>
      <label>Amount where you want notification</label>
      <input type="number" v-model="priceLimit" placeholder="enter amount" />
      <button @click="SubmitAction">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      contactNo: '',
      currencyType: ['Bitcoin', 'Etherium'],
      currency: '',
      priceLimit: ''
    }
  },
  mounted () {
    axios.get('http://localhost:3000/getallcurrency').then(r => {
      var arr = []
      r.data.map(data => {
        arr.push(data.symbol)
      })
      this.currencyType = arr
      console.log('rdata', r)
    })
  },
  methods: {
    checkAllAlert: function () {
      this.$router.push('/currentData')
    },
    SubmitAction: function () {
      console.log(this.email, this.contactNo, this.priceLimit, this.currency)
      var data = {
        email: this.email,
        contactNo: this.contactNo,
        currency: this.currency,
        priceLimit: parseInt(this.priceLimit)
      }
      axios.post('http://localhost:3000/currency', data).then(r => {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttonc {
  position: absolute;
  top: 10px;
  left: 89px;
  height: 40px;
  width: 200px;
  border: none;
  background: cadetblue;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
select {
  width: 250px;
}

option {
  height: 300px;
  overflow: scroll;
  width: 250px;
}
</style>
