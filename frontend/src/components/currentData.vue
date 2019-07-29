<template>
  <div class="hello">
    <button @click="createNewAlert()" class="buttonc">Create New Alert</button>
    <table style="width: 100%">
      <tr class="parentThHeading">
        <th v-for="(field, k) in tableFields" :key="k" class="capitalize">{{field}}</th>
        <th class="capitalize">Delete</th>
      </tr>
      <div></div>
      <tr v-for = "(x, j) in allTableData" :key="j">
        <td v-for="(field, k) in tableFields" :key = "k">{{x[field]}}</td>
        <td @click = "deleteEntity(x)" >Delete</td>
      </tr>
      <!-- table body end here -->
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CurrentData',
  data () {
    return {
      allTableData: [],
      tableFields: {Email: 'email', ContactNo: 'contactNo', Currency: 'currency', PriceLimit: 'priceLimit'}
    }
  },
  mounted () {
    this.getAllcurrencyf()
  },
  methods: {
    getAllcurrencyf: function () {
      axios.get('http://localhost:3000/currency').then(r => {
        this.allTableData = r.data
      })
    },
    deleteEntity: function (x) {
      axios.delete(`http://localhost:3000/currency/${x._id}`).then(r => {
        this.allTableData = this.allTableData.filter(data => {
          return data._id !== x._id
        })
      })
    },
    createNewAlert: function () {
      this.$router.push('/')
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
