import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = totalPrice >= 999 ? 0 : 99;
  const subtotal = totalPrice;
  const finalTotal = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Shipping Information Validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone number must be 10 digits';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.pincode.trim()) errors.pincode = 'PIN code is required';
    else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = 'PIN code must be 6 digits';

    // Payment Information Validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.cardName.trim()) errors.cardName = 'Name on card is required';
      
      if (!formData.expMonth.trim()) errors.expMonth = 'Expiry month is required';
      else if (!/^(0[1-9]|1[0-2])$/.test(formData.expMonth)) errors.expMonth = 'Invalid month';
      
      if (!formData.expYear.trim()) errors.expYear = 'Expiry year is required';
      else if (!/^20\d{2}$/.test(formData.expYear)) errors.expYear = 'Invalid year';
      else {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        if (parseInt(formData.expYear) < currentYear || 
            (parseInt(formData.expYear) === currentYear && parseInt(formData.expMonth) < currentMonth)) {
          errors.expYear = 'Card has expired';
        }
      }
      
      if (!formData.cvv.trim()) errors.cvv = 'CVV is required';
      else if (!/^\d{3}$/.test(formData.cvv)) errors.cvv = 'CVV must be 3 digits';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, we would submit the order to the backend here
      // For demo purposes, we'll just simulate a successful order
      
      // Generate a random order ID
      const randomOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomOrderId);
      setOrderPlaced(true);
      
      // Clear the cart
      clearCart();
    }
  };

  const formatPrice = (price) => {
    return `₹${price}`;
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 text-green-800 p-8 rounded-lg mb-8 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="mb-2">Your order number is: <span className="font-bold">{orderId}</span></p>
          <p className="mb-6">We have sent the order confirmation to your email.</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-900"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items to your cart before checking out.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-900"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">State *</label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                    {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium mb-1">PIN Code *</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full border ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                    />
                    {formErrors.pincode && <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                
                {/* Payment Methods */}
                <div className="mb-6">
                  <p className="font-medium mb-2">Payment Method *</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="card">Credit/Debit Card</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="upi">UPI</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={`w-full border ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                        maxLength="19"
                      />
                      {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full border ${formErrors.cardName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                      />
                      {formErrors.cardName && <p className="text-red-500 text-xs mt-1">{formErrors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="expMonth" className="block text-sm font-medium mb-1">Expiry Month *</label>
                        <input
                          type="text"
                          id="expMonth"
                          name="expMonth"
                          placeholder="MM"
                          value={formData.expMonth}
                          onChange={handleChange}
                          className={`w-full border ${formErrors.expMonth ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                          maxLength="2"
                        />
                        {formErrors.expMonth && <p className="text-red-500 text-xs mt-1">{formErrors.expMonth}</p>}
                      </div>
                      <div>
                        <label htmlFor="expYear" className="block text-sm font-medium mb-1">Expiry Year *</label>
                        <input
                          type="text"
                          id="expYear"
                          name="expYear"
                          placeholder="YYYY"
                          value={formData.expYear}
                          onChange={handleChange}
                          className={`w-full border ${formErrors.expYear ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                          maxLength="4"
                        />
                        {formErrors.expYear && <p className="text-red-500 text-xs mt-1">{formErrors.expYear}</p>}
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV *</label>
                        <input
                          type="password"
                          id="cvv"
                          name="cvv"
                          placeholder="XXX"
                          value={formData.cvv}
                          onChange={handleChange}
                          className={`w-full border ${formErrors.cvv ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
                          maxLength="3"
                        />
                        {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {formData.paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">You'll be redirected to UPI payment gateway after order confirmation.</p>
                  </div>
                )}

                {/* COD Details */}
                {formData.paymentMethod === 'cod' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Pay cash at the time of delivery. Additional COD charges may apply.</p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 font-medium hover:bg-gray-900"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {/* Items Summary */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <p className="font-medium mb-2">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</p>
                <div className="space-y-3 max-h-60 overflow-auto">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-center">
                      <div className="w-16 h-16 flex-shrink-0 mr-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shippingCost > 0 ? (
                    <span>{formatPrice(shippingCost)}</span>
                  ) : (
                    <span className="text-green-600">Free</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;