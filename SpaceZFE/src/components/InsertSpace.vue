<template>
  <div>
    <div class="left">
      <img
        v-for="num in uploadImageFile.length"
        :key="num"
        class="popupImageItem"
        :src="uploadImageFile[num - 1]"
      />
      <input
        v-if="dontShow"
        multiple
        type="file"
        v-on:change="onFileSelected"
        :value="photos"
      />
    </div>
    <div class="righter">
      <h2>공간 등록</h2>
      <div class="form">
        <div class="innerform">
          <p>공간명</p>
          <div class="select">
            공간분류
            <select
              class="spaceType"
              v-model="spaceTypePrice"
              @change="spaceTypeValue"
            >
              <option value="office">오피스</option>
              <option value="desk">
                <p>데스크</p>
                <br />
                <p>(1만원/시간)</p>
              </option>
              <option value="meetingRoom4">회의실 4인 (2만원/시간)</option>
              <option value="meetingRoom6">회의실 6인 (3만원/시간)</option>
              <option value="meetingRoom810">회의실 8~10인 (5만원/시간)</option>
              <option value="meetingRoom20">회의실 20인 (10만원/시간)</option>
            </select>
            <div class="officeDiv" v-if="officeFee">
              오피스 일별 이용료
              <input
                class="officeFee"
                type="text"
                v-model="officePrice"
                @change="officePriceSet"
              />
            </div>
          </div>
          <input type="text" class="spaceName" v-model="spaceName" />
          <p>공간 정보</p>
          <input type="text" class="info" v-model="info" />

          <br />
          <p>공간소개</p>
          <textarea
            v-model="moreInfo"
            class="officeIntro"
            cols="40"
            rows="5"
          ></textarea>
          <br />
          <p>장소</p>
          <input type="text" class="text" v-model="spaceLoc" />
          <!-- {{ pwlengthCheck }} -->
          <br />
          <p>전화번호</p>
          <input type="tel" name="phoneNum" v-model="phoneNum" />
          <!-- {{ err }} -->
          <button class="insertOK" @click="insertDone">등록완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const spaceName = ref("");
    const officeFee = ref(false);
    const photos = ref("");
    const officePrice = ref(0);
    const spaceTypePrice = ref("");

    const uploadImageFile = ref([]);
    const File = ref([]);
    const price = ref(0);
    const type = ref("");
    const info = ref("");
    const moreInfo = ref("");
    const spaceLoc = ref("");
    const phoneNum = ref(0);
    const dontShow = ref(true);
    const router = useRouter();

    const spaceTypeValue = () => {
      if (spaceTypePrice.value === "office") {
        officeFee.value = true;
        // price.value = officePrice.value;
        // console.log(price.value);
      } else if (spaceTypePrice.value === "desk") {
        price.value = 10000;
        type.value = "desk";
        officeFee.value = false;
      } else if (spaceTypePrice.value === "meetingRoom4") {
        price.value = 20000;
        type.value = "meetingRoom";
        officeFee.value = false;
      } else if (spaceTypePrice.value === "meetingRoom6") {
        price.value = 30000;
        type.value = "meetingRoom";
        officeFee.value = false;
      } else if (spaceTypePrice.value === "meetingRoom810") {
        price.value = 50000;
        type.value = "meetingRoom";
        officeFee.value = false;
      } else if (spaceTypePrice.value === "meetingRoom20") {
        price.value = 100000;
        type.value = "meetingRoom";
        officeFee.value = false;
      }
    };

    const officePriceSet = () => {
      type.value = "office";
      price.value = officePrice.value;
    };

    const insertDone = async () => {
      // console.log(price.value);
      const formData = new FormData();

      formData.append("companyId", localStorage.getItem("companyId"));
      formData.append("spaceName", spaceName.value);
      formData.append("info", info.value);
      formData.append("moreInfo", moreInfo.value);
      formData.append("type", type.value);
      formData.append("location", spaceLoc.value);
      formData.append("price", price.value);
      formData.append("phone_number", phoneNum.value);
      for (let i = 0; i < File.value.length; i++) {
        formData.append("multipartFiles", File.value[i]);
      }
      axios.post(
        "http://localhost:8090/spaceZBE/back-office/insert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("등록에 성공했습니다");
      router.push({
        name: "Main",
      });
    };

    const onFileSelected = (e) => {
      for (let i = 0; i < e.target.files.length; i++) {
        uploadImageFile.value.push(URL.createObjectURL(e.target.files[i]));
        File.value.push(e.target.files[i]);
      }
      dontShow.value = false;
    };

    return {
      spaceName,
      spaceTypePrice,
      officeFee,
      photos,
      uploadImageFile,
      price,
      type,
      info,
      officePrice,
      spaceLoc,
      phoneNum,
      moreInfo,
      File,
      dontShow,
      spaceTypeValue,
      onFileSelected,
      insertDone,
      officePriceSet,
    };
  },
};
</script>

<style scoped>
.left {
  left: 200px;
  /* float: right; */
  position: absolute;
}
img {
  width: 300px;
  height: 300px;
}
.righter {
  right: 200px;
  /* float: right; */
  position: absolute;
}
.form {
  width: 600px;
  height: 800px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 10px;
}
.innerform {
  padding: 20px;
}
input {
  width: 300px;
  height: 50px;
}
p {
  font-size: 25px;
}
.select {
  width: 150px;
  float: right;
  font-size: 20px;
  align-items: left;
  height: 400px;
}
.spaceType {
  width: 150px;
  height: 100px;
  /* height: auto; */
  white-space: normal;
}
#dropDownOptions {
  width: 100px;
}
.insertOK {
  margin-left: 300px;
  margin-top: 60px;
  width: 250px;
  height: 50px;
  border-radius: 30px;
  background-color: white;
  border: white;
  color: blue;
  font-size: 30px;
}
.insertOK:hover {
  background-color: blue;
  border: blue;
  color: white;
}
.officeDiv {
  margin-top: 20px;
  font-size: 15px;
}
.officeFee {
  width: 100px;
}
</style>
