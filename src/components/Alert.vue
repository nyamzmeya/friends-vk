<template>
    <Message :severity="type" :life="2000" :sticky="false">{{mes}}</Message>
</template>

<script>
export default {
    name: "Alert",
    props: ["mes", "type"],
    mounted() {
      setTimeout(() => {
        this.$store.commit("SET_ALERT_SEARCH", null);
      }, 2000)
    }
  }
</script>

<style>
.p-message {
  width: fit-content;
}
</style>