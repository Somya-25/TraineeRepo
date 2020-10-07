function InsertUser() {
    debugger;
    var userName = $("#AName").val();
    var Email = $("#ALat").val();
    var civilid = $("#CivilName").val();
    var carLicense = $("#CName"). val();
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
        async: false,
        success: function (data) {
            //$("#addUser").hide();
            //$("#addUser").addClass('hide');
            $('#addUser').modal('hide');

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




function EditUser(id, name, email, carLicense) {
    //debugger;
    $('input#gid.form-control').val(id);
    $('input#AName.form-control').val(name);
    $('input#ALat.form-control').val(email);
    $('input#CName.form-control').val(carLicense);
    $('input#CivilName.form-control').val(CivilIdNumber);
    
}



function Update() {
    debugger;
    // $('input#gid').val(id);
    // var name = $('#AName.form-control').val(name);
    //var email = $('#ALat.form-control').val(email);
    //var carLicense = $('#ACar.form-control').val(carLicense);
    var id = $("#gid").val();
    
    var name = $("#AName").val();
    var email = $("#ALat").val();
    var carLicense = $("#CName").val();
    var CivilIdNumber = $("#CivilName").val();

    $.ajax({
        url: '/Index/EdituS',
        type: 'POST',
        data: JSON.stringify({
            UserId: id,
            FullName: name,
            UserEmail: email,
            CarLicense: carLicense,
            CivilIdNumber: CivilIdNumber

        }),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            $("#editUser").hide();
            $("#editUser").addClass('hide');
        }

    });
}
