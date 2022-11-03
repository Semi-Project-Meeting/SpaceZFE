<template>
  <div>
    <h2>최근 추가된 장소</h2>
    <div class="popPlace" v-on:scroll="horizontalScroll">
      <!-- {{ recentPlace }}  C:\golfzon\frame_work\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\SpaceZBE_SpaceZBE\resources\upload -->
      <section
        class="lists"
        v-for="currentImgNum in recentPlace.length"
        :key="recentPlace[currentImgNum]"
        @click="moveToPage(recentPlace[currentImgNum - 1].spaceId)"
      >
        <img
          class="img"
          :src="`http://localhost:8090/spaceZBE/resources/upload/${
            recentPlace[currentImgNum - 1].imgName
          }`"
        />
        <h3>{{ recentPlace[currentImgNum - 1].spaceName }}</h3>
        <p>{{ recentPlace[currentImgNum - 1].price }}원</p>
        <p></p>
      </section>
    </div>
    <h2>추천 장소</h2>
    <div class="latestPlace">
      <section
        class="lists"
        v-for="currentImgNum in recommendPlace.length"
        :key="recommendPlace[currentImgNum]"
        @click="moveToPage(recommendPlace[currentImgNum - 1].spaceId)"
      >
        <img
          class="img"
          :src="`http://localhost:8090/spaceZBE/resources/upload/${
            recommendPlace[currentImgNum - 1].imgName
          }`"
        />
        <h3>{{ recommendPlace[currentImgNum - 1].spaceName }}</h3>
        <p>{{ recommendPlace[currentImgNum - 1].price }}원</p>
        <p></p>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const recommendPlace = ref({});

    let currentImgNum = ref(0);
    // const recentPlaceImg = ref("");
    const recentPlace = ref([]);

    const router = useRouter();

    const getPlaces = async () => {
      const res = await axios.get(
        "http://localhost:8090/spaceZBE/recommendedSpace"
      );
      recommendPlace.value = res.data.vos;
      console.log(recommendPlace.value[0].imgName);
    };

    getPlaces();

    const getPlaces2 = async () => {
      const res = await axios.get(
        "http://localhost:8090/spaceZBE/recentlyAdded"
      );
      recentPlace.value = res.data.vos;
      console.log(recentPlace.value[0].imgName);
      console.log(recentPlace.value);
    };

    getPlaces2();

    const moveToPage = (placeId) => {
      console.log(placeId);
      //   router.push("/detail/" + placeId);
      router.push({
        name: "Details",
        params: {
          id: placeId,
        },
      });
    };

    return {
      recommendPlace,
      moveToPage,
      recentPlace,
      currentImgNum,
    };
  },
};
</script>

<style scoped>
.popPlace,
.latestPlace {
  width: 1600px;
  height: 450px;
  margin: none;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.popPlace::-webkit-scrollbar,
.latestPlace::-webkit-scrollbar {
  display: none;
}
.latestPlace {
  width: 1600px;
  height: 450px;
  margin: none;
  overflow-x: hidden;
  overflow-y: auto;
}
.lists {
  display: inline-block;
  margin: 30px;
}
.img {
  width: 300px;
  height: 300px;
}
</style>
