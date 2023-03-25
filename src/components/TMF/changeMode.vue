<template>
  <div id="changeMode">
    <!-- 标题 -->
    <div class="changeModeOptionsBox">
      <div
        class="changeModeOption"
        @click="online = false"
        :class="{changeModeOptionSelect: !online}"
      >
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Cube</title><path d="M448 341.37V170.61A32 32 0 00432.11 143l-152-88.46a47.94 47.94 0 00-48.24 0L79.89 143A32 32 0 0064 170.61v170.76A32 32 0 0079.89 369l152 88.46a48 48 0 0048.24 0l152-88.46A32 32 0 00448 341.37z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M69 153.99l187 110 187-110M256 463.99v-200"/></svg>
        </div>
        <span>线下</span>
      </div>
      <div
        class="changeModeOption"
        @click="online = true"
        :class="{changeModeOptionSelect: online}"
      >
        <div>
<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Globe</title><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
        </div>
        <span>线上</span>
      </div>
    </div>
    <!-- Show -->
    <!-- tools -->
    <TMFonline v-if="online"></TMFonline>
    <TMFoffline v-if="!online"></TMFoffline>
  </div>
</template>
<script>
import TMFoffline from './offLine.vue'
import TMFonline from './onLine.vue'
export default {
  name: 'changeMode',
  components: {
    TMFoffline,
    TMFonline
  },
  data () {
    return {
      online: false,
    }
  }
}
</script>
<style>
#changeMode {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50px;
  overflow: hidden;
}
.changeModeOptionsBox {
  width: 100%;
  height: 100%;
  background: #f4f5f5;
  display: flex;
  justify-content: center;
}
.changeModeOption {
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
.changeModeOption > div {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 23px;
  height: 23px;
  fill: #37405f;
}
.changeModeOption > span {
  margin: 0 5px;
  line-height: 37px;
}

.changeModeOptionSelect {
  background: #917afb;
  color: #ffffff;
  border: none;
  animation: squeeze3124 0.9s both;
}
.changeModeOptionSelect > div {
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
</style>