class FormValidator {
	static isNameValid(name) {
		return name[0] === name[0].toUpperCase();
	}

	static isCountValid(count) {
		return /^\d+(\.\d{1,2})?$/.test(count);
	}

	static isPriceValid(price) {
		return /^\d+(\.\d{1,2})?$/.test(price);
	}
}