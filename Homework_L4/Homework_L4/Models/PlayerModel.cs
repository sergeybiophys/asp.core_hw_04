using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homework_L4.Models
{
    public class PlayerModel
    {
        public string Id { get; set; }

        public string NickName { get; set; }

        public PlayerModel(string id, string nickname)
        {
            this.Id = id;
            this.NickName = nickname;
        }
    }
}
