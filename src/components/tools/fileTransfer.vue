<template>
  <div id="fileTransfer">
    <!-- Img -->
    <div class="fileTransferImg">
      <img src="../../assets/phone.png">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
        </svg>
        <span :style="{color: status ? '#59823d' : '#E45A5A'}">{{ status ? `端口: ${port}`:'服务器已关闭' }}</span>
      </div>
      <img
        style="width:80px"
        src="../../assets/computer.png"
      >
    </div>
    <span>请在手机浏览器开启下面网址</span>
    <div
      class="fileTransferUrl"
      :style="{background: status ? '#9676ee' : '#E04949'}"
    >
      <div
        :style="{pointerEvents:status ? '' : 'none'}"
        @click="copyUrl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z" />
          <path d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z" />
        </svg>
      </div>
      <span>{{ status ? `${url}:${port}` : '服务器未开启' }}</span>
      <div
        :style="{pointerEvents:status ? '' : 'none'}"
        @click="showQRcode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <rect
            x="336"
            y="336"
            width="80"
            height="80"
            rx="8"
            ry="8"
          />
          <rect
            x="272"
            y="272"
            width="64"
            height="64"
            rx="8"
            ry="8"
          />
          <rect
            x="416"
            y="416"
            width="64"
            height="64"
            rx="8"
            ry="8"
          />
          <rect
            x="432"
            y="272"
            width="48"
            height="48"
            rx="8"
            ry="8"
          />
          <rect
            x="272"
            y="432"
            width="48"
            height="48"
            rx="8"
            ry="8"
          />
          <rect
            x="336"
            y="96"
            width="80"
            height="80"
            rx="8"
            ry="8"
          />
          <rect
            x="288"
            y="48"
            width="176"
            height="176"
            rx="16"
            ry="16"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <rect
            x="96"
            y="96"
            width="80"
            height="80"
            rx="8"
            ry="8"
          />
          <rect
            x="48"
            y="48"
            width="176"
            height="176"
            rx="16"
            ry="16"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <rect
            x="96"
            y="336"
            width="80"
            height="80"
            rx="8"
            ry="8"
          />
          <rect
            x="48"
            y="288"
            width="176"
            height="176"
            rx="16"
            ry="16"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
        </svg>
      </div>
    </div>
    <span style="font-size: 0.9rem;">请确保手机与电脑处于同一局域网</span>
    <label
      class="switch"
      style="  margin: 5px 100px;"
    >
      <input
        type="checkbox"
        v-model="status"
      >
      <span class="slider"></span>
    </label>
  </div>
</template>
<script>
import express from 'express'
import cors from 'cors'
import utils from '../../utils'
import fs from 'fs'
import { ipcRenderer, shell, clipboard } from 'electron'
import path from 'path'
import qrcode from 'qrcode'
import { BrowserWindow, Menu, app } from '@electron/remote'
export default {
  name: 'fileTransfer',
  data () {
    return {
      status: false,
      port: '0000',
      url: 'http://localhost'
    }
  },
  methods: {
    serverSwitch () {
      //   Mobile路径
      let mobilePath = path.join(utils.__Root, './Mobile')
      //   index.html内容
      let mobileSourcePath = path.join(utils.__Static, './mobile.html')
      let mobileSource = fs.readFileSync(mobileSourcePath)
      utils.checkPath(utils.__Root, () => {
        utils.checkPath(mobilePath, () => {
          // 写出index.html
          fs.writeFile(path.join(mobilePath, './index.html'), mobileSource, (err) => {
            if (!err) {
              // 处理端口
              let processPort = () => {
                // 用于更新无效的端口,不用管它
                let fixPort = (wrong) => {
                  utils.Toast(wrong)
                  fs.readFile(utils.__Options, (err, data) => {
                    if (err) {
                      fs.writeFileSync(utils.__Options, utils.__optionsBase)
                    } else {
                      if (utils.isJsonString(data)) {
                        let getOptions = JSON.parse(data)
                        getOptions.port = 3000
                        fs.writeFileSync(utils.__Options, JSON.stringify(getOptions))
                      } else {
                        fs.writeFileSync(utils.__Options, utils.__optionsBase)
                      }
                    }
                  })

                }
                // options是否存在
                if (fs.existsSync(utils.__Options)) {
                  let getOptions = fs.readFileSync(utils.__Options)
                  let optionPort
                  if (utils.isJsonString(getOptions)) {
                    optionPort = JSON.parse(getOptions).port
                  } else {
                    fixPort('无效的Options, 已恢复默认')
                    return 3000
                  }
                  //   检查是否可用
                  // 处理小数
                  if (String(optionPort).indexOf('')) {
                    optionPort = Math.round(optionPort)
                  }
                  // 范围
                  if (optionPort > 1023 && optionPort < 49152) {
                    return optionPort
                  } else {
                    fixPort('无效的port, 已自动分配')
                    return 3000
                  }
                } else {
                  fixPort('无法获取Options, 已自动分配')
                  return 3000
                }
              }
              // 设置app
              let app = express()
              app.use(cors())
              app.use(express.static(mobilePath, { index: 'index.html' }))
              // 开启服务器
              let Server = app.listen(processPort(), 'localhost', () => {
                utils.Toast('服务器已开启')
                this.port = Server.address().port
                this.url = `http://${Server.address().address}`
              }).on('error', (err) => {
                // 处理报错
                console.log(err);
                this.status = false
                utils.Toast('端口被占用, 请修改端口')
                shell.openPath(utils.__Options)
              })
              // 关闭服务器
              ipcRenderer.on('closeServer', () => {
                Server.close()
              })
            } else {
              utils.Toast('服务器启动失败')
              this.status = false
            }
          })
        })
      })
    },
    copyUrl () {
      clipboard.writeText(`${this.url}:${this.port}`)
      utils.Toast('已将链接复制到剪切板')
    },
    showQRcode () {
      // 生成codeID
      let codeID = utils.randomString(10)
      let filePath = path.join(app.getPath('temp'), `${codeID}.svg`)
      //   生成svg
      qrcode.toString(`${this.url}:${this.port}`, (err, code) => {
        if (!err) {
          // 写出svg
          fs.writeFile(filePath, code, (err) => {
            if (!err) {
              // 创建子窗口
              let qrCodeShow = new BrowserWindow({
                width: 350,
                height: 350,
                maxHeight: 800,
                maxWidth: 800,
                minHeight: 350,
                minWidth: 350,
                title: `扫描二维码 ID-${codeID}`
              })
              Menu.setApplicationMenu(null)
              //   读取svg
              qrCodeShow.loadFile(filePath)
              //   关闭时删除写出的svg
              qrCodeShow.on('close', () => {
                fs.unlinkSync(filePath)
              })
            }
          })
        }
      })
    }
  },
  watch: {
    status (serverStatus) {
      if (serverStatus) {
        this.serverSwitch()
        ipcRenderer.send('window-new', {
          width: 200,
          height: 200
        })
      } else {
        utils.Toast('正在关闭服务器')
        ipcRenderer.send('closeServer')
      }
    }
  }
}
</script>
<style>
#fileTransfer {
  position: relative;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 650px;
  height: 400px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 200px 50px 50px 50px 50px;
  color: #686d82;
}
#fileTransfer > span {
  margin: 15px 100px;
}
.fileTransferImg {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  grid-template-rows: 100%;
}
.fileTransferImg > img {
  pointer-events: none;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
}
.fileTransferImg > div {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 120px 30px;
  grid-template-columns: 100%;
  text-align: center;
}
.fileTransferImg > div > svg {
  margin: 40px auto;
  width: 50px;
  height: 50px;
  fill: #37405f;
}
.fileTransferUrl {
  padding: 0 5px;
  position: relative;
  left: 41%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 30px;
  border-radius: 5px;
  color: #ffffff;
  line-height: 30px;
  display: grid;
  grid-template-columns: 30px 1fr 25px;
  grid-template-rows: 100%;
}
.fileTransferUrl > div {
  position: relative;
  left: 40.5%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 23px;
  height: 23px;
  fill: #ffffff;
}
</style>