function convertCurrency(amount, fromCurrency, toCurrency) {
	if (isNaN(amount)) {
		alert("Please enter a valid number for the amount.");
		return;
	}

	const supportedCurrencies = ["USD", "EUR", "GBP", "CAD", "JPY", "ZAR", "ZMW"];

	if (!supportedCurrencies.includes(fromCurrency) || !supportedCurrencies.includes(toCurrency)) {
		alert("Please select a valid currency.");
		return;
	}

	fetch(`https://openexchangerates.org/api/latest.json?app_id=1320859a61434750b40dad168582b8ac`)
		.then(response => response.json())
		.then(data => {
			if(!data.hasOwnProperty('rates') || !data.rates.hasOwnProperty(toCurrency) || !data.rates.hasOwnProperty(fromCurrency)){
				alert("Sorry, we were unable to retrieve the latest currency exchange rates. Please try again later.");
				return;
			}
			const rate = data.rates[toCurrency] / data.rates[fromCurrency];
			const convertedAmount = amount * rate;
			document.getElementById("convertedAmount").innerHTML = convertedAmount;
		})
		.catch(error => {
			console.log(error);
			alert("Sorry, we were unable to retrieve the latest currency exchange rates. Please try again later.");
		});
}

document.getElementById("convertButton").addEventListener("click", function () {
	const amount = document.getElementById("amount").value;
	const fromCurrency = document.getElementById("fromCurrency").value;
	const toCurrency = document.getElementById("toCurrency").value;
	convertCurrency(amount, fromCurrency, toCurrency);
});
