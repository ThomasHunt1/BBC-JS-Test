var currentArticle = 0;

function loadDoc(article) {
    currentArticle = article;

    // Show the next button if there is another article
    if(currentArticle === 5){
        document.getElementsByTagName('footer').item(0).innerHTML =
            '<button formaction="rank.html" type="submit">Rank the articles</button>';
    }else if(currentArticle < 5 && currentArticle > 0){
        document.getElementsByTagName('footer').item(0).innerHTML =
            '<button onclick="nextArticle()">Next article</button>';
    }else{
        console.log("The current article number exceed the boundaries! currentArticle: " + currentArticle);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('get', 'articles/article-'+currentArticle+'.json');

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        const DONE = 4, OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                // xhr.responseText is the content of the .json file
                // Also.... why are all the articles in latin???
                // Emptying the html file first just in case...

                document.getElementById('article').innerHTML = "";

                const jsonData = JSON.parse(xhr.responseText).body;
                let x;
                for (x = 0; x < jsonData.length; x++) {
                    console.log(x);
                    let type = jsonData[x].type;
                    switch (type) {
                        case 'heading' :
                            // Set the headline of the article
                            document.getElementById('article').innerHTML = '<h1>'+jsonData[x].model.text+'</h1>';
                            break;

                        case 'paragraph':
                            // Add each paragraph to the paragraphs div
                            var newPara = document.getElementById('article').innerHTML;
                            newPara = newPara.concat('<p>' + jsonData[x].model.text + '</p>');
                            document.getElementById('article').innerHTML = newPara;
                            break;

                        case 'image':
                            var src = jsonData[x].model.url;        // Src of image
                            var alt = jsonData[x].model.altText;    // Alt tag of image
                            var height = jsonData[x].model.height;  // Dimensions of image
                            var width = jsonData[x].model.width;

                            // Add each of the parameters from above to an image tag in the HTML div 'images'
                            var newImage = document.getElementById('article').innerHTML;
                            newImage = newImage.concat('<img src="' + src + '" alt="' + alt + '" width="' + width + '" height="' + height + '">');
                            document.getElementById('article').innerHTML = newImage;
                            break;
                        case 'list':
                            // Get the population of the list
                            let y;
                            let points = '';
                            for (y = 0; y < jsonData[x].model.items.length; y++) {
                                points += '<li>' + jsonData[x].model.items[y] + '</li>';
                            }

                            // Add it to the html after checking if it is ordered or unordered.
                            if (jsonData[x].model.type = 'unordered') {
                                let list = '<ul>' + points + '</ul>';
                                document.getElementById('article').innerHTML = document.getElementById('article').innerHTML + list;
                            }else if(jsonData[x].model.type = 'ordered'){
                                let list = '<ol>' + points + '</ol>';
                                document.getElementById('article').innerHTML = document.getElementById('article').innerHTML + list;
                            }
                            break;
                        default:
                            console.log("Unrecognised type in article: " + type);
                    }
                }

            } else {
                alert('Error: ' + xhr.status); // Something went wrong trying to get the file if this happens!
            }
        }
    };
    xhr.send(null); // Send the request
}

function nextArticle(){
    // Load the next article
    loadDoc(currentArticle+1);
}
