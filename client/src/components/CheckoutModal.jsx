import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import Button from './Button';
import InputField from './InputField';

const CheckoutModal = ({ isOpen, onClose, total, onPlaceOrder }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPlaceOrder();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row">

        {/* Summary Side */}
        <div className="md:w-1/3 bg-slate-50 p-8 border-r border-slate-100">
           <h3 className="font-black text-xl uppercase tracking-wide mb-8">Order Summary</h3>
           <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Subtotal</span>
                 <span className="font-bold">${total}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Shipping</span>
                 <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Taxes</span>
                 <span className="font-bold">$4.20</span>
              </div>
           </div>
           <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
              <span className="font-black uppercase text-sm">Total</span>
              <span className="font-black text-2xl text-orange-600">${(parseFloat(total) + 4.20).toFixed(2)}</span>
           </div>
        </div>

        {/* Form Side */}
        <div className="md:w-2/3 p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X/></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2 border-slate-100">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-6">
                 <InputField label="First Name" required />
                 <InputField label="Last Name" required />
              </div>
              <InputField label="Address" required />
              <div className="grid grid-cols-2 gap-6">
                 <InputField label="City" required />
                 <InputField label="Zip Code" required />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2 border-slate-100">Payment Method</h3>
              <div className="grid grid-cols-1 gap-4">
                 <InputField label="Card Number" placeholder="0000 0000 0000 0000" required />
                 <div className="grid grid-cols-2 gap-6">
                    <InputField label="Expiry (MM/YY)" required />
                    <InputField label="CVC" required />
                 </div>
              </div>
            </div>

            <Button variant="primary" type="submit" disabled={isProcessing} className="w-full mt-4">
              {isProcessing ? <><Loader className="animate-spin mr-2"/> Processing Payment...</> : `PAY $${(parseFloat(total) + 4.20).toFixed(2)}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;