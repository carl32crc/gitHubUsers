
const doesNotExist = () => {

	let elementDoesNotExist = document.createElement('div'),
		elementContainer = document.getElementsByClassName('container')[0],
		profile = document.getElementById('profile') || document.getElementById('does-not-exist')

		if(profile) {
			elementContainer.removeChild(profile)
		}

		elementDoesNotExist.innerHTML = `
					<div>

						Does not exist.

					</div>
		`
		elementDoesNotExist.id = 'does-not-exist'
		elementContainer.appendChild(elementDoesNotExist)

}

module.exports = doesNotExist