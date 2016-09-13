import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
var result = $.ajax({
				url: 'http://api.openaura.com/v1/search/artists?q=taylor&api_key=ae8bbaabb8e2a9f0ba172c0414cf99389beabc11', 
				data: null,
				type: 'GET',
				datatype: 'JSONP',
				// headers: {"Access-Control-Allow-Origin": "http://localhost:4000", 
				// 			"Access-Control-Allow-Credentials": true},

				//'Access-Control-Allow-Origin': 'http://localhost:4000',
				success: function(data){
					console.log(data);
				},
				error: function(data){
					alert('error');
				}
			});

// React.createClass({
// 	render :
// 		(
			
// 		)
// })
ReactDOM.render(<h1>Hello</h1>, document.getElementById('app'));

	