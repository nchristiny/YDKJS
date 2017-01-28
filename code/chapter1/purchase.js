const SPENDING_THRESHOLD = 1000;
const SALES_TAX = 0.08;
const PHONE_PRICE = 798.99;
const ACCESSORY_PRICE = 29.99;
var bankAccountBalance = 1200000;
var totalUnitPrice = calculateTax(PHONE_PRICE);

function calculateTax(amt) {
  return amt *= 1 + SALES_TAX;
}

function checkBalance(total) {
  if (total > bankAccountBalance) {
    console.log("Denied: Exceeds balance: ");
    formatPrice(bankAccountBalance);
  } else {
    bankAccountBalance = bankAccountBalance - total;
    console.log("Approved: New balance is: ");
    formatPrice(bankAccountBalance);
  }
}

function formatPrice(price) {
  console.log("$" + price.toFixed(2));
}

function addAccessories(unitPrice) {
  var numberOfAccessories = parseInt((SPENDING_THRESHOLD - unitPrice) / ACCESSORY_PRICE, 10);
  var subtotal = unitPrice + numberOfAccessories * ACCESSORY_PRICE;
  if (unitPrice < SPENDING_THRESHOLD && numberOfAccessories && bankAccountBalance > calculateTax(subtotal)) {
    if (numberOfAccessories) {
      console.log(" Adding " + numberOfAccessories + " accessories to approach threshold.");
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
  if (bankAccountBalance >= totalUnitPrice) {
    console.log("New phone and accessory purchase...");
    var subTotal = addAccessories(totalUnitPrice);
    var grandTotal = calculateTax(subTotal);
    checkBalance(grandTotal);
  } else {
    console.log("End of purchases!");
    break;
  }
}
