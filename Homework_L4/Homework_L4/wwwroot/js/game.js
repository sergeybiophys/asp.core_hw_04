


var hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/gamehub")
    .build();

/*---------------------------------------------------------------*/
        hubConnection.on('Notify', function (message) {
        
            let notifyElem = document.createElement("small");
            notifyElem.appendChild(document.createTextNode(message));
            let elem = document.createElement("p");
            elem.appendChild(notifyElem);
            var firstElem = document.getElementById("chatroom").firstChild;
            document.getElementById("chatroom").insertBefore(elem, firstElem);
        });

        hubConnection.on('ConNum', function (message) {
        
           /* console.log(`Connections: ${message}`);*/
        
            document.getElementById('count').value = message;
        });

        hubConnection.on('AuthNum', function (message) {
        
           /* console.log('From AuthNum: ' + message)*/
            document.getElementById('registered').value = message;
        
        });




/*---------------------------------------------------------------*/

hubConnection.start();