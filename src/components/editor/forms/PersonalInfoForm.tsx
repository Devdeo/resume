'use client';

import React from 'react';
import { useResume } from '@/hooks/useResume';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PersonalInfoForm() {
  const { data, setData } = useResume();
  const personalInfo = data.personalInfo;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
          setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, profilePicture: event.target!.result as string } }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const defaultProfilePic = PlaceHolderImages.find(img => img.id === 'profile-pic-default')?.imageUrl || '';

  return (
    <AccordionItem value="personalInfo">
      <AccordionTrigger>Personal Information</AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Name</Label><Input name="name" value={personalInfo.name} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>Email</Label><Input name="email" type="email" value={personalInfo.email} onChange={handleChange} /></div>
        </div>
        <div className="space-y-2"><Label>Address</Label><Input name="address" value={personalInfo.address} onChange={handleChange} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Mobile No.</Label><Input name="mobile" value={personalInfo.mobile} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>Zip Code</Label><Input name="zipCode" value={personalInfo.zipCode} onChange={handleChange} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Date of Birth</Label><Input name="dob" type="date" value={personalInfo.dob} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>Nationality</Label><Input name="nationality" value={personalInfo.nationality} onChange={handleChange} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Father's Name</Label><Input name="fatherName" value={personalInfo.fatherName} onChange={handleChange} /></div>
          <div className="space-y-2"><Label>Mother's Name</Label><Input name="motherName" value={personalInfo.motherName} onChange={handleChange} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Gender</Label>
                <Select name="gender" value={personalInfo.gender} onValueChange={handleSelectChange('gender')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                </Select>
            </div>
            <div className="space-y-2"><Label>Marital Status</Label>
                <Select name="maritalStatus" value={personalInfo.maritalStatus} onValueChange={handleSelectChange('maritalStatus')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Single">Single</SelectItem><SelectItem value="Married">Married</SelectItem><SelectItem value="Divorced">Divorced</SelectItem></SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2"><Label>Languages Known</Label><Input name="languages" value={personalInfo.languages} onChange={handleChange} /></div>
        <div className="space-y-2"><Label>Hobbies</Label><Input name="hobbies" value={personalInfo.hobbies} onChange={handleChange} /></div>
        <div className="space-y-2">
            <Label>Profile Picture</Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="file:text-primary file:font-semibold" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
