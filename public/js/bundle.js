(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _getData = require('./services/getData.js');

var _getData2 = _interopRequireDefault(_getData);

var _userProfile = require('./templates/userProfile.js');

var _userProfile2 = _interopRequireDefault(_userProfile);

var _doesNotExist = require('./templates/doesNotExist.js');

var _doesNotExist2 = _interopRequireDefault(_doesNotExist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = document.getElementById('message-error'),
    userGit = document.getElementById('userGit'),
    search = document.getElementById('search');

search.addEventListener('click', function () {

	var url = 'https://api.github.com/users/' + userGit.value;

	(0, _getData2.default)('GET', url, true).then(function (resolve) {
		resolveRequest(resolve, _userProfile2.default, _doesNotExist2.default);
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

var resolveRequest = function resolveRequest(resolve, template, templateNotExist) {

	if (resolve.status === 200) {

		template(resolve.response);
		message.textContent = '';
		console.log('Ok');
		console.log(resolve.response);
	} else {
		templateNotExist();
		console.log(resolve.response.message);
	}
};

},{"./services/getData.js":2,"./templates/doesNotExist.js":3,"./templates/userProfile.js":4}],2:[function(require,module,exports){
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

var doesNotExist = function doesNotExist() {

	var elementDoesNotExist = document.createElement('div'),
	    profile = document.getElementById('profile');

	if (profile) {
		document.body.removeChild(profile);
	}

	elementDoesNotExist.innerHTML = '\n\t\t\t\t\t<div>\n\n\t\t\t\t\t\tDoes not exist.\n\n\t\t\t\t\t</div>\n\t\t';
	elementDoesNotExist.id = 'does-not-exist';
	document.body.appendChild(elementDoesNotExist);
};

module.exports = doesNotExist;

},{}],4:[function(require,module,exports){
'use strict';

var userProfile = function userProfile(data) {

	var elementUserProfile = document.createElement('div'),
	    elementHTML = document.getElementById('profile') || document.getElementById('does-not-exist');

	if (elementHTML) {
		document.body.removeChild(elementHTML);
	}

	elementUserProfile.innerHTML = '\n\t\t\t\t\t<div class="user-profile" >\n\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<img src="' + data.avatar_url + '" />\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>@' + data.login + '</span>\n\t\t\t\t\t\t\t<span>' + (data.name ? data.name : 'Not have a name') + '</span>\n\t\t\t\t\t\t\t<span>' + (data.bio ? data.bio : 'Not have a bio') + '</span>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t';
	elementUserProfile.id = 'profile';
	document.body.appendChild(elementUserProfile);
};

module.exports = userProfile;

},{}]},{},[1,2,4,3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXGpzXFxhcHAuanMiLCJkZXZcXGpzXFxzZXJ2aWNlc1xcZ2V0RGF0YS5qcyIsImRldlxcanNcXHRlbXBsYXRlc1xcZG9lc05vdEV4aXN0LmpzIiwiZGV2XFxqc1xcdGVtcGxhdGVzXFx1c2VyUHJvZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFVBQVUsU0FBUyxjQUFULENBQXdCLGVBQXhCLENBQWQ7QUFBQSxJQUNDLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBRFg7QUFBQSxJQUVDLFNBQVUsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBRlg7O0FBSUMsT0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFNOztBQUV0QyxLQUFJLHdDQUFzQyxRQUFRLEtBQWxEOztBQUVBLHdCQUFRLEtBQVIsRUFBZSxHQUFmLEVBQW9CLElBQXBCLEVBQ0UsSUFERixDQUNRLG1CQUFXO0FBQ2pCLGlCQUFlLE9BQWY7QUFDQSxFQUhGLEVBSUUsS0FKRixDQUlTLGlCQUFTO0FBQ2hCLFVBQVEsR0FBUixDQUFZLEtBQVo7QUFDQSxFQU5GOztBQVFBOzs7Ozs7O0FBUUEsQ0FwQkQ7O0FBc0JBLElBQUksaUJBQWlCLFNBQWpCLGNBQWlCLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsZ0JBQXBCLEVBQXlDOztBQUU3RCxLQUFJLFFBQVEsTUFBUixLQUFtQixHQUF2QixFQUE0Qjs7QUFFM0IsV0FBUyxRQUFRLFFBQWpCO0FBQ0EsVUFBUSxXQUFSLEdBQXNCLEVBQXRCO0FBQ0EsVUFBUSxHQUFSLENBQVksSUFBWjtBQUNBLFVBQVEsR0FBUixDQUFZLFFBQVEsUUFBcEI7QUFDQSxFQU5ELE1BTU07QUFDTDtBQUNBLFVBQVEsR0FBUixDQUFZLFFBQVEsUUFBUixDQUFpQixPQUE3QjtBQUNBO0FBQ0QsQ0FaRDs7Ozs7QUM3QkQsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLE1BQUQsRUFBUyxHQUFULEVBQWlCOztBQUVoQyxTQUFPLElBQUksT0FBSixDQUFhLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7O0FBRXhDLFFBQUksTUFBTSxJQUFJLGNBQUosRUFBVjs7QUFFQSxRQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCOztBQUVBLFFBQUksZ0JBQUosQ0FBcUIsTUFBckIsRUFBNkIsYUFBSzs7QUFFakMsVUFBSSxXQUFXO0FBQ2QsZ0JBQVEsRUFBRSxNQUFGLENBQVMsTUFESDtBQUVkLGtCQUFVLEtBQUssS0FBTCxDQUFXLEVBQUUsTUFBRixDQUFTLFFBQXBCO0FBRkksT0FBZjs7QUFLQSxjQUFRLFFBQVI7QUFDQSxLQVJEOztBQVVBLFFBQUksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsYUFBSztBQUNsQyxhQUFPLEVBQUUsTUFBVDtBQUNBLEtBRkQ7O0FBSUEsUUFBSSxJQUFKO0FBQ0EsR0FyQk0sQ0FBUDtBQXNCQSxDQXhCRDs7QUEwQkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCOzs7OztBQzFCQSxJQUFNLGVBQWUsU0FBZixZQUFlLEdBQU07O0FBRTFCLEtBQUksc0JBQXNCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUExQjtBQUFBLEtBQ0MsVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FEWDs7QUFHQyxLQUFHLE9BQUgsRUFBWTtBQUNYLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsT0FBMUI7QUFDQTs7QUFFRCxxQkFBb0IsU0FBcEI7QUFPQSxxQkFBb0IsRUFBcEIsR0FBeUIsZ0JBQXpCO0FBQ0EsVUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixtQkFBMUI7QUFFRCxDQW5CRDs7QUFxQkEsT0FBTyxPQUFQLEdBQWlCLFlBQWpCOzs7OztBQ3JCQSxJQUFNLGNBQWMsU0FBZCxXQUFjLENBQUMsSUFBRCxFQUFVOztBQUU3QixLQUFJLHFCQUFxQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekI7QUFBQSxLQUNDLGNBQWMsU0FBUyxjQUFULENBQXdCLFNBQXhCLEtBQXNDLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FEckQ7O0FBR0MsS0FBRyxXQUFILEVBQWdCO0FBQ2YsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixXQUExQjtBQUNBOztBQUVELG9CQUFtQixTQUFuQiw4RkFJaUIsS0FBSyxVQUp0Qiw0RUFRYyxLQUFLLEtBUm5CLHNDQVNhLEtBQUssSUFBTCxHQUFZLEtBQUssSUFBakIsR0FBd0IsaUJBVHJDLHVDQVVhLEtBQUssR0FBTCxHQUFXLEtBQUssR0FBaEIsR0FBc0IsZ0JBVm5DO0FBZUEsb0JBQW1CLEVBQW5CLEdBQXdCLFNBQXhCO0FBQ0EsVUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixrQkFBMUI7QUFFRCxDQTNCRDs7QUE2QkEsT0FBTyxPQUFQLEdBQWlCLFdBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBnZXREYXRhIGZyb20gJy4vc2VydmljZXMvZ2V0RGF0YS5qcyc7XHJcbmltcG9ydCB1c2VyUHJvZmlsZSBmcm9tICcuL3RlbXBsYXRlcy91c2VyUHJvZmlsZS5qcyc7XHJcbmltcG9ydCBkb2VzTm90RXhpc3QgZnJvbSAnLi90ZW1wbGF0ZXMvZG9lc05vdEV4aXN0LmpzJztcclxuXHJcbmxldCBtZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UtZXJyb3InKSxcclxuXHR1c2VyR2l0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJHaXQnKSxcclxuXHRzZWFyY2ggID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpO1xyXG5cclxuXHRzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG5cdFx0bGV0IHVybCA9IGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlckdpdC52YWx1ZX1gO1xyXG5cclxuXHRcdGdldERhdGEoJ0dFVCcsIHVybCwgdHJ1ZSlcclxuXHRcdFx0LnRoZW4oIHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmVSZXF1ZXN0KHJlc29sdmUsIHVzZXJQcm9maWxlLCBkb2VzTm90RXhpc3QpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goIGVycm9yID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0LypnZXREYXRhKCdHRVQnLCBgJHt1cmx9L3JlcG9zYClcclxuXHRcdFx0LnRoZW4oIHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmVSZXF1ZXN0KHJlc29sdmUpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goIGVycm9yID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdH0pKi9cclxuXHJcblx0fSk7XHJcblxyXG5cdGxldCByZXNvbHZlUmVxdWVzdCA9IChyZXNvbHZlLCB0ZW1wbGF0ZSwgdGVtcGxhdGVOb3RFeGlzdCkgPT4ge1xyXG5cclxuXHRcdGlmIChyZXNvbHZlLnN0YXR1cyA9PT0gMjAwKSB7XHJcblx0XHRcdFxyXG5cdFx0XHR0ZW1wbGF0ZShyZXNvbHZlLnJlc3BvbnNlKTtcclxuXHRcdFx0bWVzc2FnZS50ZXh0Q29udGVudCA9ICcnO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnT2snKTtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzb2x2ZS5yZXNwb25zZSk7XHJcblx0XHR9ZWxzZSB7XHJcblx0XHRcdHRlbXBsYXRlTm90RXhpc3QoKTtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzb2x2ZS5yZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHJcblxyXG5cclxuIiwiXHJcbmNvbnN0IGdldERhdGEgPSAobWV0aG9kLCB1cmwpID0+IHtcclxuXHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuXHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcclxuXHJcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xyXG5cclxuXHRcdFx0bGV0IHJlc3BvbnNlID0ge1xyXG5cdFx0XHRcdHN0YXR1czogZS50YXJnZXQuc3RhdHVzLFxyXG5cdFx0XHRcdHJlc3BvbnNlOiBKU09OLnBhcnNlKGUudGFyZ2V0LnJlc3BvbnNlKVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlID0+IHtcclxuXHRcdFx0cmVqZWN0KGUudGFyZ2V0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHhoci5zZW5kKCk7XHJcblx0fSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0RGF0YTsiLCJcclxuY29uc3QgZG9lc05vdEV4aXN0ID0gKCkgPT4ge1xyXG5cclxuXHRsZXQgZWxlbWVudERvZXNOb3RFeGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0cHJvZmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlJyk7XHJcblxyXG5cdFx0aWYocHJvZmlsZSkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHByb2ZpbGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsZW1lbnREb2VzTm90RXhpc3QuaW5uZXJIVE1MID0gYFxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHJcblx0XHRcdFx0XHRcdERvZXMgbm90IGV4aXN0LlxyXG5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0YFxyXG5cdFx0ZWxlbWVudERvZXNOb3RFeGlzdC5pZCA9ICdkb2VzLW5vdC1leGlzdCc7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnREb2VzTm90RXhpc3QpO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG9lc05vdEV4aXN0OyIsIlxyXG5jb25zdCB1c2VyUHJvZmlsZSA9IChkYXRhKSA9PiB7XHJcblxyXG5cdGxldCBlbGVtZW50VXNlclByb2ZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdGVsZW1lbnRIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGUnKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9lcy1ub3QtZXhpc3QnKTtcclxuXHJcblx0XHRpZihlbGVtZW50SFRNTCkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnRIVE1MKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbGVtZW50VXNlclByb2ZpbGUuaW5uZXJIVE1MID0gYFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVzZXItcHJvZmlsZVwiID5cclxuXHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIke2RhdGEuYXZhdGFyX3VybH1cIiAvPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+QCR7ZGF0YS5sb2dpbn08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+JHtkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnTm90IGhhdmUgYSBuYW1lJ308L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+JHtkYXRhLmJpbyA/IGRhdGEuYmlvIDogJ05vdCBoYXZlIGEgYmlvJ308L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0YFxyXG5cdFx0ZWxlbWVudFVzZXJQcm9maWxlLmlkID0gJ3Byb2ZpbGUnO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50VXNlclByb2ZpbGUpO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXNlclByb2ZpbGU7Il19
