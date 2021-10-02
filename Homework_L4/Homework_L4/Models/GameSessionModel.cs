using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homework_L4.Models
{
    public class GameSessionModel
    {
        public PlayerModel Player1;
        public PlayerModel Player2;

        public GameSessionModel(PlayerModel player1, PlayerModel player2)
        {
            this.Player1 = player1;
            this.Player2 = player2;
        }
    }
}
