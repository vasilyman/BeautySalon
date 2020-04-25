<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4 simple-card">
        <h1 class="title has-text-centered">
          Add salon
        </h1>
        <form action="" @submit.prevent="add" autocomplete="off" >
          <InputField label="Name" id="name" :idata.sync="salonData.name" :error="errors.name" :disabled="disabled" autocomplete="off"/>
          <InputField label="Insta username" id="insta_username" :idata.sync="salonData.insta_username" :error="errors.insta_username" :disabled="disabled" autocomplete="off"/>
          <h2 class="subtitle has-text-centered" style="margin-bottom:0;">Salon address</h2>
          <InputField label="City" id="city" :idata.sync="salonData.city" :error="errors.city" :disabled="disabled" autocomplete="off"/>
          <InputField label="Street" id="street" :idata.sync="salonData.street" :error="errors.street" :disabled="disabled" autocomplete="off"/>
          <InputField label="House number" id="house_number" :idata.sync="salonData.house_number" :error="errors.house_number" :disabled="disabled" autocomplete="off"/>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                Add salon
              </button>
            </p>
          </div>
        </form>
        <div class="notification" v-if="status" style="margin-top:0.75rem;">
          <button class="delete" @click.prevent="status = ''"></button>
          {{status}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
// const Cookie = require('js-cookie')
export default {
  components: {
    InputField: () => import('@/components/input.vue')
  },
  data () {
    return {
      salonData: {
        name: '',
        insta_username: '',
        city: '',
        street: '',
        house_number: ''
      },
      errors: {
        name: '',
        insta_username: '',
        city: '',
        street: '',
        house_number: ''
      },
      disabled: false,
      status: ''
    }
  },
  methods: {
    add () {
      // validation and send form

      this.status = ''
      const user = this.$store.state.me
      // validation
      for (const key in this.salonData) {
        if (this.salonData[key] === '') {
          this.errors[key] = 'This field is emplty'
        } else this.errors[key] = ''
      }
      if (Object.entries(this.errors).some(el => el[1] !== '')) return

      this.disabled = true

      // send form
      this.$axios.post(`register/salon/${user}`, qs.stringify(this.salonData))
        .then(res => {
          console.log(res)
          if (res.statusText && res.statusText === 'OK' && res.data.name) {
            this.status = res.data.message
          } else if (res.statusText && res.statusText === 'OK' && res.data.message) {
            this.status = res.data.message
          } else {
            this.status = 'field error'
          }
        })
        .catch((err) => {
          console.log(err)
          this.status = 'server error'
        })

      this.disabled = false
    }
  }
}
</script>
