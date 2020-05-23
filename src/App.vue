<template>
  <div id="app">
    <!-- 没有@change只是将state的值传给 a-input，@change实现双向绑定-->
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>剩余{{unDoneLength}}条</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey==='undone'?'primary':'default'" @click="changeList('undone')" >未完成</a-button>
          <a-button :type="viewKey==='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearChecked">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created(){
    // dispatch调用action函数
    this.$store.dispatch('getList');
  },
  methods:{
    handleInputChange(e){
      console.log(e.target.value);
      this.$store.commit('setInputValue',e.target.value)
    },
    addItemToList(){
      if(this.inputValue.trim().length==0){
        return this.$message.warning('文本框内容不能为空')
      }
      this.$store.commit('addItem');
    },
    delItem(id){
      this.$store.commit('delItem',id);
    },
    // 监听复选框选中状态的变化 
    cbStatusChanged(e,id){
      // e.target.checked 可以接受最新的选中状态
      const params={
        id:id,
        status:e.target.checked
      }
      this.$store.commit('changeStatus',params)
    },
    clearChecked(){
      this.$store.commit('clearChecked');
    },
    changeList(key){
      this.$store.commit('changeViewKey',key)
    }
  },
  computed:{
    ...mapState(['inputValue','viewKey']),
    ...mapGetters(['unDoneLength','infoList'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
