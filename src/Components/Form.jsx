import React, { useState } from 'react';

const TextField = ({ id, name, label, value, onChange, placeholder }) => (
  <div className="flex items-center mb-4">
    <label htmlFor={id} className="font-medium text-gray-700 mr-4 w-32 text-right text-xl">
      {label}:
    </label>
    <input
      type="text"
      className="pt-2 pb-2 border-black border-2 rounded-md shadow-sm focus:border-black focus:ring-0 flex-1"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    DOB: '',
    Address: '',
    State: '',
    City: ''
  });

  const handleChange = (para) => {
    setFormData({
      ...formData,
      [para.target.name]: para.target.value
    });
  };

  const isValidDate = (day, month, year) => {
    const monthDays = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day > 0 && day <= monthDays[month - 1];
  };

  const check = (para) => {
    para.preventDefault();

    const { firstName, lastName, DOB, Address, State, City } = formData;
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

    if (firstName.length <= 1 || !/^[A-Za-z\s]+$/.test(firstName)) {
      alert("First name should be more than 1 character and contain only alphabetic characters and spaces.");
      return;
    }

    if (lastName.length <= 1 || !/^[A-Za-z]+$/.test(lastName)) {
      alert("Last name should be more than 1 character and contain only alphabetic characters.");
      return;
    }

    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const isValidDOB = dobPattern.test(DOB);

    if (isValidDOB) {
      const [day, month, year] = DOB.split('/').map(Number);
      if (!isValidDate(day, month, year)) {
        alert(`Invalid date. The month ${month} doesn't have ${day} days.`);
        return;
      }

      const birthDate = new Date(year, month - 1, day);
      const isAgeValid = currentYear - year > 17 || (currentYear - year === 17 && currentDate >= birthDate);

      if (!isAgeValid) {
        alert("User should be more than 17 years old.");
        return;
      }
    } else {
      alert("Date of birth should be in the format dd/mm/yyyy.");
      return;
    }

    // Updated Address validation to ensure it contains letters and numbers
    if (!/^[a-zA-Z0-9\s,/-]+$/.test(Address) || !/[a-zA-Z0-9]/.test(Address)) {
      alert("Address should contain at least one letter or number, and can include commas, spaces, /, and -.");
      return;
    }

    if (State.length <= 1 || !/^[A-Za-z\s]+$/.test(State)) {
      alert("State should be more than 1 character and contain only alphabetic characters.");
      return;
    }

    if (City.length <= 1 || !/^[A-Za-z\s]+$/.test(City)) {
      alert("City should be more than 1 character and contain only alphabetic characters.");
      return;
    }

    alert("Successfully saved the details. Check the console for the data.");
    console.log(formData);
  };

  return (
    <div className="bg-sky-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Form For Details</h2>
        <form onSubmit={check} className="space-y-4">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            id="DOB"
            name="DOB"
            label="Date of Birth"
            value={formData.DOB}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
          />
          <TextField
            id="Address"
            name="Address"
            label="Address"
            value={formData.Address}
            onChange={handleChange}
          />
          <TextField
            id="State"
            name="State"
            label="State"
            value={formData.State}
            onChange={handleChange}
          />
          <TextField
            id="City"
            name="City"
            label="City"
            value={formData.City}
            onChange={handleChange}
          />

          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-5 rounded-md w-full text-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
