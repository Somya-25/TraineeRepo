using PagedList;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrainingSample.Entities;
using TrainingSample.Repository;

namespace TrainingSample.Controllers
{
    public class IndexController : Controller
    {
        IUserDetails userDetails = new UserDetailsRepository();
        // GET: Index
        public ActionResult Index(int page = 1, int pageSize = 10)
        {
            var udetails = userDetails.GetUserDetails();
            PagedList<UserDetails> model = new PagedList<UserDetails>(udetails, page, pageSize);
            return View(model);
        }

        [HttpPost]
        public ActionResult InsertuS(UserDetails insert)
        {

            if (ModelState.IsValid)
            {
                userDetails.GetInsertDetail(insert);
            }
            return RedirectToAction("Index");
        }

        //delete 
        [HttpPost]
        public ActionResult DeleteuS(int? id)
        {
            userDetails.GetDeleteDetail(id);

            return RedirectToAction("Index");
        }



    }
}