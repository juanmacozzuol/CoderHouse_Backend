const socket = io();
fetch('/users/current')
.then( result =>result.text()).then((data)=>{
    let chunck = data.split('Nombre: ')[1]
    let name = chunck.split('</p>')[0]
    let chatBox = document.getElementById("chatBox")

chatBox.addEventListener('keyup', e =>{
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            
            socket.emit('message',{user:name, message:chatBox.value})

            chatBox.value = ""
        }
    }
})

socket.on('messageLogs',data =>{
    let log = document.getElementById('messageLogs')
    let messages = "";
    data.forEach(message =>{
        messages= messages + `${message.user} dice: ${message.message} </br>`
    })
    log.innerHTML = messages
})
   
})
