import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetch
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      try {
        // Mock data for featured products
        const mockFeaturedProducts = [
          {
            id: '1',
            name: 'Floral Print Maxi Dress',
            description: 'Elegant floral print maxi dress perfect for summer occasions.',
            price: 1299,
            image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'women',
          },
          {
            id: '2',
            name: 'Men\'s Casual Linen Shirt',
            description: 'Breathable linen shirt for a casual yet sophisticated look.',
            price: 899,
            image: 'https://images.unsplash.com/photo-1573766807369-2c10b6ce5a42?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'men',
          },
          {
            id: '3',
            name: 'Minimalist Gold Hoop Earrings',
            description: 'Classic gold hoops that complement any outfit.',
            price: 499,
            image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'accessories',
          },
          {
            id: '4',
            name: 'Slim Fit Denim Jeans',
            description: 'Comfortable slim fit jeans for everyday wear.',
            price: 1099,
            image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'men',
          },
        ];

        // Mock data for new arrivals
        const mockNewArrivals = [
          {
            id: '5',
            name: 'Summer Print Midi Skirt',
            description: 'Light and flowy midi skirt with vibrant summer print.',
            price: 799,
            image: 'https://images.unsplash.com/photo-1551163943-3f7a4a7dfebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'women',
          },
          {
            id: '6',
            name: 'Athletic Performance Sneakers',
            description: 'Lightweight sneakers designed for optimal performance.',
            price: 1599,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'accessories',
          },
          {
            id: '7',
            name: 'Oversized Graphic T-shirt',
            description: 'Cotton oversized t-shirt with trendy graphic design.',
            price: 599,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'women',
          },
          {
            id: '8',
            name: 'Classic Leather Watch',
            description: 'Timeless leather strap watch with minimalist design.',
            price: 1899,
            image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            category: 'accessories',
          },
        ];

        setFeaturedProducts(mockFeaturedProducts);
        setNewArrivals(mockNewArrivals);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format price to Indian Rupees
  const formatPrice = (price) => {
    return `₹${price}`;
  };

  // Quick add to cart
  const handleQuickAdd = (product) => {
    addToCart(product);
    // Could show a notification here
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col h-[70vh] justify-center">
            <div className="max-w-lg">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">New Season Arrivals</h1>
              <p className="text-xl mb-8">Discover the latest trends and express your unique style</p>
              <Link
                to="/products"
                className="inline-block bg-white text-black font-medium px-8 py-3 rounded-none hover:bg-gray-200 transition-colors"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Shop By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Women Category */}
            <Link to="/products?category=women" className="group relative h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=646&q=80"
                alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold">Women</h3>
                  <span className="inline-block mt-2 text-white border-b-2 border-white pb-1">SHOP NOW</span>
                </div>
              </div>
            </Link>

            {/* Men Category */}
            <Link to="/products?category=men" className="group relative h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold">Men</h3>
                  <span className="inline-block mt-2 text-white border-b-2 border-white pb-1">SHOP NOW</span>
                </div>
              </div>
            </Link>

            {/* Accessories Category */}
            <Link to="/products?category=accessories" className="group relative h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
                alt="Accessories Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold">Accessories</h3>
                  <span className="inline-block mt-2 text-white border-b-2 border-white pb-1">SHOP NOW</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Featured Products</h2>
          <p className="text-gray-600 text-center mb-12">Curated selection of our finest pieces</p>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group bg-white">
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                    >
                      Quick Add
                    </button>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-medium">{product.name}</h3>
                    </Link>
                    <p className="font-semibold mt-2">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Summer Sale</h2>
          <p className="text-xl mb-8">Enjoy up to 50% off on selected items</p>
          <Link
            to="/products?category=sale"
            className="inline-block bg-white text-black font-medium px-8 py-3 rounded-none hover:bg-gray-200 transition-colors"
          >
            SHOP THE SALE
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">New Arrivals</h2>
          <p className="text-gray-600 text-center mb-12">Fresh styles just in</p>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <div key={product.id} className="group bg-white">
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                    >
                      Quick Add
                    </button>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-medium">{product.name}</h3>
                    </Link>
                    <p className="font-semibold mt-2">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders above ₹999</p>
            </div>

            <div className="p-6">
              <div className="text-3xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>

            <div className="p-6">
              <div className="text-3xl mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Chat with our style experts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;