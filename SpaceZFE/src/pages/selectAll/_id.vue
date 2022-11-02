<template>
  <SelectAll />
</template>

<script>
import SelectAll from "@/components/SelectAll.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    SelectAll,
  },

  // setup() {
  //   const route = useRoute();

  //   const result = route.params.id;

  //   const resultSplit = result.split(" ");

  //   console.log(resultSplit);
  //   return {};
  // },
};
</script>

<style></style>
