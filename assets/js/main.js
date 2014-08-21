!function ($) {

  "use strict";

  var bEvent = function () {

    // A jQuery plugin for fluid width video embeds
    function responsiveVideo() {
      if ($.fn.fitVids) {
        $(".video").fitVids()
      }
    }
    // A jQuery plugin to create and manage Google Maps to jQuery
    function googleMap() {
      var ourAddress = $("#ourLocation").data("location") || "earth";
      function getLatLong(address) {
        var geo = new google.maps.Geocoder;
        geo.geocode({
          'address': address
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $("#map").gmap3({
              map: {
                options: {
                  maxZoom: 14,
                  streetViewControl: true,
                  panControl: true,
                  panControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                  },
                  zoomControl: true,
                  zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.LEFT_CENTER
                  },
                  mapTypeControl: true,
                  scrollwheel: false,
                  disableDoubleClickZoom: true
                }
              },
              streetviewpanorama: {
                options: {
                  container: $("#streetView"),
                  opts: {
                    position: results[0].geometry.location,
                    pov: {
                      heading: 34,
                      pitch: 10,
                      zoom: 0
                    }
                  }
                }
              }
            }, "autofit");
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        })
      }
      if ($.fn.gmap3) {
        getLatLong(ourAddress)
      }
    }
    // A custom select for Bootstrap using button dropdown
    function selectpicker() {
      if ($.fn.selectpicker) {
        $(".selectpicker").selectpicker()
      }
    }
    // A jQuery plugin for the navigation on one-page sites
    function navigation() {
      if ($.fn.onePageNav && $("#nav").length) {
        $('#nav').onePageNav({
          currentClass: 'active',
          scrollSpeed: 600,
          scrollOffset: 60,
          scrollThreshold: 0.2,
          easing: 'swing'
        })
      }
    }
    // Date countdown plugin for jQuery
    function countdown() {
      var count = $('#countdown');
      if ($.fn.countdown && count.length) {
        count.countdown(count.data("date"), function (event) {
          var $this = $(this);
          switch (event.type) {
          case "seconds":
          case "minutes":
          case "hours":
          case "days":
          case "weeks":
          case "daysLeft":
            $this.find('p#' + event.type).html(event.value);
            break;
          case "finished":
            $this.hide();
            break;
          }
        });
      }
    }
    // Preloader
    function preloader() {
      $(window).load(function () {
        $(".preloader").fadeOut()
        $("body").removeClass("remove-scroll")
      });
    }
    // A jQuery plugin that enables HTML5 placeholder behavior for browsers that aren’t trying hard enough yet
    function placeholderIE() {
      if ($.fn.placeholder) {
        $("input, textarea").placeholder()
      }
    }
    // validation and sending forms
    function validateAndSend() {
      $.validate({
        form: '#registrationForm',
        validateOnBlur: false,
        addSuggestions: false,
        onSuccess: function () {
          var name = $("#regName").val(),
            email = $("#regMail").val(),
            phone = $("#regPhone").val(),
            plan = $("#regPlan").val(),
            allData = 'name=' + name + '&email=' + email + '&phone=' + phone + '&plan=' + plan;
          $.ajax({
            type: "POST",
            url: "php/register.php",
            data: allData,
            success: function () {
              $(".register").addClass("success")
              $("#regName").val("")
              $("#regMail").val("")
              $("#regPhone").val("")
            }
          });
          return false;
        }
      })

      var messageForError = $(".help-block");
      $.validate({
        form: "#subscribeForm",
        errorMessagePosition: messageForError,
        onSuccess: function () {
          var sEmail = $("#sEmail").val(),
            allData = 'sEmail=' + sEmail;
          $.ajax({
            type: "POST",
            url: "php/subscribe.php",
            data: allData,
            success: function () {
              $(".subscribe .form-wrapper").addClass("success")
              $("#sEmail").val("")
            }
          });
          return false;
        }
      })
    }
    // Reveal Animations When You Scroll
    function wow() {
      $(window).load(function () {
         new WOW().init()
      });     
    }
    // Custom scripts
    function app() {
      $("#back").on("click", function () {
        $(".register").removeClass("success")
      })
    }
    // Return all functions
    return {
      init: function () {
        preloader()
        responsiveVideo()
        googleMap()
        selectpicker()
        navigation()
        countdown()
        placeholderIE()
        validateAndSend()
        wow()
        app()       
      }
    }
  }();

  $(function () {
    // Launch functions
    bEvent.init()
  })
}(window.jQuery);