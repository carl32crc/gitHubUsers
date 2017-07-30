import getData from './services/getData.js';
import userRepos from './templates/userRepos.js';
import userProfile from './templates/userProfile.js';
import doesNotExist from './templates/doesNotExist.js';

let search  = document.getElementById('search');

search.addEventListener('click', () => {

	let userGit = document.getElementById('userGit'),
		url = `https://api.github.com/users/${userGit.value}`;

	getData('GET', url, true)
		.then( resolve => {
			resolveRequest(resolve, userProfile, doesNotExist);
		})
		.catch( error => {
			console.log(error);
		})

	getData('GET', `${url}/repos`)
		.then( resolve => {
			resolveRequest(resolve, userRepos);
		})
		.catch( error => {
			//console.log(error);
		})

});

let resolveRequest = (resolve, template, templateNotExist) => {


	if (resolve.status === 200) {
		template(resolve.response);
	}else {
		templateNotExist();
	}
};




