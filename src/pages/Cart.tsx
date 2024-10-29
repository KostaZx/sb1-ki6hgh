import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function Cart() {
  const { items, removeItem, updateQuantity, basketId, setBasketId } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const createBasket = async () => {
      if (!basketId && items.length > 0) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/store/basket`, {
            complete_url: `${window.location.origin}/complete`,
            cancel_url: `${window.location.origin}/cart`,
            complete_auto_redirect: true
          });
          setBasketId(response.data.basket_id);
        } catch (error) {
          console.error('Failed to create basket:', error);
        }
      }
    };

    createBasket();
  }, [items, basketId, setBasketId]);

  const handleCheckout = async () => {
    if (!basketId) return;

    try {
      // Add all items to the basket
      for (const item of items) {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/store/basket/${basketId}/package`, {
          package_id: item.id,
          quantity: item.quantity
        });
      }

      // Get basket auth URL and redirect
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/store/basket/${basketId}/auth`,
        { params: { returnUrl: window.location.origin } }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}