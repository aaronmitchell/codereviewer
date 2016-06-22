$(document).ready(function () {
  var $nameFormRow = $("#nameFormRow");
  var $nameForm = $("#nameForm");
  var $name = $("#name");


  var $searchRow = $("#searchRow");
  var $search = $("#search");
  var $searchProgress = $("#searchProgress");
  var $progressBar = $("#progressBar");
  var $progressFlavorText = $("#progressFlavorText");
  var $result = $("#result");
  var $resultCandidate = $("#resultCandidate");

  var reviewers = [
    {name: "Aaron Mitchell", alias: "aaron"},
    {name: "Stephanie Yang", alias: "stpyang"},
    {name: "Berk Kapicioglu", alias: "berk"},
    {name: "Scott Snyder", alias: "ss"},
    {name: "Enrique Cruz", alias: "enriquecruz"}
  ];

  $search.click(function () {
    $search.attr('disabled', true);
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
        var reviewer = reviewers[Math.floor(Math.random() * reviewers.length)];
        $resultCandidate.text(reviewer.name + " (" + reviewer.alias + ")");
        $result.show();
      } else if (now >= animatePhaseThreeStart) {
        $progressFlavorText.text("Filtering qualified candidate list...")
      } else if (now >= animatePhaseTwoStart) {
        $progressFlavorText.text("Analyzing candidates' previous phabricator reviews...")
      }
    }, 100);
    $progressBar.addClass("grow");
  });

  function removeReviewer(name) {
    var nameSegments = _.map(name.split(" "), function (segment) {
      return segment.toLowerCase();
    });
    _.remove(reviewers, function (reviewer) {
      var reviewerNameSegments = _.union(
        _.map(reviewer.name.split(" "), function (segment) {
          return segment.toLowerCase();
        }),
        reviewer.alias
      );
      return _.intersection(nameSegments, reviewerNameSegments).length !== 0
    });
  }

  $nameForm.submit(function () {
    var name = $name.val();
    Cookies.set('name', name, {expires: 365});
    removeReviewer(name);
    $nameForm.hide();
    $searchRow.show();
    $search.click();
    return false;
  });

  var cookieName = Cookies.get('name');
  if (cookieName) {
    removeReviewer(cookieName);
    $searchRow.show();
  } else {
    $nameFormRow.show();
  }
});
