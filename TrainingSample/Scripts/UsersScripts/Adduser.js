function InsertUser() {
    debugger;
    var userName = $("#AName").val();
    var Email = $("#ALat").val();
    var Address = $("#ALong").val();
    var image = $("#image").val();
    var civilId = $("#CivilName").val();
    var carlicense = $("#CName").val();
    //var input = document.getElementById(inputId);
    //var files = input.files;
    //var formData = new FormData();

    ///  get var values 

    //var url = "@Url.Action("InsertuS", "Index")" 
    $.ajax({
        url: '/Index/InsertuS',
        type: 'POST',
        data: JSON.stringify({
            FullName: userName,
            UserEmail: Email,
            Address: Address,
            ProfilePic: image,
            CivilIdNumber: civilId,
            CarLicense: carlicense

        }),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (data) {
            //$("#addUser").hide();
            //$("#addUser").addClass('hide');
        }

    });
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

