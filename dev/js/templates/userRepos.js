
const userRepos = (data) => {

	let elementUserRepos = document.createElement('div'),
		profile = document.getElementById('profile');

		let repos = data.map( d =>
			`<div>
				<a href="${d.html_url}" target="_blank" >${d.name}</a>
				<a href="${d.forks_url}" target="_blank" >${d.forks}</a>
				<a href="${d.stargazers_url}" target="_blank" >${d.stargazers_count}</a>
			</div>`
		);

		elementUserRepos.innerHTML = repos.join('');
		elementUserRepos.className = 'user-repos';
		profile.append(elementUserRepos);

};

module.exports = userRepos;