import React, { useState } from 'react';

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

  const check = (para) => {
    para.preventDefault();

    const { firstName, lastName, DOB, Address, State, City } = formData;
    const currentYear = new Date().getFullYear();

    if (firstName.length <= 1 || !/^[A-Za-z]+$/.test(firstName)) {
      alert("First name should be more than 1 character and contain only alphabetic characters.");
      return;
    }

    if (lastName.length <= 1 || !/^[A-Za-z]+$/.test(lastName)) {
      alert("Last name should be more than 1 character and contain only alphabetic characters.");
      return;
    }

    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const isValidDate = dobPattern.test(DOB);

    if (isValidDate) {
      const [day, month, year] = DOB.split('/').map(Number);
      const isDayValid = day >= 1 && day <= 31;
      const isMonthValid = month >= 1 && month <= 12;
      const isYearValid = year < currentYear;
      const isAgeValid = (currentYear - year) >= 18;

      if (!(isDayValid && isMonthValid && isYearValid && isAgeValid)) {
        alert("Date of birth should be valid and the user should be more than 18 years old.");
        return;
      }
    } else {
      alert("Date of birth should be in the format dd/mm/yyyy.");
      return;
    }

    if (!/^[a-zA-Z0-9\s,]+$/.test(Address)) {
      alert("Address should contain only numbers, alphabets, commas, and spaces.");
      return;
    }

    if (!/^[A-Za-z]+$/.test(State)) {
      alert("State should contain only alphabetic characters.");
      return;
    }

    if (!/^[A-Za-z]+$/.test(City)) {
      alert("City should contain only alphabetic characters.");
      return;
    }

    alert("Successfully saved the details. Check the console for the data.");
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Form For Details</h2>
      <div className='column'>
        <form onSubmit={check}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="DOB" className="form-label">Date of Birth</label>
            <input
              type="text"
              className="form-control"
              id="DOB"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              placeholder="dd/mm/yyyy"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="State" className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              id="State"
              name="State"
              value={formData.State}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="City" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="City"
              name="City"
              value={formData.City}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
