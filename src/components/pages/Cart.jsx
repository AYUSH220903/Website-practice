import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Cart() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const shippingCost = totalPrice >= 999 ? 0 : 99;
  const subtotal = totalPrice;
  const finalTotal = subtotal + shippingCost - discount;
  
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = () => {
    // In a real app, we would validate the coupon with the backend
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const discountAmount = Math.round(subtotal * 0.1); // 10% discount
      setDiscount(discountAmount);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code or expired');
    }
  };

  const formatPrice = (price) => {
    return `₹${price}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="inline-block bg-black text-white px-6 py-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white border border-gray-200">
              {/* Cart Headers - Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {/* Cart Items */}
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center">
                  {/* Product Info - Mobile & Desktop */}
                  <div className="col-span-1 md:col-span-6 flex space-x-4">
                    <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-gray-600">{item.name}</Link>
                      {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
                      
                      {/* Mobile Only */}
                      <div className="md:hidden mt-2">
                        <p className="text-sm">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price - Desktop */}
                  <div className="hidden md:block col-span-2 text-center">
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity - Mobile & Desktop */}
                  <div className="col-span-1 md:col-span-2 flex justify-center items-center">
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price - Mobile & Desktop */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden font-medium">Total:</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>

                  {/* Remove Button - Mobile & Desktop */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="col-span-1 md:col-span-12 flex items-center text-gray-500 hover:text-black text-sm mt-2 md:mt-0 md:justify-end"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping Button */}
            <div className="mt-6">
              <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
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
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6 font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <label htmlFor="coupon" className="block text-sm font-medium mb-2">Coupon Code</label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    className="flex-grow border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || couponApplied}
                    className={`px-4 py-2 ${
                      !couponCode || couponApplied 
                        ? 'bg-gray-300 text-gray-500' 
                        : 'bg-black text-white'
                    }`}
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>
                )}
                <p className="text-gray-500 text-sm mt-1">Try "WELCOME10" for 10% off your first order</p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-900"
              >
                Proceed to Checkout
              </button>

              {/* Payment Icons */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <div className="p-1 border border-gray-200">
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="19" rx="1.5" fill="white" stroke="#D1D5DB"/>
                    <path d="M12.2656 14.3477H9.17188V5.65234H12.2656V14.3477Z" fill="#006FCF"/>
                    <path d="M9.42188 10C9.42188 8.125 10.5469 6.5 12.0156 5.65234C11.2969 5.10547 10.3906 4.77734 9.42188 4.77734C6.80469 4.77734 4.67188 7.11328 4.67188 10C4.67188 12.8867 6.80469 15.2227 9.42188 15.2227C10.3906 15.2227 11.2969 14.8945 12.0156 14.3477C10.5469 13.5 9.42188 11.875 9.42188 10Z" fill="#006FCF"/>
                    <path d="M26.8672 14.3477V13.3203H26.7031L26.2344 14.0156L25.7656 13.3203H25.6016V14.3477H25.8672V13.6914L26.2812 14.3281H26.1875L26.6016 13.6914V14.3477H26.8672ZM24.8906 14.3477V13.582H25.3203V13.3398H24.1953V13.582H24.625V14.3477H24.8906Z" fill="#006FCF"/>
                    <path d="M27.3281 10C27.3281 12.8867 25.1953 15.2227 22.5781 15.2227C21.6094 15.2227 20.7031 14.8945 19.9844 14.3477C21.4531 13.5 22.5781 11.875 22.5781 10C22.5781 8.125 21.4531 6.5 19.9844 5.65234C20.7031 5.10547 21.6094 4.77734 22.5781 4.77734C25.1953 4.77734 27.3281 7.11328 27.3281 10Z" fill="#006FCF"/>
                    <path d="M22.8281 14.3477H19.7344V5.65234H22.8281V14.3477Z" fill="#006FCF"/>
                  </svg>
                </div>
                <div className="p-1 border border-gray-200">
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="19" rx="1.5" fill="white" stroke="#D1D5DB"/>
                    <path d="M12.2969 13.7305H19.6133V6.26953H12.2969V13.7305Z" fill="#FF5F00"/>
                    <path d="M12.875 10C12.875 8.41406 13.5938 7.00391 14.7188 6.26953C13.9375 5.72266 12.9922 5.39453 11.9844 5.39453C9.33594 5.39453 7.17969 7.47266 7.17969 10C7.17969 12.5273 9.33594 14.6055 11.9844 14.6055C12.9922 14.6055 13.9375 14.2773 14.7188 13.7305C13.5938 12.9961 12.875 11.5859 12.875 10Z" fill="#EB001B"/>
                    <path d="M24.8203 10C24.8203 12.5273 22.6641 14.6055 20.0156 14.6055C19.0078 14.6055 18.0625 14.2773 17.2812 13.7305C18.4062 12.9961 19.125 11.5859 19.125 10C19.125 8.41406 18.4062 7.00391 17.2812 6.26953C18.0625 5.72266 19.0078 5.39453 20.0156 5.39453C22.6641 5.39453 24.8203 7.47266 24.8203 10Z" fill="#F79E1B"/>
                  </svg>
                </div>
                <div className="p-1 border border-gray-200">
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="19" rx="1.5" fill="white" stroke="#D1D5DB"/>
                    <path d="M24.8203 10C24.8203 12.5273 22.6641 14.6055 20.0156 14.6055H11.9844C9.33594 14.6055 7.17969 12.5273 7.17969 10C7.17969 7.47266 9.33594 5.39453 11.9844 5.39453H20.0156C22.6641 5.39453 24.8203 7.47266 24.8203 10Z" fill="#1434CB"/>
                    <path d="M19.1016 11.5391L19.7578 8.69141H18.8516L18.4219 10.5H18.3984L17.8516 8.69141H16.9219L17.5781 11.5391H19.1016ZM16.0781 11.5391L16.7344 8.69141H15.8281L15.1719 11.5391H16.0781ZM14.7188 11.5391L14.4844 10.5234L15.5 8.69141H14.5L13.7578 10.1953H13.7344L13.5 8.69141H12.5L13.0781 11.5391H14.0078L14.2422 10.0312H14.2656L14.8125 11.5391H14.7188Z" fill="white"/>
                  </svg>
                </div>
                <div className="p-1 border border-gray-200">
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="19" rx="1.5" fill="white" stroke="#D1D5DB"/>
                    <path d="M16.0625 7.11328C16.3672 6.76172 16.5312 6.33203 16.5312 5.82422C16.5312 5.78516 16.5312 5.74609 16.5312 5.70703C15.8125 5.78516 14.9453 6.21484 14.6016 6.60547C14.3359 6.91797 14.1328 7.34766 14.1328 7.85547C14.1328 7.89453 14.1328 7.95312 14.1328 7.97266C14.1719 7.97266 14.2109 7.97266 14.25 7.97266C14.8906 7.97266 15.7188 7.5625 16.0625 7.11328ZM16.5312 8.08984C15.6641 8.08984 14.9453 8.67578 14.5625 8.67578C14.1406 8.67578 13.5 8.12891 12.8203 8.12891C11.6562 8.12891 10.4531 9.00391 10.4531 10.7344C10.4531 11.7227 10.6953 12.7305 11.0781 13.4297C11.3828 14.0156 11.6484 14.5234 12.0312 14.5234C12.4141 14.5234 12.5781 14.2305 13.0781 14.2305C13.5781 14.2305 13.6953 14.5234 14.1172 14.5234C14.5391 14.5234 14.8047 14.0547 15.0703 13.5078C15.375 12.8672 15.5391 12.2266 15.5391 12.1875C15.5391 12.1484 14.9922 11.957 14.9922 11.2969C14.9922 10.7148 15.4141 10.4414 15.4141 10.4023C15.4141 10.4023 14.9141 10.3828 14.5703 9.92188C14.2656 9.49219 14.2656 8.98438 14.2656 8.98438C14.2656 8.98438 14.875 9.02344 15.2188 8.80078C15.6797 8.53906 16.0625 8.12891 16.5312 8.08984Z" fill="black"/>
                  </svg>
                </div>
                <div className="p-1 border border-gray-200">
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="19" rx="1.5" fill="white" stroke="#D1D5DB"/>
                    <path d="M19.75 8.92969L20.0156 7.52734H18.6719V6.67188C18.6719 6.28906 18.8359 5.98438 19.4766 5.98438H20.0938V4.74219C19.7109 4.66406 19.2891 4.625 18.8672 4.625C17.5625 4.625 16.6562 5.44922 16.6562 6.51562V7.52734H15.3906V8.92969H16.6562V13.125H18.6719V8.92969H19.75Z" fill="#3B5998"/>
                  </svg>
                </div>
                <div className="p-1 border border-gray-200">
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="31" height="19" rx="1.5" fill="white" stroke="#D1D5DB"/>
                    <path d="M21.7031 10.1953C21.7031 9.86719 21.6641 9.55859 21.625 9.25C21.5859 8.94141 21.5078 8.63281 21.4297 8.36328C21.3125 8.01172 21.1484 7.72266 20.9219 7.45312C20.6953 7.18359 20.4297 6.97656 20.1641 6.82031C19.8984 6.66406 19.5938 6.58594 19.25 6.54688C18.9062 6.50781 18.5625 6.50781 18.2188 6.50781C16.9922 6.50781 15.8047 6.50781 14.5781 6.54688C14.2344 6.58594 13.9297 6.66406 13.6641 6.82031C13.3984 6.97656 13.1328 7.18359 12.9062 7.45312C12.6797 7.72266 12.5156 8.01172 12.3984 8.36328C12.3203 8.63281 12.2422 8.94141 12.2031 9.25C12.1641 9.55859 12.1641 9.86719 12.1641 10.1953C12.1641 11.0312 12.1641 11.7695 12.1641 12.6055C12.1641 12.9336 12.1641 13.2422 12.2031 13.5508C12.2422 13.8594 12.3203 14.1289 12.3984 14.3984C12.5156 14.75 12.6797 15.0391 12.9062 15.3086C13.1328 15.5781 13.3984 15.7852 13.6641 15.9414C13.9297 16.0977 14.2344 16.1758 14.5781 16.2148C15.8047 16.2539 16.9922 16.2539 18.2188 16.2539C19.4453 16.2539 20.6328 16.2539 21.8594 16.2148C22.2031 16.1758 22.5078 16.0977 22.7734 15.9414C23.3594 15.5742 23.7422 15.0391 23.8594 14.3984C23.9375 14.1289 23.9766 13.8594 24.0156 13.5508C24.0547 13.2422 24.0547 12.9336 24.0547 12.6055V10.1953H21.7031ZM18.4062 13.0859C17.3203 13.6328 15.9375 13.1367 15.625 12.0117C15.3125 10.8867 16.0703 9.64453 17.2344 9.41406C17.5 9.33594 17.8047 9.33594 18.1094 9.41406C18.1094 9.84375 18.1094 10.2734 18.1094 10.7031C17.8828 10.5859 17.6172 10.5859 17.3516 10.7031C16.9688 10.8594 16.7031 11.3164 16.8203 11.7344C16.9375 12.1523 17.3594 12.4219 17.7812 12.3438C18.125 12.2656 18.3906 11.9961 18.4453 11.6875H17.625V11.0625H19.0469C19.125 11.5977 19.0078 12.1523 18.7031 12.5703C18.6641 12.7656 18.5469 12.9219 18.4062 13.0859Z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;