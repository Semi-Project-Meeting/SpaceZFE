<template>
  <div>
    <img
      v-for="num in uploadImageFile.length"
      :key="num"
      class="popupImageItem"
      :src="uploadImageFile[num - 1]"
    />
    <input multiple type="file" v-on:change="onFileSelected" :value="photos" />
    <div class="outer">
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
              <option value="desk">데스크 (1만원/시간)</option>
              <option value="meetingRoom4">회의실 4인 (2만원/시간)</option>
              <option value="meetingRoom6">회의실 6인 (3만원/시간)</option>
              <option value="meetingRoom810">회의실 8~10인 (5만원/시간)</option>
              <option value="meetingRoom20">회의실 20인 (10만원/시간)</option>
            </select>
          </div>
          <input type="text" class="spaceName" v-model="spaceName" />
          <p>공간 정보</p>
          <input type="text" class="info" v-model="info" />

          <div v-if="officeFee">
            오피스 일별 이용료
            <input type="text" v-model="officePrice" />
          </div>

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

    const spaceTypeValue = () => {
      if (spaceTypePrice.value === "office") {
        officeFee.value = true;
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

    // const setPhotos = () => {
    //   const form = new FormData();
    //   photoFile =
    // };

    const insertDone = async () => {
      const formData = new FormData();
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
    };

    const onFileSelected = (e) => {
      for (let i = 0; i < e.target.files.length; i++) {
        uploadImageFile.value.push(URL.createObjectURL(e.target.files[i]));
        File.value.push(e.target.files[i]);
      }
      //   uploadImageFile.value.push(URL.createObjectURL(e.target.files[1]));
      //   uploadImageFile.value.push(URL.createObjectURL(e.target.files[2]));
      //   uploadImageFile.value.push(URL.createObjectURL(e.target.files[3]));
      console.log(e.target.files[0].name);
      console.log(uploadImageFile);
    };

    return {
      spaceName,
      spaceTypeValue,
      spaceTypePrice,
      officeFee,
      photos,
      onFileSelected,
      uploadImageFile,
      insertDone,
      price,
      type,
      info,
      officePrice,
      spaceLoc,
      phoneNum,
      moreInfo,
      File,
    };
  },
};
</script>

<style scoped>
.outer {
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
  width: 100px;
  right: 200px;
  float: right;
  right: 30px;
  font-size: 20px;
}
.spaceType {
  width: 110px;
  height: 100px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  word-wrap: break-word;
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
</style>
