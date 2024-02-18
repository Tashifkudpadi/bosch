$(document).ready(function () {
 let offset = { offset: "99%" };
 // 1
 $('.banner_heading').waypoint(function (direction) {
  $('.banner_heading').addClass("animate__animated animate__fadeInDownBig animate__slow animate__easeOut");
 }, offset);
 // 2
 $('.card-contents').each(function () {
  let card = $(this);
  card.waypoint(function (direction) {
   card.addClass("animate__animated animate__backInUp animate__slow animate__easeOut");
  }, offset);
 });
 // 3
 $('.section_two_bottom_text').waypoint(function (direction) {
  if (direction === 'down') {
   $(this.element).addClass("animate__animated animate__fadeInBottomLeft animate__slow animate__easeOut");
  } else {
   $(this.element).removeClass("animate__animated animate__fadeInBottomLeft animate__slow animate__easeOut");
  }
 }, offset);

 $('.section_two_bottom_text_strong').waypoint(function (direction) {
  if (direction === 'down') {
   $(".section_two_bottom_text_strong").addClass("animate__animated animate__fadeInBottomLeft animate__bounceInLeft animate__slow animate__easeOut");
  } else {
   $(".section_two_bottom_text_strong").removeClass("animate__animated animate__fadeInBottomLeft animate__bounceInLeft animate__slow animate__easeOut");
  }
 }, offset);
 // 4
 // const animateWaypoint = (selector, offset) => {
 //  $(selector).waypoint(function (direction) {
 //   if (direction === 'down') {
 //    $(this.element).addClass("animate__animated animate__flipInX animate__slow animate__easeOut");
 //   } else {
 //    $(this.element).removeClass("animate__animated animate__flipInX animate__slow animate__easeOut");
 //   }
 //  }, offset);
 // };

 // animateWaypoint('.expediate_head-1', '99%');
 // animateWaypoint('.expediate_head-2', '97%');
 // animateWaypoint('.expediate_head-3', '95%');
 $('.expediate_head-1').waypoint(function (direction) {
  if (direction === 'down') {
   $(".expediate_head-1").addClass("animate__animated animate__flipInX animate__slow animate__easeOut");
  } else {
   $(".expediate_head-1").removeClass("animate__animated animate__flipInX animate__slow animate__easeOut");
  }
 }, offset);
 $('.expediate_head-2').waypoint(function (direction) {
  if (direction === 'down') {
   $(".expediate_head-2").addClass("animate__animated animate__flipInX animate__slow animate__easeOut");
  } else {
   $(".expediate_head-2").removeClass("animate__animated animate__flipInX animate__slow animate__easeOut");
  }
 }, { offset: "98%" });
 $('.expediate_head-3').waypoint(function (direction) {
  if (direction === 'down') {
   $(".expediate_head-3").addClass("animate__animated animate__flipInX animate__slow animate__easeOut");
  } else {
   $(".expediate_head-3").removeClass("animate__animated animate__flipInX animate__slow animate__easeOut");
  }
 }, { offset: '96%' });

 // 5 typing effect
 // $('.gradient-background').waypoint(function (direction) {
 //  if (direction === 'down') {
 //   $('.gradient-cognizance').hide();

 //   const typingContainer = document.querySelector('.typing-container');
 //   const options = {
 //    strings: ['Sustainability with...'],
 //    typeSpeed: 80,
 //    backSpeed: 20,
 //    showCursor: false,
 //    onComplete: function () {
 //     $('.gradient-cognizance').show().addClass('animate__animated animate__zoomIn animate__slow animate__easeOut');
 //     typingContainer.style.display = 'none';
 //    },
 //   };
 //   const typed = new Typed('#typing', options);

 //   this.destroy();
 //  }
 // }, { offset: '40%' });

 // 6
 $('.sds-heading-1').waypoint(function (direction) {
  if (direction === 'down') {
   $(".sds-heading-1").addClass("animate__animated  animate__bounceInLeft animate__slow animate__easeOut");
   $(".sds-heading-2").addClass("animate__animated  animate__bounceInRight animate__slow animate__easeOut");
  } else {
   $(".sds-heading-1").removeClass("animate__animated  animate__bounceInLeft animate__slow animate__easeOut");
   $(".sds-heading-2").removeClass("animate__animated  animate__bounceInRight animate__slow animate__easeOut");
  }
 }, offset);

 // 7
 $('#step').waypoint(function (direction) {
  if (direction === 'down') {
   $(".step-heading-1").addClass("animate__animated animate__fadeInUpBig  animate__slow animate__easeOut");
   $(".step-heading-2").addClass("animate__animated animate__fadeInUpBig  animate__slow animate__easeOut");
  } else {
   $(".step-heading-1").removeClass("animate__animated animate__fadeInUpBig  animate__slow animate__easeOut");
   $(".step-heading-2").removeClass("animate__animated animate__fadeInUpBig  animate__slow animate__easeOut");
  }
 }, offset);
 // 8
 $('.footer-text').waypoint(function (direction) {
  $(".footer-text").addClass("animate__animated animate__fadeInUpBig animate__bounceInLeft animate__slow animate__easeOut");
 }, offset);

 // 7
 $('.video-section').waypoint(function (direction) {
  if (direction === 'down') {
   const video = document.querySelector('.video');
   video.play();
   // Remove waypoint to prevent unnecessary playback
   this.destroy();
  }
 }, offset);
 // 8
 $('.video-section-2').waypoint(function (direction) {
  if (direction === 'down') {
   const videoTwo = document.querySelector('.video-2');
   videoTwo.play();
   // Remove waypoint to prevent unnecessary playback
   this.destroy();
  }
 }, offset);
});
