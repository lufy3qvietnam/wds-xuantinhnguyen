$(document).ready(function () {
    $('.btn-del').on('click', function () {
            postId = $(this).attr('id');
            console.log(postId)
            $.ajax({
                    url: "/admin/teams/delete",
                    method: "post",
                    data: {
                            id: postId
                    },
                    success: function (response) {
                           
                            if (response.success === true) {
                                    $('#td-' + postId).remove();
                            } else {
                                    console.log('xoa that bai');
                                    //handle modal box cho xoa that bai
                            }
                    }
            })
    })
})