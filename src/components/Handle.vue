<template>
  <div class="handle">
    <header>
      <span @click="backHandle">返回</span>
      <h3>日志管理</h3>
    </header>
    <div v-if="id">
      <div class="info">
        <h4>日志标题：</h4>
        <p>{{info.title}}</p>
        <h4>日志内容：</h4>
        <p>{{info.detail}}</p>
      </div>
      <div class="wrap" v-if="isShow" @handle="handle">{{msg}}</div>
      <div class="btn">
        <button style="background:red;margin-top:10px" @click="delHandle">删除</button>
      </div>
    </div>

    <div v-else>
      <div class="info">
        <p>日志标题：</p>
        <input type="text" v-model="info.title" />
        <p>日志内容：</p>
        <textarea v-model="info.detail"></textarea>
      </div>
      <div class="wrap" v-if="isShow" @handle="handle">{{msg}}</div>
      <div class="btn">
        <button @click="addHandle">新增</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        title: "",
        detail: ""
      },
      isShow: false,
      msg: "",
      id:this.$route.query.id,
      time:this.$storage.formateTime(this.$route.query.time)
    };
  },
  methods: {
    handle() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, 3000);
    },
    backHandle(){
      this.$router.push({ name: 'home', params: { time: this.$route.query.time }})
    },
    addHandle() {
      if (!this.info.title.trim() || !this.info.detail.trim()) {
        this.msg = "输入不能为空";
        this.handle();
        return;
      }
      this.$storage.setInfo(
        this.time,
        this.info.title,
        this.info.detail
      );
      this.msg = "添加成功";
      this.handle();
      this.backHandle()
    },
    getHandle(){
      if(!this.$route.query.id) return
      let data = this.$storage.getInfo(this.time,this.$route.query.id)
      this.info.title = data.title
      this.info.detail = data.content
    },
    delHandle(){
      this.$storage.delInfo(this.time,this.id)
      this.backHandle()
    }
  },
  created() {
    console.log(this.$route.query,'time');
    this.getHandle()
  }
};
</script>

<style>
.wrap {
  position: fixed;
  left: 50%;
  top: 50%;
  background: rgba(0, 0, 0, 0.35);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
}
header {
  background-color: green;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: white;
  position: relative;
}
header span {
  position: absolute;
  left: 10px;
  font-size: 16px;
}
.info {
  padding: 0 10px;
}
p {
  margin: 10px;
}
input,
textarea {
  border: 1px solid #ccc;
  outline: none;
  padding: 10px;
  width: 100%;
  font-size: 14px;
}
textarea {
  height: 100px;
}
.btn {
  display: flex;
  justify-content: space-between;
}
button {
  display: inline-block;
  width: 80px;
  height: 40px;
  background-color: green;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  outline: none;
  border: none;
  margin-left: 10px;
}
/* button:last-child {
  background-color: red;
  margin-right: 10px;
} */
</style>