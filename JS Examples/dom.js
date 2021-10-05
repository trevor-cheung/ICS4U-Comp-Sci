//let itemLister = document.querySelector('#header-title span');
//itemLister.style.display = 'inline-block';

//console.log(itemLister.style);

function addListItem() {
    let items = document.querySelector('#items');
    let newItem = document.createElement('li');
    newItem.classList.add('list-group-item');
    let text = document.querySelector('#newItem');
    let textnode = document.createTextNode(text.value);
    text.value = ('');
    newItem.appendChild(textnode);
    items.appendChild(newItem);
}

// let itemList = [];