
const getData = (method, url) => {

	return new Promise( (resolve, reject) => {

		let xhr = new XMLHttpRequest();

		xhr.open(method, url, true);

		xhr.addEventListener('load', e => {

			let response = {
				status: e.target.status,
				response: JSON.parse(e.target.response)
			};

			resolve(response);
		});

		xhr.addEventListener('error', e => {
			reject(e.target);
		});

		xhr.send();
	});
}

module.exports = getData;