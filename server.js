var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app 	= express();

app.get('/scrape', function(req, res){
	var url = 'http://www.imdb.com/title/tt1229340/';

	request(url, function(error, response, html){
		if (!error){
			var $ = cheerio.load(html);

			var title, release, rating;

			var json = { title: "", release: "", rating: ""}

			$('.title_wrapper').filter(function(){
				var data = $(this)
				title = data.children().first().text();
				json.title = title
			})

			$('#titleYear').filter(function(){
				var data = $(this)
				release = data.text()
				json.release = release
			})

			$('.star-box-giga-star').filter(function(){
				var data = $(this)
				rating = data.text()
				json.rating = rating
			})
		}
		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			if (err){
				console.log('~~~~', err)
			} else {
				console.log('success!')
			}
		})
	})


	res.send('Check yer console!')
})


app.listen('8081')

console.log('Magic happens on port 8081')

exports = module.exports = app;