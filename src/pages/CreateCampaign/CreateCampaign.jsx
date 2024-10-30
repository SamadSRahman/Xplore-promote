/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-parens */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
// CampaignForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Grid, Typography, Box, Switch, FormControlLabel
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './CreateCampaign.css';
import { useNavigate } from 'react-router-dom';

const CampaignForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    timing: {
      startDate: null,
      endDate: null,
      isScheduled: false,
      scheduledStartTime: null,
      scheduledEndTime: null,
      timeZone: 'UTC'
    },
    status: {
      status: 'active',
      approvalStatus: 'approved',
      isDraft: false
    },
    performance: {
      impressions: '',
      clicks: '',
      conversions: ''
    },
    socialMediaLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      tiktok: '',
      pinterest: ''
    },
    contactInfo: {
      whatsAppNumber: '',
      phoneNumber: '',
      email: ''
    },
    siteInfo: {
      siteURL: '',
      siteName: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
  
    // Construct the data object containing all campaign details
    const data = {
      name: formData.name,
      description: formData.description,
      timing: {
        startDate: formData.timing.startDate,
        endDate: formData.timing.endDate,
        isScheduled: formData.timing.isScheduled,
        scheduledStartTime: formData.timing.scheduledStartTime,
        scheduledEndTime: formData.timing.scheduledEndTime,
        timeZone: formData.timing.timeZone
      },
      status: formData.status,
      performance: formData.performance,
      socialMediaLinks: formData.socialMediaLinks,
      contactInfo: formData.contactInfo,
      siteInfo: formData.siteInfo
    };
  
    // Create a new FormData instance
    const formDataToSend = new FormData();
  
    // Append the entire data object as a JSON string to the FormData instance
    formDataToSend.append('data', JSON.stringify(data));
  
    try {
      const response = await axios.post(
        'https://pre.xplore.xircular.io/api/v1/campaign/create',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Campaign created successfully:', response.data.data.campaignID);
      let campaignId = response.data.data.campaignID;
      alert("Campaign created successfully");
      navigate(`/editor/${campaignId}/splash_screen`);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };


return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="form-container">
        <Typography variant="h4" align="center" gutterBottom className="form-title">
          Create Campaign
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name & Description */}
            <Grid item xs={12} className="grid-item">
              <TextField
                label="Campaign Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12} className="grid-item">
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
                size="small"
              />
            </Grid>
  
            {/* Timing Section */}
            <Typography variant="h6" className="section-header">
              Timing
            </Typography>
            <Grid item xs={6} className="grid-item">
              <DateTimePicker
                label="Start Date"
                size="small"
                value={formData.timing.startDate}
                onChange={(date) => handleNestedChange("timing", "startDate", date)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>
            <Grid item xs={6} className="grid-item">
              <DateTimePicker
                label="End Date"
                size="small"
                value={formData.timing.endDate}
                onChange={(date) => handleNestedChange("timing", "endDate", date)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>
            <Typography variant="h6" className="section-header">
              Social
            </Typography>
            {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'pinterest'].map((platform) => (
              <Grid item xs={6} key={platform}>
                <TextField
                  label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
                  value={formData.socialMediaLinks[platform]}
                  onChange={(e) => handleNestedChange('socialMediaLinks', platform, e.target.value)}
                  fullWidth
                   size='small'
                />
              </Grid>
            ))}

            {/* Contact Info */}
            <Grid item xs={6}>
              <TextField
                label="WhatsApp Number"
                value={formData.contactInfo.whatsAppNumber}
                onChange={(e) => handleNestedChange('contactInfo', 'whatsAppNumber', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                value={formData.contactInfo.phoneNumber}
                onChange={(e) => handleNestedChange('contactInfo', 'phoneNumber', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Site Info */}
            <Grid item xs={6}>
              <TextField
                label="Site URL"
                value={formData.siteInfo.siteURL}
                onChange={(e) => handleNestedChange('siteInfo', 'siteURL', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Site Name"
                value={formData.siteInfo.siteName}
                onChange={(e) => handleNestedChange('siteInfo', 'siteName', e.target.value)}
                fullWidth
              />
            </Grid>
  
            {/* Submit Button */}
            <Grid item xs={12} className="grid-item" sx={{ textAlign: "center" }}>
              <Button variant="contained" className="submit-button" type="submit">
                Create Campaign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
    
};

export default CampaignForm;
