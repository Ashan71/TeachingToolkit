<template>
  <div id="rollCall">
    <!-- 菜单Option -->
    <div
      class="rollCallOption"
      :style="{pointerEvents: start ? 'none' : ''}"
    >
      <!-- 编辑 -->
      <div @click="dataManager('edit')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z"
          />
        </svg>
      </div>
      <!-- 选择 -->
      <select v-model="select">
        <option
          v-for="(item, index) in optionList"
          :key="index"
          :value="item"
        >{{ item.substring(0, item.lastIndexOf(".")) }}</option>
      </select>
      <!-- 删除 -->
      <div @click="dataManager('remove')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z"
            fill="none"
          />
          <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" />
        </svg>
      </div>
      <!-- 刷新 -->
      <div @click="init">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <path
            d="M320 146s24.36-12-64-12a160 160 0 10160 160"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M256 58l80 80-80 80"
          />
        </svg>
      </div>
    </div>
    <!-- 主区域Option -->
    <div
      class="rollCallMainOption"
      :style="{pointerEvents: start ? 'none' : ''}"
    >
      <span>随机挑选</span>
      <label class="switch">
        <input
          type="checkbox"
          v-model="faster"
        >
        <span class="slider"></span>
      </label>
    </div>
    <!-- 菜单 -->
    <div
      class="rollCallList"
      :style="{pointerEvents: start ? 'none' : ''}"
    >
      <!-- 列表为空时 -->
      <div
        class="rollCallListEmpty"
        v-show="dataList.length == 0"
      >
        <img src="../../assets/emptyList.png">
        <span>没有内容</span>
      </div>
      <div
        class="rollCallListItem"
        v-for="(item, index) in dataList"
        :key="index"
        :style="{background: index%2 === 0 ? '#F8F8F8' : '#E8E9EA'}"
      >
        {{ item.length >10 ? `${item.slice(0, 10)}...` : item }}
      </div>
    </div>
    <!-- 主区域 -->
    <div class="rollCallMain">
      <div class="rollCallMainShow">{{show.text}}</div>
      <div
        class="rollCallMainButton"
        v-show="!faster"
        @click="loop"
      >
        {{ start ? '停止' : '开始' }}
      </div>
      <div
        class="rollCallMainButton"
        v-show="faster"
        @click="random"
      >
        获取
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../utils'
import fs from 'fs'
import path from 'path'
import { shell } from '@electron/remote'
import xlsx from 'node-xlsx'
export default {
  name: 'rollCall',
  data () {
    return {
      select: 0,
      start: false,
      show: {
        text: '无数据',
        index: 0
      },
      faster: false,
      createName: '',
      optionList: [],
      dataList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 初始化
      this.dataList = []
      this.optionList = []
      this.select = 0
      //   检查路径
      utils.checkPath(utils.__Root, () => {
        utils.checkPath(utils.__rollCallData, () => {
          // 读取目录
          let getRollCallData = fs.readdirSync(utils.__rollCallData)
          //   列表
          let list = []
          if (getRollCallData.length > 0) {
            for (let i = 0; i < getRollCallData.length; i++) {
              let type = path.extname(getRollCallData[i])
              if (type == '.xlsx' || type == '.xls') {
                list.push(getRollCallData[i])
              } else {
                fs.unlinkSync(path.join(utils.__rollCallData, getRollCallData[i]))
              }
            }
            this.optionList = list
            this.select = this.optionList[0]
            this.getData(this.optionList[0])
          }
        })
      })
    },
    getData (name) {
      if (name != '') {
        utils.checkPath(utils.__Root, () => {
          utils.checkPath(utils.__rollCallData, () => {
            // 检查文件是否存在
            let dataPath = path.join(utils.__rollCallData, name)
            if (fs.existsSync(dataPath)) {
              // 检查数据是否可用
              let getData = fs.readFileSync(dataPath)
              let parseData = xlsx.parse(getData)[0].data
              //   整理
              let list = []
              for (let i = 0; i < parseData.length; i++) {
                list.push(parseData[i][0])
              }
              this.dataList = list
              console.log(list);
            } else {
              utils.Toast(`${name}不存在`)
              this.init()
            }
          })
        })
      }
    },
    dataManager (type) {
      //   是否选中
      if (this.optionList[0]) {
        // 路径
        utils.checkPath(utils.__Root, () => {
          utils.checkPath(utils.__rollCallData, () => {
            let filePath = path.join(utils.__rollCallData, this.optionList[0])
            // 检查路径
            if (fs.existsSync(filePath)) {
              // 类型
              switch (type) {
                case 'edit':
                  shell.openPath(filePath)
                  break
                case 'remove':
                  fs.unlink(filePath, (err) => {
                    if (err) {
                      utils.Toast('删除失败')
                    }
                    this.init()
                  })
                  break
              }
            } else {
              utils.Toast('文件不存在')
              this.init()
            }
          })
        })
      } else {
        utils.Toast('没有数据')
      }
    },
    // 两种模式
    loop () {
      if (this.optionList.length > 0 && this.dataList.length > 0) {
        this.start = !this.start
        let i = this.show.index;
        let starting = setInterval(() => {
          if (!this.start) {
            clearInterval(starting)
          } else {
            if (i == this.dataList.length) {
              i = 0
            }
            this.show = {
              text: this.dataList[i],
              index: i
            }
            i++
          }
        }, 50);
      } else {
        utils.Toast('没有可用数据!')
      }

    },
    random () {
      if (this.optionList.length > 0 && this.dataList.length > 0) {
        let index = Math.floor(Math.random() * this.dataList.length)
        // 避免重复
        if (this.dataList[index] != this.show.text) {
          this.show = {
            text: this.dataList[index],
            index: index
          }
        } else {
          this.random()
        }

      } else {
        utils.Toast('没有可用数据!')
      }
    }
  },
  watch: {
    select: {
      immediate: true,
      handler (name) {
        this.getData(name)
      }
    }
  }
}
</script>
<style>
#rollCall {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 40px auto;
  overflow: hidden;
}
.rollCallOption {
  width: 100%;
  height: 40px;
  background: #e1e1e1;
  display: grid;
  grid-template-columns: 30px 1fr 30px 30px;
  grid-template-rows: 100%;
}
.rollCallOption > div {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  color: #37405f;
  fill: #37405f;
}
.rollCallOption > h3 {
  margin: 7px auto;
  text-align: center;
  color: #37405f;
}
.rollCallOption > select {
  margin: 5px 5px;
  width: 160px;
  height: 30px;
  background: transparent;
  color: #37405f;
  font-size: 1.1rem;
  border: 2px solid #37405f;
  border-radius: 5px;
  outline: none;
}
.rollCallList {
  width: 260px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
  border-right: 2px solid #e1e1e1;
  overflow: scroll;
}
.rollCallListEmpty {
  pointer-events: none;
  width: 150px;
  height: 150px;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 130px 20px;
  text-align: center;
  opacity: 0.3;
}
.rollCallListEmpty > img {
  width: 100%;
  height: 100%;
}
.rollCallListEditor {
  width: 100%;
  height: 30px;
  background: #e1e1e1;
  display: grid;
  grid-template-columns: 30px 30px auto;
  grid-template-rows: 100%;
}
.rollCallListEditor > div > svg {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #37405f;
  width: 22px;
  height: 22px;
}
.rollCallListEditor > input {
  margin: 0 10px;
  color: #37405f;
}
.rollCallListItem {
  width: 100%;
  height: 30px;
  text-align: center;
  color: #37405f;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  line-height: 30px;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 100%;
}
.rollCallListItem > div {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  fill: #37405f;
}
.rollCallMain {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 60% 100px;
}
.rollCallMainOption {
  background: #e1e1e1;
  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: 100%;
  text-align: center;
  color: #37405f;
  font-size: 1.1rem;
  line-height: 40px;
}
.rollCallMainOption > label {
  margin: 8.5px 0;
  font-size: 0.75rem;
  height: 25px;
}
.rollCallMainShow {
  width: auto;
  height: 100px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: #37405f;
  text-align: center;
}
.rollCallMainButton {
  width: 120px;
  height: 60px;
  margin: 0 auto;
  text-align: center;
  line-height: 60px;
  color: #37405f;
  font-size: 1.8rem;
  border-radius: 7px;
  background: #e1e1e1;
}
.rollCallMainButton:active {
  transform: scale(0.95);
}
</style>