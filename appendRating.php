<?php
/**
 * Created by IntelliJ IDEA.
 * User: Thomas
 * Date: 19/02/2019
 * Time: 23:30
 */
// Add rating to an XML file

$file = 'ratings.xml';
$xml = simplexml_load_file($file);

$articles = $xml->articles;

$article = $articles->addChild('article');
$article->addChild('articleNo', $_POST['article']);
$article->addChild('rating', $_POST['rating']);

$xml->asXML($file);


