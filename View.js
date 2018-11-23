class View {
	constructor() {
		this.model = null;
		this.table = document.getElementsByTagName("tbody")[0];
		this.rowTemplate = document.getElementById("table-row-template");
		this.charge = document.getElementById("total-charge");
		this.newItemForm = document.getElementById("new-item-form");

		this.newItemSubmitted = new Event(this);
	}

	setupNewItemFormListener() {
		this.newItemForm.addEventListener("submit", e => {
			e.preventDefault();
			for (let elem of document.getElementsByClassName("error"))
				elem.setAttribute("hidden", true);

			this.newItemSubmitted.notify(e.target);
		}, false);
	}

	showItems() {
		while (this.table.firstChild) this.table.removeChild(this.table.firstChild);

		let id = 0;
		for (const item of model.items) {
			const row = this.createNewRow(item, id++);
			this.table.appendChild(row);
		}
		this.updateTotalCharge();
	}

	showNewItem() {
		let id = this.model.items.length - 1;
		let row = this.createNewRow(this.model.items[id], id);
		this.table.appendChild(row);
		this.updateTotalCharge();

		this.newItemForm.reset();
	}

	onNameInvalid() {
		let elements = document.getElementsByClassName("name-error");
		for (let elem of elements) {
			elem.removeAttribute("hidden");
		}
	}

	onCountInvalid() {
		let elements = document.getElementsByClassName("count-error");
		for (let elem of elements) {
			elem.removeAttribute("hidden");
		}
	}

	onPriceInvalid() {
		let elements = document.getElementsByClassName("price-error");
		for (let elem of elements) {
			elem.removeAttribute("hidden");
		}
	}

	onEditItem(event) {
		let id = Number(event.target.parentElement.parentElement.parentElement.dataset.id);
		
	}

	onDeleteItem(event) {
		let response = prompt("Czy na pewno chcesz usunąć tę pozycję?");
		if (["tak", "Tak", "yes", "Yes"].includes(response)) {
			let id = Number(event.target.parentElement.parentElement.parentElement.dataset.id);
			this.model.deleteItemById(id);
		}
	}

	updateTotalCharge() {
		this.charge.textContent = Formatter.formatCurrency(this.model.totalCharge);
	}

	createNewRow(item, num) {
		const row = this.rowTemplate.cloneNode(true);
		row.removeAttribute("id");

		row.dataset.id = num;

		row.children[0].children[0].children[0].addEventListener("click", this.onEditItem);
		row.children[0].children[0].children[1].addEventListener("click", this.onDeleteItem.bind(this));

		row.children[0].children[1].textContent = num + 1;
		row.children[1].textContent = item.name;
		row.children[2].textContent = Formatter.formatCount(item.count);
		row.children[3].textContent = Formatter.formatCurrency(item.price);
		row.children[4].textContent = Formatter.formatCurrency(item.total);

		return row;
	}

onDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const element = document.querySelector(`[data-id="${data}"]`);
  try {
    if (event.currentTarget.nodeName === "TR")
    	event.currentTarget.parentNode.insertBefore(element, event.currentTarget.nextSibling);
    if (event.currentTarget.nodeName === "THEAD")
    	event.currentTarget.nextElementSibling.insertBefore(element, event.currentTarget.nextElementSibling.firstChild);
  } catch (error) {
  }

  const currentPosition = [...this.table.children].indexOf(element);
  const previousPosition = Number(data);
  this.model.moveItem(previousPosition, currentPosition);
}

dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.id);
}

allowDrop(event) {
  event.preventDefault();
}
}