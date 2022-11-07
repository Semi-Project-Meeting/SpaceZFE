<template>
  <div>
    <div
      class="offcanvas offcanvas-top"
      tabindex="-1"
      id="offcanvasTop"
      aria-labelledby="offcanvasTopLabel"
    >
      <div class="offcanvas-header">
        <input
          class="input"
          type="text"
          v-model="searchPlace"
          placeholder="🔍  상호명/위치 검색"
        />
        <input
          type="date"
          placeholder="날짜"
          class="button"
          v-model="date"
          @change="showDate"
        />

        <select class="button" v-model="time" @change="showTime">
          <option v-for="num in 24" :key="num.id">{{ num }}:00</option>
        </select>
        <button class="show" :to="{ name: 'SelectAllMap' }">
          지도기반으로 검색하기
        </button>
        <button
          class="show"
          v-if="showButtonRef"
          @click="moveToSelectAll(searchPlace, date, time)"
        >
          검색결과 더보기
        </button>
      </div>
      <div class="offcanvas-body">
        <div
          v-for="place in places"
          :key="place.companyId"
          @click="moveToPage(place.spaceId)"
        >
          <label>
            {{ place.spaceName }}
            <p class="searchedDetail">{{ place.price }}원</p>
          </label>
        </div>
      </div>
      <div class="offcanvas-footer"></div>
    </div>
    <div class="offcanvas-wrapper"></div>
    <!-- <SelectAll :places="places" /> -->
  </div>
</template>

<script>
import { ref, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

export default {
  setup() {
    const places = ref([]);

    const searchPlace = ref("");

    const date = ref("");
    const time = ref("");
    const showTimeTag = ref(false);
    const showDateTag = ref(false);
    const showButtonRef = ref(false);
    const showMore = ref(false);

    const router = useRouter();

    //태그 보여주기
    const showTime = () => {
      showTimeTag.value = true;
    };
    const showDate = () => {
      showDateTag.value = true;
    };

    //디비에 검색 이름과 날짜(선택)를 보내고 온 결과를 저장 하고 더보기 버튼 활성화
    const getPlaces = async () => {
      const res = await axios
        .post("http://localhost:8090/spaceZBE/search", {
          searchWord: searchPlace.value,
          searchTime: date.value + " " + time.value + ":00",
        })
        .then(() => {
          // places.value = res.data.vos;
          // console.log(res);
          showMore.value = true;
        });
    };

    const searchingPlace = async () => {
      let days = "";

      if (date.value && time.value) {
        days = `${date.value} ${time.value}:00`;
      }
      console.log(days);

      const res = await axios.get(
        `http://localhost:8090/spaceZBE/search?searchWord=${searchPlace.value}&searchTime=${days}`
      );

      places.value = { ...res.data.vos };
      //  store.console
      //   .log
      //   `http://localhost:8090/spaceZBE/search?searchWord=${searchPlace.value}&searchTime=${days}`
      // ();
    };

    //검색 watch 함수 (오리를 제외한 검색어는 enter를 쳐야 결과 나옴)
    watch(searchPlace, () => {
      searchingPlace(), showButton();
    });

    //임포트 해온 오프캔버스를 닫도록 받아옴
    const { emit } = getCurrentInstance();
    const onClose = () => {
      emit("close");
    };

    //미리보기로 나온 검색결과들을 클릭 할 시 해당 검색결과로 이동하게하는 함수
    const moveToPage = (placeId) => {
      console.log(placeId);
      onClose();
      router
        .push({
          name: "Details",
          params: {
            id: placeId,
          },
        })
        .then(() => {
          window.location.reload(true);
        });
    };

    //검색결과 더보기 클릭시 모든 검색 결과가 나오도록 출력하는 함수
    const moveToSelectAll = (placeName, plaecDate, placeTime) => {
      // // let resPlaceDate = placeName + " " + placeDate + " " + placeTime;
      // // console.log(resPlaceDate);
      // const placeValues = placeName + plaecDate + placeTime;

      // const placesValue = places.value;

      onClose();
      router.push({
        name: "SelectAll",
        params: {
          id: placeName + " " + plaecDate + " " + placeTime,
        },
      });
      // console.log(placesValue);
    };

    //미리보기뜨게할 함수
    const showButton = () => {
      showButtonRef.value = true;
    };

    return {
      searchPlace,
      places,
      showButtonRef,
      date,
      time,
      showTimeTag,
      showMore,
      showDateTag,
      showTime,
      showDate,
      moveToPage,
      moveToSelectAll,
      showButton,
      getPlaces,
      searchingPlace,
      // store,
    };
  },
};
</script>

<style scoped>
.offcanvas-top {
  top: 0;
  right: 0;
  left: 0;
  height: auto;
  position: relative;
  background: white;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.offcanvas-header {
  height: 70px;
}
.offcanvas-wrapper {
  position: absolute;
  z-index: 100;
  top: inherit;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.input {
  width: 500px;
  height: 50px;
  font-size: 25px;
  margin-left: 100px;
  border: none;
  border-bottom: 1px solid gray;
  margin-right: 60px;
}
.button {
  margin: 10px;
  width: fit-content;
  height: 50px;
  background: white;
  border-radius: 10px;
  opacity: 0.5;
}
label {
  margin-left: 100px;
  width: 500px;
  height: 60px;
  font-size: 25px;
  border-bottom: 1px solid gray;
}
.searchedDetail {
  font-size: 15px;
}
.show {
  margin: 10px;
  width: fit-content;
  height: 50px;
  background: white;
  border-radius: 10px;
  opacity: 0.5;
}
</style>
