<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4 simple-card">
        <h1 class="title has-text-centered">
          Registration
        </h1>
        <FormComponent :disabled="disabled" :signinData.sync="signinData" :errors="errors" @signed="signin"/>
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
const Cookie = require('js-cookie')
export default {
  components: {
    FormComponent: () => import('@/components/form.vue')
  },
  data () {
    return {
      signinData: {
        username: '',
        email: '',
        password: '',
        role_id: ''
      },
      errors: {
        username: '',
        email: '',
        password: '',
        role_id: ''
      },
      disabled: false,
      status: ''
    }
  },
  methods: {
    signin () {
      // validation and send form

      this.status = ''
      // validation
      for (const key in this.signinData) {
        if (this.signinData[key] === '') {
          this.errors[key] = 'This field is emplty'
        } else this.errors[key] = ''
      }
      if (Object.entries(this.errors).some(el => el[1] !== '')) return

      this.disabled = true

      // send form
      this.$axios.post('register', qs.stringify(this.signinData))
        .then(res => {
          console.log(res)
          if (res.statusText && res.statusText === 'OK' && res.data.message) {
            this.status = res.data.message
            // set cookie
            Cookie.set('me', this.signinData.username)
            // set me
            this.$store.commit('SET_ME', this.signinData.username)
            // redirect to me
            this.$router.push('/')
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
