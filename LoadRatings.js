function loadRatings() {

    // Get the articles and their ratings from the XML file
    let xhr = new XMLHttpRequest(), returnedData;
    xhr.open('get', 'ratings.xml');
    xhr.onreadystatechange = function () {
        const DONE = 4, OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                returnedData = xhr.responseXML;
                let ratesMap = [];

                for (let i = 0; i < 5; i++) {

                    // Get rating data from XML
                    const article = returnedData.getElementsByTagName('article')[i];
                    const articleNo = article.childNodes[0].textContent;
                    ratesMap[articleNo] = article.childNodes[1].textContent;
                }

                // Display the articles from best to worst
                let i;
                for (i = 1; i < 6; i++) {
                    displayArticleStub(i, ratesMap[i]);
                }
            } else {
                alert('Error: ' + xhr.status);
            }
        }

    };

    xhr.send();
}


function displayArticleStub(currentArticle, rating) {
    const xhr2 = new XMLHttpRequest();

    xhr2.open('get', 'articles/article-' + currentArticle + '.json');

    // Track the state changes of the request.
    xhr2.onreadystatechange = function () {
        const DONE = 4, OK = 200;
        if (xhr2.readyState === DONE) {
            if (xhr2.status === OK) {
                let articleStub = '<section class="articleStub">';
                const jsonData = JSON.parse(xhr2.responseText);
                let i, availableImage = false;
                for (i = 0; i < jsonData.body.length; i++) {
                    // If the article contains an image, use the first one as a thumbnail
                    if (jsonData.body[i].type === "image" && !availableImage) {
                        availableImage = true;
                        const src = jsonData.body[i].model.url;        // Src of image
                        const alt = jsonData.body[i].model.altText;    // Alt tag of image

                        articleStub = articleStub.concat('<img  class="thumbnail" src="' + src + '" alt="' + alt + '">');
                    }
                }

                // If the article does not contain an image just use a placeholder
                if (!availableImage) {
                    articleStub = articleStub.concat('<img  class="thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt="No image available">')
                }

                // Add the rating to the article stub


                // Add the title to the article stub
                articleStub = articleStub.concat('<p>' + jsonData.title + ' - ' + '<b>'+rating + ' star(s)' + '</b></p>');


                document.getElementById('ratings').innerHTML = document.getElementById('ratings').innerHTML.concat(articleStub);
            } else {
                alert('Error: ' + xhr2.status); // Something went wrong trying to get the file if this happens!
            }
        }
    };
    xhr2.send(null); // Send the request

}

