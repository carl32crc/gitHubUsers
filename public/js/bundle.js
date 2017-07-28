(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _getDataFromApi = require('./getDataFromApi.js');

var _getDataFromApi2 = _interopRequireDefault(_getDataFromApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = document.getElementById('message-error'),
    userGit = document.getElementById('userGit'),
    search = document.getElementById('search');

search.addEventListener('click', function () {

	console.log('hola');

	var url = 'https://api.github.com/users/' + userGit.value;

	(0, _getDataFromApi2.default)('GET', url, true).then(function (resolve) {
		resolveRequest(resolve);
	}).catch(function (error) {
		console.log(error);
	});

	(0, _getDataFromApi2.default)('GET', url + '/repos').then(function (resolve) {
		resolveRequest(resolve);
	}).catch(function (error) {
		console.log(error);
	});
});

var resolveRequest = function resolveRequest(resolve) {

	if (resolve.status === 200) {
		message.textContent = '';
		console.log('Ok');
		console.log(resolve.response);
	} else {
		message.textContent = resolve.response.message;
		console.log(resolve.response.message);
	}
};

},{"./getDataFromApi.js":2}],2:[function(require,module,exports){
'use strict';

var getDataFromApi = function getDataFromApi(method, url) {

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

module.exports = getDataFromApi;

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXGpzXFxhcHAuanMiLCJkZXZcXGpzXFxnZXREYXRhRnJvbUFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLElBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBZDtBQUFBLElBQ0MsVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FEWDtBQUFBLElBRUMsU0FBVSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FGWDs7QUFJQyxPQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQU07O0FBRXRDLFNBQVEsR0FBUixDQUFZLE1BQVo7O0FBRUEsS0FBSSx3Q0FBc0MsUUFBUSxLQUFsRDs7QUFFQSwrQkFBZSxLQUFmLEVBQXNCLEdBQXRCLEVBQTJCLElBQTNCLEVBQ0UsSUFERixDQUNRLG1CQUFXO0FBQ2pCLGlCQUFlLE9BQWY7QUFDQSxFQUhGLEVBSUUsS0FKRixDQUlTLGlCQUFTO0FBQ2hCLFVBQVEsR0FBUixDQUFZLEtBQVo7QUFDQSxFQU5GOztBQVFBLCtCQUFlLEtBQWYsRUFBeUIsR0FBekIsYUFDRSxJQURGLENBQ1EsbUJBQVc7QUFDakIsaUJBQWUsT0FBZjtBQUNBLEVBSEYsRUFJRSxLQUpGLENBSVMsaUJBQVM7QUFDaEIsVUFBUSxHQUFSLENBQVksS0FBWjtBQUNBLEVBTkY7QUFRQSxDQXRCRDs7QUF3QkEsSUFBSSxpQkFBaUIsU0FBakIsY0FBaUIsVUFBVzs7QUFFL0IsS0FBSSxRQUFRLE1BQVIsS0FBbUIsR0FBdkIsRUFBNEI7QUFDM0IsVUFBUSxXQUFSLEdBQXNCLEVBQXRCO0FBQ0EsVUFBUSxHQUFSLENBQVksSUFBWjtBQUNBLFVBQVEsR0FBUixDQUFZLFFBQVEsUUFBcEI7QUFDQSxFQUpELE1BSU07QUFDTCxVQUFRLFdBQVIsR0FBc0IsUUFBUSxRQUFSLENBQWlCLE9BQXZDO0FBQ0EsVUFBUSxHQUFSLENBQVksUUFBUSxRQUFSLENBQWlCLE9BQTdCO0FBQ0E7QUFDRCxDQVZEOzs7OztBQzdCRCxJQUFNLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLE1BQUQsRUFBUyxHQUFULEVBQWlCOztBQUV2QyxTQUFPLElBQUksT0FBSixDQUFhLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7O0FBRXhDLFFBQUksTUFBTSxJQUFJLGNBQUosRUFBVjs7QUFFQSxRQUFJLElBQUosQ0FBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCOztBQUVBLFFBQUksZ0JBQUosQ0FBcUIsTUFBckIsRUFBNkIsYUFBSzs7QUFFakMsVUFBSSxXQUFXO0FBQ2QsZ0JBQVEsRUFBRSxNQUFGLENBQVMsTUFESDtBQUVkLGtCQUFVLEtBQUssS0FBTCxDQUFXLEVBQUUsTUFBRixDQUFTLFFBQXBCO0FBRkksT0FBZjs7QUFLQSxjQUFRLFFBQVI7QUFDQSxLQVJEOztBQVVBLFFBQUksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsYUFBSztBQUNsQyxhQUFPLEVBQUUsTUFBVDtBQUNBLEtBRkQ7O0FBSUEsUUFBSSxJQUFKO0FBQ0EsR0FyQk0sQ0FBUDtBQXNCQSxDQXhCRDs7QUEwQkEsT0FBTyxPQUFQLEdBQWlCLGNBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBnZXREYXRhRnJvbUFwaSBmcm9tICcuL2dldERhdGFGcm9tQXBpLmpzJztcclxuXHJcbmxldCBtZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UtZXJyb3InKSxcclxuXHR1c2VyR2l0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJHaXQnKSxcclxuXHRzZWFyY2ggID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpO1xyXG5cclxuXHRzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ2hvbGEnKTtcclxuXHJcblx0XHRsZXQgdXJsID0gYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHt1c2VyR2l0LnZhbHVlfWA7XHJcblxyXG5cdFx0Z2V0RGF0YUZyb21BcGkoJ0dFVCcsIHVybCwgdHJ1ZSlcclxuXHRcdFx0LnRoZW4oIHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmVSZXF1ZXN0KHJlc29sdmUpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goIGVycm9yID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0Z2V0RGF0YUZyb21BcGkoJ0dFVCcsIGAke3VybH0vcmVwb3NgKVxyXG5cdFx0XHQudGhlbiggcmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0cmVzb2x2ZVJlcXVlc3QocmVzb2x2ZSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5jYXRjaCggZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdFx0fSlcclxuXHJcblx0fSk7XHJcblxyXG5cdGxldCByZXNvbHZlUmVxdWVzdCA9IHJlc29sdmUgPT4ge1xyXG5cclxuXHRcdGlmIChyZXNvbHZlLnN0YXR1cyA9PT0gMjAwKSB7XHJcblx0XHRcdG1lc3NhZ2UudGV4dENvbnRlbnQgPSAnJztcclxuXHRcdFx0Y29uc29sZS5sb2coJ09rJyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc29sdmUucmVzcG9uc2UpO1xyXG5cdFx0fWVsc2Uge1xyXG5cdFx0XHRtZXNzYWdlLnRleHRDb250ZW50ID0gcmVzb2x2ZS5yZXNwb25zZS5tZXNzYWdlO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNvbHZlLnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cclxuXHJcblxyXG4iLCJcclxuY29uc3QgZ2V0RGF0YUZyb21BcGkgPSAobWV0aG9kLCB1cmwpID0+IHtcclxuXHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cdFx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuXHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcclxuXHJcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xyXG5cclxuXHRcdFx0bGV0IHJlc3BvbnNlID0ge1xyXG5cdFx0XHRcdHN0YXR1czogZS50YXJnZXQuc3RhdHVzLFxyXG5cdFx0XHRcdHJlc3BvbnNlOiBKU09OLnBhcnNlKGUudGFyZ2V0LnJlc3BvbnNlKVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlID0+IHtcclxuXHRcdFx0cmVqZWN0KGUudGFyZ2V0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHhoci5zZW5kKCk7XHJcblx0fSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0RGF0YUZyb21BcGk7Il19
