<template>
  <div class="field">
    <label class="label" :for="id">{{label}}</label>
    <div class="control">
      <input :id="id" class="input" :type="type" :placeholder="placeholder" @input="$emit('update:idata', $event.target.value)" :disabled="disabled" :autocomplete="autocomplete">
    </div>
    <p :class="`help ${error ? 'is-danger' : 'is-success'}`">{{ error || info }}</p>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    idata: [String, Array, Object, Number, Boolean],
    error: String,
    info: String,
    placeholder: String,
    autocomplete: {
      type: String,
      default: 'on'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
