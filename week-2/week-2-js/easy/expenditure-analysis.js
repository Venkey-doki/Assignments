/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
	let result = [];
	let categoriestotals = {};
	transactions.forEach(element => {
		if (categoriestotals[element.category] == undefined) {
			categoriestotals[element.category] = element.price
		} else { 
			categoriestotals[element.category] += element.price
		}
	});
	// i stumbled up on how can i format the response in the desired way , then used another loop to structure my answer
	for (let category in categoriestotals) { 
		result.push(
			{
				category: category,
				totalSpent: categoriestotals[category]
			}
		)
	}

	return result;
}

module.exports = calculateTotalSpentByCategory;
