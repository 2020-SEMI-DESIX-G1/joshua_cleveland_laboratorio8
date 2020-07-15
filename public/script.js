

function deletestudent(id){
    $.ajax({
        url: '/estudiantes/' + id,
        type: 'DELETE',
        success: function(result) {
            window.location.replace("/");
        }
    });
}