
/******************************************************************************
 initializing slick 
******************************************************************************/
$(document).ready(function(){
    $('.plan-contents').slick({
        autoplay: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 5000,
    });
  });

 /******************************************************************************
 faq accordion 
******************************************************************************/
$('.faq-contents-item').click(function(){

    var $answer = $(this).find('.faq-contents-item-answer');

    if($answer.hasClass('open')){
        $answer.removeClass('open');
        $answer.slideUp();
    }
    else{
        $answer.addClass('open');
        $answer.slideDown();
    }
});