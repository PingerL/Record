<template>
  <div id="home-box">
    <calendar  ref="calendar" @changeMonth="changeMonth" @choseDay="choseDay"
    :markDate="mark"></calendar>
    <div class="infoBox">
      <div class="tip" v-if="list.length === 0">
        <p>暂无记录</p>
      </div>
      <ul class="list">
        <li class="item" v-for="item in list" :key="item.id">
          <router-link :to="{path:'/handle',query:{time:mark[0],id:item.id}}">
            <span>๑ {{item.time}}</span>
            <div class="info">
              <h3>{{item.title}}</h3>
              <p>{{item.content}}</p>
            </div>
          </router-link>
        </li>
      </ul>
     
    </div>
    <router-link :to="{path:'/handle',query:{time:mark[0]}}" class="addBtn" tag="div"><img style="width:40px" src="../assets/add.png" /></router-link>
  </div>
</template>

<script>
import calendar from 'vue-calendar-component'
export default {
  components: {
    calendar
  },
  data(){
    return {
      mark:[],
      list:[]
    }
  },
  methods: {
    choseMonth(){
      this.$refs.calendar.ChoseMonth(this.mark[0])
    },
    changeMonth(data){
      this.mark = [this.$storage.formateTime(data)]
      this.initData()
    },
    // 点击选择某一天
    choseDay(time){
      this.mark = [this.$storage.formateTime(time)]
      this.initData()
    },
    
    // 获取数据
    initData(){
      let time = this.mark[0]
      this.list = this.$storage.getInfo(time) || []
    }
  },
  mounted(){
    this.mark = [this.$storage.formatData(new Date())]
    let time = this.$route.params.time
    if(time){
      this.mark = [decodeURIComponent(time)]
    }
    this.initData()
    this.choseMonth()
  }

}
</script>

<style>
#home-box {
  height: 100%;
  position: relative;
}
  #home-box .wh_content_item .wh_isToday {
    background: rgb(240, 89, 44) ;
  }
  .info {
    padding-left: 16px;
  }
  .infoBox {
    max-height: calc(100vh - 295px);
    overflow: scroll; 
  }
  .infoBox .list .item {
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 5px #ccc;
  }
  .infoBox .list .item h3 {
    margin: 5px 0;
  }
  .tip {
    color: #666;
  }
  .addBtn {
    width: 40px;
    height: 40px;
    position: absolute;
    text-align: center;
    right: 10px;
    bottom: 50px;
    color: white;
    background-color: #0fc37c;
    border-radius: 50%;
  }
</style>