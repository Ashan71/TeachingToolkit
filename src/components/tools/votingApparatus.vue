<template>
  <div id="votingApparatus">
    <!-- 显示 -->
    <div class="votingApparatusShow">
      <div
        class="votingApparatusCard"
        v-for="(item, index) in list"
        :key="index"
        @click="listOperate('remove', item.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z" />
          <path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" />
        </svg>
        <div>
          <span style="margin-top: 8px;">{{ item.name.length <= 10 ? item.name : `${item.name.slice(0, 10)}...` }}</span>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path d="M472.06 334l-144.16-6.13c-4.61-.36-23.9-1.21-23.9-25.87 0-23.81 19.16-25.33 24.14-25.88L472.06 270c12.67.13 23.94 14.43 23.94 32s-11.27 31.87-23.94 32zM330.61 202.33L437.35 194C450 194 464 210.68 464 227.88v.33c0 16.32-11.14 29.62-24.88 29.79l-108.45-1.73C304 253 304 236.83 304 229.88c0-22.88 21.8-27.15 26.61-27.55zM421.85 480l-89.37-8.93C308 470.14 304 453.82 304 443.59c0-18.38 13.41-24.6 26.67-24.6l91-3c14.54.23 26.32 14.5 26.32 32s-11.67 31.67-26.14 32.01zm34.36-71.5l-126.4-6.21c-9.39-.63-25.81-3-25.81-26.37 0-12 4.35-25.61 25-27.53l127.19-3.88c13.16.14 23.81 13.49 23.81 31.4s-10.65 32.43-23.79 32.58z" />
              <path
                d="M133.55 238.06A15.85 15.85 0 01126 240a15.82 15.82 0 007.51-1.92zM174.14 168.78l.13-.23-.13.23c-20.5 35.51-30.36 54.95-33.82 62 3.47-7.07 13.34-26.51 33.82-62z"
                fill="none"
              />
              <path d="M139.34 232.84l1-2a16.27 16.27 0 01-6.77 7.25 16.35 16.35 0 005.77-5.25z" />
              <path d="M316.06 52.62C306.63 39.32 291 32 272 32a16 16 0 00-14.31 8.84c-3 6.07-15.25 24-28.19 42.91-18 26.33-40.35 59.07-55.23 84.8l-.13.23c-20.48 35.49-30.35 54.93-33.82 62l-1 2a16.35 16.35 0 01-5.79 5.22 15.82 15.82 0 01-7.53 2h-25.31A84.69 84.69 0 0016 324.69v38.61a84.69 84.69 0 0084.69 84.7h48.79a17.55 17.55 0 019.58 2.89C182 465.87 225.34 480 272 480c7.45 0 14.19-.14 20.27-.38a8 8 0 006.2-12.68l-.1-.14C289.8 454.41 288 441 288 432a61.2 61.2 0 015.19-24.77 17.36 17.36 0 000-14.05 63.81 63.81 0 010-50.39 17.32 17.32 0 000-14 62.15 62.15 0 010-49.59 18.13 18.13 0 000-14.68A60.33 60.33 0 01288 239c0-8.2 2-21.3 8-31.19a15.63 15.63 0 001.14-13.64c-.38-1-.76-2.07-1.13-3.17a24.84 24.84 0 01-.86-11.58c3-19.34 9.67-36.29 16.74-54.16 3.08-7.78 6.27-15.82 9.22-24.26 6.14-17.57 4.3-35.2-5.05-48.38z" />
            </svg>
            <span style="margin-left: 10px;">{{ item.vote <= 99 ? item.vote : '99+' }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑界面 -->
    <div class="votingApparatusEdit">
      <span>姓名</span>
      <input
        type="text"
        maxlength="15"
        placeholder="请输入..."
        v-model="getData[0]"
      >
      <span>票数</span>
      <input
        type="number"
        placeholder="请输入..."
        v-model="getData[1]"
      >
      <div @click="listOperate('add', getData[0], getData[1])">创建</div>
      <div @click="getResult()">计算</div>
    </div>
  </div>
</template>

<script>
import utils from '../../utils'

export default {
  name: 'votingApparatus',
  data () {
    return {
      getData: [],
      list: []
    }
  },
  methods: {
    getResult(){},
    listOperate (type, item1, item2) {
      switch (type) {
        case 'add': {
          if (item1 != '' && item2 > 0) {
            let template = {
              name: item1,
              vote: item2,
              id: utils.randomString(15)
            }
            this.list.push(template)
            this.getData = []
            console.log(JSON.stringify(this.list));
          } else {
            utils.Toast('数据不可用')
          }
          break
        }
        case 'remove': {
          let list = this.list
          let newList = []
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === item1) {
              continue
            }
            newList.push(list[i])
          }
          this.list = newList
          utils.Toast(`已移除-ID:${item1}`)
          break
        }
      }
    }
  }

}
</script>

<style>
#votingApparatus {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 50px;
  overflow: hidden;
}
.votingApparatusCard {
  margin: 5px auto;
  width: 30%;
  max-width: 330px;
  height: 70px;
  border: 1px solid #cacaca;
  background: #f3f3f3;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 65px auto;
  fill: #37405f;
  color: #37405f;
  font-size: 1.1rem;
}
.votingApparatusCard > svg {
  width: 60px;
  height: 60px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.votingApparatusCard > div {
  width: 90%;
  display: grid;
  grid-template-rows: 25px 25px;
}
.votingApparatusCard > div > div {
  margin: 10px 0;
  display: grid;
  grid-template-columns: 25px auto;
  line-height: 30px;
  letter-spacing: 1px;
}
.votingApparatusShow {
  padding: 10px 0;
  width: 100%;
  height: 100%;
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: scroll;
}
.votingApparatusEdit {
  background: #e7ebee;
  display: grid;
  grid-template-columns: 60px 200px 60px 130px 130px auto;
  text-align: center;
  font-size: 1.3rem;
  color: #37405f;
  line-height: 43px;
}
.votingApparatusEdit > input {
  margin: 10px auto;
  text-align: center;
  font-size: 1.1rem;
}
.votingApparatusEdit > div {
  margin: 8px 40px;
  width: 80px;
  height: 35px;
  background: #03a9f4;
  border-radius: 8px;
  line-height: 35px;
  font-size: 1.1rem;
  color: #ffffff;
}
</style>