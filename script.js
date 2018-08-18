
var source = $('#book-template').html();
var template = Handlebars.compile(source);

var fetch = function () {
  $('.books-container').html('Loading, count to 5...');
  $.ajax({
    method: "GET",
    url: createUrl(),
    success: function (data) {
      //loop over all items
      //invoke something to show each item
      renderItems(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      $('.books-container').html('It seems that something is not working...Try refreshing the page');
    }
  });
};

var infoObj = function(info) {
  var obj = {
    title: info.title,
    authors: info.authors,
    description: info.description,
    image: info.imageLinks.smallThumbnail
  }
  return obj;
};

var renderItems = function (data) {
  let loopCount;
  if (data.items.length <= 10) {
    loopCount = data.items.length;
  } else {
    loopCount = 10;
  }

  for (i = 0; i < loopCount; i++) {
      newBook(infoObj(data.items[i].volumeInfo));
  } 
};

var createUrl = function() {
    var bookTitle = $('#search').val();
    var baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
    var newUrl = baseUrl + bookTitle;
    return newUrl;
};

$('.btn').on('click', function () {
  fetch();
});

var newBook = function (obj) {
  var newHTML = template(obj);
  $('.books-container').append(newHTML);
};


