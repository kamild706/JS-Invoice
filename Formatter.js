class Formatter {
	static formatCurrency(amount) {
		let fixed = amount.toFixed(2);
		let commaSeparated = fixed.replace(".", ",");
		return `${commaSeparated} zł`;
	}

	static formatCount(amount) {
		return String(amount).replace(".", ",");
	}
}