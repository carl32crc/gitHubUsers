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

var search = document.getElementById('search');

search.addEventListener('click', function () {

	var userGit = document.getElementById('userGit'),
	    url = 'https://api.github.com/users/' + userGit.value;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXGpzXFxhcHAuanMiLCJkZXZcXGpzXFxzZXJ2aWNlc1xcZ2V0RGF0YS5qcyIsImRldlxcanNcXHRlbXBsYXRlc1xcZG9lc05vdEV4aXN0LmpzIiwiZGV2XFxqc1xcdGVtcGxhdGVzXFx1c2VyUHJvZmlsZS5qcyIsImRldlxcanNcXHRlbXBsYXRlc1xcdXNlclJlcG9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxTQUFVLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFkOztBQUVBLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBTTs7QUFFdEMsS0FBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkO0FBQUEsS0FDQyx3Q0FBc0MsUUFBUSxLQUQvQzs7QUFHQSx3QkFBUSxLQUFSLEVBQWUsR0FBZixFQUFvQixJQUFwQixFQUNFLElBREYsQ0FDUSxtQkFBVztBQUNqQixpQkFBZSxPQUFmO0FBQ0EsRUFIRixFQUlFLEtBSkYsQ0FJUyxpQkFBUztBQUNoQixVQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsRUFORjs7QUFRQSx3QkFBUSxLQUFSLEVBQWtCLEdBQWxCLGFBQ0UsSUFERixDQUNRLG1CQUFXO0FBQ2pCLGlCQUFlLE9BQWY7QUFDQSxFQUhGLEVBSUUsS0FKRixDQUlTLGlCQUFTO0FBQ2hCO0FBQ0EsRUFORjtBQVFBLENBckJEOztBQXVCQSxJQUFJLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLGdCQUFwQixFQUF5Qzs7QUFHN0QsS0FBSSxRQUFRLE1BQVIsS0FBbUIsR0FBdkIsRUFBNEI7QUFDM0IsV0FBUyxRQUFRLFFBQWpCO0FBQ0EsRUFGRCxNQUVNO0FBQ0w7QUFDQTtBQUNELENBUkQ7Ozs7O0FDN0JBLElBQU0sVUFBVSxTQUFWLE9BQVUsQ0FBQyxNQUFELEVBQVMsR0FBVCxFQUFpQjs7QUFFaEMsU0FBTyxJQUFJLE9BQUosQ0FBYSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCOztBQUV4QyxRQUFJLE1BQU0sSUFBSSxjQUFKLEVBQVY7O0FBRUEsUUFBSSxJQUFKLENBQVMsTUFBVCxFQUFpQixHQUFqQixFQUFzQixJQUF0Qjs7QUFFQSxRQUFJLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLGFBQUs7O0FBRWpDLFVBQUksV0FBVztBQUNkLGdCQUFRLEVBQUUsTUFBRixDQUFTLE1BREg7QUFFZCxrQkFBVSxLQUFLLEtBQUwsQ0FBVyxFQUFFLE1BQUYsQ0FBUyxRQUFwQjtBQUZJLE9BQWY7O0FBS0EsY0FBUSxRQUFSO0FBQ0EsS0FSRDs7QUFVQSxRQUFJLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLGFBQUs7QUFDbEMsYUFBTyxFQUFFLE1BQVQ7QUFDQSxLQUZEOztBQUlBLFFBQUksSUFBSjtBQUNBLEdBckJNLENBQVA7QUFzQkEsQ0F4QkQ7O0FBMEJBLE9BQU8sT0FBUCxHQUFpQixPQUFqQjs7Ozs7QUMxQkEsSUFBTSxlQUFlLFNBQWYsWUFBZSxHQUFNOztBQUUxQixLQUFJLHNCQUFzQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBMUI7QUFBQSxLQUNDLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBRFg7O0FBR0MsS0FBRyxPQUFILEVBQVk7QUFDWCxXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE9BQTFCO0FBQ0E7O0FBRUQscUJBQW9CLFNBQXBCO0FBT0EscUJBQW9CLEVBQXBCLEdBQXlCLGdCQUF6QjtBQUNBLFVBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsbUJBQTFCO0FBRUQsQ0FuQkQ7O0FBcUJBLE9BQU8sT0FBUCxHQUFpQixZQUFqQjs7Ozs7QUNyQkEsSUFBTSxjQUFjLFNBQWQsV0FBYyxDQUFDLElBQUQsRUFBVTs7QUFFN0IsS0FBSSxxQkFBcUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXpCO0FBQUEsS0FDQyxjQUFjLFNBQVMsY0FBVCxDQUF3QixTQUF4QixLQUFzQyxTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLENBRHJEOztBQUdDLEtBQUcsV0FBSCxFQUFnQjtBQUNmLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsV0FBMUI7QUFDQTs7QUFFRCxvQkFBbUIsU0FBbkIsOEZBSWlCLEtBQUssVUFKdEIsNEVBUWMsS0FBSyxLQVJuQixzQ0FTYSxLQUFLLElBQUwsR0FBWSxLQUFLLElBQWpCLEdBQXdCLGlCQVRyQyx1Q0FVYSxLQUFLLEdBQUwsR0FBVyxLQUFLLEdBQWhCLEdBQXNCLGdCQVZuQztBQWVBLG9CQUFtQixFQUFuQixHQUF3QixTQUF4QjtBQUNBLFVBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsa0JBQTFCO0FBRUQsQ0EzQkQ7O0FBNkJBLE9BQU8sT0FBUCxHQUFpQixXQUFqQjs7Ozs7QUM3QkEsSUFBTSxZQUFZLFNBQVosU0FBWSxDQUFDLElBQUQsRUFBVTs7QUFFM0IsS0FBSSxtQkFBbUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXZCO0FBQUEsS0FDQyxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQURYOztBQUdDLEtBQUksUUFBUSxLQUFLLEdBQUwsQ0FBVTtBQUFBLHNDQUVULEVBQUUsUUFGTywyQkFFdUIsRUFBRSxJQUZ6QiwrQkFHVCxFQUFFLFNBSE8sMkJBR3dCLEVBQUUsS0FIMUIsK0JBSVQsRUFBRSxjQUpPLDJCQUk2QixFQUFFLGdCQUovQjtBQUFBLEVBQVYsQ0FBWjs7QUFRQSxrQkFBaUIsU0FBakIsR0FBNkIsTUFBTSxJQUFOLENBQVcsRUFBWCxDQUE3QjtBQUNBLGtCQUFpQixTQUFqQixHQUE2QixZQUE3QjtBQUNBLFNBQVEsTUFBUixDQUFlLGdCQUFmO0FBRUQsQ0FqQkQ7O0FBbUJBLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZ2V0RGF0YSBmcm9tICcuL3NlcnZpY2VzL2dldERhdGEuanMnO1xyXG5pbXBvcnQgdXNlclJlcG9zIGZyb20gJy4vdGVtcGxhdGVzL3VzZXJSZXBvcy5qcyc7XHJcbmltcG9ydCB1c2VyUHJvZmlsZSBmcm9tICcuL3RlbXBsYXRlcy91c2VyUHJvZmlsZS5qcyc7XHJcbmltcG9ydCBkb2VzTm90RXhpc3QgZnJvbSAnLi90ZW1wbGF0ZXMvZG9lc05vdEV4aXN0LmpzJztcclxuXHJcbmxldCBzZWFyY2ggID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpO1xyXG5cclxuc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuXHRsZXQgdXNlckdpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyR2l0JyksXHJcblx0XHR1cmwgPSBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy8ke3VzZXJHaXQudmFsdWV9YDtcclxuXHJcblx0Z2V0RGF0YSgnR0VUJywgdXJsLCB0cnVlKVxyXG5cdFx0LnRoZW4oIHJlc29sdmUgPT4ge1xyXG5cdFx0XHRyZXNvbHZlUmVxdWVzdChyZXNvbHZlLCB1c2VyUHJvZmlsZSwgZG9lc05vdEV4aXN0KTtcclxuXHRcdH0pXHJcblx0XHQuY2F0Y2goIGVycm9yID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0fSlcclxuXHJcblx0Z2V0RGF0YSgnR0VUJywgYCR7dXJsfS9yZXBvc2ApXHJcblx0XHQudGhlbiggcmVzb2x2ZSA9PiB7XHJcblx0XHRcdHJlc29sdmVSZXF1ZXN0KHJlc29sdmUsIHVzZXJSZXBvcyk7XHJcblx0XHR9KVxyXG5cdFx0LmNhdGNoKCBlcnJvciA9PiB7XHJcblx0XHRcdC8vY29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0fSlcclxuXHJcbn0pO1xyXG5cclxubGV0IHJlc29sdmVSZXF1ZXN0ID0gKHJlc29sdmUsIHRlbXBsYXRlLCB0ZW1wbGF0ZU5vdEV4aXN0KSA9PiB7XHJcblxyXG5cclxuXHRpZiAocmVzb2x2ZS5zdGF0dXMgPT09IDIwMCkge1xyXG5cdFx0dGVtcGxhdGUocmVzb2x2ZS5yZXNwb25zZSk7XHJcblx0fWVsc2Uge1xyXG5cdFx0dGVtcGxhdGVOb3RFeGlzdCgpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuXHJcbiIsIlxyXG5jb25zdCBnZXREYXRhID0gKG1ldGhvZCwgdXJsKSA9PiB7XHJcblxyXG5cdHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuXHRcdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcclxuXHJcblx0XHRcdGxldCByZXNwb25zZSA9IHtcclxuXHRcdFx0XHRzdGF0dXM6IGUudGFyZ2V0LnN0YXR1cyxcclxuXHRcdFx0XHRyZXNwb25zZTogSlNPTi5wYXJzZShlLnRhcmdldC5yZXNwb25zZSlcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZSA9PiB7XHJcblx0XHRcdHJlamVjdChlLnRhcmdldCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR4aHIuc2VuZCgpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldERhdGE7IiwiXHJcbmNvbnN0IGRvZXNOb3RFeGlzdCA9ICgpID0+IHtcclxuXHJcblx0bGV0IGVsZW1lbnREb2VzTm90RXhpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdHByb2ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZScpO1xyXG5cclxuXHRcdGlmKHByb2ZpbGUpIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwcm9maWxlKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbGVtZW50RG9lc05vdEV4aXN0LmlubmVySFRNTCA9IGBcclxuXHRcdFx0XHRcdDxkaXY+XHJcblxyXG5cdFx0XHRcdFx0XHREb2VzIG5vdCBleGlzdC5cclxuXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdGBcclxuXHRcdGVsZW1lbnREb2VzTm90RXhpc3QuaWQgPSAnZG9lcy1ub3QtZXhpc3QnO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50RG9lc05vdEV4aXN0KTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRvZXNOb3RFeGlzdDsiLCJcclxuY29uc3QgdXNlclByb2ZpbGUgPSAoZGF0YSkgPT4ge1xyXG5cclxuXHRsZXQgZWxlbWVudFVzZXJQcm9maWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRlbGVtZW50SFRNTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlJykgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvZXMtbm90LWV4aXN0Jyk7XHJcblxyXG5cdFx0aWYoZWxlbWVudEhUTUwpIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50SFRNTCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxlbWVudFVzZXJQcm9maWxlLmlubmVySFRNTCA9IGBcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ1c2VyLXByb2ZpbGVcIiA+XHJcblxyXG5cdFx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiJHtkYXRhLmF2YXRhcl91cmx9XCIgLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPkAke2RhdGEubG9naW59PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPiR7ZGF0YS5uYW1lID8gZGF0YS5uYW1lIDogJ05vdCBoYXZlIGEgbmFtZSd9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPiR7ZGF0YS5iaW8gPyBkYXRhLmJpbyA6ICdOb3QgaGF2ZSBhIGJpbyd9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdGBcclxuXHRcdGVsZW1lbnRVc2VyUHJvZmlsZS5pZCA9ICdwcm9maWxlJztcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudFVzZXJQcm9maWxlKTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXJQcm9maWxlOyIsIlxyXG5jb25zdCB1c2VyUmVwb3MgPSAoZGF0YSkgPT4ge1xyXG5cclxuXHRsZXQgZWxlbWVudFVzZXJSZXBvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0cHJvZmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlJyk7XHJcblxyXG5cdFx0bGV0IHJlcG9zID0gZGF0YS5tYXAoIGQgPT5cclxuXHRcdFx0YDxkaXY+XHJcblx0XHRcdFx0PGEgaHJlZj1cIiR7ZC5odG1sX3VybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiA+JHtkLm5hbWV9PC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIke2QuZm9ya3NfdXJsfVwiIHRhcmdldD1cIl9ibGFua1wiID4ke2QuZm9ya3N9PC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIke2Quc3RhcmdhemVyc191cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgPiR7ZC5zdGFyZ2F6ZXJzX2NvdW50fTwvYT5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdFx0KTtcclxuXHJcblx0XHRlbGVtZW50VXNlclJlcG9zLmlubmVySFRNTCA9IHJlcG9zLmpvaW4oJycpO1xyXG5cdFx0ZWxlbWVudFVzZXJSZXBvcy5jbGFzc05hbWUgPSAndXNlci1yZXBvcyc7XHJcblx0XHRwcm9maWxlLmFwcGVuZChlbGVtZW50VXNlclJlcG9zKTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXJSZXBvczsiXX0=
