import React, { useEffect, useState } from 'react';

interface PhoneCallIntegrationProps {
  onPhoneNumberChange: (phoneNumber: string) => void;
}

export const PhoneCallIntegration: React.FC<PhoneCallIntegrationProps> = ({ onPhoneNumberChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
      onPhoneNumberChange(storedPhoneNumber);
    }
  }, [onPhoneNumberChange]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    localStorage.setItem('userPhoneNumber', newPhoneNumber);
    onPhoneNumberChange(newPhoneNumber);
  };

  return (
    <div className="mb-6">
      <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">Enter your phone number:</label>
      <input
        type="tel"
        id="phone_number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="e.g., +1234567890"
      />
    </div>
  );
};