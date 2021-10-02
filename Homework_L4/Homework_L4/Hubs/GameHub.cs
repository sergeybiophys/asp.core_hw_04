using Homework_L4.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homework_L4.Hubs
{
    public class GameHub : Hub
    {
        public static GameModel _game = new GameModel();

        //public static HashSet<string> ConnectedIds = new HashSet<string>();

        //public static List<string> _nickName = new List<string>();
        public override async Task OnConnectedAsync()
        {
           _game.ConnectedIds.Add(Context.ConnectionId);
            await this.Clients.All.SendAsync("Notify", $"{this.Context.ConnectionId}  : entered the chat");
            await Clients.All.SendAsync("ConNum", $"{_game.ConnectedIds.Count}");
            await Clients.All.SendAsync("AuthNum", $"{_game.nickNames.Count}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _game.ConnectedIds.Remove(Context.ConnectionId);
            await Clients.All.SendAsync("Notify", $"{this.Context.ConnectionId} : left the chat ");
            await Clients.All.SendAsync("ConNum", $"{_game.ConnectedIds.Count}");

            //TODO 
            //when disconnecting from the session, remove the user from the authorized 

            await base.OnDisconnectedAsync(exception);
        }


        public async Task AddPlayer(string nickname)
        {
      

            if (_game.sessionNickNames.Count == 0)
            {
                _game.Player1.NickName = nickname;
                _game.Player1.Id = Context.ConnectionId;
                _game.sessionNickNames.Add(nickname);
            }
            else if (_game.sessionNickNames.Count == 1)
            {
                _game.Player2.NickName = nickname;
                _game.Player2.Id = Context.ConnectionId;
                //_game.sessionNickNames.Add(nickname);
                GameSessionModel tmp = new GameSessionModel(_game.Player1, _game.Player2);
                _game.sessionsList.Add(tmp);
                _game.sessionNickNames.Clear();
            }

            _game.nickNames.Add(nickname);
            //else
            //{
            //    _nickName.Add(nickname);
            //    var tmp = new Player(Context.ConnectionId, nickname);
            //    playersList.Add(tmp);
            //}

            await Clients.Caller.SendAsync("HideLoginMenu", "Hide OK");

            if (_game.nickNames.Count%2!=0)
            {
                await Clients.Caller.SendAsync("Info", "Waiting for the second player...");
            }


            await Clients.All.SendAsync("AuthNum", $"{_game.nickNames.Count}");

            await Clients.AllExcept(new List<string> { Context.ConnectionId }).SendAsync("AddPlayer", $"player {nickname} added");

            await OpenField();

            //await StartTHeGame(isFirstPlayerMove);


        }

        public async Task OpenField()
        {
            if(_game.sessionsList.Count>=1)
            {
                _game.startGameSession = true;
                List<string> SessionPlayerIds = new List<string>();
                SessionPlayerIds.Add(_game.sessionsList[_game.sessionsList.Count - 1].Player1.Id);
                SessionPlayerIds.Add(_game.sessionsList[_game.sessionsList.Count - 1].Player2.Id);

                await Clients.Clients(SessionPlayerIds).SendAsync("OpenField", _game.startGameSession);
            }


        }
    }
}
