import { useEffect } from "react";

export default function useEndUser(){
  const submitContactForm = async (formData) => {
    try {
      // Validate required fields
      if (!formData.name?.trim()) {
        alert("Please enter your name");
        return;
      }

      if (!formData.email?.trim()) {
        alert("Please enter your email");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Phone validation if provided
      if (formData.phone) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
          alert("Please enter a valid 10-digit phone number");
          return;
        }
      }

      // Website URL validation if provided
      if (formData.otherDetails?.website) {
        try {
          new URL(formData.otherDetails.website);
        } catch {
          alert("Please enter a valid website URL");
          return;
        }
      }

      const response = await fetch('https://pre.xplore.xircular.io/api/v1/endUser/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          countryCode: formData.phone ? formData.countryCode || "+91" : "",
          phone: formData.phone,
          email: formData.email,
          address: {
            city: formData.address?.city
          },
          otherDetails: {
            website: formData.otherDetails?.website,
            interestedProduct: localStorage.getItem('interestedProduct')
          },
          visitorId: formData.visitorId,
          deviceId: formData.deviceId,
          campaignID: formData.campaignID
        })
      });
      alert("Form submitted successfully");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
 
    } catch (error) {
      console.log('Error submitting contact form:', error);
      throw error;
    }
  };
  const updateInterestedProduct = async (id) => {
    try {
      const response = await fetch('https://pre.xplore.xircular.io/api/v1/endUser/updateInterestedProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId: localStorage.getItem('visitorId'),
          deviceId: localStorage.getItem('deviceId'), 
          productName: localStorage.getItem('interestedProduct'),
          campaignID:id
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();

    } catch (error) {
      console.error('Error updating interested product:', error);
      throw error;
    }
  };

  return {
    submitContactForm,
    updateInterestedProduct
  };

}
