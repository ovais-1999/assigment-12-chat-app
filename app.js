
let senderName = prompt("Enter Your Name");

// const facebookAuth = () =>{
//     var provider = new firebase.auth.FacebookAuthProvider();
    
//     firebase.auth().signInWithPopup(provider)
//     .then(function(result) {
        
//         var token = result.credential.accessToken;
        
//         var user = result.user;
//         senderName = user.displayName;
//     })
//     .catch(function(error) {
//         console.log(error)
//     });
    
// }
// window.open(facebookAuth());



const sendData = () => {
    let Message = document.getElementById("abc").value;
    firebase.database().ref('mydata').push().set({
        "sender" : senderName,
        "message" : Message
    })

    document.getElementById("abc").value = ""; 

   
}

const getData = () => {
   
    firebase.database().ref('mydata').on("child_added", function(snapshot){
       
        
        if(snapshot.val().sender === senderName){
            let html = `<li style="text-align: right;" id = "message${snapshot.key}">${snapshot.val().sender}: ${snapshot.val().message}
            <i data-id="${snapshot.key}" onclick="removeData(this)" class="far fa-trash-alt"></i>
            </li> ` 
            document.getElementById("mess").innerHTML += html;
            
        }else{
            let html = `<li id = "message${snapshot.key}">${snapshot.val().sender}: ${snapshot.val().message}</li>`
            document.getElementById("mess").innerHTML += html;
        }
              
            
        
    })

}

getData()
  

const removeData = (e) => {

    let messegeId = e.getAttribute("data-id");

    firebase.database().ref('mydata').child(messegeId).remove();

    firebase.database().ref('mydata').on("child_removed", function(snapshot){
        document.getElementById("message" + snapshot.key).innerHTML = "This Message has been Deleted";

    })

}
