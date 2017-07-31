import getData from './services/get_data.js'
import userRepos from './templates/user_repos.js'
import userProfile from './templates/user_profile.js'
import doesNotExist from './templates/does_not_exist.js'

let search  = document.getElementById('search')

search.addEventListener('click', () => {

	let userGit = document.getElementById('userGit'),
		url = `https://api.github.com/users/${userGit.value}`

	getData('GET', url, true)
		.then( resolve => {
			resolveRequest(resolve, userProfile, doesNotExist)
		})
		.catch( error => {
			console.log(error)
		})

	getData('GET', `${url}/repos`)
		.then( resolve => {
			resolveRequest(resolve, userRepos)
		})
		.catch( error => {
			console.log(error)
		})

})

let resolveRequest = (resolve, template, templateNotExist) => {

	resolve.status === 200 ? template(resolve.response) : templateNotExist()
}