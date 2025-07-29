import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // In a real app, fetch product by id from API
    // Here we'll simulate with mock data
    fetchProductData(id);
  }, [id]);

  const fetchProductData = async (productId) => {
    try {
      // Mock products data
      const mockProducts = [
        // Women's clothing
        {
          id: '1',
          name: 'Floral Print Maxi Dress',
          description: 'Elegant floral print maxi dress perfect for summer occasions.',
          longDescription: 'This stunning floral print maxi dress features a flattering silhouette with a V-neckline and tie waist. Made from lightweight, breathable fabric, it\'s perfect for summer events or vacation wear. The elegant pattern and floor-length design create a sophisticated look that can be dressed up or down depending on the occasion.',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'women',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: ['Blue', 'Pink', 'White'],
          material: '100% Rayon',
          care: 'Machine wash cold, gentle cycle. Tumble dry low.',
          sku: 'WD-FPM-101',
          availableStock: 15
        },
        // Men's clothing
        {
          id: '2',
          name: 'Men\'s Casual Linen Shirt',
          description: 'Breathable linen shirt for a casual yet sophisticated look.',
          longDescription: 'This premium linen shirt is designed for comfort and style during warm weather. The relaxed fit and breathable fabric make it perfect for casual occasions while maintaining a sophisticated appearance. It features a classic collar, button-down front, and can be worn tucked in or out depending on your style preference.',
          price: 899,
          image: 'https://images.unsplash.com/photo-1573766807369-2c10b6ce5a42?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'men',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          colors: ['White', 'Beige', 'Blue', 'Black'],
          material: '100% Linen',
          care: 'Machine wash cold. Iron on low if needed.',
          sku: 'MS-CL-202',
          availableStock: 22
        },
        // Accessories
        {
          id: '3',
          name: 'Minimalist Gold Hoop Earrings',
          description: 'Classic gold hoops that complement any outfit.',
          longDescription: 'These minimalist gold hoop earrings add a touch of elegance to any outfit. Made from high-quality materials with a comfortable hinged closure, theyre lightweight enough for all-day wear. The classic design makes them versatile for both casual and formal occasions, adding just the right amount of shine to complete your look.',
          price: 499,
          image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'accessories',
          sizes: ['One Size'],
          colors: ['Gold'],
          material: 'Gold plated brass',
          care: 'Store in a cool, dry place. Clean with a soft cloth.',
          sku: 'AC-GHE-301',
          availableStock: 30
        },
        // Add more mock products as needed
        {
          id: '4',
          name: 'Slim Fit Denim Jeans',
          description: 'Comfortable slim fit jeans for everyday wear.',
          longDescription: 'These premium denim jeans feature a modern slim fit that flatters your silhouette without being too tight. Made from high-quality cotton with a touch of elastane for stretch, they provide all-day comfort while maintaining their shape. Perfect for casual everyday wear, they pair well with everything from t-shirts to button-downs.',
          price: 1099,
          image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'men',
          sizes: ['28', '30', '32', '34', '36', '38'],
          colors: ['Blue', 'Black', 'Grey'],
          material: '98% Cotton, 2% Elastane',
          care: 'Machine wash cold with similar colors. Tumble dry low.',
          sku: 'MJ-SF-203',
          availableStock: 25
        },
        // More products...
      ];

      // Find the requested product
      const foundProduct = mockProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);

      if (foundProduct) {
        // Find related products from the same category
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== productId)
          .slice(0, 4); // Limit to 4 related products
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 1) {
      alert('Please select a size');
      return;
    }

    const productToAdd = {
      ...product,
      selectedSize: selectedSize || (product.sizes && product.sizes[0]),
      quantity,
    };

    addToCart(productToAdd, quantity);
    // Could show a notification here
  };

  const formatPrice = (price) => {
    return `₹${price}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="inline-block bg-black text-white px-6 py-2">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="text-gray-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Product Detail Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="bg-gray-50 flex items-center justify-center p-4 h-[500px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">{formatPrice(product.price)}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>

          {/* Product SKU & Availability */}
          <div className="flex space-x-8 mb-6 text-sm text-gray-600">
            <p>SKU: {product.sku}</p>
            <p>
              Availability: 
              <span className={`ml-1 font-semibold ${product.availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.availableStock > 0 ? `In Stock (${product.availableStock})` : 'Out of Stock'}
              </span>
            </p>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">Color:</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button key={color} className="px-4 py-2 border border-gray-300 hover:border-gray-500">
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex items-center border border-gray-300 inline-flex">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-xl"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.availableStock, quantity + 1))}
                className="px-4 py-2 text-xl"
                disabled={quantity >= product.availableStock}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.availableStock <= 0}
              className={`w-full py-3 font-medium text-white ${
                product.availableStock <= 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black hover:bg-gray-800'
              }`}
            >
              {product.availableStock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-black'
                    : 'text-gray-500'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'border-b-2 border-black'
                    : 'text-gray-500'
                }`}
              >
                Additional Details
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'shipping'
                    ? 'border-b-2 border-black'
                    : 'text-gray-500'
                }`}
              >
                Shipping & Returns
              </button>
            </div>
            <div className="py-4">
              {activeTab === 'description' && (
                <div>
                  <p>{product.longDescription || product.description}</p>
                </div>
              )}
              {activeTab === 'details' && (
                <div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium w-1/4">Material</td>
                        <td className="py-2">{product.material || 'Information not available'}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Care</td>
                        <td className="py-2">{product.care || 'Information not available'}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">SKU</td>
                        <td className="py-2">{product.sku}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Shipping Policy</h4>
                    <p>Free shipping on orders above ₹999. Standard delivery takes 3-5 business days. Express delivery (₹150 extra) takes 1-2 business days.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Returns & Exchanges</h4>
                    <p>Easy returns within 30 days of delivery. Items must be unworn with original tags attached. Refund will be processed within 7-10 business days after receiving the returned item.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group bg-white">
                <div className="relative overflow-hidden">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={() => addToCart(relatedProduct)}
                    className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <h3 className="text-lg font-medium">{relatedProduct.name}</h3>
                  </Link>
                  <p className="font-semibold mt-2">{formatPrice(relatedProduct.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;