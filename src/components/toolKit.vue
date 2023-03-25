<template>
  <div id="toolKit">
    <!-- Menu -->
    <div class="toolOptionsBox">
      <div
        class="toolOption"
        v-for="(item, index) in options"
        :key="index"
        @click="select = index"
        :class="{toolOptionSelect: select == index ? true : false}"
      >
        <div v-html="item.icon"></div>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- Show -->
    <!-- empty -->
    <div
      class="toolEmpty"
      v-if="select == null"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M176 88v40H336V88c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zm-48 40V88c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56v40h28.1c12.7 0 24.9 5.1 33.9 14.1l51.9 51.9c9 9 14.1 21.2 14.1 33.9V304H384V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H192V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H0V227.9c0-12.7 5.1-24.9 14.1-33.9l51.9-51.9c9-9 21.2-14.1 33.9-14.1H128zM0 416V336H128v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H320v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H512v80c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64z" />
      </svg>
      <span>尚未选择工具</span>
    </div>
    <!-- tools -->
    <simpleTimer v-show="select == 0"></simpleTimer>
    <!-- <votingApparatus v-if="select == 1"></votingApparatus> -->
    <callRoll v-if="select == 1"></callRoll>
    <fileTransfer v-if="select == 2"></fileTransfer>
  </div>
</template>
<script>
import callRoll from './tools/rollCall.vue'
// import votingApparatus from './tools/votingApparatus.vue'
import simpleTimer from './tools/simpleTimer.vue'
import fileTransfer from './tools/fileTransfer.vue'
export default {
  name: 'toolKit',
  components: {
    callRoll,
    // votingApparatus,
    simpleTimer,
    fileTransfer
  },
  data () {
    return {
      select: 0,
      options: [
        {
          name: '计时器',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" style="margin-top:1px;width:21px;height:21px;" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>'
        },
        // {
        //   name: '班级投票',
        //   icon: '<svg xmlns="http://www.w3.org/2000/svg" style="margin-top:1px;" viewBox="0 0 580 580"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"/></svg>'
        // },
        {
          name: '点名器',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" style="margin-top:3px;width:24px;heigth:24px;" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384V352h16V480c0 17.7 14.3 32 32 32s32-14.3 32-32V192h56 64 16c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64H576V256H384V224H320v48c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H368c-26.5 0-48 21.5-48 48v80H243.1 177.1c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9V480c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>'
        },

        {
          name: '文件传输',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" style="margin-bottom:1px;width:24px;height:24px;" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>'
        }
      ]
    }
  }
}
</script>
<style>
#toolKit {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50px;
  overflow: hidden;
}
.toolOptionsBox {
  width: 100%;
  height: 100%;
  background: #f4f5f5;
  display: flex;
  justify-content: center;
}
.toolOption {
  margin: 7px 10px;
  padding: 1px 10px;
  width: auto;
  height: 35px;
  border-radius: 14px;
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 100%;
  color: #37405f;
  border: 1px solid #37405f;
  transition: 0.3s;
}
.toolOption > div {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 23px;
  height: 23px;
  fill: #37405f;
}
.toolOption > span {
  margin: 0 5px;
  line-height: 37px;
}

.toolOptionSelect {
  background: #917afb;
  color: #ffffff;
  border: none;
  animation: squeeze3124 0.9s both;
}
.toolOptionSelect > div {
  fill: #ffffff;
}
@keyframes squeeze3124 {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
.toolEmpty {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 130px;
  display: grid;
  grid-template-rows: 110px 20px;
  grid-template-columns: 100%;
  text-align: center;
  fill: #323d57;
  color: #323d57;
  opacity: 0.7;
}
</style>