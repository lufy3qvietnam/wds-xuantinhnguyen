$(document).ready(function(){
    $('.btn-del').on('click',function(){
        postId = $(this).attr('id');
        $.ajax({
            url: "products/delete",
            method:"post",
            data :{id:postId},
            success: function(response){
            
                if(response.success===true){
                    $('#td-'+postId).remove();
                }
                else{
                   
                    //handle modal box cho xoa that bai
                }
            }
        })
    })
})