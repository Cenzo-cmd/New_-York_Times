var searchResult = "";
var numberOfEntries = 0;
var beginYear = "";
var endYear = "";
var apiKey = "CHnB1Q8j10EP9bQegGZ9sUeMMGgLiOn3";
var baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=" + apiKey;

$("#searchButton").on("click", function(event) {
    event.preventDefault();
    var newURL = baseURL + "&q=" + searchResult;
    searchResult = $("#searchBox").val().trim().toLowerCase();
    beginYear = $("#startYear").val();
    endYear = $("#endYear").val();
    numberOfEntries = $("#entries").val();
    $("#searchBox").val("");
    $("#startYear").val("");
    $("#endYear").val("");

    if (beginYear) {
        newURL = newURL + "&begin_date=" + beginYear + "0101";
    }

    if (endYear) {
        newURL = newURL + "&end_date=" + endYear + "0101";
    }

    if (searchResult === "") {
        alert("Please enter a valid selection");
        return;
    }

    if (beginYear.length != 4 && beginYear != "" && beginYear) {
        alert("Please enter a valid 4 Digit start year");
        return;
    }
    if (endYear.length != 4 && endYear != "") {
        alert("Please enter a valid 4 Digit end year.");
        return;
    }

    if (searchResult) {
        initializeSearch(newURL, numberOfEntries);
    }

});

function initializeSearch(newURL, numberOfEntries) {
    $("#attachHere").empty();

    $.ajax({
        url: newURL,
        method: "GET"
    }).then(function(response) {

        for (var i = 0; i < numberOfEntries; i++) {
            let responseItems = response.response.docs;
            let divElBody = $("<div>").addClass("card-body card bg-light").attr("id", "article-" + i);
            let aEl = $("<a>").attr("href", responseItems[i].web_url).attr("target", "_blank").text(responseItems[i].web_url)
            divElBody.append("<h3>" + responseItems[i].headline.main);
            divElBody.append("<h5>" + responseItems[i].byline.original);
            divElBody.append("<h6>" + responseItems[i].news_desk);
            divElBody.append("<h6>" + responseItems[i].lead_paragraph);
            divElBody.append("<h6>" + responseItems[i].pub_date);
            divElBody.append(aEl);
            $("#attachHere").append(divElBody);
        }
    })
}