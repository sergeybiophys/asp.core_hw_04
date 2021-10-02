using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homework_L4.Models
{
    public class GameModel
    {
        public string player1Symbol = "X";
        public string player2Symbol = "O";
        public PlayerModel Player1;
        public PlayerModel Player2;
        public int CountOfConnections = 0;
        public HashSet<string> ConnectedIds = new HashSet<string>();
        public List<PlayerModel> players = new List<PlayerModel>();
        public List<string> nickNames = new List<string>();
        public List<string> sessionNickNames = new List<string>();
        public bool startGameSession = false;
        public bool isFirstPlayerMove = false;
        public bool isDisableField = true;
        public bool isEnableField = true;
        public List<GameSessionModel> sessionsList = new List<GameSessionModel>();
        public GameModel()
        {
           Player1 = new PlayerModel();
           Player2 = new PlayerModel();
        }
    }
}
