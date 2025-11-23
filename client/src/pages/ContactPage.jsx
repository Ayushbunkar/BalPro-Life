import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted');
  };

  return (
    <div className="bg-white py-12">
      <div className="content-container">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
            Get In Touch
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions about our products or need support? We're here to help you fuel your performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-lg">
            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-wide">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <InputField label="First Name" required />
                <InputField label="Last Name" required />
              </div>
              <InputField label="Email" type="email" required />
              <InputField label="Subject" required />
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white border-b-2 border-slate-200 focus:border-orange-500 focus:bg-slate-50 outline-none transition-all text-slate-900 placeholder-slate-400 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <Button variant="primary" type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-600 flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Our Lab</h3>
                <p className="text-slate-500">
                  123 Performance Drive<br />
                  Irvine, CA 92618<br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-600 flex items-center justify-center shrink-0">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
                <p className="text-slate-500">
                  Customer Support: (949) 555-BALPRO<br />
                  Business Hours: Mon-Fri 9AM-6PM PST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-600 flex items-center justify-center shrink-0">
                <Mail size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                <p className="text-slate-500">
                  Support: support@balprolife.com<br />
                  Partnerships: partners@balprolife.com<br />
                  Media: press@balprolife.com
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-orange-50 rounded-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Lab Testing & Quality</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every batch of BalPro products undergoes rigorous third-party testing for purity,
                potency, and safety. Our lab results are available upon request.
              </p>
              <Button variant="secondary" className="mt-4">
                Request Lab Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;