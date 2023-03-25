<template>
  <div id="TMF">
    <!-- 标题 -->
    <div class="TMFBoxMenu">
      <div class="TMFControls">
        <div @click="createFolder(folderName)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            viewBox="0 0 512 512"
          >
            <line
              x1="256"
              y1="112"
              x2="256"
              y2="400"
              style="fill:none;stroke:#949BA5;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
            />
            <line
              x1="400"
              y1="256"
              x2="112"
              y2="256"
              style="fill:none;stroke:#949BA5;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
            />
          </svg>
        </div>
      </div>
      <input
        type="text"
        maxlength="20"
        placeholder="文件夹名称"
        v-model="folderName"
      >
      <div
        class="TMFFileBoxBth"
        @click="uploadFile('openFile')"
      >选择文件</div>
      <div
        class="TMFFileBoxBth"
        @click="uploadFile('multiSelections')"
      >选择多个文件</div>
      <div
        class="TMFFileBoxBth"
        @click="fileOperation(folders[select.index], 'clear')"
      >清空</div>

    </div>
    <progress
      :style="{display:progress.max != 0 ? '' : 'none' }"
      class="TMFUploadProgress"
      :value="progress.value"
      :max="progress.max"
    ></progress>

    <!-- Folder & Files -->
    <div class="TMFFolderAndFiles">
      <!-- Folders -->
      <div class="TMFFolderBox">
        <div
          class="TMFFolderBoxItem"
          v-for="(item, index) in folders"
          :key="index"
          :style="{borderColor: select.index == index ? '#3CB1F4' : '#e6e7e9'}"
          @click="selectFolder(index, item)"
        >
          <!-- folder icon -->
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
              :style="{fill: select.index == index ? '#48A1D3' : '#717b8d'}"
            >
              <path d="M496,152a56,56,0,0,0-56-56H220.11a23.89,23.89,0,0,1-13.31-4L179,73.41A55.77,55.77,0,0,0,147.89,64H72a56,56,0,0,0-56,56v48a8,8,0,0,0,8,8H488a8,8,0,0,0,8-8Z" />
              <path d="M16,392a56,56,0,0,0,56,56H440a56,56,0,0,0,56-56V216a8,8,0,0,0-8-8H24a8,8,0,0,0-8,8Z" />
            </svg>
          </div>
          <!-- name -->
          <span class="text-overflow">{{ item }}</span>
          <!-- trash icon -->
          <div @click.stop="deleteFolder(item)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <path
                d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                style="fill:none;stroke:#8b8b8b;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
              />
              <line
                x1="80"
                y1="112"
                x2="432"
                y2="112"
                style="stroke:#8b8b8b;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
              />
              <path
                d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                style="fill:none;stroke:#8b8b8b;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
              />
              <line
                x1="256"
                y1="176"
                x2="256"
                y2="400"
                style="fill:none;stroke:#8b8b8b;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
              />
              <line
                x1="184"
                y1="176"
                x2="192"
                y2="400"
                style="fill:none;stroke:#8b8b8b;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
              />
              <line
                x1="328"
                y1="176"
                x2="320"
                y2="400"
                style="fill:none;stroke:#8b8b8b;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- Files -->
      <div
        class="TMFFileBox"
        :class="{dragOn: dragOn}"
        @dragover="e=>e.preventDefault()"
        @dragenter="dragOn = true"
        @dragleave="dragOn = false"
        @drop="uploadFileDrop"
      >
        <div
          class="TMFFileEmpty"
          v-show="select.files.length === 0 ? true : false"
        >
          <img src="../../assets/empty.png">
          <p>无内容</p>
          <p>请上传文件(支持拖拽上传)</p>
        </div>
        <div
          v-for="(item, index) in select.files"
          :key="index"
          class="TMFFileBoxItem"
          :style="{background: index%2 === 0 ? '#E3E4E5' : '#f2f2f2'}"
        >
          <div v-html="fileType(item.type)"></div>
          <span @click="fileOperation(item.name, 'open')">{{ item.name }}</span>
          <div @click="fileOperation(item.name, 'delete')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="TMFFileBoxItemIcon"
              viewBox="0 0 512 512"
              style="left: 5px;"
            >
              <path
                d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z"
                fill="none"
              />
              <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '../../utils'
import fs from 'fs'
import path from 'path'
import { ipcRenderer, shell } from 'electron'
export default {
  name: 'TMF',
  data () {
    return {
      folderName: '',
      folders: [],
      select: {
        index: null,
        files: [],
      },
      progress: {
        value: 0,
        max: 0
      },
      dragOn: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 初始化
      this.folderName = ''
      this.select.index = null
      this.select.files = []
      let root = utils.__Root;
      let tmf = utils.__TMF;
      //   列出文件夹
      utils.checkPath(root, () => {
        utils.checkPath(tmf, () => {
          this.folders = fs.readdirSync(tmf)

        })
      })
    },
    // 文件夹操作
    createFolder (name) {
      // 检查根目录
      utils.checkPath(path.join(utils.__Root), () => {
        if (name && utils.invalidTextCheck(name) && !fs.existsSync(path.join(utils.__TMF, name))) {
          // 检查TMF,应该不会有人这时候删除TMF吧??
          utils.checkPath(path.join(utils.__TMF), () => {
            // 创建
            fs.mkdirSync(path.join(utils.__TMF, name))
            utils.Toast('创建成功')
            this.init()
          })

        } else {
          utils.Toast('名称不可用!')
        }
      })
    },

    deleteFolder (name) {
      // 检查文件夹是否存在
      if (fs.existsSync(path.join(utils.__TMF, name))) {
        if (this.progress.max == 0) {
          utils.Toast('正在删除...')
          let files = fs.readdirSync(path.join(utils.__TMF, name))
          // 判断文件夹是否为空
          if (files) {
            // 清空文件
            files.forEach((item) => {
              fs.unlinkSync(path.join(utils.__TMF, name, item));
            });
          }
          // 删除文件夹
          fs.rmdirSync(path.join(utils.__TMF, name))
          this.init()
        } else {
          utils.Toast('正在上传,请稍等')
        }
      } else {
        utils.Toast('文件夹不存在!')
        this.init()
      }
    },
    selectFolder (index, folder) {

      let folderPath = path.join(utils.__TMF, folder);
      // 检查路径是否存在
      if (fs.existsSync(folderPath)) {
        if (this.progress.max == 0) {
          this.select.files = []
          // 选中
          this.select.index = index
          // 读取
          let files = fs.readdirSync(folderPath);
          files.forEach((item) => {
            let result = {
              name: item,
              type: path.extname(item)
            }
            this.select.files.push(result)
          })
        } else {
          utils.Toast('正在上传,请稍等')
        }
      } else {
        utils.Toast('文件夹不存在!')
        this.init()
      }
    },
    // 文件操作
    fileOperation (name, type) {
      if (this.select.index !== null) {
        if (this.progress.max == 0) {
          let filePath = path.join(utils.__TMF, this.folders[this.select.index], name)
          switch (type) {
            case 'open':
              shell.openPath(filePath)
              break
            case 'delete':
              fs.unlink(filePath, (err) => {
                if (!err) {
                  utils.Toast('已删除')

                  this.selectFolder(this.select.index, this.folders[this.select.index])
                } else {
                  utils.Toast('删除失败')
                }
              })
              break
            case 'clear': {
              if (this.select.files.length != 0) {
                if (fs.existsSync(path.join(utils.__TMF, name))) {
                  let Files = fs.readdirSync(path.join(utils.__TMF, name))
                  Files.forEach((item) => {
                    fs.unlinkSync(path.join(utils.__TMF, name, item))
                  })
                  utils.Toast('删除完成')
                  this.init()
                } else {
                  utils.Toast('文件夹不存在!')
                  this.init()
                }
              } else {
                utils.Toast('文件夹为空!')
              }
            }
          }
        } else {
          utils.Toast('正在上传,请稍等')
        }
      } else {
        utils.Toast('请先选择文件夹!')
      }
    },
    uploadFileDrop (e) {
      // 判断是否选择文件夹
      if (this.select.index != null) {
        if (fs.existsSync(path.join(utils.__TMF, this.folders[this.select.index]))) {
          if (this.progress.max == 0) {
            e.preventDefault()
            this.dragOn = false
            let Files = e.dataTransfer.files
            //   设置进度条
            for (let i = 0; i < Files.length; i++) {
              if (fs.statSync(Files[i].path).isDirectory()) {
                continue
              }
              this.progress.max++
            }
            //   复制
            for (let i = 0; i < Files.length; i++) {
              // 跳过文件夹
              if (fs.statSync(Files[i].path).isDirectory()) {
                continue
              }
              let Read = fs.createReadStream(Files[i].path);
              let Write = fs.createWriteStream(path.join(utils.__TMF, this.folders[this.select.index], Files[i].name));
              Read.pipe(Write).on('error', (err) => {
                console.log(err);
              }).on('finish', () => {
                this.progress.value++
                if (this.progress.value == this.progress.max) {
                  utils.Toast('上传完成')
                  this.progress = {
                    value: 0,
                    max: 0
                  }
                  this.selectFolder(this.select.index, this.folders[this.select.index])
                }
              })
            }
          } else {
            utils.Toast('正在上传,请稍等')
          }
        } else {
          utils.Toast('文件夹不存在!')
          this.init()
        }
      } else {
        utils.Toast('请先选择文件夹')
      }

    },
    uploadFile (type) {
      // 判断是否选择文件夹
      if (this.select.index !== null) {
        if (fs.existsSync(path.join(utils.__TMF, this.folders[this.select.index]))) {
          if (this.progress.max == 0) {
            // 打开选择窗口
            let Data = ipcRenderer.sendSync('dialogFile', type)
            // 判断取消
            if (!Data.canceled) {
              let Files = Data.filePaths
              //   设置进度条
              for (let i = 0; i < Files.length; i++) {
                if (fs.statSync(Files[i]).isDirectory()) {
                  continue
                }
                this.progress.max++
              }
              //   复制
              for (let i = 0; i < Files.length; i++) {
                // 跳过文件夹
                if (fs.statSync(Files[i]).isDirectory()) {
                  continue
                }
                let Read = fs.createReadStream(Files[i]);
                let Write = fs.createWriteStream(path.join(utils.__TMF, this.folders[this.select.index], path.basename(Files[i])));
                Read.pipe(Write).on('error', (err) => {
                  console.log(err);
                }).on('finish', () => {
                  this.progress.value++
                  if (this.progress.value == this.progress.max) {
                    utils.Toast('上传完成')
                    this.progress = {
                      value: 0,
                      max: 0
                    }
                    this.selectFolder(this.select.index, this.folders[this.select.index])
                  }
                })
              }
            }
          } else {
            utils.Toast('正在上传,请稍等')
          }
        } else {
          utils.Toast('文件夹不存在!')
          this.init()
        }
      } else {
        utils.Toast('请先选择文件夹!')
      }
    },
    fileType (type) {
      let files = {
        video: `<svg xmlns="http://Write2000/svg" class="TMFFileBoxItemIcon" viewBox="0 0 512 512"><rect x="48" y="96" width="416" height="320" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="384" y="336" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="384" y="256" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="384" y="176" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="384" y="96" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="48" y="336" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="48" y="256" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="48" y="176" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="48" y="96" width="80" height="80" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="128" y="96" width="256" height="160" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><rect x="128" y="256" width="256" height="160" rx="28" ry="28" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>`,
        sounds: `<svg xmlns="http://www.w3.org/2000/svg" class="TMFFileBoxItemIcon" viewBox="0 0 512 512"><path d="M421.84 37.37a25.86 25.86 0 00-22.6-4.46L199.92 86.49A32.3 32.3 0 00176 118v226c0 6.74-4.36 12.56-11.11 14.83l-.12.05-52 18C92.88 383.53 80 402 80 423.91a55.54 55.54 0 0023.23 45.63A54.78 54.78 0 00135.34 480a55.82 55.82 0 0017.75-2.93l.38-.13 21.84-7.94A47.84 47.84 0 00208 423.91v-212c0-7.29 4.77-13.21 12.16-15.07l.21-.06L395 150.14a4 4 0 015 3.86v141.93c0 6.75-4.25 12.38-11.11 14.68l-.25.09-50.89 18.11A49.09 49.09 0 00304 375.92a55.67 55.67 0 0023.23 45.8 54.63 54.63 0 0049.88 7.35l.36-.12 21.84-7.95A47.83 47.83 0 00432 375.92V58a25.74 25.74 0 00-10.16-20.63z"/></svg>`,
        document: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" class="TMFFileBoxItemIcon"><path d="M428,224H288a48,48,0,0,1-48-48V36a4,4,0,0,0-4-4H144A64,64,0,0,0,80,96V416a64,64,0,0,0,64,64H368a64,64,0,0,0,64-64V228A4,4,0,0,0,428,224Z"/><path d="M419.22,188.59,275.41,44.78A2,2,0,0,0,272,46.19V176a16,16,0,0,0,16,16H417.81A2,2,0,0,0,419.22,188.59Z"/></svg>`,
        image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="TMFFileBoxItemIcon"><path d="M416 64H96a64.07 64.07 0 00-64 64v256a64.07 64.07 0 0064 64h320a64.07 64.07 0 0064-64V128a64.07 64.07 0 00-64-64zm-80 64a48 48 0 11-48 48 48.05 48.05 0 0148-48zM96 416a32 32 0 01-32-32v-67.63l94.84-84.3a48.06 48.06 0 0165.8 1.9l64.95 64.81L172.37 416zm352-32a32 32 0 01-32 32H217.63l121.42-121.42a47.72 47.72 0 0161.64-.16L448 333.84z" /></svg>`,
        ppt: `<svg xmlns="http://www.w3.org/2000/svg" class="TMFFileBoxItemIcon" viewBox="0 0 512 512"><rect x="32" y="64" width="448" height="320" rx="32" ry="32" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M304 448l-8-64h-80l-8 64h96z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 448H144"/><path d="M32 304v48a32.09 32.09 0 0032 32h384a32.09 32.09 0 0032-32v-48zm224 64a16 16 0 1116-16 16 16 0 01-16 16z"/></svg>`
      }
      switch (type) {
        case '.mp3':
          return files.sounds;
        case '.mp4':
          return files.video;
        case '.png':
        case '.jpg':
        case '.jpeg':
          return files.image;
        case '.ppt':
        case '.pptx':
          return files.ppt
        default:
          return files.document;
      }
    }
  }
}
</script>
<style>
#TMF {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.TMFUploadProgress {
  position: relative;
  top: -5px;
  width: 100%;
  height: 10px;
  border: none;
}

.TMFUploadProgress::-webkit-progress-bar {
  background-color: #f4f5f5;
  border: 1px solid transparent;
}
.TMFUploadProgress::-webkit-progress-value {
  border: 1px solid transparent;
  background-color: #26a0da;
  transition: 0.2s;
}
.TMFFolderAndFiles {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 300px 1fr 1px;
}
.text-overflow {
  display: block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -icab-text-overflow: ellipsis;
  -khtml-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}
.TMFBoxMenu {
  background: #f4f5f5;
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-rows: 100% 15px;
  grid-template-columns: 40px 270px 90px 122px 60px;
}
.TMFControls {
  margin: 5px;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  background: #cdd3dc;
  border-radius: 10px;
  transition: 0.2s;
}
.TMFControls:active {
  transform: scale(0.95);
}
.TMFControls > div > svg {
  width: 30px;
  height: 30px;
}
.TMFFolderBox {
  height: auto;
  width: 100%;
  border-right: 3px solid #f4f5f5;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}

.TMFFolderBoxItem {
  width: 90%;
  height: 40px;
  margin: 10px auto;
  background: #f6f6f6;
  border: 2px solid #e6e7e9;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 50px 1fr 30px;
  grid-template-rows: auto;
  text-align: center;
  line-height: 40px;
  color: #8b8b8b;
  transition: 0.2s;
}

.TMFFolderBoxItem:hover {
  transform: scale(0.98);
}
.TMFFolderBoxItem > div > svg {
  fill: #8b8b8b;
  margin: 5px auto;
  width: 30px;
  height: 30px;
  transition: 0.2s;
}
.TMFFolderBoxItem > svg:active {
  transform: scale(0.85);
}
.TMFFileBox {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}
.dragOn {
  transition: 0.2s;
  opacity: 0.5;
}
.TMFFileEmpty {
  opacity: 0.7;
  position: relative;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  width: 200px;
  height: auto;
  text-align: center;
  font-size: 0.9rem;
  color: #717b8d;
}
.TMFFileEmpty > img {
  width: 50%;
}
.TMFFileBoxBth {
  line-height: 25px;
  margin: 8px 8px;
  padding: 0 5px;
  width: auto;
  height: 27px;
  border-radius: 5px;
  background: #03a9f4;
  color: #ffffff;
  transition: 0.1s;
}
.TMFFileBoxBth:active {
  transform: scale(0.95);
}
.TMFFileBoxItem {
  border: 2px solid transparent;
  width: 100%;
  height: 37px;
  display: grid;
  grid-template-columns: 30px 1fr 50px;
  grid-template-rows: 100%;
  text-align: center;
  color: #717b8d;
  font-size: 1.1rem;
  line-height: 36px;
  transition: 0.2s;
}
.TMFFileBoxItem:active {
  border: 2px solid #03a9f4;
}
.TMFFileBoxItemIcon {
  width: 25px;
  height: 25px;
  margin: 7px auto;
  fill: #717b8d;
}
</style>