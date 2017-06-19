var cheerio = require('cheerio');  
var request = require('request');
var Twitter = require('twitter');

var url = 'https://finance.yahoo.com/chart/JPYKRW=X';  


var client = new Twitter({ //add your consumer key and secret etc.
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

getAndSendExchange();

function getAndSendExchange() {

request(url, function(error, response, html){  
    if (error) {throw error};
  var $=cheerio.load(html);
  var exval=$(".Fz\\(m\\).Mx\\(10px\\).Fw\\(500\\)").text();
  var diff=/^[+-]?\d+.\d+/.exec($(".Trsdu\\(0\\.3s\\).Fz\\(m\\).Mend\\(10px\\).Fw\\(500\\)").text());
    
  exval = Math.round(exval*10000)/100;
  diff = Math.round(diff[0]*10000)/100;
console.log(diff);
  if (diff>0)  {
	  diff = "▲ "+diff.toFixed(2);
  }
  else if (diff<0)  {
 	  diff = "▼ "+diff.toFixed(2);
  }
  else {
 	  diff = "-";
  }
client.post('statuses/update', {status: 'JPY: '+exval.toFixed(2)+' ('+diff+')'},  function(error, tweet, response) {
  //if(error) throw error;
  //console.log(tweet);  // Tweet body. 
  //console.log(response);  // Raw response object. 
});

});

}