import React from 'react';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  //sdfsdfvvcxvfdfsfbbnbfdsfbvv

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-[#19120f] border border-[#4f4440]/40 rounded-xl shadow p-6 w-11/12 max-w-md">
        <h3 className="text-lg font-bold mb-2 text-[#efdfd9]">{title}</h3>
        <p className="text-sm text-[#bfaea6] mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded border border-[#4f4440] text-[#e2bfb2] hover:bg-[#2a221f] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-[linear-gradient(135deg,#efbf70,#a77e36)] text-[#432c00] font-semibold hover:brightness-105 transition-all">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
