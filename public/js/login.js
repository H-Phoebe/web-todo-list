var vm = new Vue({
    el:'#app',
    data:{
        username:'',
        password:'',
        user:[
                'Phoebe',
                'root'
            ],
        passwords:[
                '123',
                'root'
        ]},
    methods:{
        login:function(username,password){
            var exist=false;
                for(var i=0;i<this.user.length;i++){
                    if(JSON.stringify(this.username)==JSON.stringify(this.user[i])
                        &&JSON.stringify(this.password)==JSON.stringify(this.passwords[i])){
                        exist=true;
                        break;
                    }
                }
            if(exist==false){
                alert('用户名或密码不正确');
            }else{
                alert('登陆成功')
                window.location.href="http://127.0.0.1:8080/index.html"
            }
        }
    }
});