$(document).ready(function() {
    $('#randomForm').submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      // Add the class 'hideDiv' to the targeted div
      $('#randomDiv').addClass('hideDiv');
      $('#randomResult').toggle('hideDiv');
    });
  });

  $(document).ready(function() {
    $('#nameForm').submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      // Add the class 'hideDiv' to the targeted div
      $('#nameDiv').addClass('hideDiv');
      $('#nameResult').toggle('hideDiv');
    });
  });