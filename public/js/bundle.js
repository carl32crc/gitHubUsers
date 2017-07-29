(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _getData = require('./services/getData.js');

var _getData2 = _interopRequireDefault(_getData);

var _userProfile = require('./templates/userProfile.js');

var _userProfile2 = _interopRequireDefault(_userProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = document.getElementById('message-error'),
    userGit = document.getElementById('userGit'),
    search = document.getElementById('search');

search.addEventListener('click', function () {

	var url = 'https://api.github.com/users/' + userGit.value;

	(0, _getData2.default)('GET', url, true).then(function (resolve) {
		resolveRequest(resolve, _userProfile2.default);
	}).catch(function (error) {
		console.log(error);
	});

	/*getData('GET', `${url}/repos`)
 	.then( resolve => {
 		resolveRequest(resolve);
 	})
 	.catch( error => {
 		console.log(error);
 	})*/
});

var resolveRequest = function resolveRequest(resolve, template) {

	if (resolve.status === 200) {

		template(resolve.response);
		message.textContent = '';
		console.log('Ok');
		console.log(resolve.response);
	} else {
		message.textContent = resolve.response.message;
		console.log(resolve.response.message);
	}
};

},{"./services/getData.js":2,"./templates/userProfile.js":3}],2:[function(require,module,exports){
'use strict';

var getData = function getData(method, url) {

		return new Promise(function (resolve, reject) {

				var xhr = new XMLHttpRequest();

				xhr.open(method, url, true);

				xhr.addEventListener('load', function (e) {

						var response = {
								status: e.target.status,
								response: JSON.parse(e.target.response)
						};

						resolve(response);
				});

				xhr.addEventListener('error', function (e) {
						reject(e.target);
				});

				xhr.send();
		});
};

module.exports = getData;

},{}],3:[function(require,module,exports){
'use strict';

var userProfile = function userProfile(data) {

	var elementUserProfile = document.createElement('div'),
	    profile = document.getElementById('profile');

	if (profile) {
		document.body.removeChild(profile);
	}

	elementUserProfile.innerHTML = '\n\t\t\t\t\t<div class="user-profile" >\n\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<img src="' + data.avatar_url + '" />\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>@' + data.login + '</span>\n\t\t\t\t\t\t\t<span>' + (data.name ? data.name : 'Not have a name') + '</span>\n\t\t\t\t\t\t\t<span>' + (data.bio ? data.bio : 'Not have a bio') + '</span>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t';
	elementUserProfile.id = 'profile';
	document.body.appendChild(elementUserProfile);
};

module.exports = userProfile;

},{}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXGpzXFxhcHAuanMiLCJkZXZcXGpzXFxzZXJ2aWNlc1xcZ2V0RGF0YS5qcyIsImRldlxcanNcXHRlbXBsYXRlc1xcdXNlclByb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBZDtBQUFBLElBQ0MsVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FEWDtBQUFBLElBRUMsU0FBVSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FGWDs7QUFJQyxPQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQU07O0FBRXRDLEtBQUksd0NBQXNDLFFBQVEsS0FBbEQ7O0FBRUEsd0JBQVEsS0FBUixFQUFlLEdBQWYsRUFBb0IsSUFBcEIsRUFDRSxJQURGLENBQ1EsbUJBQVc7QUFDakIsaUJBQWUsT0FBZjtBQUNBLEVBSEYsRUFJRSxLQUpGLENBSVMsaUJBQVM7QUFDaEIsVUFBUSxHQUFSLENBQVksS0FBWjtBQUNBLEVBTkY7O0FBUUE7Ozs7Ozs7QUFRQSxDQXBCRDs7QUFzQkEsSUFBSSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUF1Qjs7QUFFM0MsS0FBSSxRQUFRLE1BQVIsS0FBbUIsR0FBdkIsRUFBNEI7O0FBRTNCLFdBQVMsUUFBUSxRQUFqQjtBQUNBLFVBQVEsV0FBUixHQUFzQixFQUF0QjtBQUNBLFVBQVEsR0FBUixDQUFZLElBQVo7QUFDQSxVQUFRLEdBQVIsQ0FBWSxRQUFRLFFBQXBCO0FBQ0EsRUFORCxNQU1NO0FBQ0wsVUFBUSxXQUFSLEdBQXNCLFFBQVEsUUFBUixDQUFpQixPQUF2QztBQUNBLFVBQVEsR0FBUixDQUFZLFFBQVEsUUFBUixDQUFpQixPQUE3QjtBQUNBO0FBQ0QsQ0FaRDs7Ozs7QUM1QkQsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLE1BQUQsRUFBUyxHQUFULEVBQWlCOztBQUVoQyxTQUFPLElBQUksT0FBSixDQUFhLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7O0FBRXhDLFFBQUksTUFBTSxJQUFJLGNBQUosRUFBVjs7QUFFQSxRQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCOztBQUVBLFFBQUksZ0JBQUosQ0FBcUIsTUFBckIsRUFBNkIsYUFBSzs7QUFFakMsVUFBSSxXQUFXO0FBQ2QsZ0JBQVEsRUFBRSxNQUFGLENBQVMsTUFESDtBQUVkLGtCQUFVLEtBQUssS0FBTCxDQUFXLEVBQUUsTUFBRixDQUFTLFFBQXBCO0FBRkksT0FBZjs7QUFLQSxjQUFRLFFBQVI7QUFDQSxLQVJEOztBQVVBLFFBQUksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsYUFBSztBQUNsQyxhQUFPLEVBQUUsTUFBVDtBQUNBLEtBRkQ7O0FBSUEsUUFBSSxJQUFKO0FBQ0EsR0FyQk0sQ0FBUDtBQXNCQSxDQXhCRDs7QUEwQkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCOzs7OztBQzFCQSxJQUFNLGNBQWMsU0FBZCxXQUFjLENBQUMsSUFBRCxFQUFVOztBQUU3QixLQUFJLHFCQUFxQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekI7QUFBQSxLQUNDLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBRFg7O0FBR0MsS0FBRyxPQUFILEVBQVk7QUFDWCxXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE9BQTFCO0FBQ0E7O0FBRUQsb0JBQW1CLFNBQW5CLDhGQUlpQixLQUFLLFVBSnRCLDRFQVFjLEtBQUssS0FSbkIsc0NBU2EsS0FBSyxJQUFMLEdBQVksS0FBSyxJQUFqQixHQUF3QixpQkFUckMsdUNBVWEsS0FBSyxHQUFMLEdBQVcsS0FBSyxHQUFoQixHQUFzQixnQkFWbkM7QUFlQSxvQkFBbUIsRUFBbkIsR0FBd0IsU0FBeEI7QUFDQSxVQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLGtCQUExQjtBQUVELENBM0JEOztBQTZCQSxPQUFPLE9BQVAsR0FBaUIsV0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGdldERhdGEgZnJvbSAnLi9zZXJ2aWNlcy9nZXREYXRhLmpzJztcclxuaW1wb3J0IHVzZXJQcm9maWxlIGZyb20gJy4vdGVtcGxhdGVzL3VzZXJQcm9maWxlLmpzJztcclxuXHJcbmxldCBtZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UtZXJyb3InKSxcclxuXHR1c2VyR2l0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJHaXQnKSxcclxuXHRzZWFyY2ggID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpO1xyXG5cclxuXHRzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG5cdFx0bGV0IHVybCA9IGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlckdpdC52YWx1ZX1gO1xyXG5cclxuXHRcdGdldERhdGEoJ0dFVCcsIHVybCwgdHJ1ZSlcclxuXHRcdFx0LnRoZW4oIHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmVSZXF1ZXN0KHJlc29sdmUsIHVzZXJQcm9maWxlKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKCBlcnJvciA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHR9KVxyXG5cclxuXHRcdC8qZ2V0RGF0YSgnR0VUJywgYCR7dXJsfS9yZXBvc2ApXHJcblx0XHRcdC50aGVuKCByZXNvbHZlID0+IHtcclxuXHRcdFx0XHRyZXNvbHZlUmVxdWVzdChyZXNvbHZlKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKCBlcnJvciA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHR9KSovXHJcblxyXG5cdH0pO1xyXG5cclxuXHRsZXQgcmVzb2x2ZVJlcXVlc3QgPSAocmVzb2x2ZSwgdGVtcGxhdGUpID0+IHtcclxuXHJcblx0XHRpZiAocmVzb2x2ZS5zdGF0dXMgPT09IDIwMCkge1xyXG5cdFx0XHRcclxuXHRcdFx0dGVtcGxhdGUocmVzb2x2ZS5yZXNwb25zZSk7XHJcblx0XHRcdG1lc3NhZ2UudGV4dENvbnRlbnQgPSAnJztcclxuXHRcdFx0Y29uc29sZS5sb2coJ09rJyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc29sdmUucmVzcG9uc2UpO1xyXG5cdFx0fWVsc2Uge1xyXG5cdFx0XHRtZXNzYWdlLnRleHRDb250ZW50ID0gcmVzb2x2ZS5yZXNwb25zZS5tZXNzYWdlO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNvbHZlLnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cclxuXHJcblxyXG4iLCJcclxuY29uc3QgZ2V0RGF0YSA9IChtZXRob2QsIHVybCkgPT4ge1xyXG5cclxuXHRyZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG5cclxuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgcmVzcG9uc2UgPSB7XHJcblx0XHRcdFx0c3RhdHVzOiBlLnRhcmdldC5zdGF0dXMsXHJcblx0XHRcdFx0cmVzcG9uc2U6IEpTT04ucGFyc2UoZS50YXJnZXQucmVzcG9uc2UpXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGUgPT4ge1xyXG5cdFx0XHRyZWplY3QoZS50YXJnZXQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0eGhyLnNlbmQoKTtcclxuXHR9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXRhOyIsIlxyXG5jb25zdCB1c2VyUHJvZmlsZSA9IChkYXRhKSA9PiB7XHJcblxyXG5cdGxldCBlbGVtZW50VXNlclByb2ZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdHByb2ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZScpO1xyXG5cclxuXHRcdGlmKHByb2ZpbGUpIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwcm9maWxlKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbGVtZW50VXNlclByb2ZpbGUuaW5uZXJIVE1MID0gYFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVzZXItcHJvZmlsZVwiID5cclxuXHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIke2RhdGEuYXZhdGFyX3VybH1cIiAvPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+QCR7ZGF0YS5sb2dpbn08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+JHtkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnTm90IGhhdmUgYSBuYW1lJ308L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+JHtkYXRhLmJpbyA/IGRhdGEuYmlvIDogJ05vdCBoYXZlIGEgYmlvJ308L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0YFxyXG5cdFx0ZWxlbWVudFVzZXJQcm9maWxlLmlkID0gJ3Byb2ZpbGUnO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50VXNlclByb2ZpbGUpO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXNlclByb2ZpbGU7Il19
