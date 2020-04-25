<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4 simple-card">
        <h1 class="title has-text-centered">
          Login
        </h1>
        <form action="" @submit.prevent="login" >
          <InputField label="Username" id="username" :idata.sync="loginData.username" :error="errors.username" :disabled="disabled" autocomplete="off"/>
          <InputField label="Password" id="password" type="password" :idata.sync="loginData.password" :error="errors.password" :disabled="disabled" autocomplete="off"/>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                Login!
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
const Cookie = require('js-cookie')
export default {
  components: {
    InputField: () => import('@/components/input.vue')
  },
  data () {
    return {
      loginData: {
        username: '',
        password: ''
      },
      errors: {
        username: '',
        password: ''
      },
      disabled: false,
      status: ''
    }
  },
  methods: {
    login () {
      // validation and send form

      this.status = ''
      // validation
      for (const key in this.loginData) {
        if (this.loginData[key] === '') {
          this.errors[key] = 'This field is emplty'
        } else this.errors[key] = ''
      }
      if (Object.entries(this.errors).some(el => el[1] !== '')) return

      this.disabled = true

      // send form
      this.$axios.post('login', qs.stringify(this.loginData))
        .then(res => {
          if (res.statusText && res.statusText === 'OK' && res.data.status && res.data.status === 200) {
            this.status = res.data.message
            // set cookie
            Cookie.set('me', this.loginData.username)
            // set me
            this.$store.commit('SET_ME', this.loginData.username)
            // redirect to me
            this.$router.push('/')
          } else if (res.data.message) {
            this.status = res.data.message
          } else {
            this.status = 'field error'
          }
        })
        .catch(() => {
          this.status = 'server error'
        })

      this.disabled = false
    }
  }
}
</script>
