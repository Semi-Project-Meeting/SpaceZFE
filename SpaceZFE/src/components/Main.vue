<template>
  <div>
    <h2>인기 장소</h2>
    <div class="popPlace" v-on:scroll="horizontalScroll">
      <section
        class="lists"
        v-for="num in place.length"
        :key="place[num]"
        @click="moveToPage(place[num].id)"
      >
        <!-- {{ place[num].id }} -->
        <img class="img" :src="place[num - 1].profilImg" />
        <h3>{{ place[num - 1].name }}</h3>
        <p>{{ place[num - 1].coast }}원 ⭐{{ place[num - 1].rating }}</p>
        <p></p>
      </section>
    </div>
    <h2>새로 등록된 장소</h2>
    <div class="latestPlace">
      <section
        class="lists"
        v-for="num in place.length"
        :key="place[num]"
        @click="moveToPage(place[num - 1].id)"
      >
        {{ place[num - 1].id }}
        <img class="img" :src="place[num - 1].profilImg" />
        <h3>{{ place[num - 1].name }}</h3>
        <p>{{ place[num - 1].coast }}원 ⭐{{ place[num - 1].rating }}</p>
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

    console.log(store.state.memberId);

    const place = ref([]);

    const router = useRouter();

    const getPlaces = async () => {
      const res = await axios.get("http://localhost:3001/place");
      place.value = res.data;
    };

    getPlaces();

    const moveToPage = (placeId) => {
      console.log(placeId);
      //   router.push("/detail/" + placeId);
      router.push({
        name: "Details",
        params: {
          id: placeId - 1,
        },
      });
    };

    return {
      place,
      moveToPage,
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
