<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4 simple-card">
        <h1 class="title has-text-centered">
          Edit account
        </h1>
        <FormComponent :disabled="disabled" :signinData.sync="newData" :errors="errors" @signed="save" autocomplete="off">
          <!-- api key field -->
          <!-- <template v-slot:field>
            <InputField label="ApiKey" id="api-key" :idata.sync="token" :error="errors.token" :disabled="disabled" autocomplete="off"/>
          </template> -->
          <!-- user field -->
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button type="button" class="button is-primary" @click.prevent="save">
                Save
              </button>
            </p>
            <p class="control">
              <button type="button" class="button is-primary is-outlined" @click.prevent="newData = meData">
                Undo
              </button>
            </p>
          </div>
        </FormComponent>
        <div class="notification" v-if="status" style="margin-top:0.75rem;">
          <button type="button" class="delete" @click.prevent="status = ''"></button>
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
    // InputField: () => import('@/components/input.vue')
  },
  data () {
    return {
      meData: {
        username: '',
        email: '',
        password: '',
        role_id: ''
      },
      newData: {
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
        // token: ''
      },
      disabled: false,
      status: ''
      // token: ''
    }
  },
  created () {
    // get initial data
    this.$set(this.meData, 'username', this.$store.state.me)
    this.newData = this.meData
  },
  methods: {
    save () {
      // validation and send form

      this.status = ''
      const me = this.$store.state.me

      // token validation
      // if (this.token === '') {
      //   this.errors.token = 'Token is empty'
      //   return
      // } else this.errors.token = ''

      this.disabled = true

      // send form
      this.$axios.post(`account/update/${me}`, qs.stringify(this.newData)
        // , { headers: { 'X-AUTH-TOKEN': this.token } }
      )
        .then(res => {
          console.log(res)
          if (res.statusText && res.statusText === 'OK' && res.data) {
            this.status = res.data.message || res.data

            if (res.data.username) {
              // set cookie
              Cookie.set('me', res.data.username)
              // set me
              this.$store.commit('SET_ME', res.data.username)
            }
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
