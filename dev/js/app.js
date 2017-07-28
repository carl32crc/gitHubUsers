import getDataFromApi from './getDataFromApi.js';

let message = document.getElementById('message-error'),
	userGit = document.getElementById('userGit'),
	search  = document.getElementById('search');

	search.addEventListener('click', () => {

		console.log('hola');

		let url = `https://api.github.com/users/${userGit.value}`;

		getDataFromApi('GET', url, true)
			.then( resolve => {
				resolveRequest(resolve);
			})
			.catch( error => {
				console.log(error);
			})

		getDataFromApi('GET', `${url}/repos`)
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




