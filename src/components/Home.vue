<template>
  <div id="home-box">
    <calendar  ref="calendar" @changeMonth="changeMonthHandle" @choseDay="choseDay" 
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
    <router-link :to="{path:'/handle',query:{time:mark[0]}}" class="addBtn" tag="div">加</router-link>
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
      list:[
        {time:"08:08",title:"第一天",content:"记录第一天"}
      ]
    }
  },
  methods: {
    changeMonthHandle(data){
      this.mark[0] = data
      this.initData()
    },
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
  created(){
    this.mark = [this.$storage.formatData(new Date())]
    let time = this.$route.params.time
    if(time){
      this.mark = [decodeURIComponent(time)]
    }
    this.initData()

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
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    right: 10px;
    bottom: 50px;
    color: white;
    background-color: #0fc37c;
    border-radius: 50%;
  }
</style>