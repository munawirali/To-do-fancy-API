Vue.component('Edit',{
  props: ['todo'],
  template: `
  <div id="modal-todo">
    <div class="modal fade" id="modal-todo-edit" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Edit Task</h4>
          </div>
          <div class="modal-body">
            Date </br>
            <input v-model="todo.date" class="datepicker" type="date" name="" value=""> </br>
            Task </br>
            <textarea v-model="todo.task" class="form-control" rows="5" id="todo-text"></textarea>
          </div>
          <div class="modal-footer">
            <button @click="editTask(todo)" type="button" class="btn btn-default" data-dismiss="modal" id="todo-post">Edit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    editTask (task) {
      this.$emit('editTodo',task)
    }
  }
})

Vue.component('Add',{
  props: ['todo'],
  template:`
  <div id="modal-todo">
    <div class="modal fade" id="modal-todo-add" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add Task</h4>
          </div>
          <div class="modal-body">
            Date </br>
            <input v-model="todo.date" class="datepicker" type="date" name="" value=""> </br>
            Task </br>
            <textarea v-model="todo.task" class="form-control" rows="5" id="todo-text"></textarea>
          </div>
          <div class="modal-footer">
            <button @click="addTask(todo)" type="button" class="btn btn-default" data-dismiss="modal" id="todo-post">Add</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
  </div>`,
  methods: {
    addTask (task) {
      this.$emit('addTodo',task)
    }
  }
})

Vue.component('list',{
  props: ['allToDo'],
  template:`
    <table class="table">
      <thead>
        <th>Status</th>
        <th>Task</th>
        <th>Date</th>
        <th>Actions</th>
      </thead>
      <tbody id="todo-list">
        <tr v-for="list in allToDo">
          <td>{{list.status}}</td>
          <td>{{list.task}}</td>
          <td>{{list.date}}</td>
          <td>
          <a class="glyphicon glyphicon-pencil" @click="findById(list._id)" href="#" data-toggle="modal" data-target="#modal-todo-edit"></a> |
          <a class="glyphicon glyphicon-trash" @click="removeItem(list._id)" href="#"></a> |
          <a class="glyphicon glyphicon-ok" @click="doneTask({_id:list._id,status:list.status})" href="#"></a>
          </td>
        </tr>
      </tbody>
    </table>`,
  methods: {
    removeItem (id) {
      this.$emit('removeTodo',id)
    },
    findById (id) {
      this.$emit('findItem',id)
    },
    doneTask (id) {console.log('doneTask asdfasdf ',id);
      this.$emit('doneItem',id)
    }
  }
})

Vue.component('fancy-todo',{
  template:`
    <div class="fancytodo-section">
      <h1>To Do List Fancy</h1>
      <div class="btnlogin">
        <img style="width:100px" v-bind:src="profilPicture" alt=""><br>
        <h3>{{profilName}}</h3>
        <br>
        <button type="button" class="btn btn-lg btn-primary login" @click="login">Login</button>
      </div>
      <div class="container todo">
        <button type="button" class="btn btn-lg btn-primary" data-toggle="modal" data-target="#modal-todo-add">Add</button></br></br>
        <Add :todo="todo" @addTodo="addTask"></Add>
        <Edit :todo="todo" @editTodo="editTask"></Edit>
        <list :allToDo="allToDo" @findItem="findById" @removeTodo="removeItem" @doneItem="doneTask"></list>
      </div>
    </div>
  `,
  data:function(){
    return{
      todo:{
        _id:'',
        task:'',
        status:'',
        date:this.getDate(new Date)
      },
      allToDo:[],
      profilPicture:'',
      profilName:'',
      token:'',
    }
  },
  methods:{
    setDefaultTodo () {
      this.todo._id='',
      this.todo.task='',
      this.todo.status='',
      this.todo.date=this.getDate(new Date)
    },
    getDate(date){
      var now = date
      var month = (now.getMonth() + 1);
      var day = now.getDate();
      if(month < 10)
          month = "0" + month;
      if(day < 10)
          day = "0" + day;
      return today = now.getFullYear() + '-' + month + '-' + day;
    },
    addTask(task){
      axios.post(`http://localhost:3000/api/todo/${this.token}`,task)
      .then(response=>{
        console.log(response.data);
        this.allToDo.push(task);
        this.setDefaultTodo();
      })
    },
    findById(id){
      var toDoList = this.allToDo.filter(list => list._id == id)
      // this.editItem =
      this.todo._id=toDoList[0]._id;
      this.todo.task=toDoList[0].task;
      this.todo.date=toDoList[0].date;
      this.todo.status=toDoList[0].status;
    },
    editTask(task){
      axios.put(`http://localhost:3000/api/todo/${this.token}`,task)
      .then(response=>{
        // console.log('sini',response);
        var listToDo=this.allToDo,
            todoEdited=task
        for (var i = 0; i < this.allToDo.length; i++) {
          if (this.allToDo[i]._id==todoEdited._id){
            listToDo[i]._id=todoEdited._id;
            listToDo[i].task=todoEdited.task;
            listToDo[i].date=todoEdited.date;
            listToDo[i].status=todoEdited.status;
          }
        }
        this.allToDo = listToDo;
        this.setDefaultTodo();
      })
    },
    doneTask(task){
      if (task.status == 'start') {
        task.status='done';
      } else {
        task.status='start';
      }
      axios.put(`http://localhost:3000/api/todo/done/${this.token}`,task)
      .then(response=>{
        var listToDo=this.allToDo,
            todoEdited=response.data.data
        for (var i = 0; i < this.allToDo.length; i++) {
          // console.log(this.allToDo[i]._id,'==',todoEdited._id);
          if (this.allToDo[i]._id==todoEdited._id){
            listToDo[i].status=task.status;
          }
        }
        this.allToDo = listToDo;
      })
    },
    removeItem(id){
      axios.delete(`http://localhost:3000/api/todo/${id}`)
      .then(response=>{
        var list = this.allToDo.filter(item => item._id != response.data.data._id)
        this.allToDo = list
      })
      .catch(err=>{
        console.log(err);
      })
    },
    getAllTask(token){
      axios.get(`http://localhost:3000/api/todo/${token}`)
      .then(response=>{
        let todo=response.data.map(task=>{
          let date=new Date(task.date)
          task.date=this.getDate(date)
          return task
        })
        this.allToDo=todo;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    nextStep(response){
      // console.log(response);
      this.token=response.data.token;
      this.profilPicture=response.data.profil;
      this.profilName=response.data.name;
      localStorage.setItem('fancy-todo-token',response.data.token);
      localStorage.setItem('fancy-todo-profil',[response.data.name,response.data.profil]);
      $(".login").text("Logout");
      $(".container").show();
      this.getAllTask(this.token);
    },
    login(){
      let self=this
      window.FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
      });
      function statusChangeCallback(response) {
        if (response.status === 'connected') {

          if (localStorage.getItem("fancy-todo-token")==null) {

            axios.post('http://localhost:3000/api/login',{
              accessToken: response.authResponse.accessToken,
              userId: response.authResponse.userID
            })
            .then(response=>{
              // console.log('asdfasdfas');
              self.nextStep(response)
            })
          } else{
            window.FB.logout()
            // window.FB.logout(function(response) {
            //   $(".login").text("Login");
            // }
            self.profilPicture='';
            self.profilName='';
            self.token='';
            $(".login").text("Login");
            localStorage.removeItem('fancy-todo-token');
            localStorage.removeItem('fancy-todo-profil')
            $(".container").hide();
          }
        } else {
          window.FB.login(function(response) {
            if (response.authResponse) {
              //  console.log('Welcome!  Fetching your information.... ');
              //  FB.api('/me', function(response) {
              //    console.log('Good to see you, ' + response.name + '.');
              //  });
              axios.post('http://localhost:3000/api/login',{
                accessToken: response.authResponse.accessToken,
                userId: response.authResponse.userID
              })
              .then(response=>{
                self.nextStep(response);
              })
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
          });
        }
      }
    }
  },
  mounted: function(){
    // console.log('asdfasd  ',localStorage.getItem("fancy-todo-profil"));
    if (localStorage.getItem("fancy-todo-profil")!=null) {
      let profile=localStorage.getItem("fancy-todo-profil").split(',')
      // console.log('asdfa',profile[0]);
      $(".login").text("Logout");
      this.profilPicture=profile[1]
      this.profilName=profile[0]
    } else {
      $(".container").hide();
    }

    window.fbAsyncInit = function() {
      // var self = this;
      FB.init({
        appId      : 178711819350175,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      // FB.getLoginStatus(function(response) {
      //     statusChangeCallback(response);
      // });
    };
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  created:function(){
    // let self=this;
    let token=localStorage.getItem("fancy-todo-token");
    // console.log(token);
    if (token!=null) {
      this.token=token;
      this.getAllTask(token);
    }
  }
})
new Vue({
  el:'#index'
})
