var currentArticle = 0, currentRating = 0;

function loadArticleStub(article) {
    currentArticle = article;

    // Clear old rating before adding new ones
    if(currentArticle === 1){
        clearXML();
    }

    // Set the title
    document.title = "BBC Coding Test | Rating " + currentArticle;

    const xhr = new XMLHttpRequest();

    xhr.open('get', 'articles/article-' + currentArticle + '.json');

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        const DONE = 4, OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var articleStub;
                // xhr.responseText is the content of the .json file
                // Also.... why are all the articles in latin???
                // Emptying the html file first just in case...

                document.getElementById('articleStub').innerHTML = "";

                const jsonData = JSON.parse(xhr.responseText);

                let i, availableImage = false;
                for (i = 0; i < jsonData.body.length; i++) {
                    if (jsonData.body[i].type === "image" && !availableImage) {
                        availableImage = true;
                        var src = jsonData.body[i].model.url;        // Src of image
                        var alt = jsonData.body[i].model.altText;    // Alt tag of image

                        articleStub = ('<img  class="thumbnail" src="' + src + '" alt="' + alt + '">');
                    }


                }

                // If the article does not contain an image just use a placeholder
                if (!availableImage) {
                    articleStub = ('<img  class="thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt="No image available">')
                }

                // Add the title to the article stub
                articleStub = articleStub.concat('<p>' + jsonData.title + '</p>');
                document.getElementById('articleStub').innerHTML = articleStub;
            } else {
                alert('Error: ' + xhr.status); // Something went wrong trying to get the file if this happens!
            }
        }
    };
    xhr.send(null); // Send the request
}

function rateArticle() {
    if (currentRating !== 0) {
        // Submit the rating
        submitRating();
        // Load the next article
        if (currentArticle < 5 && currentArticle > 0) {
            setRating(0);
            loadArticleStub(currentArticle + 1);
        } else if (currentArticle === 5) {
            window.location.href = "displayRatings.html";
        } else {
            console.log("The current article number exceed the boundaries! currentArticle: " + currentArticle);
        }
    } else {
      alert('Select a rating');
    }
}

function setRating(rating) {
    currentRating = rating;
}

function submitRating() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'appendRating.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
    };
    xhr.send("article=" + currentArticle + "&rating=" + currentRating);
}

function clearXML() {
    var clearReq = new XMLHttpRequest();
    clearReq.open('get', 'clearRatings.php');
    clearReq.onreadystatechange = function () {
        const DONE = 4, OK = 200;
        if (clearReq.readyState === DONE) {
            if (clearReq.status === OK) {

            } else {
                alert('Error: ' + clearReq.status); // Something went wrong trying to get the file if this happens!
            }
        }
    };
    clearReq.send(null);
}
