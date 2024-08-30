
document.addEventListener("DOMContentLoaded", async () => {
    const stripe = Stripe('pk_test_51PsNVuLXFloLsDmEbEv1kbPlDN7MQXp5BFZbKLQCN0AIZvD6fHz7NQsahQZFH1otJcbLlEVYaQ4nJRSuu3sJz3rY001MveEnL8'); 
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    
    cardElement.mount('#card-element'); 
  
    const form = document.getElementById('payment-form');
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
    
      if (error) {
        console.error(error);
        alert(error.message);
      } else {
        const response = await fetch('/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });
  
        const responseData = await response.json();
    
        if (responseData.error) {
          console.error(responseData.error);
          alert('Payment failed: ' + responseData.error);
          window.location.href = "/payment-failed.html";  // Redirect to failure page
        } else {
          alert('Payment successful!');
          window.location.href = "/payment-success.html";  // Redirect to success page
        }
      }
    });
  });
  