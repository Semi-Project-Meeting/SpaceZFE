<template>
  <div>
    <select name="spaceType" id="spaceType" v-model="spaceType">
      <option value="전체" selected>전체</option>
      <option value="오피스">오피스</option>
      <option value="데스크">데스크</option>
      <option value="회의실">회의실</option>
    </select>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { axios } from "axios";
import { ref } from "vue";
export default {
  setup() {
    const places = ref([]);
    const route = useRoute();
    const result = route.params.id;
    const resultSplit = result.split(" ");

    const getPlaces = async () => {
      const res = await axios
        .get(
          `http://localhost:8090/spaceZBE/search?searchWord=${resultSplit[0]}&searchTime=${resultSplit[1]} ${resultSplit[2]}`
        )
        .then((res) => {
          places.value = { ...res.data.vos };
        });
    };

    console.log(resultSplit[0], resultSplit[1], resultSplit[2]);
    return {};
  },
};
</script>

<style></style>
