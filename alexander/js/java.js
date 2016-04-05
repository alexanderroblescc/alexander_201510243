$(document).ready(Function(){

   var flag = false;
    var scroll;

    $(window).scroll(Function(){

        scroll = $(window).scrolltop();

        if(scroll > 200){
            $("#logo").css({"margin-top": "-5px", "width": "5opx", "height": "50px"});
        }else{
            $("#logo").css({"margin-top": "150px", "width": "25opx", "height": "250px"});
        }
    })
});
