<?php
/**
 * Created by IntelliJ IDEA.
 * User: Thomas
 * Date: 20/02/2019
 * Time: 17:37
*/


$xml=simplexml_load_file('ratings.xml');

$xml = '<?xml version="1.0" encoding="utf-8"?><data><articles></articles></data>';

echo $xml;
file_put_contents('ratings.xml', $xml);
?>