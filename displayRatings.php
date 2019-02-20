<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="RankArticles.js"></script>
    <link rel="stylesheet" type="text/css" href="stylesheet.css">
    <title>BBC Coding Test | Rank articles</title>
</head>
<body onload="loadArticleStub(1)">
<header>BBC news</header>
<main>
    <h1>Here's a list of articles based on your ratings.</h1>
    <article>
        <?php
        /**
         * Created by IntelliJ IDEA.
         * User: Thomas
         * Date: 19/02/2019
         * Time: 23:30
         */
        $x = 0;
        while($_POST[$x]!= null){
            echo $_POST[$x];
            $x++;
        }
        ?>
    </article>
</main>
</body>
</html>

