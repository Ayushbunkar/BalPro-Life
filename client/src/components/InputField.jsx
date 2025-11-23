import React from 'react';

const InputField = ({
  label,
  type = 'text',
  placeholder,
  required,
  name,
  value,
  onChange,
  icon: Icon,
  ...rest
}) => (
  <div className="space-y-2">
    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className={`w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-orange-500 focus:bg-white outline-none transition-all text-slate-900 placeholder-slate-400 ${Icon ? 'pl-10' : ''}`}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  </div>
);

export default InputField;