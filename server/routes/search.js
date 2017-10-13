'use strict';

const Flickr = require('flickr-sdk');
const feeds  = new Flickr.Feeds();

//!\ METHOD : 
// - @return 200 searched data
// - @return 400 error log if request fails
// - @return 500 error log if internal error
var search = {
	request: (req, res) => {

		let keyword = req.body.keyword;

		try{
			if(keyword === null){ 
				fillUpRes(res, 400, "Input error", null);
				return;
			}
			
			feeds.publicPhotos({
				tags: keyword, 
				format: 'json',
				jsoncallback: 'JSON_CALLBACK'
			}).then((response) => {

				var imgs  = fetchImageUrls(response.body.items);
				fillUpRes(res, 200, null, imgs);

			}).catch((err) => {

				fillUpRes(res, 400, 'Incorrect response from Flickr, please try again', null);
			
			});
			
    		return;

		} catch (err){

			fillUpRes(res, 500, 'Internal error', null);
			
		}
	},
};

// private functions

//!\ METHOD : build response
// - @param response information
// - @return response
function fillUpRes(res, status, error, data){
	if(error){ // error response
		res.status(status);
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({
			status: status,
			error: error
		}, null, 3));
	}
	else{ // successful response
		res.status(status);
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify({response: data}, null, 3));
	}

	return res;
}

//!\ METHOD : fetch images urls
// - @param entire response from Flickr
// - @return array of image urls
function fetchImageUrls(items){
	var imgs  = [];
	if(items && items.length>0){
		for(let i=0;i<items.length;i++){
			if(items[i].media.m)
				imgs.push(items[i].media.m);
		}
	}
	return imgs;
}

module.exports = search;