//存取localStorage中的数据
var store={    //封装一个对象
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));  //将数据转换为json形式的字符串
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key))||[];
        //获得的数据是json字符串，需要用json.parse解析一下,若没取到就返回空
    }
}
//取出所有的值
//到localStorage中取数据
var event = store.fetch("ev");
var list = store.fetch("li");
var title = store.fetch("ti");

var vm = new Vue({
    el:"#app",
    data:{
        title:title,
        summary:'',
        newevent:{
            belong:title,
            summary:'',
            time:'',
            statue:false,
        },
        newlist:{
            title:'',
        },
        events:event,
        lists:list,
        eventstemp:'',
    },
    watch:{
        events:{
           handler:function(){
               store.save("ev",this.events);
           },
           deep:true          //深监控
        },
        lists:{
           handler:function(){
               store.save("li",this.lists);
           },
           deep:true
        },
        title:{
            handler:function(){
               store.save("ti",this.title);
           },
           deep:true 
        }
     },
    computed: {
            Events: function () {
                this.eventstemp = this.pick(this.events);
                this.eventstemp = this.sort(this.eventstemp);
                var that = this;
                return that.eventstemp.filter(function (event) {
                    return event.summary.toLowerCase().indexOf(that.summary.toLowerCase()) !== -1;
                })
            }
        },
    methods:{
        addList:function(){
            this.lists.push(this.newlist);
        },
        editList:function(index){
            this.newlist = this.lists[index];
        },
        deleteList:function(index){
            for(var i=this.events.length-1;i>0;i--){
                if(this.lists[index].title==this.events[i].belong)
                    this.events.splice(i,1);
            }
            this.lists.splice(index,1)
        },
        getTitle:function(index){
            this.title = this.lists[index].title
        },
        initNewlist:function(){
            this.newlist = {
                title:'',
            }
        },
        Done:function(){
            this.newevent.statue = true
        },
        notDone:function(){
            this.newevent.statue = false
        },
        setDone:function(index){
            this.eventstemp[index].statue = true
        },
        setNotdone:function(index){
            this.eventstemp[index].statue = false
        },
        addEvent:function(){
            this.events.push(this.newevent);
        },
        editEvent:function(index){
            this.newevent = this.eventstemp[index];
        },
        initNewevent:function(){
            this.newevent = {
                belong:title,
                summary:'',
                time:'', 
                statue:false, 
            }
        },
        deleteEvent:function(index){
            for(var i=0;i<this.events.length;i++){
                if(this.eventstemp[index].belong==this.events[i].belong&&this.eventstemp[index].summary==this.events[i].summary)
                    this.events.splice(i,1)
            }
        },
        pick:function(array){
            var picked = new Array;
            for(var i = 0,j = 0; i<array.length; i++){
                if(JSON.stringify(array[i].belong) == JSON.stringify(this.title))
                    picked[j++] = array[i];
            }
            return picked;
        },
        sort:function(array){
            var temp;
            var notDone = new Array();
            var done = new Array();
            var array_matter;
            for(var i = 0; i<array.length; i++) {
                for(var j = i+1; j<array.length; j++) {
                    if(array[i].time>array[j].time) {
                        temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
            }
            for(var i = 0,j = 0,k = 0; i<array.length; i++) {
                if(!array[i].statue) {
                    notDone[j++] = array[i];
                }else if(array[i].statue){
                    done[k++] = array[i];
                }
            }
            array_matter = notDone.concat(done);
            return array_matter;
        },

    }
})