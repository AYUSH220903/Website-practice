import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductList() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortBy, setSortBy] = useState('default');
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Get category from URL query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    // In a real app, we would fetch products from an API
    // For now, we'll use mock data
    fetchProducts(categoryParam, searchParam);
  }, [location.search]);

  const fetchProducts = async (categoryFilter, searchFilter) => {
    try {
      // Mock products data
      const mockProducts = [
        // Women's clothing
        {
          id: '1',
          name: 'Floral Print Maxi Dress',
          description: 'Elegant floral print maxi dress perfect for summer occasions.',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'women',
        },
        {
          id: '5',
          name: 'Summer Print Midi Skirt',
          description: 'Light and flowy midi skirt with vibrant summer print.',
          price: 799,
          image: 'https://images.unsplash.com/photo-1551163943-3f7a4a7dfebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'women',
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
          id: '9',
          name: 'High Waisted Denim Shorts',
          description: 'Classic high waisted denim shorts for a casual look.',
          price: 699,
          image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'women',
        },
        {
          id: '11',
          name: 'Sleeveless Blouse',
          description: 'Lightweight sleeveless blouse for warm days.',
          price: 499,
          image: 'https://images.unsplash.com/photo-1551163943-3f7a4a7dfebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'women',
        },
        // Men's clothing
        {
          id: '2',
          name: 'Men\'s Casual Linen Shirt',
          description: 'Breathable linen shirt for a casual yet sophisticated look.',
          price: 899,
          image: 'https://images.unsplash.com/photo-1573766807369-2c10b6ce5a42?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'men',
        },
        {
          id: '4',
          name: 'Slim Fit Denim Jeans',
          description: 'Comfortable slim fit jeans for everyday wear.',
          price: 1099,
          image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'men',
        },
        {
          id: '10',
          name: 'Cotton Polo Shirt',
          description: 'Classic polo shirt for a smart casual look.',
          price: 799,
          image: 'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'men',
        },
        {
          id: '12',
          name: 'Cargo Pants',
          description: 'Versatile cargo pants with multiple pockets.',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'men',
        },
        // Accessories
        {
          id: '3',
          name: 'Minimalist Gold Hoop Earrings',
          description: 'Classic gold hoops that complement any outfit.',
          price: 499,
          image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'accessories',
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
          id: '8',
          name: 'Classic Leather Watch',
          description: 'Timeless leather strap watch with minimalist design.',
          price: 1899,
          image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'accessories',
        },
        // Sale items
        {
          id: '13',
          name: 'Striped Summer Dress',
          description: 'Light striped dress perfect for summer days.',
          price: 599,
          originalPrice: 999,
          image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'women',
          sale: true,
        },
        {
          id: '14',
          name: 'Men\'s Bomber Jacket',
          description: 'Classic bomber jacket for a stylish look.',
          price: 1499,
          originalPrice: 2199,
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'men',
          sale: true,
        },
        {
          id: '15',
          name: 'Leather Crossbody Bag',
          description: 'Compact leather crossbody bag for everyday essentials.',
          price: 899,
          originalPrice: 1299,
          image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'accessories',
          sale: true,
        },
      ];

      // Extract unique categories for the filter
      const uniqueCategories = [...new Set(mockProducts.map(product => product.category))];
      setCategories(uniqueCategories);

      // Filter products if needed
      let filtered = mockProducts;
      
      if (categoryFilter && categoryFilter !== 'all') {
        if (categoryFilter === 'sale') {
          filtered = mockProducts.filter(product => product.sale);
        } else if (categoryFilter === 'new-arrivals') {
          // For demo purposes, we'll consider IDs above 10 as new arrivals
          filtered = mockProducts.filter(product => parseInt(product.id) > 10);
        } else {
          filtered = mockProducts.filter(product => product.category === categoryFilter);
        }
      }

      if (searchFilter) {
        const query = searchFilter.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        );
      }

      setProducts(mockProducts);
      setFilteredProducts(filtered);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, priceRange, sortBy);
  };

  const handlePriceRangeChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0;
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    filterProducts(selectedCategory, newPriceRange, sortBy);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    filterProducts(selectedCategory, priceRange, value);
  };

  const filterProducts = (category, price, sort) => {
    let result = [...products];

    // Apply category filter
    if (category && category !== 'all') {
      if (category === 'sale') {
        result = result.filter(product => product.sale);
      } else if (category === 'new-arrivals') {
        // For demo purposes, we'll consider IDs above 10 as new arrivals
        result = result.filter(product => parseInt(product.id) > 10);
      } else {
        result = result.filter(product => product.category === category);
      }
    }

    // Apply price filter
    result = result.filter(product => 
      product.price >= price.min && product.price <= price.max
    );

    // Apply sorting
    if (sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(result);
  };

  // Format price to Indian Rupees
  const formatPrice = (price) => {
    return `₹${price}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {selectedCategory === 'sale' 
            ? 'Sale Items' 
            : selectedCategory === 'new-arrivals'
              ? 'New Arrivals'
              : selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}'s Collection`
                : 'All Products'}
        </h1>
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="md:hidden bg-black text-white px-4 py-2"
        >
          {mobileSidebarOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Filters */}
        <aside className={`w-full md:w-1/4 md:block ${mobileSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="bg-gray-50 p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all"
                    name="category"
                    value="all"
                    checked={!selectedCategory}
                    onChange={() => handleCategoryChange('')}
                    className="mr-2"
                  />
                  <label htmlFor="all">All Products</label>
                </div>
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={category}
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    <label htmlFor={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sale"
                    name="category"
                    value="sale"
                    checked={selectedCategory === 'sale'}
                    onChange={() => handleCategoryChange('sale')}
                    className="mr-2"
                  />
                  <label htmlFor="sale" className="text-red-500">Sale</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="new-arrivals"
                    name="category"
                    value="new-arrivals"
                    checked={selectedCategory === 'new-arrivals'}
                    onChange={() => handleCategoryChange('new-arrivals')}
                    className="mr-2"
                  />
                  <label htmlFor="new-arrivals">New Arrivals</label>
                </div>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Min Price: {formatPrice(priceRange.min)}</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange(e, 'min')}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Max Price: {formatPrice(priceRange.max)}</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange(e, 'max')}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Sort Options */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">{filteredProducts.length} products</p>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="border p-2"
              >
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white">
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    {product.originalPrice && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm">SALE</span>
                    )}
                    <button
                      onClick={() => addToCart(product)}
                      className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-medium">{product.name}</h3>
                    </Link>
                    <div className="mt-2">
                      {product.originalPrice ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{formatPrice(product.price)}</span>
                          <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                        </div>
                      ) : (
                        <p className="font-semibold">{formatPrice(product.price)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;