<template>
  <form action="" @submit.prevent="$emit('signed')" :autocomplete="autocomplete">
    <slot name="field"></slot>
    <InputField label="Username" id="username" :idata="signinData.username" @update:idata="$set(signinData, 'username', $event), $emit('update:signinData', signinData)" :error="errors.username" :disabled="disabled" :autocomplete="autocomplete"/>
    <InputField label="Email" id="email" type="email" :idata="signinData.email" @update:idata="$set(signinData, 'email', $event), $emit('update:signinData', signinData)" :error="errors.email" :disabled="disabled" :autocomplete="autocomplete"/>
    <InputField label="Password" id="password" type="password" @update:idata="$set(signinData, 'password', $event), $emit('update:signinData', signinData)" :idata="signinData.password" :error="errors.password" :disabled="disabled" :autocomplete="autocomplete"/>
    <div class="field">
      <label class="label">Role</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select :value="signinData.role_id" @change="$set(signinData, 'role_id', $event.target.value), $emit('update:signinData', signinData)" :disabled="disabled">
            <option disabled value="">Select role...</option>
            <option value="1">User</option>
            <option value="2">Owner</option>
          </select>
        </div>
      </div>
      <p :class="`help ${errors.role_id ? 'is-danger' : 'is-success'}`">{{ errors.role_id }}</p>
    </div>
    <slot>
      <div class="field is-grouped is-grouped-right">
        <p class="control">
          <button class="button is-primary">
            Sign in!
          </button>
        </p>
      </div>
    </slot>
  </form>
</template>
<script>
export default {
  components: {
    InputField: () => import('@/components/input.vue')
  },
  props: {
    signinData: Object,
    errors: Object,
    disabled: Boolean,
    autocomplete: String
  }
}
</script>
