class Model {
	constructor() {
		this.items = [];
		this.editedItem = null;

		this.itemsNeedReloading = new Event(this);
		this.newItemAdded = new Event(this);
	}

	initialize() {
		if (!localStorage.getItem("items")) {
			this.items.push(new InvoiceItem("Jabłka", 10, 1.3));
			this.items.push(new InvoiceItem("Gruszki", 5, 1.6));
			this.items.push(new InvoiceItem("Rzodkiewki", 15, 0.75));
			this.items.push(new InvoiceItem("Pomarańcze", 2, 2.1));
			this.items.push(new InvoiceItem("Cytryny", 10, 0.93));
			localStorage.setItem("items", JSON.stringify(this.items));
		} else {
			const restored = JSON.parse(localStorage.getItem("items"));
			for (let item of restored) {
				this.items.push(new InvoiceItem(item.name, item.count, item.price));
			}
		}

		this.itemsNeedReloading.notify();
	}

	editItem(item) {
		if (this.editedItem) {
			this.items.splice(this.editedItem, 1, item);
			this.editedItem = null;

			localStorage.setItem("items", JSON.stringify(this.items));
			this.itemsNeedReloading.notify();
		} else {
			console.warn("No item is being edited");
		}
	}

	addItem(item) {
		this.items.push(item);

		localStorage.setItem("items", JSON.stringify(this.items));
		this.newItemAdded.notify();
	}

	deleteItemById(id) {
		this.items.splice(id, 1);

		localStorage.setItem("items", JSON.stringify(this.items));
		this.itemsNeedReloading.notify();
	}

	moveItem(from, to) {
		const item = this.items.splice(from, 1)[0];
		this.items.splice(to, 0, item);

		localStorage.setItem("items", JSON.stringify(this.items));
		this.itemsNeedReloading.notify();
	}

	get totalCharge() {
		let charge = 0;
		for (const item of this.items)
			charge += item.total;
		return charge;
	}
}