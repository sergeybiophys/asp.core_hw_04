
var flag1 = false;
var countMoves = 0;
var status = '';
var activeNickname = '';

var hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/gamehub")
    .build();

/*---------------------------------------------------------------*/
        hubConnection.on('Notify', function (message) {
        
            let notifyElem = document.createElement('small');
            notifyElem.style.color = 'white';
            notifyElem.appendChild(document.createTextNode(message));
            let elem = document.createElement('p');
            elem.appendChild(notifyElem);
            var firstElem = document.getElementById('chatroom').firstChild;
            document.getElementById('chatroom').insertBefore(elem, firstElem);
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
                    console.log('the game has begun!!!!');
                    document.getElementById('info1').innerText = " ";
                    $('#field').show();
                }
                else {
                    console.log('the game did not start !!!!');
            
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



hubConnection.on('DeadHeat', function (msg) {
    const divs = document.querySelectorAll('.cell');
    divs.forEach(function (item) {
        item.style.pointerEvents = 'none';
    });
    document.getElementById('info2').innerText = '';
    document.getElementById('gamestatus').innerText = msg;
});

hubConnection.on('Win', function (msg) {
    const divs = document.querySelectorAll('.cell');
    divs.forEach(function (item) {
        item.style.pointerEvents = 'none';
    });
    document.getElementById('info2').innerText = '';
    document.getElementById('gamestatus').style.color = 'orange';
    document.getElementById('gamestatus').innerText = msg;
});


hubConnection.on('PutSymbol', function (symbol, id) {




    let tmptext = document.getElementById(id).innerText;
    if (tmptext.length == 0) {
        document.getElementById(id).innerText = symbol;
        countMoves++;
    }


    let c1 = document.getElementById('1').innerText;
    let c2 = document.getElementById('2').innerText;
    let c3 = document.getElementById('3').innerText;
    let c4 = document.getElementById('4').innerText;
    let c5 = document.getElementById('5').innerText;
    let c6 = document.getElementById('6').innerText;
    let c7 = document.getElementById('7').innerText;
    let c8 = document.getElementById('8').innerText;
    let c9 = document.getElementById('9').innerText;

    console.log('Get Symbol: ' + symbol);



    console.log(`count moves:   ${countMoves}`);
    console.log(`firs is move: ${flag1} `);


    if (countMoves % 2 != 0) {

        flag1 = true;
    }
    else {

        flag1 = false;
    }
    console.log(c1);
    console.log(c2);
    console.log(c3);
    console.log(c4);
    console.log(c5);
    console.log(c6);
    console.log(c7);
    console.log(c8);
    console.log(c9);

    if (countMoves >= 4) {
        if ((c1 == c2 && c2 == c3 && c2.length != 0) ||
            (c4 == c5 && c5 == c6 && c5.length != 0) ||
            (c7 == c8 && c8 == c9 && c8.length != 0) ||
            (c1 == c4 && c4 == c7 && c4.length != 0) ||
            (c2 == c5 && c5 == c8 && c5.length != 0) ||
            (c3 == c6 && c6 == c9 && c6.length != 0) ||
            (c1 == c5 && c5 == c9 && c5.length != 0) ||
            (c3 == c5 && c5 == c7 && c5.length != 0)) {
            console.log('player: ' + activeNickname + 'won!!!');
            status = 'win';
        }
    }
    if (countMoves == 9) {
        console.log('DeadHead');
        status = 'deadheat';
    }

    hubConnection.invoke('StartTHeGame', flag1);
    hubConnection.invoke('GameStatus', status, countMoves);

});

const divs = document.querySelectorAll('.cell');
divs.forEach(item => item.addEventListener('click', event => {
    event.preventDefault();
    hubConnection.invoke('PutSymbolToCell', flag1, item.id);


}));
/*---------------------------------------------------------------*/

hubConnection.start();