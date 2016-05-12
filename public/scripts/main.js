$(document).ready(function () {
  var $find = $("#find");
  var reviewers = [
    "Aaron Mitchell (aaron)",
    "Stephanie Yang (stpyang)",
    "Berk Kapicioglu (berk)",
    "Scott Snyder (ss)"
  ];

  $find.click(function() {
    $find.attr('disabled', true);
    var reviewer = reviewers[Math.floor(Math.random() * 4)];
    $find.after(reviewer);
  })
});
