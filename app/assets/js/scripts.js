// main js file
$(function(){
  $("#scroll-spy li a[href^='#']").on('click', function(e) {
    console.log('ishihara');
     e.preventDefault();
     var hash = this.hash;
     console.log(hash);
     $('html, body').animate({
         scrollTop: $(this.hash).offset().top
       }, 300, function(){
         window.location.hash = hash;
       });
  });
  new WOW().init();
})
