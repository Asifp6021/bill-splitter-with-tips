const billAmount = document.querySelector('.bill');
const peoples = document.querySelector('.people');

const errorOne = document.querySelector('.errorOne');
const errorTwo = document.querySelector('.errorTwo');
const totalAmount = document.querySelector('.total-amount');
const tipAmount = document.querySelector('.tip__amount');

const tips = document.querySelectorAll('.tip__percent');

const resetBtn = document.querySelector('.btn');

const customTips = document.querySelector('.custom');

// --------------------------------------------------------------------------------------

billAmount.addEventListener('input', showResult);
peoples.addEventListener('input', showResult);

function showResult() {
	calculateWithoutTips();

	removeActiveTipPercentile();

	customTips.value = '';
}

// this function calculates without tips and updating resutlt and this is base calculation
function calculateWithoutTips() {
	const billAmountIs = Number(billAmount.value);
	const peoplesAre = Number(peoples.value);

	throwError(billAmountIs, peoplesAre);
}

// -------------------------------------------------------------------------------------------------------------

// showing error
function errorIs(err, clrIs) {
	err.style.opacity = 1;

	clrIs.classList.add('errBorder');

	setTimeout(() => {
		err.style.opacity = 0;
		clrIs.classList.remove('errBorder');
	}, 3000);
}

// conditions for showing error and and when there is error it is setting total to total billamount
function throwError(billAmountIs, peoplesAre) {
	if (billAmountIs === '' || billAmountIs === 0) {
		errorIs(errorOne, billAmount);
	}

	if (peoplesAre === '' || peoplesAre === 0 || !Number.isInteger(peoplesAre)) {
		errorIs(errorTwo, peoples);

		totalAmount.innerText = `$${billAmountIs.toFixed(2)}`;
	} else {
		calculatetotalAndPeopel(billAmountIs, peoplesAre);
	}
}

// --------------------------------------------------------------------------------------

// removing active class from tips percentile and setting calculation to base calculation
function removeActiveTipPercentile() {
	tips.forEach(function (t) {
		if (t.classList.contains('active')) {
			t.classList.remove('active');
		}
	});

	tipAmount.innerText = '$0.00';

	calculateWithoutTips();
}

// this function is calculating bill and splittig with peopel
function calculatetotalAndPeopel(billAmountIs, peoplesAre) {
	const result = billAmountIs / peoplesAre;

	totalAmount.innerText = `$${result.toFixed(2)}`;
}



// ---------------------------------------------------------------------------------------------------

// adding tips with provided percentage and calculating it and upadating result

tips.forEach(function (tip) {
	tip.addEventListener('click', calculateWithTips);
});

function calculateWithTips(e) {
	const billAmountIs = Number(billAmount.value);
	const peoplesAre = Number(peoples.value);

	throwError(billAmountIs, peoplesAre);

	if (
		billAmountIs === '' ||
		billAmountIs === 0 ||
		peoplesAre === '' ||
		peoplesAre === 0 ||
		!Number.isInteger(peoplesAre)
	)
		return;

	const result = billAmountIs / peoplesAre;
	totalAmount.innerText = result.toFixed(2);

	customTips.value = '';

	removeActiveTipPercentile();

	e.target.classList.add('active');

	const valuefind = parseInt(e.target.innerText);

	const getTipAmount = (billAmountIs * valuefind) / 100;

	const finualTotalAmount = (billAmountIs + getTipAmount) / peoplesAre;

	totalAmount.innerText = `$${finualTotalAmount.toFixed(2)}`;

	tipAmount.innerText = `$${getTipAmount.toFixed(2)}`;
}

// ---------------------------------------------------------------------------------------------------
// calculating custom tips and updating result
customTips.addEventListener('input', function () {
	removeActiveTipPercentile();
	const billAmountIs = Number(billAmount.value);
	const peoplesAre = Number(peoples.value);
	if (
		billAmountIs === '' ||
		billAmountIs === 0 ||
		peoplesAre === '' ||
		peoplesAre === 0 ||
		!Number.isInteger(peoplesAre)
	)
		return;

	const customeTip = Number(customTips.value);

	const customeTipAmount = (billAmountIs * customeTip) / 100;

	const finualTotalAmountWithCustomTip =
		(billAmountIs + customeTipAmount) / peoplesAre;

	totalAmount.innerText = `$${finualTotalAmountWithCustomTip.toFixed(2)}`;

	tipAmount.innerText = `$${customeTipAmount.toFixed(2)}`;
});

// ---------------------------------------------------------------------------------------------------

// resettting everything

resetBtn.addEventListener('click', function () {
	billAmount.value = '';
	peoples.value = '';
	customTips.value = '';
	location.reload();
});
