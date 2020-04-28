// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".postcoment").on("click", function () {
    console.log("hi");
    var target = event.target;
    var buttonValue = target.getAttribute("name");
    var classfull = "#commentsection" + buttonValue;
    $(classfull).css("display", "block");

    console.log(buttonValue);
  });
});

// $(function() {
//     $(".eatit").on("click", function(event) {
//       var id = $(this).data("id");
//       var newdev = $(this).data("newdev");

//       var newdevState = {
//         devoured: newdev
//       };

//       // Send the PUT request.
//       $.ajax("/api/updateburger/" + id, {
//         type: "PUT",
//         data: newdevState
//       }).then(
//         function() {

//           // Reload the page to get the updated list
//           location.reload();
//         }
//       );
//     });
//   $(".deleteit").on("click", function(event){
//     var id = $(this).data("id");

//    $.ajax("/api/deleteburger/" + id, {
//     type: "DELETE"
//   }).then(
//     function() {

//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );

//   });
//     $(".burger-form").on("submit", function(event) {
//       // Make sure to preventDefault on a submit event.
//       event.preventDefault();

//       var newburger = {
//         name: $("#burger").val().trim()
//       };

//       // Send the POST request.
//       $.ajax("/api/addburger", {
//         type: "POST",
//         data: newburger
//       }).then(
//         function() {

//           location.reload();
//         }
//       );
//     });
//   });
