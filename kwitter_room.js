
var firebaseConfig = {
      apiKey: "AIzaSyAdFEnCUSElJIO3-bNL3ol90dSp6_y_pOo",
      authDomain: "kwitter-app-91cbb.firebaseapp.com",
      databaseURL: "https://kwitter-app-91cbb-default-rtdb.firebaseio.com",
      projectId: "kwitter-app-91cbb",
      storageBucket: "kwitter-app-91cbb.appspot.com",
      messagingSenderId: "433584307618",
      appId: "1:433584307618:web:e554643a6a3f17588e46fb",
      measurementId: "G-PPQTY0Q9C6"
    };
    
firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="welcome "+user_name+"!";

getData();
var room_name=""; 
function addRoom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}
function getData(){
      firebase.database().ref("/").on('value',
      function (snapshot)
      {
            document.getElementById("output").innerHTML="";
            snapshot.forEach(function(childSnapshot){
                  childKey=childSnapshot.key;
                  room_names=childKey;
                  console.log("room name-"+room_names);
                  row="<div class='room_name' id="+room_names+" onclick='redirectToNewRoomName(this.id)'>#"+room_names+"</div><hr>"
                  document.getElementById("output").innerHTML+=row;
            });
      });
}
function redirectToNewRoomName (name){
console.log(name);
localStorage.setItem("room_name",name);
window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html;"
}


