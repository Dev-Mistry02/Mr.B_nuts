import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send , Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello, I hope you're doing well! 

I wanted to reach out regarding ${formData.subject ? `"${formData.subject}"` : "a general inquiry"}. 

Here are my details:
 *Name:* ${formData.name}
 *Phone:* ${formData.phone || "Not Provided"}
 *Message:* ${formData.message}

I would appreciate your response at your earliest convenience. Looking forward to your reply.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp number (change it to your business number)
    const whatsappNumber = "+916355972287"; // Replace with your number in international format (without +)

    // Redirect to WhatsApp chat
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    
    // Basic validation
    if (!formData.name || !formData.message) {
      setFormError('Please fill out all required fields.');
      return;
    }
    
    // Email validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   setFormError('Please enter a valid email address.');
    //   return;
    // }
    
    // Form would be submitted to backend here
    console.log('Form submitted:', formData);
    
    // Reset form and show success message
    setFormData({
      name: '',
      phone: '',
      subject: '',
      message: ''
    });
    setFormError('');
    setFormSubmitted(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <div className="bg-[#8B5D33] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Have questions about our Peanut Buttre or want to place a special order? We'd love to hear from you!
          </p>
        </div>
      </div>
      
      {/* Contact Form and Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#8B5D33] mb-6">Send Us a Message</h2>
            
            {formSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Thank you for your message! We'll contact you soon.</span>
              </div>
            )}
            
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {formError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                  required
                />
              </div>
              
              {/* <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                  required
                />
              </div> */}
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="wholesale">Wholesale Information</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5D33] focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-[#8B5D33] text-white px-6 py-3 rounded-md font-medium hover:bg-[#6B4423] transition-colors flex items-center"
              >
                Send Message <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#8B5D33] mb-6">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-[#8B5D33] p-3 rounded-full text-white mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Our Location</h3>
                  <p className="text-gray-600">
                    LL7 Green Park Appartment<br />
                    Collage road , Billimora 396321<br />
                    Gujarat
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#8B5D33] p-3 rounded-full text-white mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+917600894288" className="hover:text-[#8B5D33]">+91 6355 972287</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#8B5D33] p-3 rounded-full text-white mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:bhumikpanchal670@gmail.com" className="hover:text-[#8B5D33]">bhumikpanchal670@gmail.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#8B5D33] p-3 rounded-full text-white mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Half Day
                  </p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Find Us</h3>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4967818423415!2d72.97549772529396!3d20.76553853081877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0ef60f1b01af5%3A0xa5f3aa2e89be69bb!2sMr.B%20nuts!5e1!3m2!1sen!2sin!4v1741147898694!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mr.B nut Peanut Butter Location !"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      {/* <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#8B5D33] mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#8B5D33]">Do you ship internationally?</h3>
              <p className="text-gray-600">
                Yes, we ship to select international destinations. International shipping rates vary by location. Please note that customers are responsible for any customs fees or import taxes that may apply.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#8B5D33]">How long does shipping take?</h3>
              <p className="text-gray-600">
                Domestic orders typically ship within 1-2 business days and arrive within 3-5 business days. International shipping can take 7-14 business days depending on the destination and customs processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#8B5D33]">How long does honey last?</h3>
              <p className="text-gray-600">
                Pure, raw honey has an indefinite shelf life when stored properly. Keep it in a cool, dry place away from direct sunlight. If your honey crystallizes (which is natural), simply place the jar in warm water to return it to liquid form.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#8B5D33]">Do you offer wholesale pricing?</h3>
              <p className="text-gray-600">
                Yes, we offer wholesale pricing for retailers and bulk orders. Please contact us directly with your requirements, and our team will provide you with our wholesale catalog and pricing information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#8B5D33]">Is your honey organic?</h3>
              <p className="text-gray-600">
                While we follow sustainable and natural beekeeping practices, we cannot guarantee that our bees only visit organic flowers. Bees typically forage within a 3-5 mile radius of their hives, and we cannot control all the plants in that area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#8B5D33]">Can I visit your apiary?</h3>
              <p className="text-gray-600">
                Yes! We offer guided tours of our apiary by appointment. You'll learn about our beekeeping practices, see our hives in action (from a safe distance), and enjoy a honey tasting. Contact us to schedule a visit.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;