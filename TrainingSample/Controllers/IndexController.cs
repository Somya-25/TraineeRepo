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
using TrainingSample.EntityFramework;
using TrainingSample.Repository;

namespace TrainingSample.Controllers
{
    public class IndexController : Controller
    {
        IUserDetails userDetails = new UserDetailsRepository();
        // GET: Index
        public ActionResult About()
        {
            return View();
        }
        public ActionResult GetData()
        {
            var udetails = userDetails.GetUserDetails();
            return Json(new { data = udetails }, JsonRequestBehavior.AllowGet);

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

        [HttpGet]
        public ActionResult Edit(int? id )
        {
            var user =userDetails.GetEditDetails(id);
            return Json(new { UserId = user.UserId, FullName = user.FullName, UserEmail = user.UserEmail, CivilIdNumber=user.CivilIdNumber, CarDetails = user.CarDetails }, JsonRequestBehavior.AllowGet);
        }
       
        [HttpPost]
        public ActionResult Edit(EditViewModel insert)
        {
            userDetails.PostEditDetail(insert);
            return RedirectToAction("Index ");
        }
    }

}
