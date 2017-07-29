
const userProfile = (data) => {

	let elementUserProfile = document.createElement('div'),
		elementHTML = document.getElementById('profile') || document.getElementById('does-not-exist');

		if(elementHTML) {
			document.body.removeChild(elementHTML);
		}

		elementUserProfile.innerHTML = `
					<div class="user-profile" >

						<div>
							<img src="${data.avatar_url}" />
						</div>

						<div>
							<span>@${data.login}</span>
							<span>${data.name ? data.name : 'Not have a name'}</span>
							<span>${data.bio ? data.bio : 'Not have a bio'}</span>
						</div>

					</div>
		`
		elementUserProfile.id = 'profile';
		document.body.appendChild(elementUserProfile);

};

module.exports = userProfile;