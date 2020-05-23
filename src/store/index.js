import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // state要拿到值要经过 mutations
    list:[],
    inputValue:'aaa',
    nextId:5,
    viewKey:'all'
  },
  mutations: {
    initList(state,list){
      state.list=list;
    },
    setInputValue(state,val){
      state.inputValue=val;
    },
    addItem(state){
      const obj={
        id:state.nextId,
        info:state.inputValue.trim(),
        done:false
      }
      state.list.push(obj)
      state.nextId++;
      state.inputValue='';
    },
    delItem(state,id){
      const i=state.list.findIndex(x=>x.id==id); 
      state.list.splice(i,1);
    },
    changeStatus(state,params){
     const i= state.list.findIndex(x=>x.id==params.id);
     state.list[i].done=params.status;
    },
    clearChecked(state){
      for(let i=0;i<state.list.length;i++){
        if(state.list[i].done){
          state.list.splice(i,1);
        }
      }
    },
    changeViewKey(state,key){
      state.viewKey=key;
    }
  },
  // 异步操作
  actions: {
    getList(context){
      axios.get('/list.json').then(({data})=>{
        console.log(data);
        // commit是将data传给mutations
        context.commit('initList',data);
      })
    }
  },
  modules: {
  },
  getters:{
    unDoneLength(state){
     return state.list.filter(x=>x.done===false).length;
    },
    infoList(state){
      if(state.viewKey==='all'){
        return state.list;
      }
      if(state.viewKey==='undone'){
        return state.list.filter(x=>x.done===false);
      }
      if(state.viewKey==='done'){
        return state.list.filter(x=>x.done===true);
      }
    }
  }
})
