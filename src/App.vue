<template>
  <div id="frame">
    <div class="components-menu">
      <img
        class="icon"
        src="./assets/app/logo.png"
      >
      <div
        class="component"
        @click="show = 0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 512 512"
        >
          <polygon
            points="32 192 256 64 480 192 256 320 32 192"
            style="fill:none;stroke:#61666d;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          />
          <polyline
            points="112 240 112 368 256 448 400 368 400 240"
            style="fill:none;stroke:#61666d;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          />
          <line
            x1="480"
            y1="368"
            x2="480"
            y2="192"
            style="fill:none;stroke:#61666d;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          />
          <line
            x1="256"
            y1="320"
            x2="256"
            y2="448"
            style="fill:none;stroke:#61666d;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
          />
        </svg>
        <span>课件</span>
      </div>
      <div
        class="component"
        @click="show = 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Hammer</title>
          <path
            d="M277.42 247a24.68 24.68 0 00-4.08-5.47L255 223.44a21.63 21.63 0 00-6.56-4.57 20.93 20.93 0 00-23.28 4.27c-6.36 6.26-18 17.68-39 38.43C146 301.3 71.43 367.89 37.71 396.29a16 16 0 00-1.09 23.54l39 39.43a16.13 16.13 0 0023.67-.89c29.24-34.37 96.3-109 136-148.23 20.39-20.06 31.82-31.58 38.29-37.94a21.76 21.76 0 003.84-25.2zM478.43 201l-34.31-34a5.44 5.44 0 00-4-1.59 5.59 5.59 0 00-4 1.59h0a11.41 11.41 0 01-9.55 3.27c-4.48-.49-9.25-1.88-12.33-4.86-7-6.86 1.09-20.36-5.07-29a242.88 242.88 0 00-23.08-26.72c-7.06-7-34.81-33.47-81.55-52.53a123.79 123.79 0 00-47-9.24c-26.35 0-46.61 11.76-54 18.51-5.88 5.32-12 13.77-12 13.77a91.29 91.29 0 0110.81-3.2 79.53 79.53 0 0123.28-1.49C241.19 76.8 259.94 84.1 270 92c16.21 13 23.18 30.39 24.27 52.83.8 16.69-15.23 37.76-30.44 54.94a7.85 7.85 0 00.4 10.83l21.24 21.23a8 8 0 0011.14.1c13.93-13.51 31.09-28.47 40.82-34.46s17.58-7.68 21.35-8.09a35.71 35.71 0 0121.3 4.62 13.65 13.65 0 013.08 2.38c6.46 6.56 6.07 17.28-.5 23.74l-2 1.89a5.5 5.5 0 000 7.84l34.31 34a5.5 5.5 0 004 1.58 5.65 5.65 0 004-1.58L478.43 209a5.82 5.82 0 000-8z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
        </svg>
        <span>工具</span>
      </div>
      <div
        class="component"
        @click="show = 2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Settings</title>
          <path
            d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
        </svg>
        <span>设置</span>
      </div>

    </div>
    <div class="main-area">
      <div class="top-menu">
        <h3>Teaching Toolkit</h3>
        <div @click="win('fix')">
          <svg
            v-show="fix"
            style="width: 23px;height: 23px;transform: rotate(45deg);margin: 4px 3px;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M861.5 674.6c0 10.5-3.8 19.7-11.5 27.3-7.7 7.7-16.8 11.5-27.3 11.5H562.4l-31 293.2c-0.8 4.8-2.9 9.1-6.4 12.4-3.4 3.4-7.6 5-12.4 5h-0.6c-11 0-17.4-5.4-19.4-16.3l-46.1-294.4H201.2c-10.5 0-19.7-3.8-27.3-11.5-7.7-7.7-11.5-16.8-11.5-27.3 0-49.7 15.8-94.5 47.6-134.4 0.3-0.4 0.6-0.8 1-1.2 68.9-85 106.7-191 106.7-300.5v-2.3c0-31.9-16.2-61.4-42.5-79.5-4.2-2.9-8.2-6.3-12.1-10.1C247.8 131.3 240 113 240 92c0-21.1 7.7-39.1 23.1-54.7 15.3-15.3 33.6-23.1 54.6-23.1h388.4c21.1 0 39.1 7.7 54.7 23.1 15.3 15.4 23.1 33.6 23.1 54.7s-7.7 39.1-23.1 54.7c-3.9 3.9-8 7.3-12.2 10.3-26.3 18-42.4 47.5-42.4 79.4v2.1c0 109.2 37.3 215.1 106.2 299.8 0.5 0.6 1 1.2 1.5 1.9 31.7 39.8 47.6 84.6 47.6 134.4z"
              p-id="13217"
              fill="#37455E"
            ></path>
          </svg>
          <svg
            v-show="!fix"
            style="width: 23px;height: 23px;transform: rotate(45deg);margin: 4px 3px;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M706.081047 78.192364c2.699736 0 4.899522 0 9.399082 4.39957 3.999609 4.0996 4.39957 6.399375 4.39957 9.399083 0 3.099697-0.299971 5.299482-4.49956 9.599062-0.999902 1.099893-1.999805 1.899814-2.999707 2.499756-43.995704 30.197051-70.193145 79.592227-70.193146 132.187091v2.099795c0 123.787911 42.795821 244.576116 120.488234 340.166781 0.399961 0.499951 0.699932 0.899912 1.099893 1.399863 17.09833 21.497901 27.597305 44.395664 31.696904 69.393223h-566.944634c4.0996-24.997559 14.598574-47.895323 31.596914-69.293233 0.19998-0.299971 0.399961-0.599941 0.699932-0.799922 77.992384-96.290597 120.988185-217.278781 120.988185-340.766722v-2.299775c0-52.594864-26.297432-101.99004-70.293136-132.187091-0.999902-0.699932-2.099795-1.599844-3.199687-2.699737-3.999609-3.999609-4.29958-6.299385-4.29958-9.299091 0-3.099697 0.299971-5.299482 4.39957-9.499073 3.999609-3.999609 6.299385-4.29958 9.299092-4.29958h388.362074m0-63.993751H317.718973c-21.09794 0-39.396153 7.799238-54.694659 23.097745-15.298506 15.498486-22.997754 33.596719-22.997754 54.694659s7.799238 39.396153 23.097744 54.694658c3.899619 3.799629 7.899229 7.199297 12.098819 10.099014 26.297432 18.098233 42.49585 47.495362 42.49585 79.492237v2.299775C317.718973 347.966019 279.922664 453.955668 211.029392 538.947368c-0.299971 0.399961-0.599941 0.799922-0.999903 1.199883-31.796895 39.896104-47.595352 84.691729-47.595352 134.386877 0 10.498975 3.799629 19.598086 11.498877 27.297334 7.599258 7.699248 16.79836 11.498877 27.297335 11.498877h245.076066l46.095499 294.371253c1.999805 10.898936 8.49917 16.298408 19.398106 16.298408h0.599941c4.799531 0 8.999121-1.599844 12.398789-4.999512 3.499658-3.299678 5.699443-7.599258 6.399375-12.398789l31.096963-293.17137h260.374573c10.498975 0 19.598086-3.799629 27.297334-11.498877 7.699248-7.599258 11.498877-16.79836 11.498877-27.297334 0-49.895127-15.898447-94.690753-47.695342-134.586857-0.499951-0.599941-0.999902-1.299873-1.499853-1.899814-68.893272-84.691729-106.18963-190.681379-106.18963-299.770726v-2.099795c0-31.896885 16.098428-61.394004 42.39586-79.392247 4.29958-2.899717 8.29919-6.299385 12.198808-10.298994 15.398496-15.498486 23.097744-33.596719 23.097745-54.694659s-7.799238-39.296162-23.097745-54.694658c-15.398496-15.298506-33.496729-22.997754-54.594668-22.997755z"
              p-id="13450"
              fill="#37455E"
            ></path>
          </svg>
        </div>
        <div @click="win('min')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M400 256H112"
            />
          </svg>
        </div>
        <div @click="win('max')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <rect
              x="125"
              y="125"
              width="280"
              height="280"
              rx="24"
              ry="24"
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="32"
            />
          </svg>
        </div>
        <div @click="win('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M368 368L144 144M368 144L144 368"
            />
          </svg>
        </div>
      </div>
      <!-- Components -->
      <changeMode v-if="show == 0 "></changeMode>
      <toolKit v-show="show == 1"></toolKit>
      <changeOptions v-if="show == 2"></changeOptions>
    </div>
  </div>
</template>

<script>
import changeMode from './components/TMF/changeMode.vue'
import toolKit from './components/toolKit.vue'
import changeOptions from './components/changeOptions.vue'
const { ipcRenderer } = window.require('electron');
export default {
  name: 'App',
  components: {
    changeMode,
    toolKit,
    changeOptions
  },
  data () {
    return {
      show: 0,
      fix: false
    }
  },
  methods: {
    win (type) {
      ipcRenderer.send(`window-${type}`, '');
      if (type == 'fix') {
        this.fix = !this.fix
        ipcRenderer.send(`window-${type}`, this.fix);
      }
    },
  }
}
</script>

<style>
:root {
  --components-menu: #f4f5f5;
  --component-hover: #e3e6e6;
  --top-menu-bottomLine: #f4f5f5;
}

/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  bottom: 0.3em;
  background-color: white;
  transition: 0.3s cubic-bezier(0, 2.18, 0.64, 0.69);
}

input {
  outline: none;
  border-radius: 5px;
  border: 2px solid #cdd3dc;
  margin: 6.5px 10px;
  height: 22px;
  width: 80%;
  color: #8b8b8b;
}
input:checked + .slider {
  background-color: #3bd826;
}

input:focus + .slider {
  box-shadow: 0 0 1px #3bd826;
}

input:checked + .slider:before {
  transform: translateX(1.5em);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-thumb {
  transition: 1s;
  background: #9c9d9e;
  border-radius: 5px;
}

#frame {
  -webkit-user-select: none;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 65px auto;
  border-radius: 5px;
}

.main-area {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-rows: 50px;
  overflow: hidden;
}
.icon {
  position: absolute;
  -webkit-user-drag: none;
  margin: 9px;
  width: 45px;
  height: 45px;
}
.components-menu {
  width: 100%;
  height: 100%;
  background: var(--components-menu);
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
.component {
  color: #61666d;
  text-align: center;
  font-size: 0.75rem;
  margin: 20px auto;
  width: 85%;
  height: 60px;
  display: grid;
  grid-template-rows: 40px 20px;
  grid-template-columns: auto;
  border-radius: 10px;
  transition: 0.2s;
}
.component:hover {
  background: var(--component-hover);
}
.component > svg {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 30px;
}
.top-menu {
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 50px 50px 50px 50px;
  grid-template-rows: 100%;
  border-bottom: 2px solid var(--top-menu-bottomLine);
  -webkit-app-region: drag;
  color: #37455e;
}
.top-menu > div {
  margin: 10px auto;
  -webkit-app-region: none;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  transition: 0.2s;
  border-radius: 5px;
}
.top-menu > div:hover {
  background: #ebeced;
}
.top-menu > h3 {
  margin: 15px 20px;
}
</style>
