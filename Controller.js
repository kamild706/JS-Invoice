class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		view.model = model;
		view.setupNewItemFormListener();

		this.nameIsInvalid = new Event(this);
		this.countIsInvalid = new Event(this);
		this.priceIsInvalid = new Event(this);

		this.setupDispatchers();
	}

	setupDispatchers() {
		this.model.itemsNeedReloading.attach(this.view.showItems.bind(this.view));
		this.model.newItemAdded.attach(this.view.showNewItem.bind(this.view));

		this.view.newItemSubmitted.attach(this.onNewItemSubmitted.bind(this));

		this.nameIsInvalid.attach(this.view.onNameInvalid.bind(this.view));
		this.countIsInvalid.attach(this.view.onCountInvalid.bind(this.view));
		this.priceIsInvalid.attach(this.view.onPriceInvalid.bind(this.view));
	}

	onNewItemSubmitted(sender, itemData) {
		if (!FormValidator.isNameValid(itemData[0].value)) {
			return this.nameIsInvalid.notify();
		}
		if (!FormValidator.isCountValid(itemData[1].value)) {
			return this.countIsInvalid.notify();
		}
		if (!FormValidator.isPriceValid(itemData[2].value)) {
			return this.priceIsInvalid.notify();
		}

		const item = new InvoiceItem(itemData[0].value, Number(itemData[1].value), Number(itemData[2].value));
		this.model.addItem(item);
	}
}