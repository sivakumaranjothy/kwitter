
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
  room_name=localStorage.getItem("room_name");
  

function getData() { firebase.database().ref("/"+room_name).on('value',
 function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
name=message_data["name"];
message=message_data["message"];
like=message_data['like'];
name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>" + message+ "</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+ " onclick =' updatelike(this.id)";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> like: "+like+"</span> </button><hr>";
row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
 } });  }); }
getData();

function send(){
    message=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById('msg').value="";
}
function update_likes(message_id){
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    update_likes=NUMBER(likes)+1;
    firebase.database().ref(room_name).child(message_id).update({
        like:update_likes

    });
}
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html;"
}