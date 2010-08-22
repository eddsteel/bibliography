// helper: display bib item (will go)
//
function display(item) {
  alert("Bibliography Item\r\n" + 
    "Author\t\t : " + item.author + "\r\n"+
    "Title\t\t\t : " + item.title + "\r\n"+
    "Publisher\t\t : " + item.publisher + "\r\n"+
    "Year\t\t\t : " + item.year + "\r\n"+
    "Record URL\t : " + item.url
    );
}

/**
 * Bibliography item
 *
 * Pulls data fields out of current page. Available
 * as the details field.
 */
function BibliographyItem()
{
  var extractField = function(name) {
    return $('td:contains('+name+')').next().text().trim()
  }

  var publisherYear = (function() {
    publisher = extractField("Publisher/year") 
    year = '????'
    arr = /^(.*),[\s]*([0-9]{0,4})\.?$/(publisher)
    if (arr && arr.length >= 3)
    {
      publisher = arr[1]
      year = arr[2]
    }

    return [publisher, year]
  })()

  return {
    author: extractField('Author'),
    title: extractField('Title'),
    publisher : publisherYear[0],
    year: publisherYear[1],
    url: window.location
  }
}

// load 'er up.
(function() {
  jqURL = "http://localhost/p/bibliography/jquery-1.4.2.js"
  head = document.getElementsByTagName("head")[0],
  script = document.createElement("script")
  script.type = "text/javascript"
  script.src = jqURL
  head.appendChild(script)
  script.onload = function() {
    display(new BibliographyItem())
  }
})();