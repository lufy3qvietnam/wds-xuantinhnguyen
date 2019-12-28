

$(document).ready(function () {
    $('.image-box').on('click', (event) => {
        var link = $(event.target).attr('src');
        const el = document.createElement('textarea');
        el.value = "http://"+location.hostname+":"+location.port + link;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Đã copy thành công vào clipboard')
    })
})