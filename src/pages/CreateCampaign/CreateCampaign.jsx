// CampaignForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FiMail, FiPhone, FiGlobe, FiImage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './CreateCampaign.module.css';
import useLayout from '../../lib/utils/useLayout';
import { blankBackgroundJSON, contactUsJSON } from '../../lib/utils/splashScreenData';


const CampaignForm = () => {
    const navigate = useNavigate();
    const { createLayout } = useLayout()
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
    const [isLoading, setIsLoading] = useState(false);

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

        if (!formData.timing.startDate || !formData.timing.endDate) {
            alert('Please select both start and end dates');
            return;
        }

        setIsLoading(true);

        const token = localStorage.getItem('accessToken');
        const data = new FormData();
        data.append('files', image);
        data.append('data', JSON.stringify(formData));
        const channel = localStorage.getItem('channel');
        try {
            const response = await axios.post(
                'https://pre.xplore.xircular.io/api/v1/campaign/create',
                data,
                { headers: { Authorization: `Bearer ${token}`, session: channel, 'Content-Type': 'multipart/form-data' } }
            );
            await createLayout(JSON.stringify(blankBackgroundJSON), response.data.data.campaignID, 'Splash Screen');
            await createLayout(JSON.stringify(blankBackgroundJSON), response.data.data.campaignID, 'Landing Screen', true);
            await createLayout(JSON.stringify(contactUsJSON), response.data.data.campaignID, 'Contact Us Screen');
            alert('Campaign created successfully');
            navigate(`/editor/${response.data.data.campaignID}/splash_screen`);
        } catch (error) {
            console.error('Error creating campaign:', error);
            alert(error.response.data.message)
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Create Campaign</h2>
        <form onSubmit={handleSubmit} className={styles.formContent}>

          {/* Campaign Name */}
          <label className={styles.inputLabel}>Campaign Name*</label>
          <input
            type="text"
            name="name"
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter campaign name"
            required
          />

          {/* Description */}
          <label className={styles.inputLabel}>Description*</label>
          <textarea
            name="description"
           className={`${styles.inputField} ${styles.textarea}`}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your campaign"
            required
          />

          {/* Image Upload */}
          <label className={styles.inputLabel}>Campaign Image* <FiImage /></label>
          <input
            type="file"
            accept="image/*"
            name="image"
            className={`${styles.inputField} ${styles.fileInput}`}
            onChange={handleFileChange}
          />

          {/* Date Pickers */}
          <div className={styles.datePickerContainer}>
            <div>
              <label className={styles.inputLabel}>Start Date*</label>
              <DateTimePicker
              minDateTime={new Date()}
                value={formData.timing.startDate}
                onChange={date => handleNestedChange('timing', 'startDate', date)}
                renderInput={params => <input {...params.inputProps} className={styles.dateInput} />}
              />
            </div>
            <div>
              <label className={styles.inputLabel}>End Date*</label>
              <DateTimePicker
                required
                value={formData.timing.endDate}
                onChange={date => handleNestedChange('timing', 'endDate', date)}
                renderInput={params => <input {...params.inputProps} className={styles.dateInput} />}
              />
            </div>
          </div>
          {/* <div className={styles.checkboxWrapper}>
          <label>Is Scheduled</label>
       <input onClick={()=>handleNestedChange('timing', 'isScheduled', 
       !formData.timing.isScheduled)} type="checkbox" checked={formData.timing.isScheduled}/>
       </div>
          <div className={styles.datePickerContainer}>
            <div>
              <label className={styles.inputLabel}>Scheduled Start Date</label>
              <DateTimePicker
               disabled={!formData.timing.isScheduled}
                value={formData.timing.scheduledStartTime}
                onChange={date => handleNestedChange('timing', 'scheduledStartTime', date)}
                renderInput={params => <input {...params.inputProps} className={styles.dateInput} />}
              />
            </div>
            <div>
              <label className={styles.inputLabel}>Scheduled End Date</label>
              <DateTimePicker
                disabled={!formData.timing.isScheduled}
                value={formData.timing.scheduledEndTime}
                onChange={date => handleNestedChange('timing', 'scheduledEndTime', date)}
                renderInput={params => <input {...params.inputProps} className={styles.dateInput} />}
              />
            </div>
          </div> */}

          {/* Social Media Links */}
          {/* <div className="social-media-section">
            <label className={styles.inputLabel}>Social Media Links</label>
            <div className="social-media-grid">
              {Object.keys(formData.socialMediaLinks).map(platform => (
                <div key={platform} className="social-media-input">
                  <span className="social-icon">{React.createElement({ facebook:
                  FaFacebook, instagram: FaInstagram, twitter: FaTwitter, linkedin:
                  FaLinkedin, youtube: FaYoutube, tiktok: FaTiktok, pinterest: FaPinterest }[platform])}</span>
                  <input
                    type="url"
                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
                    value={formData.socialMediaLinks[platform]}
                    onChange={e => handleNestedChange('socialMediaLinks', platform, e.target.value)}
                    className={styles.inputField}
                  />
                </div>
              ))}
            </div>
          </div> */}

          {/* Contact Info */}
          <div className={styles.socialMediaSection}>
            <label className={styles.inputLabel}>Contact Information</label>
            <div className={styles.socialMediaGrid}>
              <div>
                <FiMail />
                <input
                  type="email"
                  name="email"
                  className={styles.inputField}
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
                  className={styles.inputField}
                  value={formData.contactInfo.phoneNumber}
                  onChange={e => handleNestedChange('contactInfo', 'phoneNumber', e.target.value)}
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>

          {/* Site Info */}
          <div className="site-info-section">
            <label className={styles.inputLabel}>Website Information</label>
            <div>
              <FiGlobe />
              <input
                type="url"
                name="siteURL"
                className={styles.inputField}
                value={formData.siteInfo.siteURL}
                onChange={e => handleNestedChange('siteInfo', 'siteURL', e.target.value)}
                placeholder="Website URL"
              />
            </div>
            <div>
              <input
                type="text"
                name="siteName"
                className={styles.inputField}
                value={formData.siteInfo.siteName}
                onChange={e => handleNestedChange('siteInfo', 'siteName', e.target.value)}
                placeholder="Website Name"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={isLoading}
          >
              {isLoading ? 'Loading...' : 'Create Campaign'}
          </button>
        </form>
      </div>
      </div>
    </LocalizationProvider>
    );
};

export default CampaignForm;
