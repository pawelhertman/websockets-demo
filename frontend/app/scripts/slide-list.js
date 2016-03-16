var SlideList = function () {
  var SLIDES_LIST_CONFIG_URL = '/config/slides.json';

  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', SLIDES_LIST_CONFIG_URL, true);

    req.onload = function () {
      if (req.status === 200) {
        var jsonObject = JSON.parse(req.responseText);

        resolve(jsonObject.slides);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function () {
      reject(Error('Failed to load slide ' + name));
    };

    req.send();
  });
};
