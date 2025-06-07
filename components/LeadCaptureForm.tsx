
import React, { useState } from 'react';
import { type FormData } from '../types';
import Button from './common/Button';
import Card from './common/Card';

interface LeadCaptureFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', association: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormData]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.association.trim()) newErrors.association = 'Association name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">Unlock Your Full Report</h2>
      <p className="text-neutral-dark text-center mb-6">
        Provide your details to receive the comprehensive NavSense AI™ report with detailed findings and actionable recommendations.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-dark">Full Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.name ? 'border-red-500' : 'border-neutral-DEFAULT/50'}`} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="association" className="block text-sm font-medium text-neutral-dark">Association Name</label>
          <input type="text" name="association" id="association" value={formData.association} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.association ? 'border-red-500' : 'border-neutral-DEFAULT/50'}`} />
          {errors.association && <p className="text-red-500 text-xs mt-1">{errors.association}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-dark">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${errors.email ? 'border-red-500' : 'border-neutral-DEFAULT/50'}`} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="pt-2 space-y-3">
          <Button type="submit" variant="primary" fullWidth>Download Full Report</Button>
          <Button type="button" onClick={onBack} variant="secondary" fullWidth className="bg-transparent text-primary hover:bg-primary-lighter/20">
            Back to Summary
          </Button>
        </div>
      </form>
      <p className="text-xs text-neutral-DEFAULT mt-6 text-center">
        We respect your privacy. Your information will only be used to provide the report and occasional updates about our services.
      </p>
    </Card>
  );
};

export default LeadCaptureForm;
