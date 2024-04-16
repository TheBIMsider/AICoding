const promoCodeInput = document.getElementById('promoCode');
const finalPriceElement = document.getElementById('finalPrice');
const promoForm = document.getElementById('promoForm'); 
const basePrice = 50; // Changed to number

finalPriceElement.textContent = `Ticket Price: $${basePrice}`;

function applyDiscount(basePrice, userCode) {
  let discountRate = 0;
  
  // Convert userCode to uppercase for case-insensitive comparison
  const code = userCode.toUpperCase();

  if (code === "HALF") {
    discountRate = 0.5;
  }
  
  const finalPrice = basePrice - basePrice * discountRate;
  return finalPrice;
}

promoForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const userCode = promoCodeInput.value;
  const finalPrice = applyDiscount(basePrice, userCode);
  
  if (finalPrice < basePrice) {
    finalPriceElement.textContent = `Final Ticket Price: $${finalPrice}`;
    promoCodeInput.placeholder = '';
  } else {
    promoCodeInput.placeholder = 'Invalid Promo Code!';
  }
  
  promoCodeInput.value = '';
});
