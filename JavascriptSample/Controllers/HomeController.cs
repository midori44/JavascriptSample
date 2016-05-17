using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JavascriptSample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult React()
        {
            return View();
        }












        public ActionResult Backbone()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Knockout()
        {
            ViewBag.Message = "Your contact page.";


            //var hoges = new Hoge[] {
            //    new Hoge { id = 1, state = true },
            //    new Hoge { id = 2, state = true },
            //    new Hoge { id = 3, state = true },
            //    new Hoge { id = 4, state = true },
            //    new Hoge { id = 5, state = false },
            //    new Hoge { id = 6, state = false },
            //    new Hoge { id = 7, state = false },
            //    new Hoge { id = 8, state = false },
            //    new Hoge { id = 9, state = null },
            //    new Hoge { id = 10, state = null }
            //};

            //ViewBag.Params = Json(hoges);
            //ViewBag.CountA = hoges.Count(x => x.state == true);
            //ViewBag.CountB = hoges.Count(x => x.state == false);
            return View();
        }

        [HttpPost]
        public JsonResult Api()
        {
            var hoges = new Hoge[] {
                new Hoge { id = 1, state = true },
                new Hoge { id = 2, state = true },
                new Hoge { id = 3, state = true },
                new Hoge { id = 4, state = true },
                new Hoge { id = 5, state = false },
                new Hoge { id = 6, state = false },
                new Hoge { id = 7, state = false },
                new Hoge { id = 8, state = false },
                new Hoge { id = 9, state = null },
                new Hoge { id = 10, state = null }
            };

            return Json(hoges);
        }
        internal class Hoge
        {
            public int id;
            public bool? state;
        }
    }
}