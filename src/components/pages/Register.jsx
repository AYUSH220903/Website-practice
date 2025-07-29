import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const success = await register(
          `${formData.firstName} ${formData.lastName}`,
          formData.email,
          formData.password
        );
        
        if (success) {
          navigate('/');
        } else {
          setFormErrors({
            ...formErrors,
            general: 'Registration failed. Please try again.'
          });
        }
      } catch (error) {
        setFormErrors({
          ...formErrors,
          general: 'An error occurred. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Create an Account</h1>
      
      <div className="bg-white p-8 border border-gray-200">
        {formErrors.general && (
          <div className="bg-red-50 text-red-500 p-3 mb-4 text-sm">
            {formErrors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className={`mr-2 ${formErrors.acceptTerms ? 'border-red-500' : ''}`}
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                I agree to the <Link to="/terms-conditions" className="text-black hover:underline">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-black hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {formErrors.acceptTerms && <p className="text-red-500 text-xs mt-1">{formErrors.acceptTerms}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 font-medium text-white ${
              isSubmitting ? 'bg-gray-400' : 'bg-black hover:bg-gray-900'
            }`}
          >
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-black hover:underline">Login here</Link>
          </p>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600 mb-4">Or sign up with</p>
          <div className="flex justify-center space-x-4">
            <button className="border border-gray-300 p-2 rounded-sm hover:bg-gray-50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12.0645C22.5 11.2242 22.4355 10.6855 22.2935 10.125H12V14.0055H18.0675C17.9609 14.6297 17.52 15.6472 16.4812 16.3448L16.4633 16.4716L19.8225 19.0688L20.04 19.0914C22.1625 17.2041 22.5 14.4645 22.5 12.0645Z" fill="#4285F4"/>
                <path d="M12 22.5C14.97 22.5 17.4675 21.5362 19.2675 19.8187L16.485 16.8C15.5175 17.4675 13.9612 17.9362 12 17.9362C9.2625 17.9362 6.8925 16.1137 5.8875 13.5H5.7675L2.295 16.1887L2.25 16.3046C4.0275 20.0138 7.74 22.5 12 22.5Z" fill="#34A853"/>
                <path d="M5.25 12C5.25 11.3325 5.3325 10.6875 5.48625 10.0688L5.4825 9.93292L1.95375 7.19855L1.875 7.26C1.18875 8.72153 0.75 10.3106 0.75 12C0.75 13.6894 1.18875 15.2784 1.875 16.74L5.49 13.9313C5.3325 13.3125 5.25 12.6675 5.25 12Z" fill="#FBBC05"/>
                <path d="M12 6.06375C13.935 6.06375 15.2063 6.85125 15.9338 7.52625L18.3938 5.1C16.9575 3.76875 14.9663 3 12 3C7.74 3 4.02625 5.48625 2.25 9.19125L5.8875 11.9438C6.8925 9.33 9.2625 6.06375 12 6.06375Z" fill="#EA4335"/>
              </svg>
            </button>
            <button className="border border-gray-300 p-2 rounded-sm hover:bg-gray-50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.75 8.92969L20.0156 7.52734H18.6719V6.67188C18.6719 6.28906 18.8359 5.98438 19.4766 5.98438H20.0938V4.74219C19.7109 4.66406 19.2891 4.625 18.8672 4.625C17.5625 4.625 16.6562 5.44922 16.6562 6.51562V7.52734H15.3906V8.92969H16.6562V13.125H18.6719V8.92969H19.75Z" fill="#1877F2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;