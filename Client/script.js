document.getElementById('itemForm').addEventListener('submit', async function(e) 
    {
    e.preventDefault();
	
	// Gets the name of the item
    const title = document.getElementById('title').value;
	
	// Gets the cost of the item
	const cost = parseFloat(document.getElementById('cost').value);
	
	// Gets the description of the item
    const description = document.getElementById('description').value;
    
    const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
		// Sends the item to the server
        body: JSON.stringify({ title, cost, description })
    });

    const result = await response.json();
    if (result.success) {
		// Refresh the list of items
        loadItems(); 
    }
});

async function loadItems() {
    const response = await fetch('http://localhost:3000/api/items');
    const items = await response.json();

    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - $${item.cost.toFixed(2)}: ${item.description}`;
        itemList.appendChild(li);
    });
}

// Loads the items once the page is loaded
loadItems();