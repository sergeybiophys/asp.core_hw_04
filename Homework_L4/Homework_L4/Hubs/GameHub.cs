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
    }
}
