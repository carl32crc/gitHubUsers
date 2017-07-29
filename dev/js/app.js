import getData from './services/getData.js';
import userProfile from './templates/userProfile.js';

let message = document.getElementById('message-error'),
	userGit = document.getElementById('userGit'),
	search  = document.getElementById('search');

	search.addEventListener('click', () => {

		let url = `https://api.github.com/users/${userGit.value}`;

		getData('GET', url, true)
			.then( resolve => {
				resolveRequest(resolve, userProfile);
			})
			.catch( error => {
				console.log(error);
			})

		/*getData('GET', `${url}/repos`)
			.then( resolve => {
				resolveRequest(resolve);
			})
			.catch( error => {
				console.log(error);
			})*/

	});

	let resolveRequest = (resolve, template) => {

		if (resolve.status === 200) {
			
			template(resolve.response);
			message.textContent = '';
			console.log('Ok');
			console.log(resolve.response);
		}else {
			message.textContent = resolve.response.message;
			console.log(resolve.response.message);
		}
	};




