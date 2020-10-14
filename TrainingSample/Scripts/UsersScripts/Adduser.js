function InsertUser() {
    debugger;
    var userName = $("#AName").val();
    var Email = $("#ALat").val();
    var civilid = $("#CivilName").val();
    var carLicense = $("#CName").val();
    var imagenBase64 = $("#pImageBase64").html();

    $.ajax({
        url: '/Index/InsertuS',
        type: 'POST',
        data: JSON.stringify({
            FullName: userName,
            UserEmail: Email,

            ProfilePic: imagenBase64,
            CivilIdNumber: civilid,
            CarLicense: carLicense


        }),
        dataType: 'json',
        contentType: 'application/json',
        async: true,
        success: function (data) {
            debugger;
            //$("#addUser").addClass('hide');
            $('#addUser').modal('hide');
            //$('#addUser').Hide();

        }

    });

}
function encodeImagetoBase64(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        $("#image").attr("src", reader.result);
        $("#pImageBase64").html(reader.result);

    }
    reader.readAsDataURL(file);
}


function DeleteUser(Id) {
    debugger;
    var result = confirm('Are you sure you wish to delete this record?');
    if (result) {
        $.ajax({
            url: '/Index/DeleteuS?id=' + Id,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function (data) {
                window.reload();
                //$("#addUser").hide();
                //$("#addUser").addClass('hide');
            }

        });
    }

}

function EditUserDetails(Id) {
    debugger;
    $.ajax({
        url: '/Index/Edit?Id=' + Id,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        async: true,
        success: function (data) {
            debugger;
            console.log(data);

            $('#gid1').val(data.UserId);
            $('#AName1').val(data.FullName);
            $('#ALat1').val(data.UserEmail);
            $('#CivilName1').val(data.CivilIdNumber);


            var sno = 0;
            var div = $('#CName1');
            div.empty();

            data.CarDetails.forEach(function (event) {

                div.append("<label>CarLicense" + (sno + 1) + "</label>" +
                    "<input class='form-control' id='" + event.Id + "' name='CName1' type='text' value='" + event.CarNumberPlate + "' />");

                sno++;
            });
        }
        //$("#editUser").hide();
        //$("#editUser").addClass('hide');


    });
}


function Update() {
    debugger;
    var U = $("#gid1").val();
    var userName = $("#AName1").val();
    var Email = $("#ALat1").val();
    var CivilIdNumber = $("#CivilName1").val();
    var v = Array();
    $("input[name='CName1']").each(function () {
        v.push($(this).attr('id'));
        console.log(v);
    });


    var c = [];
    v.forEach(function (value) {
    c.push({
           Id: value,
            CarLicenseValue: $("#" + value).val()

        });
        console.log(c);
    });



    //c.push([this.attr(id), $(this).val()]);

    

    $.ajax({
        url: '/Index/Edit',
        type: 'POST',
        data: JSON.stringify({
            UserId: U,
            FullName: userName,
            UserEmail: Email,
            CivilIdNumber: CivilIdNumber,
            CarDetails: c,
        }),
        dataType: 'json',
        contentType: 'application/json',
        async: true,
        success: function (data) {
            debugger;
            //$("#addUser").addClass('hide');
            $('#editUser').modal('hide');
            //$('#addUser').Hide();

        }
        

    });
}


