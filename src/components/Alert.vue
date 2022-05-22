<template>
    <Message :severity="type" :life="2000" :sticky="false">{{mes}}</Message>
</template>

<script>
export default {
    name: "Alert",
    props: ["mes", "type"]
  }
</script>

<style>
.p-message {
  width: fit-content;
}
</style>