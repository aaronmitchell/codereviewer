$(document).ready(function () {
  var $find = $("#find");
  var $searchProgress = $("#searchProgress");
  var $progressBar = $("#progressBar");
  var $progressFlavorText = $("#progressFlavorText");
  var $result = $("#result");
  var $resultCandidate = $("#resultCandidate");

  var reviewers = [
    "Aaron Mitchell (aaron)",
    "Stephanie Yang (stpyang)",
    "Berk Kapicioglu (berk)",
    "Scott Snyder (ss)"
  ];

  $find.click(function () {
    $find.attr('disabled', true);
    $searchProgress.css('visibility', 'visible');

    var duration = 8000;
    var animateStart = Date.now();
    var animateEnd = animateStart + duration;

    var animatePhaseTwoStart = animateStart + (duration / 3);
    var animatePhaseThreeStart = animateStart + ((duration / 3) * 2);

    var animateInterval = window.setInterval(function () {
      var now = Date.now();
      $progressBar.text(
        Math.min(
          100,
          Math.floor(((now - animateStart) / duration) * 100)
        ) + "%"
      );
      if (now >= animateEnd) {
        window.clearInterval(animateInterval);
        $searchProgress.hide();
        var reviewer = reviewers[Math.floor(Math.random() * 4)];
        $resultCandidate.text(reviewer);
        $result.show();
      } else if (now >= animatePhaseThreeStart) {
        $progressFlavorText.text("Filtering qualified candidate list...")
      } else if (now >= animatePhaseTwoStart) {
        $progressFlavorText.text("Analyzing candidates' previous phabricator reviews...")
      }
    }, 100);

    $progressBar.addClass("grow");
  })
});
