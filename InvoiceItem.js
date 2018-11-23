class InvoiceItem {

	constructor(name, count, price) {
		this.name = name;
		this.count = count;
		this.price = price;
	}

	get total() {
		return this.count * this.price;
	}
}