<template>
  <div id="changeOptions">
    <h1>设置</h1>
    <!-- start-文件管理 -->
    <!-- #region -->
    <h2>文件管理</h2>
    <div
      class="changeOptionsTips"
      style="border-left: 5px solid #FE6666;"
    >
      <p>因没有服务器，所以暂时没有
        <span style="color: #42B983;">云盘课件托管</span>
        功能</p>
    </div>
    <!-- <div class="changeOptionsTips">
      <p>Token用于上传本地课件至云盘，可以忽略，不影响</p>
      <p>从云盘下载课件至本地</p>
    </div> -->
    <h4>Token:</h4>
    <div class="changeOptionsInputBox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon"
        viewBox="0 0 512 512"
      >
        <path
          d="M218.1 167.17c0 13 0 25.6 4.1 37.4-43.1 50.6-156.9 184.3-167.5 194.5a20.17 20.17 0 00-6.7 15c0 8.5 5.2 16.7 9.6 21.3 6.6 6.9 34.8 33 40 28 15.4-15 18.5-19 24.8-25.2 9.5-9.3-1-28.3 2.3-36s6.8-9.2 12.5-10.4 15.8 2.9 23.7 3c8.3.1 12.8-3.4 19-9.2 5-4.6 8.6-8.9 8.7-15.6.2-9-12.8-20.9-3.1-30.4s23.7 6.2 34 5 22.8-15.5 24.1-21.6-11.7-21.8-9.7-30.7c.7-3 6.8-10 11.4-11s25 6.9 29.6 5.9c5.6-1.2 12.1-7.1 17.4-10.4 15.5 6.7 29.6 9.4 47.7 9.4 68.5 0 124-53.4 124-119.2S408.5 48 340 48s-121.9 53.37-121.9 119.17zM400 144a32 32 0 11-32-32 32 32 0 0132 32z"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="32"
        />
      </svg>
      <input
        type="text"
        v-model="token"
      >
    </div>
    <div
      class="changeOptionsButton"
      @click="openPath('TMF')"
    >
      打开本地目录
    </div>
    <!-- #endregion -->
    <!-- end-文件管理 -->

    <!-- start-点名器 -->
    <!-- #region -->
    <h2>点名器</h2>
    <div class="changeOptionsTips">
      <p>名单需要
        <span style="color: #42B983;">xlsx</span>
        或
        <span style="color: #42B983;">xls</span>
        格式文件
      </p>
      <p>将文件拖入
        <span style="color: #42B983;">rollCallData</span>
        目录即可
      </p>
    </div>
    <div
      class="changeOptionsButton"
      @click="openPath('rollCallData')"
    >
      打开 rollCallData 目录
    </div>
    <!-- #endregion -->
    <!-- end-点名器 -->

    <!-- start-文件传输 -->
    <!-- #region -->
    <h2>文件传输</h2>
    <div class="changeOptionsTips">
      <p>端口需要 1024 ~ 65535 之间的<span style="color: #42B983;">整数</span></p>
    </div>
    <h4>端口:</h4>
    <div class="changeOptionsInputBox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style=""
      >
        <path
          d="M332.41 310.59a115 115 0 00-152.8 0M393.46 249.54a201.26 201.26 0 00-274.92 0M447.72 182.11a288 288 0 00-383.44 0"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <path d="M256 416a32 32 0 1132-32 32 32 0 01-32 32z" />
      </svg>
      <input
        type="number"
        oninput="
        if (value < 0) {
          value = 0
        } else if (value > 65535) {
          value = 65535
        } 
        "
        v-model="port"
      >
    </div>
    <!-- #endregion -->
    <!-- end-文件传输 -->

    <div class="changeOptionsButtonBox">
      <div
        class="changeOptionsButton"
        @click="save('new')"
      >
        保存设置
      </div>
      <div
        class="changeOptionsButton"
        @click="save('default')"
      >
        恢复默认
      </div>
      <!-- <div
        class="changeOptionsButton"
        @click="checkVersion"
      >
        检查更新
      </div> -->
      <div
        class="changeOptionsButton"
        @click="aboutUs"
      >
        关于我们
      </div>
    </div>
  </div>
</template>

<script>
import { shell } from '@electron/remote'
import fs from 'fs'
import path from 'path'
import utils, { __Options, __optionsBase, __Root } from '../utils'
export default {
  name: 'changeOptions',
  data () {
    return {
      port: 3000,
      token: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      utils.checkPath(__Root, () => {
        if (!fs.existsSync(__Options)) {
          fs.writeFileSync(__Options, __optionsBase)
        }
        let data = JSON.parse(fs.readFileSync(utils.__Options))
        this.token = data.token
        this.port = data.port
      })
    },
    save (type) {
      let newOptions
      if (type == 'new') {
        newOptions = JSON.stringify({
          token: this.token,
          port: this.port
        })
      } else {
        newOptions = utils.__optionsBase
      }
      utils.checkPath(utils.__Root, () => {
        fs.writeFile(utils.__Options, newOptions, (err) => {
          if (!err) {
            utils.Toast('保存成功')
            this.init()
          }
        })
      })
    },
    openPath (value) {
      switch (value) {
        case 'TMF':
          value = utils.__TMF
          break
        case 'rollCallData':
          value = utils.__rollCallData
          break
      }
      utils.checkPath(value, () => {
        shell.openPath(value)
      })
    },
    // checkVersion () {
    //   new Notification('检查更新', {
    //     body: '当前未开放',
    //     icon: path.join(utils.__Static, './favicon.ico'),
    //   })
    // },
    aboutUs () {
      shell.openExternal(path.join(utils.__Static, './aboutus/index.html'))
    }
  }
}
</script>

<style>
#changeOptions {
  margin: 10px auto;
  width: 85%;
  height: auto;
  padding: 30px 60px;
  color: #37455e;
  overflow: scroll;
}
#changeOptions > h1 {
  margin: 0;
  margin-bottom: 30px;
}
#changeOptions > h2 {
  margin-top: 30px;
  width: 70%;
  max-width: 900px;
  padding-bottom: 20px;
  border-bottom: 1px solid;
}
#changeOptions > h4 {
  margin: 0;
}
#changeOptions > svg {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
}
.changeOptionsTips {
  margin-bottom: 20px;
  min-height: 30px;
  width: fit-content;
  padding: 2px 15px;
  padding-right: 60px;
  background: #f8f8f8;
  border-left: 5px solid #ffa500;
}
.changeOptionsButton {
  padding: 0 5px;
  height: 30px;
  width: fit-content;
  border: 1px solid #e3e5e7;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  color: #757678;
  line-height: 30px;
  transition: 0.2s;
}
.changeOptionsButton:hover {
  background: #e3e5e7;
}
.changeOptionsButtonBox {
  margin: 30px 0;
  width: fit-content;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  align-content: flex-start;
  gap: 10px;
}
.changeOptionsInputBox {
  margin: 10px 0;
  position: relative;
  left: -5px;
  height: 35px;
  max-width: 300px;
  display: grid;
  grid-template-columns: 35px auto;
  grid-template-rows: 35px;
}
.changeOptionsInputBox > svg {
  width: 30px;
  height: 30px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.changeOptionsInputBox > input {
  margin: 5px;
  border-radius: 2px;
}
</style>