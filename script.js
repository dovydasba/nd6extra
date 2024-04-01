let workersList = [];


window.onload = function() {
    const savedList = JSON.parse(localStorage.getItem('workersList'));
    if (savedList) {
        workersList = savedList;
        workersList.forEach(function(item) {
            addItemToDOM(item);
        });
    }
};

function addItem() {
    const item = document.getElementById('item').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    if (item && quantity) {
        const listItem = document.createElement('li');
        listItem.textContent = `${item}: ${quantity} `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            listItem.remove();
            totalQuantity -= quantity;
            itemCount--;
            updateAverage();
        });

        listItem.appendChild(deleteButton);
        document.getElementById('workersList').appendChild(listItem);
        totalQuantity += quantity;
        itemCount++;
        updateAverage();
        totalQuantity += newItemQuantity;
    itemCount++;
    updateAverage();
    }
}

function addItemToDOM(shoppingItem) {
    const shoppingListDOM = document.getElementById('workersList');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(shoppingItem.item + " - " + shoppingItem.quantity));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'trinti';
    deleteButton.addEventListener('click', function() {
        deleteItem(shoppingItem, li);
    });

    li.appendChild(deleteButton);
    shoppingListDOM.appendChild(li);
}

function saveToLocalStorage() {
    localStorage.setItem('workersList', JSON.stringify(workersList));
}

function deleteItem(shoppingItem, li) {
    // Remove item from DOM
    li.parentNode.removeChild(li);

    // Remove item from  array
    workersList = workersList.filter(function(item) {
        return item.item !== shoppingItem.item || item.quantity !== shoppingItem.quantity;
    });

    // Update localStorage
    saveToLocalStorage();
    totalQuantity -= removedItemQuantity;
    itemCount--;
    updateAverage();
}
let totalQuantity = 0;
let itemCount = 0;

function deleteList() {
    // Get the list
    var list = document.getElementById('workersList');

    // Remove all list items
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Clear the list from localStorage
    localStorage.clear();

    // Reset the average and sum
    totalQuantity = 0;
    itemCount = 0;
    updateAverage();
}

function updateAverage() {
    const average = itemCount ? totalQuantity / itemCount : 0;
    const sum = totalQuantity;
    document.getElementById('average').textContent = `Bendra suma: ${sum}, Vidutinis atlyginimas: ${average.toFixed(2)}`;
}