
  
  $(document).ready(function(){
    
$('.done-bill').on('click',function(event){
    bill_id = $(event.target).attr('id');
    $.ajax({
        url: "bill/done",
        method:"post",
        data :{id:bill_id},
        success: function(response){
            if(response.success===true){
                $('#tr-'+bill_id).addClass('done-bills');
                $('#'+bill_id).remove()
            }
            else{
               
                //handle modal box cho xoa that bai
            }
        }
    })
  })

  $('.delete-bill').on('click',(event)=>{
    var bill_id = $(event.target).attr('id');
    console.log(bill_id)
    $.ajax({
        url: "bill/delete",
        method:"post",
        data :{id:bill_id},
        success: function(response){
            if(response.success===true){
                $(`#tr-${bill_id}`).remove();
            }
            else{
               
              }
        }
    })
  })
})