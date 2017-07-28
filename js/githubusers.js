
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

let message = document.getElementById('message-error'),
	userGit = document.getElementById('userGit'),
	search  = document.getElementById('search');


	search.addEventListener('click', () => {

		let url = `https://api.github.com/users/${userGit.value}`;

		getData('GET', url, true)
			.then( resolve => {
				resolveRequest(resolve);
			})
			.catch( error => {
				console.log(error);
			})

		getData('GET', `${url}/repos`)
			.then( resolve => {
				resolveRequest(resolve);
			})
			.catch( error => {
				console.log(error);
			})

	});

	let resolveRequest = resolve => {

		if (resolve.status === 200) {
			message.textContent = '';
			console.log('Ok');
			console.log(resolve.response);
		}else {
			message.textContent = resolve.response.message;
			console.log(resolve.response.message);
		}
	};




