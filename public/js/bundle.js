(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get_data = require('./services/get_data.js');

var _get_data2 = _interopRequireDefault(_get_data);

var _user_repos = require('./templates/user_repos.js');

var _user_repos2 = _interopRequireDefault(_user_repos);

var _user_profile = require('./templates/user_profile.js');

var _user_profile2 = _interopRequireDefault(_user_profile);

var _does_not_exist = require('./templates/does_not_exist.js');

var _does_not_exist2 = _interopRequireDefault(_does_not_exist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var search = document.getElementById('search');

search.addEventListener('click', function () {

	var userGit = document.getElementById('userGit'),
	    url = 'https://api.github.com/users/' + userGit.value;

	(0, _get_data2.default)('GET', url, true).then(function (resolve) {
		resolveRequest(resolve, _user_profile2.default, _does_not_exist2.default);
	}).catch(function (error) {
		console.log(error);
	});

	(0, _get_data2.default)('GET', url + '/repos').then(function (resolve) {
		resolveRequest(resolve, _user_repos2.default);
	}).catch(function (error) {
		console.log(error);
	});
});

var resolveRequest = function resolveRequest(resolve, template, templateNotExist) {

	resolve.status === 200 ? template(resolve.response) : templateNotExist();
};

},{"./services/get_data.js":2,"./templates/does_not_exist.js":3,"./templates/user_profile.js":4,"./templates/user_repos.js":5}],2:[function(require,module,exports){
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

	elementUserProfile.innerHTML = '\n\t\t\t\t\t<div class="user-profile" >\n\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<img src="' + data.avatar_url + '" />\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>@' + data.login + '</span>\n\t\t\t\t\t\t\t<span>' + (data.name ? data.name : 'Not have a name') + '</span>\n\t\t\t\t\t\t\t<span>' + (data.bio ? data.bio : 'Not have a bio') + '</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXGpzXFxhcHAuanMiLCJkZXZcXGpzXFxzZXJ2aWNlc1xcZ2V0X2RhdGEuanMiLCJkZXZcXGpzXFx0ZW1wbGF0ZXNcXGRvZXNfbm90X2V4aXN0LmpzIiwiZGV2XFxqc1xcdGVtcGxhdGVzXFx1c2VyX3Byb2ZpbGUuanMiLCJkZXZcXGpzXFx0ZW1wbGF0ZXNcXHVzZXJfcmVwb3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFNBQVUsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWQ7O0FBRUEsT0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFNOztBQUV0QyxLQUFJLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQWQ7QUFBQSxLQUNDLHdDQUFzQyxRQUFRLEtBRC9DOztBQUdBLHlCQUFRLEtBQVIsRUFBZSxHQUFmLEVBQW9CLElBQXBCLEVBQ0UsSUFERixDQUNRLG1CQUFXO0FBQ2pCLGlCQUFlLE9BQWY7QUFDQSxFQUhGLEVBSUUsS0FKRixDQUlTLGlCQUFTO0FBQ2hCLFVBQVEsR0FBUixDQUFZLEtBQVo7QUFDQSxFQU5GOztBQVFBLHlCQUFRLEtBQVIsRUFBa0IsR0FBbEIsYUFDRSxJQURGLENBQ1EsbUJBQVc7QUFDakIsaUJBQWUsT0FBZjtBQUNBLEVBSEYsRUFJRSxLQUpGLENBSVMsaUJBQVM7QUFDaEIsVUFBUSxHQUFSLENBQVksS0FBWjtBQUNBLEVBTkY7QUFRQSxDQXJCRDs7QUF1QkEsSUFBSSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixnQkFBcEIsRUFBeUM7O0FBRTdELFNBQVEsTUFBUixLQUFtQixHQUFuQixHQUF5QixTQUFTLFFBQVEsUUFBakIsQ0FBekIsR0FBc0Qsa0JBQXREO0FBQ0EsQ0FIRDs7Ozs7QUM3QkEsSUFBTSxVQUFVLFNBQVYsT0FBVSxDQUFDLE1BQUQsRUFBUyxHQUFULEVBQWlCOztBQUVoQyxTQUFPLElBQUksT0FBSixDQUFhLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7O0FBRXhDLFFBQUksTUFBTSxJQUFJLGNBQUosRUFBVjs7QUFFQSxRQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCOztBQUVBLFFBQUksZ0JBQUosQ0FBcUIsTUFBckIsRUFBNkIsYUFBSzs7QUFFakMsVUFBSSxXQUFXO0FBQ2QsZ0JBQVEsRUFBRSxNQUFGLENBQVMsTUFESDtBQUVkLGtCQUFVLEtBQUssS0FBTCxDQUFXLEVBQUUsTUFBRixDQUFTLFFBQXBCO0FBRkksT0FBZjs7QUFLQSxjQUFRLFFBQVI7QUFDQSxLQVJEOztBQVVBLFFBQUksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsYUFBSztBQUNsQyxhQUFPLEVBQUUsTUFBVDtBQUNBLEtBRkQ7O0FBSUEsUUFBSSxJQUFKO0FBQ0EsR0FyQk0sQ0FBUDtBQXNCQSxDQXhCRDs7QUEwQkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCOzs7OztBQzFCQSxJQUFNLGVBQWUsU0FBZixZQUFlLEdBQU07O0FBRTFCLEtBQUksc0JBQXNCLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUExQjtBQUFBLEtBQ0MsVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FEWDs7QUFHQyxLQUFHLE9BQUgsRUFBWTtBQUNYLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsT0FBMUI7QUFDQTs7QUFFRCxxQkFBb0IsU0FBcEI7QUFPQSxxQkFBb0IsRUFBcEIsR0FBeUIsZ0JBQXpCO0FBQ0EsVUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixtQkFBMUI7QUFFRCxDQW5CRDs7QUFxQkEsT0FBTyxPQUFQLEdBQWlCLFlBQWpCOzs7OztBQ3JCQSxJQUFNLGNBQWMsU0FBZCxXQUFjLENBQUMsSUFBRCxFQUFVOztBQUU3QixLQUFJLHFCQUFxQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekI7QUFBQSxLQUNDLGNBQWMsU0FBUyxjQUFULENBQXdCLFNBQXhCLEtBQXNDLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FEckQ7O0FBR0MsS0FBRyxXQUFILEVBQWdCO0FBQ2YsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixXQUExQjtBQUNBOztBQUVELG9CQUFtQixTQUFuQiw4RkFJaUIsS0FBSyxVQUp0Qiw0RUFRYyxLQUFLLEtBUm5CLHNDQVNhLEtBQUssSUFBTCxHQUFZLEtBQUssSUFBakIsR0FBd0IsaUJBVHJDLHVDQVVhLEtBQUssR0FBTCxHQUFXLEtBQUssR0FBaEIsR0FBc0IsZ0JBVm5DO0FBY0Esb0JBQW1CLEVBQW5CLEdBQXdCLFNBQXhCO0FBQ0EsVUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixrQkFBMUI7QUFFRCxDQTFCRDs7QUE0QkEsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7OztBQzVCQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsSUFBRCxFQUFVOztBQUUzQixLQUFJLG1CQUFtQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFBQSxLQUNDLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBRFg7O0FBR0MsS0FBSSxRQUFRLEtBQUssR0FBTCxDQUFVO0FBQUEsc0NBRVQsRUFBRSxRQUZPLDJCQUV1QixFQUFFLElBRnpCLCtCQUdULEVBQUUsU0FITywyQkFHd0IsRUFBRSxLQUgxQiwrQkFJVCxFQUFFLGNBSk8sMkJBSTZCLEVBQUUsZ0JBSi9CO0FBQUEsRUFBVixDQUFaOztBQVFBLGtCQUFpQixTQUFqQixHQUE2QixNQUFNLElBQU4sQ0FBVyxFQUFYLENBQTdCO0FBQ0Esa0JBQWlCLFNBQWpCLEdBQTZCLFlBQTdCO0FBQ0EsU0FBUSxNQUFSLENBQWUsZ0JBQWY7QUFFRCxDQWpCRDs7QUFtQkEsT0FBTyxPQUFQLEdBQWlCLFNBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBnZXREYXRhIGZyb20gJy4vc2VydmljZXMvZ2V0X2RhdGEuanMnXHJcbmltcG9ydCB1c2VyUmVwb3MgZnJvbSAnLi90ZW1wbGF0ZXMvdXNlcl9yZXBvcy5qcydcclxuaW1wb3J0IHVzZXJQcm9maWxlIGZyb20gJy4vdGVtcGxhdGVzL3VzZXJfcHJvZmlsZS5qcydcclxuaW1wb3J0IGRvZXNOb3RFeGlzdCBmcm9tICcuL3RlbXBsYXRlcy9kb2VzX25vdF9leGlzdC5qcydcclxuXHJcbmxldCBzZWFyY2ggID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpXHJcblxyXG5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG5cdGxldCB1c2VyR2l0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJHaXQnKSxcclxuXHRcdHVybCA9IGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlckdpdC52YWx1ZX1gXHJcblxyXG5cdGdldERhdGEoJ0dFVCcsIHVybCwgdHJ1ZSlcclxuXHRcdC50aGVuKCByZXNvbHZlID0+IHtcclxuXHRcdFx0cmVzb2x2ZVJlcXVlc3QocmVzb2x2ZSwgdXNlclByb2ZpbGUsIGRvZXNOb3RFeGlzdClcclxuXHRcdH0pXHJcblx0XHQuY2F0Y2goIGVycm9yID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpXHJcblx0XHR9KVxyXG5cclxuXHRnZXREYXRhKCdHRVQnLCBgJHt1cmx9L3JlcG9zYClcclxuXHRcdC50aGVuKCByZXNvbHZlID0+IHtcclxuXHRcdFx0cmVzb2x2ZVJlcXVlc3QocmVzb2x2ZSwgdXNlclJlcG9zKVxyXG5cdFx0fSlcclxuXHRcdC5jYXRjaCggZXJyb3IgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcilcclxuXHRcdH0pXHJcblxyXG59KVxyXG5cclxubGV0IHJlc29sdmVSZXF1ZXN0ID0gKHJlc29sdmUsIHRlbXBsYXRlLCB0ZW1wbGF0ZU5vdEV4aXN0KSA9PiB7XHJcblxyXG5cdHJlc29sdmUuc3RhdHVzID09PSAyMDAgPyB0ZW1wbGF0ZShyZXNvbHZlLnJlc3BvbnNlKSA6IHRlbXBsYXRlTm90RXhpc3QoKVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCJcclxuY29uc3QgZ2V0RGF0YSA9IChtZXRob2QsIHVybCkgPT4ge1xyXG5cclxuXHRyZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHJcblx0XHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuXHJcblx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSlcclxuXHJcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xyXG5cclxuXHRcdFx0bGV0IHJlc3BvbnNlID0ge1xyXG5cdFx0XHRcdHN0YXR1czogZS50YXJnZXQuc3RhdHVzLFxyXG5cdFx0XHRcdHJlc3BvbnNlOiBKU09OLnBhcnNlKGUudGFyZ2V0LnJlc3BvbnNlKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKVxyXG5cdFx0fSlcclxuXHJcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlID0+IHtcclxuXHRcdFx0cmVqZWN0KGUudGFyZ2V0KVxyXG5cdFx0fSlcclxuXHJcblx0XHR4aHIuc2VuZCgpXHJcblx0fSlcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZXREYXRhIiwiXHJcbmNvbnN0IGRvZXNOb3RFeGlzdCA9ICgpID0+IHtcclxuXHJcblx0bGV0IGVsZW1lbnREb2VzTm90RXhpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdHByb2ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZmlsZScpXHJcblxyXG5cdFx0aWYocHJvZmlsZSkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHByb2ZpbGUpXHJcblx0XHR9XHJcblxyXG5cdFx0ZWxlbWVudERvZXNOb3RFeGlzdC5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0RG9lcyBub3QgZXhpc3QuXHJcblxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRgXHJcblx0XHRlbGVtZW50RG9lc05vdEV4aXN0LmlkID0gJ2RvZXMtbm90LWV4aXN0J1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50RG9lc05vdEV4aXN0KVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkb2VzTm90RXhpc3QiLCJcclxuY29uc3QgdXNlclByb2ZpbGUgPSAoZGF0YSkgPT4ge1xyXG5cclxuXHRsZXQgZWxlbWVudFVzZXJQcm9maWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRlbGVtZW50SFRNTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlJykgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvZXMtbm90LWV4aXN0JylcclxuXHJcblx0XHRpZihlbGVtZW50SFRNTCkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnRIVE1MKVxyXG5cdFx0fVxyXG5cclxuXHRcdGVsZW1lbnRVc2VyUHJvZmlsZS5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidXNlci1wcm9maWxlXCIgPlxyXG5cclxuXHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZGF0YS5hdmF0YXJfdXJsfVwiIC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj5AJHtkYXRhLmxvZ2lufTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj4ke2RhdGEubmFtZSA/IGRhdGEubmFtZSA6ICdOb3QgaGF2ZSBhIG5hbWUnfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj4ke2RhdGEuYmlvID8gZGF0YS5iaW8gOiAnTm90IGhhdmUgYSBiaW8nfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdGBcclxuXHRcdGVsZW1lbnRVc2VyUHJvZmlsZS5pZCA9ICdwcm9maWxlJ1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50VXNlclByb2ZpbGUpXHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXJQcm9maWxlIiwiXHJcbmNvbnN0IHVzZXJSZXBvcyA9IChkYXRhKSA9PiB7XHJcblxyXG5cdGxldCBlbGVtZW50VXNlclJlcG9zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRwcm9maWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGUnKVxyXG5cclxuXHRcdGxldCByZXBvcyA9IGRhdGEubWFwKCBkID0+XHJcblx0XHRcdGA8ZGl2PlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIke2QuaHRtbF91cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgPiR7ZC5uYW1lfTwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiJHtkLmZvcmtzX3VybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiA+JHtkLmZvcmtzfTwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiJHtkLnN0YXJnYXplcnNfdXJsfVwiIHRhcmdldD1cIl9ibGFua1wiID4ke2Quc3RhcmdhemVyc19jb3VudH08L2E+XHJcblx0XHRcdDwvZGl2PmBcclxuXHRcdClcclxuXHJcblx0XHRlbGVtZW50VXNlclJlcG9zLmlubmVySFRNTCA9IHJlcG9zLmpvaW4oJycpXHJcblx0XHRlbGVtZW50VXNlclJlcG9zLmNsYXNzTmFtZSA9ICd1c2VyLXJlcG9zJ1xyXG5cdFx0cHJvZmlsZS5hcHBlbmQoZWxlbWVudFVzZXJSZXBvcylcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXNlclJlcG9zIl19
