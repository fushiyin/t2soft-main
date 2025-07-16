import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "support@trademaster.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: "123 Trading St, Financial District",
      description: "New York, NY 10004"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Support Hours",
      details: "24/7 Live Chat",
      description: "Always here to help"
    }
  ];

  const supportChannels = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "bg-blue-500"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
      color: "bg-green-500"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      description: "Send us your questions anytime",
      action: "Send Email",
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our courses or need support? We're here to help you succeed.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center hover:border-green-400 transition-all duration-300">
              <div className={`${channel.color} text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                {channel.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{channel.title}</h3>
              <p className="text-gray-400 mb-6">{channel.description}</p>
              <button className="bg-green-400 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors duration-200">
                {channel.action}
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="course-inquiry">Course Inquiry</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-300 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                      <p className="text-green-400 font-medium">{info.details}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">How do I access my courses?</h3>
                  <p className="text-gray-400">After enrollment, you'll receive login credentials to access your courses in our learning platform.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h3>
                  <p className="text-gray-400">Yes, we offer a 30-day money-back guarantee on all courses if you're not satisfied.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Can I get personal mentoring?</h3>
                  <p className="text-gray-400">Yes, we offer one-on-one mentoring sessions with our expert instructors for advanced students.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;