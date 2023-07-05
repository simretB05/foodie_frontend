<template>
  <div>
    <business-login-form></business-login-form>
    <business-signup-form></business-signup-form>
  </div>
</template>
<script>
import BusinessSignupForm from "@/components/Restaurant/BusinessSignupForm.vue";
import BusinessLoginForm from "@/components/Restaurant/BusinessLoginForm.vue";
export default {
  components: {
    BusinessLoginForm,
    BusinessSignupForm,
  },
};
</script>

<style lang="scss" scoped>
</style>