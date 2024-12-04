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

document.getElementById('reviewForm').addEventListener('submit', async function (e) {
    e.preventDefault();

	// Get the item ID of the review
    const itemId = parseInt(document.getElementById('itemId').value, 10);

	// Get the text of the review
    const reviewText = document.getElementById('reviewText').value;

    const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, reviewText }),
    });

    const result = await response.json();
    if (result.success) {
	    // Refresh the list of items and reviews
        loadItems(); 
    }
});

async function loadItems() {
    const itemResponse = await fetch('http://localhost:3000/api/items');
    const items = await itemResponse.json();

    const reviewResponse = await fetch('http://localhost:3000/api/reviews');
    const reviews = await reviewResponse.json();

    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.title}</strong> - $${item.cost.toFixed(2)}: ${item.description}`;

        // Filter reviews for the current item
        const itemReviews = reviews.filter(review => review.itemId === item.id);

        if (itemReviews.length > 0) {
            const reviewList = document.createElement('ul');
            itemReviews.forEach(review => {
                const reviewLi = document.createElement('li');
                reviewLi.textContent = `Review: ${review.reviewText}`;
                reviewList.appendChild(reviewLi);
            });
            li.appendChild(reviewList);
        } else {
            const noReview = document.createElement('p');
            noReview.textContent = 'No reviews yet.';
            li.appendChild(noReview);
        }

        itemList.appendChild(li);
    });
}

// Loads the items once the page is loaded
loadItems();
