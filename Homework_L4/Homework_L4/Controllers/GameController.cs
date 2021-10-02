using Homework_L4.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Homework_L4.Controllers
{
    public class GameController : Controller

    {

        public IActionResult Index()
        {
            return View();
        }



    }
}
