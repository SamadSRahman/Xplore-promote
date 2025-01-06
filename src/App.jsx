import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import CampaignAnalytics from './pages/CampaignAnalytics/CampaignAnalytics.jsx';
import ProfileDesign from './pages/ProfileDesign/ProfileDesign.tsx';
import ProfilePreview from './pages/ProfilePreview/ProfilePreview.tsx';
import Preview from './pages/Preview/Preview.tsx';
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';
import AdminHomepage from './pages/AdminHomepage/AdminHomepage.jsx';
import DeleteInstructions from './pages/DeleteInstructions/DeleteInstructions.jsx';
import useCampaign from './lib/utils/useCampaign.jsx';

const App = () => {
  const { shortId } = useParams();
  const { metaData, getmetadataCampaignById } = useCampaign();

  useEffect(() => {
    if (shortId) {
      getmetadataCampaignById(shortId);
    }
  }, [shortId, getmetadataCampaignById]);

  useEffect(() => {
    console.log("metaData", metaData);
  }, [metaData]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const path = window.location.pathname;

      // Check if the current path matches the specified routes
      const isCampaignPreview = path.startsWith('/editor/') ||
        path.includes("createCampaign") ||
        path.includes("campaigns") ||
        path.includes("campaignAnalytics") ||
        path.includes("publish") ||
        path.includes("profileDesign") ||
        path === "/";

      setIsMobile(mobile && isCampaignPreview);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      <Helmet>
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
        <title>{metaData.title}</title>
        <link rel="icon" href={metaData.image} />
      </Helmet>

      {isMobile ? (
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          color: '#000',
          backgroundColor: '#fff'
        }}>
          <h2>Please access this application from a desktop or laptop computer for the best experience.</h2>
        </div>
      ) : (
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
              <Route path='/deleteInstructions' element={<DeleteInstructions />} />
              <Route path='/profileDesign/:userId' element={<ProfileDesign />} />
              <Route path='/publish/:campaignId' element={<PublishAndPreview />} />
              <Route path='/profile/:userId' element={<ProfilePreview />} />
              <Route path='/campaign/:campaignId/:screen?' element={<CampaignPreview />} />
              <Route path='/campaignAnalytics/:campaignId' element={<CampaignAnalytics />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/terms&conditions' element={<TermsAndConditions />} />
              <Route path='/' element={<QRLogin />} />
              <Route path='/:shortId/:screen?' element={<Preview />} />
              <Route path='/campaigns' element={<Campaigns />} />
              <Route path='/createCampaign' element={<CampaignsForm />} />
              <Route path='/themeSelection' element={<ThemeSelection />} />
              <Route path='/editor/:campaignId/:page' element={<EditorPage />} />

              {/* Admin section */}
              <Route path='/admin' element={<AdminLogin />} />
              <Route path='/admin/homepage' element={<AdminHomepage />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      )}
    </div>
  );
};

export default App;