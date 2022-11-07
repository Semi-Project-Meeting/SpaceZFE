<template>
  <div>
    <div class="mapCover" v-if="isShow">
      <button @click="viewMap" class="closeMap">X</button>
      <!-- 맵이 오는곳 -->
      <div class="map">
        <MapView :options="mapInfo"/>
      </div>
    </div>
    <button @click="viewMap" class="viewWithMap">지도에서 보기</button>
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
      <option :value="null">전체</option>
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
import MapView from "./KaKaoMapAll.vue";

export default {  components: {
    MapView,
  },
  data: () => {
    return {
      mapInfo: {
        vos: null
      },
      isShow:false
    };
  },
  methods: {
    viewMap() {
      this.isShow = !this.isShow;
    },
  },
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
      getPlaces,
      places,
      optionClicked,
      spaceType,
      resultSplit,
      sortSpace,
      filteredPlace,
      moveToPage,
    };
  },
  mounted() {
    console.log(typeof(useRoute().params.id));
    const arr = useRoute().params.id.split(" ");
    fetch(
      "http://localhost:8090/spaceZBE/search?searchWord=" + arr[0] + "&searchTime=" + arr[1] + " " + arr[2]
    )
      .then((res) => res.json())
      .then((res) => {
        this.mapInfo.vos = res.vos;
      });
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
.viewWithMap {
  border-radius: 10px;
  border-color: black;
  background-color: white;
}

.viewWithMap:hover {
  background-color: black;
  color: white;
}

.mapCover{
  width: 80%;
  height: 80%;
  border: 1px;
  background-color: transparent;
  position:fixed;
  padding:20px;
  z-index: 2;
}
.map {
  background-color: white;
  width:95%;
  height:95%;
  /* margin:; */
  padding:0px;
  border: 1px solid black;
}
.closeMap {
  float:right;
  background-color: transparent;
  border:0;
}
</style>
