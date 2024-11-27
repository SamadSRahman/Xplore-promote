import { useEffect } from "react";

export default function useEndUser(){
  const submitContactForm = async (formData) => {
    try {
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
            website: formData.otherDetails?.website
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
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };

  return {
    submitContactForm
  };

}
