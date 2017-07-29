
const doesNotExist = () => {

	let elementDoesNotExist = document.createElement('div'),
		profile = document.getElementById('profile');

		if(profile) {
			document.body.removeChild(profile);
		}

		elementDoesNotExist.innerHTML = `
					<div>

						Does not exist.

					</div>
		`
		elementDoesNotExist.id = 'does-not-exist';
		document.body.appendChild(elementDoesNotExist);

};

module.exports = doesNotExist;