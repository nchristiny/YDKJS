const SPENDING_THRESHOLD = 400.00;
const SALES_TAX = 0.08;
const PHONE_PRICE = 199.99;
const ACCESSORY_PRICE = 79.99;

var bankAccountBalance = 24000;
var totalUnitPrice = calculateTax(PHONE_PRICE);
var count = 0;

function calculateTax(amt) {
  return amt *= 1 + SALES_TAX;
}

function checkBalance(total) {
  if (total > bankAccountBalance) {
    console.log("Denied: Exceeds balance: " + formatPrice(bankAccountBalance));
  } else {
    bankAccountBalance = bankAccountBalance - total;
    console.log("New balance is: " + formatPrice(bankAccountBalance));
  }
}

function formatPrice(price) {
   return "$" + price.toFixed(2);
}

function addAccessories(unitPrice) {
  var numberOfAccessories = parseInt((SPENDING_THRESHOLD - unitPrice) / ACCESSORY_PRICE, 10);
  var subtotal = unitPrice + numberOfAccessories * ACCESSORY_PRICE;
  // TODO: REFACTOR THIS
  if (unitPrice < SPENDING_THRESHOLD && bankAccountBalance > calculateTax(subtotal)) {
    if (numberOfAccessories > 0) {
      // Currently possible to surpass SPENDING_THRESHOLD by price of single accessory
      console.log("Adding " + numberOfAccessories + " accessories to approach threshold.");
      return unitPrice + numberOfAccessories * ACCESSORY_PRICE;
    } else {
      console.log("Done adding accessories.")
      return unitPrice
    }
  } else {
      console.log("No accessories to add.")
      return unitPrice
  }
}

while (true) {
  if (bankAccountBalance > totalUnitPrice) {
    count++;
    console.log("Purchase #" + count + ": ");
    var subTotal = addAccessories(totalUnitPrice);
    var grandTotal = calculateTax(subTotal);
    console.log("Running grand total: " + count + " phones at " + formatPrice(grandTotal) + " each => " + formatPrice(grandTotal * count));
    checkBalance(grandTotal);
  } else {
    console.log("End of purchases!\n");
    console.log("Grand total: " + count + " units for " + formatPrice(grandTotal * count));
    console.log("Final bank balance: " + formatPrice(bankAccountBalance));
    break;
  }
}


/*
Reflections on exercise:
Took the challenge to mean purchase as many accessories up to the threshold.
Currently it works, but it ain't pretty. There are possible pitfalls in feeding
different constant values, like infinite loops and addAccessories() function
definitely needs to be refactored. The code as it is now is fragile. Although it
is possible to go over the spending threshold slightly, the program will not
overdraft the bank balance.
*/
