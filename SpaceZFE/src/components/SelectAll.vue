<template>
  <div>
    <div class="filter">
      검색어 결과 : {{ resultSplit[0] }} <br />
      검색 날짜 : {{ resultSplit[1] }} - {{ resultSplit[2] }}
    </div>
    <select
      class="spaceType"
      id="spaceType"
      v-model="spaceType"
      @change="sortSpace"
    >
      <option value="전체" selected>전체</option>
      <option value="오피스">오피스</option>
      <option value="데스크">데스크</option>
      <option value="회의실">회의실</option>
    </select>
    <br />
    <p class="placeLeng" v-show="!optionClicked">
      <b>장소</b> : {{ places.length }}
    </p>
    <p class="placeLeng" v-show="optionClicked">
      <b>장소</b> : {{ filteredPlace.length }}
    </p>

    <div v-show="!optionClicked" class="selectedAll">
      <section
        class="lists"
        v-for="num in places.length"
        :key="places[num]"
        @click="moveToPage(places[num - 1].spaceId)"
      >
        <img
          class="img"
          :src="`http://localhost:8090/spaceZBE/resources/upload/${
            places[num - 1].imgName
          }`"
        />
        <h3>{{ places[num - 1].spaceName }}</h3>
        <p>{{ places[num - 1].price }}원 {{ places[num - 1].type }}</p>
        <p></p>
      </section>
    </div>
    <div v-show="optionClicked" class="selectedAll">
      <section
        class="lists"
        v-for="num in filteredPlace.length"
        :key="filteredPlace[num]"
        @click="moveToPage(filteredPlace[num - 1].spaceId)"
      >
        <img
          class="img"
          :src="`http://localhost:8090/spaceZBE/resources/upload/${
            filteredPlace[num - 1].imgName
          }`"
        />
        <h3>{{ filteredPlace[num - 1].spaceName }}</h3>
        <p>
          {{ filteredPlace[num - 1].price }}원 {{ filteredPlace[num - 1].type }}
        </p>
        <p></p>
      </section>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import _ from "lodash";

export default {
  setup() {
    const places = ref({});
    const filteredPlace = ref({});
    const router = useRouter();
    const route = useRoute();
    const spaceType = ref("");
    const result = route.params.id;
    const resultSplit = result.split(" ");
    const optionClicked = ref(false);

    const getPlaces = async () => {
      const res = await axios
        .get(
          `http://localhost:8090/spaceZBE/search?searchWord=${resultSplit[0]}&searchTime=${resultSplit[1]} ${resultSplit[2]}`
        )
        .then((res) => {
          places.value = res.data.vos;
          console.log(places.value);
        });
    };

    getPlaces();

    const sortSpace = () => {
      optionClicked.value = true;
      if (spaceType.value === "오피스") {
        filteredPlace.value = _.filter(places.value, { type: "office" });
        console.log(spaceType.value);
      } else if (spaceType.value === "데스크") {
        filteredPlace.value = _.filter(places.value, { type: "desk" });
        console.log(spaceType.value);
      } else if (spaceType.value === "회의실") {
        filteredPlace.value = _.filter(places.value, { type: "meetingRoom" });
        console.log(spaceType.value);
      } else if (spaceType.value === "전체") {
        filteredPlace.value = places.value;
      }
    };

    const moveToPage = (placeId) => {
      router.push({
        name: "Details",
        params: {
          id: placeId,
        },
      });
    };

    return {
      places,
      optionClicked,
      spaceType,
      resultSplit,
      filteredPlace,
      getPlaces,
      sortSpace,
      moveToPage,
    };
  },
};
</script>

<style scoped>
.filter {
  font-size: 20px;
}
.selectedAll {
  width: 1600px;
  height: 450px;
  margin: none;
}
.lists {
  display: inline-block;
  margin: 30px;
}
.img {
  width: 300px;
  height: 300px;
  border-radius: 20px;
}
.spaceType {
  margin-top: 10px;
  font-size: 20px;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  opacity: 0.6;
}
.placeLeng {
  margin-top: 20px;
  font-size: 20px;
}
</style>
