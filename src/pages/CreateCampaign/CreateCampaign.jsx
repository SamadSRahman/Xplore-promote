/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// CampaignForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa';
import { FiMail, FiPhone, FiGlobe, FiImage } from 'react-icons/fi';
import './CreateCampaign.css';
import { useNavigate } from 'react-router-dom';

const CampaignForm = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: {
            status: 'active',
            approvalStatus: 'approved',
            isDraft: false,
        },
        timing: {
            startDate: null,
            endDate: null,
            isScheduled: false,
            scheduledStartTime: null,
            scheduledEndTime: null,
            timeZone: 'UTC'
        },
        socialMediaLinks: { facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '', tiktok: '', pinterest: '' },
        contactInfo: { whatsAppNumber: '', phoneNumber: '', email: '' },
        siteInfo: { siteURL: '', siteName: '' }
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = e => {
        // setFormData(prevData => ({ ...prevData, image: e.target.files[0] }));
        setImage(e.target.files[0]);
    };

    const handleNestedChange = (section, field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [section]: { ...prevData[section], [field]: value === 'on' ? true : value === 'off' ? false : value }
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        const data = new FormData();
        data.append('files', image);
        data.append('data', JSON.stringify(formData));

        try {
            const response = await axios.post(
                'https://pre.xplore.xircular.io/api/v1/campaign/create',
                data,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );
            console.log('Campaign created successfully:', response.data);
            alert('Campaign created successfully');
            navigate(`/editor/${response.data.data.campaignID}/splash_screen`);
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='form-wrapper'>
      <div className="form-container">
        <h2 className="form-title">Create Campaign</h2>
        <form onSubmit={handleSubmit} className="form-content">

          {/* Campaign Name */}
          <label className="input-label">Campaign Name</label>
          <input
            type="text"
            name="name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter campaign name"
            required
          />

          {/* Description */}
          <label className="input-label">Description</label>
          <textarea
            name="description"
            className="input-field textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your campaign"
            required
          />

          {/* Image Upload */}
          <label className="input-label">Campaign Image <FiImage /></label>
          <input
            type="file"
            name="image"
            className="input-field file-input"
            onChange={handleFileChange}
          />

          {/* Date Pickers */}
          <div className="date-picker-container">
            <div>
              <label className="input-label">Start Date</label>
              <DateTimePicker
                value={formData.timing.startDate}
                onChange={date => handleNestedChange('timing', 'startDate', date)}
                renderInput={params => <input {...params.inputProps} className="date-input" />}
              />
            </div>
            <div>
              <label className="input-label">End Date</label>
              <DateTimePicker
                value={formData.timing.endDate}
                onChange={date => handleNestedChange('timing', 'endDate', date)}
                renderInput={params => <input {...params.inputProps} className="date-input" />}
              />
            </div>
          </div>
       <div className='checkbox-wrapper'>
        <label>Is Scheduled</label>
       <input onClick={()=>handleNestedChange('timing', 'isScheduled', !formData.timing.isScheduled)} type="checkbox" checked={formData.timing.isScheduled}/>
       </div>
          <div className="date-picker-container">
            <div>
              <label className="input-label">Scheduled Start Date</label>
              <DateTimePicker
               disabled={!formData.timing.isScheduled}
                value={formData.timing.scheduledStartTime}
                onChange={date => handleNestedChange('timing', 'scheduledStartTime', date)}
                renderInput={params => <input {...params.inputProps} className="date-input" />}
              />
            </div>
            <div>
              <label className="input-label">Scheduled End Date</label>
              <DateTimePicker
                disabled={!formData.timing.isScheduled}
                value={formData.timing.scheduledEndTime}
                onChange={date => handleNestedChange('timing', 'scheduledEndTime', date)}
                renderInput={params => <input {...params.inputProps} className="date-input" />}
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="social-media-section">
            <label className="input-label">Social Media Links</label>
            <div className="social-media-grid">
              {Object.keys(formData.socialMediaLinks).map(platform => (
                <div key={platform} className="social-media-input">
                  <span className="social-icon">{React.createElement({ facebook: FaFacebook, instagram: FaInstagram, twitter: FaTwitter, linkedin: FaLinkedin, youtube: FaYoutube, tiktok: FaTiktok, pinterest: FaPinterest }[platform])}</span>
                  <input
                    type="url"
                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
                    value={formData.socialMediaLinks[platform]}
                    onChange={e => handleNestedChange('socialMediaLinks', platform, e.target.value)}
                    className="input-field"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <label className="input-label">Contact Information</label>
            <div className="contact-info-grid">
              <div>
                <FiMail />
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  value={formData.contactInfo.email}
                  onChange={e => handleNestedChange('contactInfo', 'email', e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <FiPhone />
                <input
                  type="tel"
                  name="phoneNumber"
                  className="input-field"
                  value={formData.contactInfo.phoneNumber}
                  onChange={e => handleNestedChange('contactInfo', 'phoneNumber', e.target.value)}
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>

          {/* Site Info */}
          <div className="site-info-section">
            <label className="input-label">Website Information</label>
            <div>
              <FiGlobe />
              <input
                type="url"
                name="siteURL"
                className="input-field"
                value={formData.siteInfo.siteURL}
                onChange={e => handleNestedChange('siteInfo', 'siteURL', e.target.value)}
                placeholder="Website URL"
              />
            </div>
            <div>
              <input
                type="text"
                name="siteName"
                className="input-field"
                value={formData.siteInfo.siteName}
                onChange={e => handleNestedChange('siteInfo', 'siteName', e.target.value)}
                placeholder="Website Name"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">Create Campaign</button>
        </form>
      </div>
      </div>
    </LocalizationProvider>
    );
};

export default CampaignForm;
