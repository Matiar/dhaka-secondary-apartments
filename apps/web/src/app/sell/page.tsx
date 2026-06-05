'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Shield, Clock, Users, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitValuation } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/utils';

const steps = ['Contact', 'Property Details', 'Additional Info', 'Review'];

const trustPoints = [
  { icon: Shield, title: 'Free Valuation', description: 'No obligation professional assessment' },
  { icon: Users, title: 'Verified Buyers', description: 'Access to qualified buyer network' },
  { icon: Clock, title: 'Quick Process', description: 'From valuation to acquisition in weeks' },
];

interface FormData {
  ownerName: string;
  phone: string;
  email: string;
  location: string;
  area: string;
  sizeSqft: string;
  bedrooms: string;
  bathrooms: string;
  floor: string;
  buildingAge: string;
  parking: boolean;
  furnished: boolean;
  askingPrice: string;
  additionalNotes: string;
}

const initialForm: FormData = {
  ownerName: '', phone: '', email: '', location: '', area: '',
  sizeSqft: '', bedrooms: '', bathrooms: '', floor: '', buildingAge: '',
  parking: false, furnished: false, askingPrice: '', additionalNotes: '',
};

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) return form.ownerName && form.phone;
    if (step === 1) return form.location && form.sizeSqft;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    await submitValuation({
      ...form,
      sizeSqft: form.sizeSqft ? parseInt(form.sizeSqft) : undefined,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? parseInt(form.bathrooms) : undefined,
      floor: form.floor ? parseInt(form.floor) : undefined,
      buildingAge: form.buildingAge ? parseInt(form.buildingAge) : undefined,
      askingPrice: form.askingPrice ? parseInt(form.askingPrice) : undefined,
    });
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-serif font-medium text-neutral-900 mb-3">Valuation Request Submitted!</h1>
          <p className="text-neutral-600 mb-8">
            Thank you, {form.ownerName}. Our team will review your property details and contact you within 48 hours.
          </p>
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Hi, I just submitted a valuation request.')}`}>
            <Button variant="whatsapp">Chat on WhatsApp</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-medium text-amber-700 uppercase tracking-wider mb-4">For Apartment Owners</p>
          <h1 className="text-3xl md:text-5xl font-serif font-medium text-neutral-900 mb-4">
            Get Your Free Valuation
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            Submit your apartment details for a professional valuation. If your property meets our criteria,
            we&apos;ll handle the entire acquisition process — hassle-free.
          </p>
        </div>

        {/* Trust Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
          {trustPoints.map((point) => (
            <div key={point.title} className="text-center p-4">
              <point.icon className="h-6 w-6 text-amber-700 mx-auto mb-2" />
              <p className="font-medium text-neutral-900 text-sm">{point.title}</p>
              <p className="text-xs text-neutral-500">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  i <= step ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-400'
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${i <= step ? 'text-neutral-900' : 'text-neutral-400'}`}>
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-px mx-2 sm:mx-4 ${i < step ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Your Contact Information</h2>
                    <div>
                      <Label htmlFor="ownerName">Full Name *</Label>
                      <Input id="ownerName" value={form.ownerName} onChange={(e) => updateForm('ownerName', e.target.value)} className="mt-1.5" placeholder="Your full name" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} className="mt-1.5" placeholder="+880 1XXX XXXXXX" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} className="mt-1.5" placeholder="you@email.com" />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                    <div>
                      <Label htmlFor="location">Apartment Location *</Label>
                      <Input id="location" value={form.location} onChange={(e) => updateForm('location', e.target.value)} className="mt-1.5" placeholder="e.g. Road 108, Gulshan-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="area">Area</Label>
                        <Input id="area" value={form.area} onChange={(e) => updateForm('area', e.target.value)} className="mt-1.5" placeholder="Gulshan" />
                      </div>
                      <div>
                        <Label htmlFor="sizeSqft">Size (sqft) *</Label>
                        <Input id="sizeSqft" type="number" value={form.sizeSqft} onChange={(e) => updateForm('sizeSqft', e.target.value)} className="mt-1.5" placeholder="2200" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Input id="bedrooms" type="number" value={form.bedrooms} onChange={(e) => updateForm('bedrooms', e.target.value)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Input id="bathrooms" type="number" value={form.bathrooms} onChange={(e) => updateForm('bathrooms', e.target.value)} className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="floor">Floor</Label>
                        <Input id="floor" type="number" value={form.floor} onChange={(e) => updateForm('floor', e.target.value)} className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="buildingAge">Building Age (years)</Label>
                      <Input id="buildingAge" type="number" value={form.buildingAge} onChange={(e) => updateForm('buildingAge', e.target.value)} className="mt-1.5" />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={form.parking} onChange={(e) => updateForm('parking', e.target.checked)} className="rounded" />
                        Parking Available
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={form.furnished} onChange={(e) => updateForm('furnished', e.target.checked)} className="rounded" />
                        Furnished
                      </label>
                    </div>
                    <div>
                      <Label htmlFor="askingPrice">Asking Price (BDT)</Label>
                      <Input id="askingPrice" type="number" value={form.askingPrice} onChange={(e) => updateForm('askingPrice', e.target.value)} className="mt-1.5" placeholder="28500000" />
                    </div>
                    <div>
                      <Label htmlFor="additionalNotes">Additional Notes</Label>
                      <Textarea id="additionalNotes" value={form.additionalNotes} onChange={(e) => updateForm('additionalNotes', e.target.value)} className="mt-1.5" placeholder="Any additional details about your apartment..." />
                    </div>
                    <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center">
                      <Upload className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                      <p className="text-sm text-neutral-500">Property photos can be shared via WhatsApp after submission</p>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Review Your Submission</h2>
                    <div className="space-y-3 text-sm">
                      {[
                        ['Name', form.ownerName],
                        ['Phone', form.phone],
                        ['Email', form.email || 'Not provided'],
                        ['Location', form.location],
                        ['Size', form.sizeSqft ? `${form.sizeSqft} sqft` : ''],
                        ['Bedrooms', form.bedrooms],
                        ['Asking Price', form.askingPrice ? `৳${parseInt(form.askingPrice).toLocaleString()}` : 'Not specified'],
                        ['Parking', form.parking ? 'Yes' : 'No'],
                        ['Furnished', form.furnished ? 'Yes' : 'No'],
                      ].filter(([, v]) => v).map(([label, value]) => (
                        <div key={label as string} className="flex justify-between py-2 border-b border-neutral-50">
                          <span className="text-neutral-500">{label}</span>
                          <span className="font-medium text-neutral-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-100">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              ) : <div />}

              {step < steps.length - 1 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Valuation Request'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
