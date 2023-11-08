console.log("heloo");
// $(document).ready(function(){
//     $(".owl-carousel").owlCarousel();
    
//   });
  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 3, // Number of items to display by default
        loop: true, // Infinite loop
        margin: 10, // Space between items
        responsive: {
            0: {
                items: 1, // 1 item in the carousel for small screens
            },
            576: {
                items: 2, // 2 items for screens wider than 576px
            },
            992: {
                items: 3, // 3 items for screens wider than 992px
            }
            
        }
    });
});
  // Initiate the venobox plugin
  $(window).on('load', function() {
    $('.venobox').venobox();
  });