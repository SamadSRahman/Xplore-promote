/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import EditorPage from './pages/EditorPage/EditorPage.tsx';
import ThemeSelection from './pages/ThemeSelection/ThemeSelection.jsx';
import Campaigns from './pages/Campaigns/Campaigns.jsx';
import QRLogin from './pages/QrCode/QrPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/Terms/Terms.jsx';
import CampaignsForm from './pages/CreateCampaign/CreateCampaign.jsx';
import PublishAndPreview from './pages/PublishAndPreview/PublishAndPreview.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import CampaignPreview from './pages/CampaignPreview/CampaignPreview.tsx';

export default function App() {
  return (
    <div>
         <RecoilRoot>
         <BrowserRouter>
          <Routes>
            <Route path='/privacyPolicy' element={<PrivacyPolicy />}/>
            <Route path='/publish/:campaignId' element={<PublishAndPreview />}/>
            <Route path='/campaign/:campaignId' element={<CampaignPreview />}/>
            <Route path='/contactus' element={<ContactUs />}/>
            <Route path='/terms&conditions' element={<TermsAndConditions />}/>
            <Route path='/' element={<QRLogin />}/>
            <Route path='/campaigns' element={<Campaigns />}/>
            <Route path='/createCampaign' element={<CampaignsForm />}/>
            <Route path='/themeSelection' element={<ThemeSelection />}/>
            <Route path='/editor/:campaignId/:page' element={<EditorPage />}/>
          </Routes>
          </BrowserRouter>
         </RecoilRoot>
    </div>
  );
}
