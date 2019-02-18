function displayArticles() {

    let i;
    for (i = 1; i <= 5; i++) {
        sendAJAX('articles/article-' + i + '.json');
    }


}

function sendAJAX(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        const DONE = 4, OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                const jsonData = JSON.parse(xhr.responseText);
                // List all of the article titles and images if there is one
                var previousArticles = document.getElementById('articleList').innerHTML, i, image,
                    availableImage = false;
                var newElement = '<li class="articleListItem">' ;

                // Build the html for the article to be displayed
                for (i = 0; i < jsonData.body.length; i++) {
                    if (jsonData.body[i].type === "image" && !availableImage) {
                        console.log('image found!');
                        availableImage = true;
                        var src = jsonData.body[i].model.url;        // Src of image
                        var alt = jsonData.body[i].model.altText;    // Alt tag of image

                        image = ('<img  class="thumbnail" src="' + src + '" alt="' + alt + '">');
                        newElement = newElement.concat(image);
                    }


                }

                // If the article does not contain an image just use a placeholder
                if (!availableImage) {
                    newElement = newElement.concat('<img  class="thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt="No image available">')
                }

                // End the new element of the list
                newElement = newElement.concat('<p>'+jsonData.title+'</p>');
                newElement = newElement.concat('</li>');
                document.getElementById('articleList').innerHTML = previousArticles.concat(newElement);
            } else {
                alert('Error: ' + xhr.status); // Something went wrong trying to get the file if this happens!
            }
        }
    };
    xhr.send(null); // Send the request
}