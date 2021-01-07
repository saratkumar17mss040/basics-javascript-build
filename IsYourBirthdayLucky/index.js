const dob = document.querySelector("input[type='date']");
const luckyNumber = document.querySelector("input[type='number']");
const result = document.getElementById('result');
const checkBtn = document.getElementById('check');
const privacyNoticeBtn = document.getElementById('privacy-notice');
const privacyNoticeModal = document.getElementById('privacy-notice-modal');
const closBtn = document.getElementsByClassName('close')[0];
const loader = document.querySelector('.loader');

checkBtn.addEventListener('click', checkLucky);
privacyNoticeBtn.addEventListener('click', openPrivacyNoticeModal);
closBtn.addEventListener('click', closePrivacyNoticeModal);

function openPrivacyNoticeModal() {
	privacyNoticeModal.style.display = 'block';
}

function closePrivacyNoticeModal() {
	privacyNoticeModal.style.display = 'none';
}

window.onclick = function (event) {
	if (event.target == privacyNoticeModal) {
		privacyNoticeModal.style.display = 'none';
	}
};

function sumOfDigits(num) {
	let sum = 0,
		rem = 0;
	while (num !== 0) {
		rem = num % 10;
		sum += rem;
		num = Math.floor(num / 10);
	}
	return sum;
}

function checkLucky() {
	const fullDob = dob.value.replace(/-/g, '');
	const correctDobFormat = dob.value.split('-').reverse().join('-');
	const sod = sumOfDigits(fullDob);
	loader.classList.add('show');
	result.classList.add('hide');
	setTimeout(() => {
		loader.classList.remove('show');
		result.classList.remove('hide');
	}, 500);
	if (fullDob === '' && luckyNumber.value === '') {
		result.textContent =
			'Please enter both of the fields date of birth and lucky number !';
	} else if (fullDob === '') {
		result.textContent = 'Please enter your date of birth !';
	} else if (luckyNumber.value === '') {
		result.textContent = 'Please enter a lucky number !';
	} else if (sod % luckyNumber.value === 0) {
		result.textContent = `Your birthday ${correctDobFormat} is lucky 🌟`;
	} else {
		result.textContent = `Your birthday ${correctDobFormat} is not lucky 🙄, may be try entering next lucky number`;
	}
}
