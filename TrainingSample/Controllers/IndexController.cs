using PagedList;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
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
        public ActionResult InsertuS(UserDetails insert, string ProfilePic)
        {

            string base64 = ProfilePic.Substring(ProfilePic.IndexOf(',') + 1);

            byte[] chartData = Convert.FromBase64String(base64);

            Image image;
            using (var ms = new MemoryStream(chartData, 0, chartData.Length))
            {
                image = Image.FromStream(ms, true);

            }
            var randomFileName = Guid.NewGuid().ToString().Substring(0, 4) + ".png";
             var fullPath = Path.Combine(Server.MapPath("~/Scripts/UserImages/"), randomFileName);
            
            image.Save(fullPath, System.Drawing.Imaging.ImageFormat.Png);
            insert.ProfilePic = randomFileName;
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
        [HttpPost]
        public ActionResult EdituS(int? id ,UserDetails insert )
        {
            userDetails.PostEditDetail(id,insert);
            return RedirectToAction("Index ");
        }
       


    }
}