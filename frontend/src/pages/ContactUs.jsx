import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  HelpCircle, 
  Users, 
  BookOpen, 
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'support@ota.com',
      description: 'Get help within 24 hours',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: '+91 98765 43210',
      description: 'Mon - Fri, 9 AM - 6 PM',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      content: 'Kolkata, West Bengal',
      description: 'India - 700001',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Support Hours',
      content: '24/7 Online Help',
      description: 'Always here for you',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const faqCategories = [
    {
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
      title: 'Study Materials',
      description: 'Questions about test content, syllabus, and preparation resources',
      count: '15+ FAQs'
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Exam Results',
      description: 'Score analysis, rankings, and performance tracking',
      count: '10+ FAQs'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Account & Profile',
      description: 'Login issues, profile updates, and account management',
      count: '12+ FAQs'
    }
  ];

  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600">We're here to help you succeed in your exam preparation</p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          submitStatus === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {submitStatus === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className="font-medium">
            {submitStatus === 'success' 
              ? 'Message sent successfully! We\'ll get back to you soon.' 
              : 'Something went wrong. Please try again.'}
          </span>
        </div>
      )}

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {contactInfo.map((info, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center text-white mb-4`}>
              {info.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
            <p className="text-lg font-medium text-gray-800 mb-1">{info.content}</p>
            <p className="text-sm text-gray-600">{info.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="exam">Exam Related</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Describe your question or concern in detail..."
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          {/* Quick Help */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Help</h3>
            </div>
            <p className="text-gray-600 mb-4">Find frequently asked questions</p>
            
            <div className="space-y-3">
              {faqCategories.map((category, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    {category.icon}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1">{category.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <span className="text-xs text-indigo-600 font-medium">{category.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Response Time</h3>
            <p className="text-indigo-100 mb-4">We typically respond to all inquiries within:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm">Email: 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm">Technical Issues: 2-4 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm">Urgent Matters: 1 hour</span>
              </div>
            </div>
          </div>

          
        </div>
        {/* Office Hours */}
          <div className="col-span-full mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Hours</h3>
                <p className="text-gray-600">Our support team is available during these hours</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Weekdays */}
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Monday - Friday</h4>
                  <p className="text-lg font-bold text-blue-600">9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-gray-600 mt-1">Regular Support Hours</p>
                </div>
                
                {/* Saturday */}
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Saturday</h4>
                  <p className="text-lg font-bold text-green-600">10:00 AM - 4:00 PM</p>
                  <p className="text-sm text-gray-600 mt-1">Limited Hours</p>
                </div>
                
                {/* Sunday */}
                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-lg border border-red-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sunday</h4>
                  <p className="text-lg font-bold text-red-600">Closed</p>
                  <p className="text-sm text-gray-600 mt-1">No Support</p>
                </div>
              </div>
              
              {/* 24/7 Support Banner */}
              <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">24/7 Online Support Available</span>
                </div>
                <p className="text-indigo-100 text-sm mt-1">For urgent technical issues and exam-related queries</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ContactUs;