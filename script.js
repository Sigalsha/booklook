
var source = $('#book-template').html();
var template = Handlebars.compile(source);

var fetch = function () {
  $.ajax({
    method: "GET",
    url: createUrl(),
    success: function (data) {
      //loop over all items
      //invoke something to show each item
      for (i = 0; i < data.items.length;i++) {
        newBook(infoObj(data.items[i].volumeInfo));
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

$('.btn').on('click', function () {
  fetch();
});

var newBook = function (obj) {
  var newHTML = template(obj);
  $('.books-container').append(newHTML);
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

var createUrl = function() {
    var isbnNum = $('#search').val();
    var baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
    var newUrl = baseUrl + isbnNum;
    return newUrl;
};
// Create a function that will create and append a new book 
// to the page based on the response from the Google Books API. 
// Invoke this function within the ajax success callback.

        // var title = data.items[0].volumeInfo.title;
        // const authors = data.items[0].volumeInfo.authors;  
        // var description = data.items[0].volumeInfo.description;
        // var image = data.items[0].volumeInfo.imageLinks.smallThumbnail;
        // console.log(title);
        // console.log(authors);
        // console.log(description);
        // console.log(image);