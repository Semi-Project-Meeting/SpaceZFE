// eslint-disable-next-line
<template>
  <div>
    <div class="picsAndIntro">
      <div class="form">
        <p class="lineIntro">{{ details.space.spaceName }}</p>
        <br />
        <p class="shortInto">{{ details.space.info }}</p>
        <div class="img">
          <img class="big" name="big" :src="currentImg" @click="changePic" />
          <!-- details.imgs[currentImgNum].img -->
          <br />

          <img
            class="list"
            v-for="name in details.imgs"
            :key="name.id"
            :src="name.img"
            @click="directChangePic"
          />
        </div>
      </div>
    </div>
    <div class="res">
      <div class="resForm">
        <div v-if="details.space.type == 'office'">
          <p class="chooseDate">날짜 선택</p>
          <div class="calender">
            <input
              class="date"
              type="date"
              v-model="startDate"
              style="margin-right: 20px"
            />
            <span style="font-size: 25px">-</span>
            <input
              class="date"
              type="date"
              v-model="endDate"
              style="margin-left: 20px"
              @change="rentOfficeCheck"
            />
          </div>
          <p>{{ errMessage }}</p>
          <div class="priceDiv">
            <p class="price">
              가격
              <!-- <input type="number" v-model="officePrice" /> -->
              {{ officePrice }}
              원
            </p>
          </div>
          <p class="payRule">
            &#8251;오피스 예약은 후불제이며 선결제가 불가능합니다&#8251;
          </p>
          <button @click="resSubmit">예약하기</button>
        </div>
        <div v-if="details.space.type !== 'office'">
          <p class="chooseDate">날짜 및 시간 선택</p>
          <div class="calender">
            <label style="font-size: 20px">대여시각: {{ now }}-</label>
            <select
              class="time"
              v-model="startDateTime"
              style="margin-right: 10px"
            >
              <option v-for="num1 in 24" :key="num1.id" :value="num1">
                {{ num1 }}시
              </option>
            </select>
            <label style="margin-left: 10px; font-size: 20px"
              >반납시각:{{ now }}-</label
            >
            <select
              class="time"
              v-model="endDateTime"
              style="margin-right: 20px"
              @change="rentTimeCheck"
            >
              <option v-for="num2 in 24" :key="num2.id" :value="num2">
                {{ num2 }}시
              </option>
            </select>
          </div>
          <p>{{ errMessage }}</p>
          <div class="priceDiv">
            <p class="price">가격 {{ nOfficePrice }}원</p>
          </div>
          <p class="payRule">
            &#8251;선결제 예약 시 보증금을 포함한 전 금액을 지불하고, 결재금액의
            5%가 적립됩니다. 보증금으로 예약시 전 금액의 20%가 결제됩니다&#8251;
          </p>
          <div class="buttons">
            <button class="preSubmit" @click="preSubmit">
              선결제로 예약하기
            </button>
            <button class="depositSubmit" @click="submit">
              보증금으로 예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="detailNavDiv">
      <nav class="detailNav">
        <ul class="nav" @click="locClick">
          <p class="hover" v-if="!locClicked">장소 소개</p>
          <p
            class="hover"
            v-if="locClicked"
            style="color: blue; border-bottom: 1px solid blue"
          >
            장소 소개
          </p>
        </ul>
        <ul class="nav" @click="showLocation">
          <p class="hover" v-if="!locationClicked">장소 위치</p>
          <p
            class="hover"
            v-if="locationClicked"
            style="color: blue; border-bottom: 1px solid blue"
          >
            장소 위치
          </p>
        </ul>
        <ul class="nav" @click="showReviews">
          <p class="hover" v-if="!reviewClicked">
            리뷰
            <a style="opacity: 0.6; margin-left: 10px">{{
              details.reviews.length
            }}</a>
          </p>

          <p
            class="hover"
            v-if="reviewClicked"
            style="color: blue; border-bottom: 1px solid blue"
          >
            리뷰
            <a style="opacity: 0.6; margin-left: 10px">{{
              details.reviews.length
            }}</a>
          </p>
        </ul>
        <ul class="nav" @click="showQna">
          <p class="hover" v-if="!qnaClicked">
            Q&A
            <a style="opacity: 0.6; margin-left: 10px">{{
              details.qnas.length
            }}</a>
          </p>
          <p
            class="hover"
            v-if="qnaClicked"
            style="color: blue; border-bottom: 1px solid blue"
          >
            Q&A
            <a style="opacity: 0.6; margin-left: 10px">{{
              details.qnas.length
            }}</a>
          </p>
        </ul>
      </nav>
      <div class="navContainer">
        <div class="locClicked" v-show="locClicked">
          {{ details.space.moreInfo }}
        </div>
        <div class="locationClicked" v-show="locationClicked">
          <!-- {{ details.space.location }}<br /> -->
          <!-- <iframe :src="details.location">{{ details.location }} </iframe> -->
          <!-- <div :id="mapContainer" style="width: 300px; height: 300px"></div> -->
        </div>
        <div class="reviewClicked" v-show="reviewClicked">
          <div style="margin-top: 20px">
            <a class="reviews" v-for="num in details.reviews" :key="num">
              {{ num.reviewId }} {{ num.length }} <br />
              {{ num.content }} {{ num.reviewDate }}
              <!-- {{ num.reviewer }} {{ num.starRating }} <br />
              {{ num.reviewContent }} <br /> -->
              <hr />
            </a>
          </div>
        </div>
        <div class="qnaClicked" v-show="qnaClicked">
          <div style="margin-top: 20px">
            <a class="qnas" v-for="num in details.qnas" :key="num">
              질문자:{{ num.memberId }} <br />
              내용:{{ num.content }} <br />
              답변:{{ num.title }} <br />
              <hr />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  setup() {
    const details = ref({
      // id: 0,
      // spaceType: "",
      // capacity: 0,
      // rentalCost: 0,
      // lineIntro: "",
      // shortInto: "",
      // imgs: [],

      // spaceIntro: "",
      // location: "",
      // useRule: "",
      // reviews: [],
      // qnas: [],

      space: {},
      // spaceId: 0,
      // companyId: 0,
      // memberId: 0,
      // spaceName: "",
      // info: "",
      // moreInfo: "",
      // imgName: "",
      // type: "",
      // location: "",
      // capacity: 0,
      // price: 0,

      reviews: [],
      replys: [],
      qnas: [],
      avgRating: 0,
      merchant_uid: "",
    });

    const requests = ref([]);
    const route = useRoute();
    let officePrice = ref(0);
    let nOfficePrice = ref(0);

    let now = ref("");

    const num1 = ref();
    const num2 = ref();

    // const map = ref('')
    const errMessage = ref("");
    const startDate = ref("");
    const endDate = ref("");
    const startDateTime = ref("");
    const endDateTime = ref("");
    const locClicked = ref(false);
    const locationClicked = ref(false);
    const reviewClicked = ref(false);
    const qnaClicked = ref(false);

    let currentImgNum = ref(0);
    let currentImg = ref("");

    // refreshAll();

    const getDetails = async () => {
      const res = await axios.get(
        "http://localhost:8090/spaceZBE/spaceInfo?spaceId=" + route.params.id
      );
      // console.log(res);
      details.value = { ...res.data };
      console.log(details.value.merchant_uid);
      // console.log(details.value);
      // console.log(res.request);
      // requests.value = JSON.parse(res.request.response).merchant_uid;
      // console.log(requests.value);
      // console.log(res.request.response.merchant_uid);
      // 지우면 안됌
      // currentImg.value = details.value.imgs[currentImgNum.value].img;
      // console.log(details.value.imgs[currentImgNum.value].img);
    };
    getDetails();

    // console.log(requests.value);
    console.log(details.value.merchant_uid);
    console.log(details.value.avgRating);

    //메인사진 클릭시 변경
    const changePic = () => {
      currentImgNum.value++;
      // currentImg.value = details.value.imgs[currentImgNum.value].img;
      console.log(currentImgNum.value);
      if (currentImgNum.value === details.value.imgs.length) {
        currentImgNum.value = 0;
      }
      console.log(currentImgNum.value);
      currentImg.value = details.value.imgs[currentImgNum.value].img;
    };

    //사진 리스트 클릭시 해당 사진 변경
    const directChangePic = (e) => {
      console.log(e);
    };

    //오피스 대여 비용 계산기
    const rentOfficeCheck = () => {
      //반납일이 대여일보다 빠르면 오류 메세지 출력
      if (endDate.value < startDate.value) {
        errMessage.value = "반납불가능한 시간 입니다";
        officePrice.value = 0;
      } else {
        errMessage.value = "";
        let total;
        //구한 날짜를 일수로 변환하는 함수
        const getDateDiff = (d1, d2) => {
          const date1 = new Date(d1);
          const date2 = new Date(d2);
          const diffDate = date1.getTime() - date2.getTime();
          return Math.abs(diffDate / (1000 * 60 * 60 * 24));
        };
        //db에 저장한 공간의 대여로 곱하기 위에서 구한 일수
        total =
          getDateDiff(endDate.value, startDate.value) *
          details.value.rentalCost;
        //가시성 좋게 1000단위 마다 ,찍는 로직 추가
        officePrice.value = total
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    };

    //렌트 비용 계산기 대여시각보다 반납시각이 이르면 오류 메세지 출력
    const rentTimeCheck = () => {
      if (endDateTime.value < startDateTime.value) {
        errMessage.value = "반납불가능한 시간 입니다";
        nOfficePrice.value = 0;
      } else {
        let total;
        errMessage.value = "";
        total =
          (endDateTime.value - startDateTime.value) * details.value.space.price;
        nOfficePrice.value = total
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    };

    //시간 보여줄때 옆에 날짜도 보여주는 기능
    const date = new Date();
    now = `${date.getMonth() + 1}-${date.getDate()}`;

    //데스크 회의실 - 결제(후불) 버튼
    const submit = async () => {
      // post정보 확인
      // console.log(
      //   details.value.id,
      //   startDateTime.value,
      //   endDateTime.value,
      //   nOfficePrice.value
      // );
      //  IMP.init("imp76177137");
      //   IMP.request_pay(
      // {
      //   pg: "kakaopay.TCSUBSCRIP",
      //   pay_method: "card", // 기능 없음.
      //   merchant_uid: `${requests.value}`, // 상점에서 관리하는 주문 번호
      //   name: details.value.space.spaceName,
      //   amount: details.value.space.price, // 빌링키 발급과 함께 40원 결제승인을 시도합니다. price의 20%만 계산해서 넣는다. //후결제인 경우, 0으로 넣는다.
      //   customer_uid: "1", // 필수 입력
      //   buyer_email: "iamport@siot.do",
      //   buyer_name: "아임포트",
      //   buyer_tel: "02-1234-1234",
      // }
      try {
        axios.post("http://localhost:8090/spaceZBE/reserve/insert", {
          spaceId: details.value.id,
          memberId: localStorage.getItem("memberId"),
          startDate: startDateTime.value,
          endDate: endDateTime.value,
          price: nOfficePrice.value,
        });
      } catch (error) {
        console.alert("error:" + error);
      }
    };
    //데스크 회의실 - 선불 버튼
    const preSubmit = async () => {
      try {
        axios.post("http://localhost:8090/spaceZBE/reserve/insert", {
          spaceId: details.value.id,
          memberId: localStorage.getItem("memberId"),
          startDate: startDateTime.value,
          endDate: endDateTime.value,
          price: nOfficePrice.value,
          prepay: "선결제",
        });
      } catch (error) {
        console.alert("error:" + error);
      }
    };

    //오피스 - 결제 버튼
    const resSubmit = async () => {
      try {
        axios.post("http://localhost:8090/spaceZBE/reserve/insert", {
          spaceID: details.value.id,
          startDate: startDate.value,
          endDate: endDate.value,
          price: officePrice.value,
        });
      } catch (error) {
        console.alert("error:" + error);
      }
    };

    // 하단 nav바 버튼들
    const locClick = () => {
      locClicked.value = !locClicked.value;
      locationClicked.value = false;
      reviewClicked.value = false;
      qnaClicked.value = false;
    };

    const showLocation = () => {
      locationClicked.value = !locationClicked.value;
      locClicked.value = false;
      reviewClicked.value = false;
      qnaClicked.value = false;
    };

    const showReviews = () => {
      reviewClicked.value = !reviewClicked.value;
      locationClicked.value = false;
      locClicked.value = false;
      qnaClicked.value = false;
    };

    const showQna = () => {
      qnaClicked.value = !qnaClicked.value;
      locationClicked.value = false;
      locClicked.value = false;
      reviewClicked.value = false;
    };

    return {
      details,
      currentImg,
      currentImgNum,
      locClick,
      locClicked,
      locationClicked,
      showLocation,
      showReviews,
      reviewClicked,
      qnaClicked,
      showQna,
      changePic,
      startDate,
      date,
      endDate,
      resSubmit,
      officePrice,
      nOfficePrice,
      startDateTime,
      endDateTime,
      submit,
      num1,
      num2,
      errMessage,
      now,
      rentTimeCheck,
      directChangePic,
      rentOfficeCheck,
      preSubmit,
    };
  },
};
</script>

/* eslint-disable */
<style scoped>
.picsAndIntro {
  left: 180px;
  float: left;
  position: absolute;
}
.res {
  margin-top: 30px;
  right: 180px;
  /* float: right; */
  position: absolute;
  /* border: 1px solid gray; */
  border-radius: 15px;
}
.detailNavDiv {
  height: fit-content;
  top: 1100px;
  left: 180px;
  float: left;
  position: absolute;
}
.detailNav {
  width: 850px;
  height: 40px;
  /* border-bottom: 1px solid silver; */
}
.form {
  width: 900px;
  height: 700px;
  margin-top: 20px;
  text-align: center;
}
.resForm {
  width: 800px;
  height: 500px;
  margin: 90px;
  margin-left: 80px;
  text-align: center;
}
.navContainer {
  width: 900px;
  height: 200px;
}
.big {
  width: 900px;
  height: 600px;
  position: relative;
  margin: auto;
  align-self: left;
}
.list {
  width: 100px;
  height: 100px;
}
.shortInto,
.lineIntro {
  text-align: left;
  font-size: 30px;
}
button {
  width: 600px;
  height: 70px;
  border-radius: 20px;
  font-size: 25px;
  border: 1px solid skyblue;
  background: skyblue;
  color: blue;
  margin-right: 200px;
}

iframe {
  width: 700px;
  height: 600px;
}
.nav {
  display: inline-block;
  font-size: 25px;
  margin-right: 50px;
  margin-left: 50px;
  justify-content: space-evenly;
}
.hover:hover {
  border-bottom: 1px solid blue;
  color: blue;
}
.locClicked,
.locationClicked {
  margin-top: 20px;
  font-size: 30px;
}
.reviews {
  width: 850px;
  font-size: 30px;
  line-height: 2.5;
  color: black;
}
.qnas {
  width: 850px;
  font-size: 30px;
  line-height: 2.5;
  color: black;
}
.chooseDate {
  text-align: left;
  font-size: 25px;
  margin-bottom: 40px;
}
.calender {
  width: 600px;
  height: 70px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 80px;
}
.priceDiv {
  width: 600px;
  height: 70px;
  font-size: 25px;
  word-spacing: 160px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 80px;
}
.date {
  margin-top: 10px;
  border: 1px solid white;
  font-size: 25px;
}
.time {
  margin: none;
  width: 100px;
  margin-top: 20px;
  border: 1px solid white;
  font-size: 20px;
}
.price {
  margin-top: 10px;
}
.payRule {
  font-size: 20px;
  margin-right: 300px;
}
.depositSubmit {
  width: 300px;
  height: 70px;
  border-radius: 20px;
  font-size: 25px;
  border: 1px solid skyblue;
  background: skyblue;
  color: blue;
  margin-right: 20px;
}
.preSubmit {
  width: 300px;
  height: 70px;
  border-radius: 20px;
  font-size: 25px;
  border: 1px solid skyblue;
  background: skyblue;
  color: blue;
  /* margin-left: px; */
  margin-right: 20px;
}
.buttons {
  width: 660px;
  height: 70px;
}
</style>
