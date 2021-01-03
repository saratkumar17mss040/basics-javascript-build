const billAmountInput = document.getElementById('bill-amount-input');
const cashAmountInput = document.getElementById('cash-amount-input');
const moneyMessages = document.querySelectorAll('.money-message');
const message = document.getElementById('message');
const button = document.querySelector('button');
const loader = document.querySelector('i');
const notes = [2000, 500, 100, 20, 10, 5, 1];

billAmountInput.addEventListener('change', toggleCashInput);

function toggleCashInput(event) {
	if (event.target.value === '') {
		for (let moneyMessage of moneyMessages) {
			moneyMessage.hidden = false;
		}
		cashAmountInput.hidden = false;
	} else {
		for (let moneyMessage of moneyMessages) {
			moneyMessage.hidden = true;
		}
		cashAmountInput.hidden = false;
	}
}

button.addEventListener('click', generateDenomination);

function validateMoney(cashAmount, billAmount) {
	loader.classList.add('fa', 'fa-circle-o-notch', 'fa-spin');
	setTimeout(
		() => loader.classList.remove('fa', 'fa-circle-o-notch', 'fa-spin'),
		100
	);
	if (cashAmount < billAmount) {
		message.textContent = 'Hey payer 😎, Please enter more sufficient money !';
		message.hidden = false;
		return false;
	} else if (
		billAmount <= 0 ||
		cashAmount <= 0 ||
		isNaN(cashAmount) ||
		isNaN(billAmount)
	) {
		message.textContent =
			'Hey cashier or payer 😎, Please enter a valid money as a number !';
		message.hidden = false;
		return false;
	} else {
		message.textContent = `Hey cashier 😎, you can give back the money with the below mentioned minimum
        denominations !`;
		message.hidden = false;
		return true;
	}
}

function calculateNotes(cashAmount, billAmount) {
	const noteDenominations = [];
	var differenceAmount = parseInt(cashAmount - billAmount);
	for (let i = 0; i < notes.length; i++) {
		noteDenominations.push(Math.floor(differenceAmount / notes[i]));
		differenceAmount = differenceAmount - notes[i] * noteDenominations[i];
	}
	return noteDenominations;
}

function generateDenomination() {
	var cashAmount = parseInt(cashAmountInput.value);
	var billAmount = parseInt(billAmountInput.value);
	const denominationTable = document.getElementById('denomination-table');
	if (validateMoney(cashAmount, billAmount) === true) {
		const noOfNotes = calculateNotes(cashAmount, billAmount);
		var noOfNotesPointer = 0;
		var notesPointer = 0;
		const tableRows = denominationTable.rows;

		for (let i = 0; i < tableRows.length; i++) {
			for (let j = 0; j < tableRows[i].cells.length; j++) {
				if (i === 0) continue;
				else if (j === 0) {
					tableRows[i].cells[j].textContent = notes[notesPointer];
					notesPointer++;
				} else if (j === 1) {
					tableRows[i].cells[j].textContent = noOfNotes[noOfNotesPointer];
					noOfNotesPointer++;
				}
			}
		}
		denominationTable.hidden = false;
	} else {
		denominationTable.hidden = true;
	}
}
