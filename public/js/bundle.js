(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _getData = require('./services/getData.js');

var _getData2 = _interopRequireDefault(_getData);

var _userRepos = require('./templates/userRepos.js');

var _userRepos2 = _interopRequireDefault(_userRepos);

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

	(0, _getData2.default)('GET', url + '/repos').then(function (resolve) {
		resolveRequest(resolve, _userRepos2.default);
	}).catch(function (error) {
		//console.log(error);
	});
});

var resolveRequest = function resolveRequest(resolve, template, templateNotExist) {

	if (resolve.status === 200) {
		template(resolve.response);
	} else {
		templateNotExist();
	}
};

},{"./services/getData.js":2,"./templates/doesNotExist.js":3,"./templates/userProfile.js":4,"./templates/userRepos.js":5}],2:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var userRepos = function userRepos(data) {

	var elementUserRepos = document.createElement('div'),
	    profile = document.getElementById('profile');

	var repos = data.map(function (d) {
		return '<div>\n\t\t\t\t<a href="' + d.html_url + '" target="_blank" >' + d.name + '</a>\n\t\t\t\t<a href="' + d.forks_url + '" target="_blank" >' + d.forks + '</a>\n\t\t\t\t<a href="' + d.stargazers_url + '" target="_blank" >' + d.stargazers_count + '</a>\n\t\t\t</div>';
	});

	elementUserRepos.innerHTML = repos.join('');
	elementUserRepos.className = 'user-repos';
	profile.append(elementUserRepos);
};

module.exports = userRepos;

},{}]},{},[1,2,4,5,3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXGpzXFxhcHAuanMiLCJkZXZcXGpzXFxzZXJ2aWNlc1xcZ2V0RGF0YS5qcyIsImRldlxcanNcXHRlbXBsYXRlc1xcZG9lc05vdEV4aXN0LmpzIiwiZGV2XFxqc1xcdGVtcGxhdGVzXFx1c2VyUHJvZmlsZS5qcyIsImRldlxcanNcXHRlbXBsYXRlc1xcdXNlclJlcG9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixlQUF4QixDQUFkO0FBQUEsSUFDQyxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQURYO0FBQUEsSUFFQyxTQUFVLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUZYOztBQUlBLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBTTs7QUFFdEMsS0FBSSx3Q0FBc0MsUUFBUSxLQUFsRDs7QUFFQSx3QkFBUSxLQUFSLEVBQWUsR0FBZixFQUFvQixJQUFwQixFQUNFLElBREYsQ0FDUSxtQkFBVztBQUNqQixpQkFBZSxPQUFmO0FBQ0EsRUFIRixFQUlFLEtBSkYsQ0FJUyxpQkFBUztBQUNoQixVQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsRUFORjs7QUFRQSx3QkFBUSxLQUFSLEVBQWtCLEdBQWxCLGFBQ0UsSUFERixDQUNRLG1CQUFXO0FBQ2pCLGlCQUFlLE9BQWY7QUFDQSxFQUhGLEVBSUUsS0FKRixDQUlTLGlCQUFTO0FBQ2hCO0FBQ0EsRUFORjtBQVFBLENBcEJEOztBQXNCQSxJQUFJLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLGdCQUFwQixFQUF5Qzs7QUFHN0QsS0FBSSxRQUFRLE1BQVIsS0FBbUIsR0FBdkIsRUFBNEI7QUFDM0IsV0FBUyxRQUFRLFFBQWpCO0FBQ0EsRUFGRCxNQUVNO0FBQ0w7QUFDQTtBQUNELENBUkQ7Ozs7O0FDOUJBLElBQU0sVUFBVSxTQUFWLE9BQVUsQ0FBQyxNQUFELEVBQVMsR0FBVCxFQUFpQjs7QUFFaEMsU0FBTyxJQUFJLE9BQUosQ0FBYSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCOztBQUV4QyxRQUFJLE1BQU0sSUFBSSxjQUFKLEVBQVY7O0FBRUEsUUFBSSxJQUFKLENBQVMsTUFBVCxFQUFpQixHQUFqQixFQUFzQixJQUF0Qjs7QUFFQSxRQUFJLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLGFBQUs7O0FBRWpDLFVBQUksV0FBVztBQUNkLGdCQUFRLEVBQUUsTUFBRixDQUFTLE1BREg7QUFFZCxrQkFBVSxLQUFLLEtBQUwsQ0FBVyxFQUFFLE1BQUYsQ0FBUyxRQUFwQjtBQUZJLE9BQWY7O0FBS0EsY0FBUSxRQUFSO0FBQ0EsS0FSRDs7QUFVQSxRQUFJLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLGFBQUs7QUFDbEMsYUFBTyxFQUFFLE1BQVQ7QUFDQSxLQUZEOztBQUlBLFFBQUksSUFBSjtBQUNBLEdBckJNLENBQVA7QUFzQkEsQ0F4QkQ7O0FBMEJBLE9BQU8sT0FBUCxHQUFpQixPQUFqQjs7Ozs7QUMxQkEsSUFBTSxlQUFlLFNBQWYsWUFBZSxHQUFNOztBQUUxQixLQUFJLHNCQUFzQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBMUI7QUFBQSxLQUNDLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBRFg7O0FBR0MsS0FBRyxPQUFILEVBQVk7QUFDWCxXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE9BQTFCO0FBQ0E7O0FBRUQscUJBQW9CLFNBQXBCO0FBT0EscUJBQW9CLEVBQXBCLEdBQXlCLGdCQUF6QjtBQUNBLFVBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsbUJBQTFCO0FBRUQsQ0FuQkQ7O0FBcUJBLE9BQU8sT0FBUCxHQUFpQixZQUFqQjs7Ozs7QUNyQkEsSUFBTSxjQUFjLFNBQWQsV0FBYyxDQUFDLElBQUQsRUFBVTs7QUFFN0IsS0FBSSxxQkFBcUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXpCO0FBQUEsS0FDQyxjQUFjLFNBQVMsY0FBVCxDQUF3QixTQUF4QixLQUFzQyxTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLENBRHJEOztBQUdDLEtBQUcsV0FBSCxFQUFnQjtBQUNmLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsV0FBMUI7QUFDQTs7QUFFRCxvQkFBbUIsU0FBbkIsOEZBSWlCLEtBQUssVUFKdEIsNEVBUWMsS0FBSyxLQVJuQixzQ0FTYSxLQUFLLElBQUwsR0FBWSxLQUFLLElBQWpCLEdBQXdCLGlCQVRyQyx1Q0FVYSxLQUFLLEdBQUwsR0FBVyxLQUFLLEdBQWhCLEdBQXNCLGdCQVZuQztBQWVBLG9CQUFtQixFQUFuQixHQUF3QixTQUF4QjtBQUNBLFVBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsa0JBQTFCO0FBRUQsQ0EzQkQ7O0FBNkJBLE9BQU8sT0FBUCxHQUFpQixXQUFqQjs7Ozs7QUM3QkEsSUFBTSxZQUFZLFNBQVosU0FBWSxDQUFDLElBQUQsRUFBVTs7QUFFM0IsS0FBSSxtQkFBbUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQUEsS0FDQyxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQURYOztBQUdDLEtBQUksUUFBUSxLQUFLLEdBQUwsQ0FBVTtBQUFBLHNDQUVULEVBQUUsUUFGTywyQkFFdUIsRUFBRSxJQUZ6QiwrQkFHVCxFQUFFLFNBSE8sMkJBR3dCLEVBQUUsS0FIMUIsK0JBSVQsRUFBRSxjQUpPLDJCQUk2QixFQUFFLGdCQUovQjtBQUFBLEVBQVYsQ0FBWjs7QUFRQSxrQkFBaUIsU0FBakIsR0FBNkIsTUFBTSxJQUFOLENBQVcsRUFBWCxDQUE3QjtBQUNBLGtCQUFpQixTQUFqQixHQUE2QixZQUE3QjtBQUNBLFNBQVEsTUFBUixDQUFlLGdCQUFmO0FBRUQsQ0FqQkQ7O0FBbUJBLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3NlcnZpY2VzL2dldERhdGEuanMnO1xyXG5pbXBvcnQgdXNlclJlcG9zIGZyb20gJy4vdGVtcGxhdGVzL3VzZXJSZXBvcy5qcyc7XHJcbmltcG9ydCB1c2VyUHJvZmlsZSBmcm9tICcuL3RlbXBsYXRlcy91c2VyUHJvZmlsZS5qcyc7XHJcbmltcG9ydCBkb2VzTm90RXhpc3QgZnJvbSAnLi90ZW1wbGF0ZXMvZG9lc05vdEV4aXN0LmpzJztcclxuXHJcbmxldCBtZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UtZXJyb3InKSxcclxuXHR1c2VyR2l0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJHaXQnKSxcclxuXHRzZWFyY2ggID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpO1xyXG5cclxuc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuXHRsZXQgdXJsID0gYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHt1c2VyR2l0LnZhbHVlfWA7XHJcblxyXG5cdGdldERhdGEoJ0dFVCcsIHVybCwgdHJ1ZSlcclxuXHRcdC50aGVuKCByZXNvbHZlID0+IHtcclxuXHRcdFx0cmVzb2x2ZVJlcXVlc3QocmVzb2x2ZSwgdXNlclByb2ZpbGUsIGRvZXNOb3RFeGlzdCk7XHJcblx0XHR9KVxyXG5cdFx0LmNhdGNoKCBlcnJvciA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdH0pXHJcblxyXG5cdGdldERhdGEoJ0dFVCcsIGAke3VybH0vcmVwb3NgKVxyXG5cdFx0LnRoZW4oIHJlc29sdmUgPT4ge1xyXG5cdFx0XHRyZXNvbHZlUmVxdWVzdChyZXNvbHZlLCB1c2VyUmVwb3MpO1xyXG5cdFx0fSlcclxuXHRcdC5jYXRjaCggZXJyb3IgPT4ge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdH0pXHJcblxyXG59KTtcclxuXHJcbmxldCByZXNvbHZlUmVxdWVzdCA9IChyZXNvbHZlLCB0ZW1wbGF0ZSwgdGVtcGxhdGVOb3RFeGlzdCkgPT4ge1xyXG5cclxuXHJcblx0aWYgKHJlc29sdmUuc3RhdHVzID09PSAyMDApIHtcclxuXHRcdHRlbXBsYXRlKHJlc29sdmUucmVzcG9uc2UpO1xyXG5cdH1lbHNlIHtcclxuXHRcdHRlbXBsYXRlTm90RXhpc3QoKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG4iLCJcclxuY29uc3QgZ2V0RGF0YSA9IChtZXRob2QsIHVybCkgPT4ge1xyXG5cclxuXHRyZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG5cclxuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgcmVzcG9uc2UgPSB7XHJcblx0XHRcdFx0c3RhdHVzOiBlLnRhcmdldC5zdGF0dXMsXHJcblx0XHRcdFx0cmVzcG9uc2U6IEpTT04ucGFyc2UoZS50YXJnZXQucmVzcG9uc2UpXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGUgPT4ge1xyXG5cdFx0XHRyZWplY3QoZS50YXJnZXQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0eGhyLnNlbmQoKTtcclxuXHR9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXRhOyIsIlxyXG5jb25zdCBkb2VzTm90RXhpc3QgPSAoKSA9PiB7XHJcblxyXG5cdGxldCBlbGVtZW50RG9lc05vdEV4aXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRwcm9maWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGUnKTtcclxuXHJcblx0XHRpZihwcm9maWxlKSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocHJvZmlsZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxlbWVudERvZXNOb3RFeGlzdC5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0RG9lcyBub3QgZXhpc3QuXHJcblxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRgXHJcblx0XHRlbGVtZW50RG9lc05vdEV4aXN0LmlkID0gJ2RvZXMtbm90LWV4aXN0JztcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudERvZXNOb3RFeGlzdCk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkb2VzTm90RXhpc3Q7IiwiXHJcbmNvbnN0IHVzZXJQcm9maWxlID0gKGRhdGEpID0+IHtcclxuXHJcblx0bGV0IGVsZW1lbnRVc2VyUHJvZmlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0ZWxlbWVudEhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZScpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2VzLW5vdC1leGlzdCcpO1xyXG5cclxuXHRcdGlmKGVsZW1lbnRIVE1MKSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudEhUTUwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsZW1lbnRVc2VyUHJvZmlsZS5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidXNlci1wcm9maWxlXCIgPlxyXG5cclxuXHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZGF0YS5hdmF0YXJfdXJsfVwiIC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj5AJHtkYXRhLmxvZ2lufTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj4ke2RhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdOb3QgaGF2ZSBhIG5hbWUnfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj4ke2RhdGEuYmlvID8gZGF0YS5iaW8gOiAnTm90IGhhdmUgYSBiaW8nfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRgXHJcblx0XHRlbGVtZW50VXNlclByb2ZpbGUuaWQgPSAncHJvZmlsZSc7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnRVc2VyUHJvZmlsZSk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB1c2VyUHJvZmlsZTsiLCJcclxuY29uc3QgdXNlclJlcG9zID0gKGRhdGEpID0+IHtcclxuXHJcblx0bGV0IGVsZW1lbnRVc2VyUmVwb3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdHByb2ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZScpO1xyXG5cclxuXHRcdGxldCByZXBvcyA9IGRhdGEubWFwKCBkID0+XHJcblx0XHRcdGA8ZGl2PlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIke2QuaHRtbF91cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgPiR7ZC5uYW1lfTwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiJHtkLmZvcmtzX3VybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiA+JHtkLmZvcmtzfTwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiJHtkLnN0YXJnYXplcnNfdXJsfVwiIHRhcmdldD1cIl9ibGFua1wiID4ke2Quc3RhcmdhemVyc19jb3VudH08L2E+XHJcblx0XHRcdDwvZGl2PmBcclxuXHRcdCk7XHJcblxyXG5cdFx0ZWxlbWVudFVzZXJSZXBvcy5pbm5lckhUTUwgPSByZXBvcy5qb2luKCcnKTtcclxuXHRcdGVsZW1lbnRVc2VyUmVwb3MuY2xhc3NOYW1lID0gJ3VzZXItcmVwb3MnO1xyXG5cdFx0cHJvZmlsZS5hcHBlbmQoZWxlbWVudFVzZXJSZXBvcyk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB1c2VyUmVwb3M7Il19
