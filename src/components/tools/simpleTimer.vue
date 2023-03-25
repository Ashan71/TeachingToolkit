<template>
  <div id="simpleTimer">
    <!-- 显示 -->
    <div class="simpleTimerProgress">
      <vue-ellipse-progress
        :progress="percent"
        :size="340"
        color="#758bfd"
        emptyColor="#DFE2F0"
        :thickness="10"
        :emptyThickness="10"
      >
        <div
          class="simpleTimerFlexBox"
          v-show="!timing"
        >
          <div
            class="simpleTimerSetTime"
            style="border-top-left-radius: 10px;"
            @click="setTime(2, 'add')"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 328l144-144 144 144"
              />
            </svg></div>
          <div
            class="simpleTimerSetTime"
            style="border: 1px solid #D4DAE0;border-top: none;border-bottom: none;"
            @click="setTime(1, 'add')"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 328l144-144 144 144"
              />
            </svg></div>
          <div
            class="simpleTimerSetTime"
            style="border-top-right-radius: 10px;"
            @click="setTime(0, 'add')"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 328l144-144 144 144"
              />
            </svg></div>
        </div>
        <h1
          style="margin: 0;transition: 0.2s;"
          :style="{fontSize: timing ? '3.3rem' : '2.9rem'}"
        >{{ timer.h }}:{{ timer.m }}:{{ timer.s }}</h1>
        <div
          class="simpleTimerFlexBox"
          v-show="!timing"
        >
          <div
            class="simpleTimerSetTime"
            style="border-bottom-left-radius: 10px;"
            @click="setTime(2, 'subtract')"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 184l144 144 144-144"
              />
            </svg></div>
          <div
            class="simpleTimerSetTime"
            style="border: 1px solid #D4DAE0;border-top: none;border-bottom: none;"
            @click="setTime(1, 'subtract')"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 184l144 144 144-144"
              />
            </svg></div>
          <div
            class="simpleTimerSetTime"
            style="border-bottom-right-radius: 10px;"
            @click="setTime(0, 'subtract')"
          ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 184l144 144 144-144"
              />
            </svg></div>
        </div>
      </vue-ellipse-progress>
    </div>
    <!-- 快捷键 -->
    <div
      class="simpleTimerFlexBox"
      :style="{pointerEvents: timing ? 'none' : ''}"
    >
      <div
        class="simpleTimerShortcutKeys"
        @click="timer={
            h: '00',
            m:'02',
            s:'00'
        }"
      >2分钟</div>
      <div
        class="simpleTimerShortcutKeys"
        @click="timer={
            h: '00',
            m:'05',
            s:'00'
        }"
      >5分钟</div>
      <div
        class="simpleTimerShortcutKeys"
        @click="timer={
            h: '00',
            m:'10',
            s:'00'
        }"
      >10分钟</div>
    </div>
    <!-- 控制 -->
    <div class="simpleTimerFlexBox">
      <div
        class="simpleTimerControl"
        @click="timing ? timerControl(false) : timerControl(true)"
      >
        <!-- 图标-播放 -->
        <svg
          v-show="!timing"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z" />
        </svg>
        <!-- 图标-暂停 -->
        <svg
          v-show="timing"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M176 96h16v320h-16zM320 96h16v320h-16z"
          />
        </svg>
      </div>
      <div
        class="simpleTimerControl"
        @click="clearTimer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 00-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 00140-66.92"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M32 256l44-44 46 44M480 256l-44 44-46-44"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEllipseProgress } from "vue-ellipse-progress";
import utils from '../../utils'
import path from 'path'
export default {
  name: 'simpleTimer',
  components: {
    VueEllipseProgress
  },
  data () {
    return {
      timer: {
        h: '00',
        m: '00',
        s: '00'
      },
      percent: 0,
      timing: false
    }
  },
  methods: {
    // 调节时间
    setTime (type, operate, strict) {
      let typeList = ['s', 'm', 'h']
      //   数字
      let target = Number(this.timer[typeList[type]])
      // 加
      if (operate == 'add') {
        if (target < 59) {
          target++
        } else {
          // 若大于59向前进一
          target = 0
          if (type < 2 && strict) {
            this.setTime(type + 1, 'add', true)
          }
        }
      }
      // 减
      if (operate == 'subtract') {
        if (target > 0) {
          target--
        } else {
          // 若大于59向前借一
          target = 59
          if (type < 2 && strict) {
            this.setTime(type + 1, 'subtract', true)
          }
        }
      }
      target = target.toString()
      // 个位补零
      this.timer[typeList[type]] = target[1] ? target : `0${target}`
    },
    // 开始以及暂停
    timerControl (operate) {
      // 计算百分比
      let getPercent = (num, total) => {
        if (num == 0 || total == 0) {
          return 0
        }
        return Math.round((num / total) * 10000) / 100.0
      }
      //   获取时间
      let time = {
        h: Number(this.timer.h),
        m: Number(this.timer.m),
        s: Number(this.timer.s)
      }
      //   时间是否为空
      if (time.h != 0 || time.m != 0 || time.s != 0) {
        // 暂停和开始
        this.timing = operate
        // 计算百分比(进度条)
        let total = time.h * 3600 + time.m * 60 + time.s
        let progress = time.h * 3600 + time.m * 60 + time.s
        this.percent == 0 ? this.percent = 100 : this.percent == 0

        // 启动
        let startTimer = setInterval(() => {
          if (this.timing) {
            // 设置时间
            if (this.timer.h == 0 && this.timer.m == 0 && this.timer.s == 0) {

              clearInterval(startTimer)
              let ring = new Audio()
              ring.src = path.join(utils.__Static, './Ring.wav')
              ring.play()
              new Notification('时钟', {
                body: '时间到了!',
                // 为什么false后还是会有通知音效???????
                silent: false,
                icon: path.join(utils.__Static, './favicon.ico'),
              })
              this.timing = false
            } else {
              // 进度(秒)
              progress--
              // 设置进度条
              this.percent = getPercent(progress, total)
              this.setTime(0, 'subtract', true)
            }
          } else {
            clearInterval(startTimer)
          }
        }, 1000);
      }
    },
    clearTimer () {
      this.timer = {
        h: '00',
        m: '00',
        s: '00'
      }
      this.percent = 0
      this.timing = false
    }
  }
}
</script>

<style>
#simpleTimer {
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  background: #f1f7fb;
  border: 1px solid #d6e4ee;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 360px 65px 60px;
}
.simpleTimerProgress {
  width: 340px;
  height: 340px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #37405f;
  letter-spacing: 4px;
}
.simpleTimerFlexBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}
.simpleTimerSetTime {
  width: 80px;
  height: 30px;
  background: #e0e5e9;
}
.simpleTimerSetTime > svg {
  width: 60px;
  height: 30px;
}
.simpleTimerSetTime :active {
  transform: scale(0.9);
}
.simpleTimerShortcutKeys {
  margin: 10px 20px;
  width: 180px;
  height: 30px;
  background: #e0e5e9;
  border-radius: 10px;
  border: 2px solid transparent;
  text-align: center;
  color: #37405f;
  line-height: 30px;
  transition: 0.2s;
}
.simpleTimerShortcutKeys:active {
  border: 2px solid #758bfd;
}

.simpleTimerControl {
  margin: 5px 20px;
  width: 50px;
  height: 50px;
  background: #e0e5e9;
  border-radius: 5px;
  transition: 0.2s;
}
.simpleTimerControl:active {
  transform: scale(0.9);
}
.simpleTimerControl > svg {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  fill: #37405f;
  stroke: #37405f;
  color: #37405f;
}
</style>