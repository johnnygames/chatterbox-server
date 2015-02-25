var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type': "application/json" 
};

resultsObj = {results: []}; // When a GET request comes in we need to reinitialize
var fs = require("fs");
var objId = 0;

exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  console.log("Serving request type " + request.method + " for url " + request.url);

  var headers = defaultCorsHeaders;
  if (request.method === 'POST') {
    var chunk = '';
    request.on('data', function(data) {
      //resultsObj.results.push(data);      
      chunk += data;
    });

    request.on('end', function(){
      var post = JSON.parse(chunk);
      post['objectId'] = objId;
      objId++;
      resultsObj.results.push(post);
    });
    response.writeHead(201, headers);
    response.end(JSON.stringify(resultsObj));
    console.log(resultsObj.results);
  }

  if (request.method === 'GET') {   
    if (request.url.substr(0, 9) !== '/classes/') {
      response.writeHead(404, headers);
      response.end(JSON.stringify(resultsObj));
    } else {
      response.writeHead(200, headers);
      response.end(JSON.stringify(resultsObj));
    }
  }

  if (request.method === 'OPTIONS') {   
    // var chunk = '';
    // request.on('data', function(data) {
    //   //resultsObj.results.push(data);      
    //   chunk += data;
    // });

    // request.on('end', function(){
    //   var post = JSON.parse(chunk);
    //   resultsObj.results.push(post);
    // });
    response.writeHead(200, headers);
    response.end(JSON.stringify(resultsObj));
    console.log(headers)
  }

};



