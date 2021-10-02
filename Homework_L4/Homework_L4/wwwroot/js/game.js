


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

        hubConnection.on('HideLoginMenu', function (msg) {
        
            console.log(msg);
            $('#inputForm').hide();
        
        });
        
        hubConnection.on('Info', function (msg) {
        
            console.log(msg);
            document.getElementById("info1").innerText = msg;
        
        });


            hubConnection.on('AddPlayer', function (nickname) {
            
                console.log('From AddPlayer:' + nickname)
                document.getElementById("response").innerText = nickname;
            
            
            });
            
            document.getElementById("sendBtn").addEventListener("click", function (e) {
            
                let name = document.getElementById("name").value;
            
                hubConnection.invoke("AddPlayer", name);
            
                document.getElementById("name").value = "";
            
                document.getElementById("header").innerHTML = '<h3>Welcome ' + name + '</h3>';
            
            });
            
            hubConnection.on('OpenField', function (isGame) {
            
                document.getElementById("response").innerText = '';
            
                if (isGame) {
                    console.log('game start!!!!');
                    document.getElementById('info1').innerText = " ";
                    $('#field').show();
                }
                else {
                    console.log('no game start!!!!');
            
                }
            });
            

hubConnection.on('EnableField', function (flag, nickname, msg) {

    console.log('Enable field');
    console.log(`flag: ${flag}`);

    document.getElementById('info2').innerText = msg;

    const divs = document.querySelectorAll('.cell');
    divs.forEach(function (item) {
        item.style.pointerEvents = 'auto';
    });

    activeNickname = nickname;

    console.log('-> -> ->');
});

hubConnection.on('DisableField', function (flag, msg) {

    console.log(msg);
    console.log(`flag: ${flag}`);

    console.log('Disable Field');
    document.getElementById('info2').innerText = msg;



    const divs = document.querySelectorAll('.cell');
    divs.forEach(function (item) {
        item.style.pointerEvents = 'none';
    });

    console.log('-> -> ->');


});



/*---------------------------------------------------------------*/

hubConnection.start();