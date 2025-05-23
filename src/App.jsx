import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/EditorPage/EditorPage.tsx';
import ThemeSelection from './pages/ThemeSelection/ThemeSelection.jsx';
import Campaigns from './pages/Campaigns/Campaigns.jsx';
import QRLogin from './pages/QrCode/QrPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.jsx';
import PricingPage from './pages/PricingPage/PricingPage.jsx';
import PaymentStatus from './pages/PaymentStatus/PaymentStatus.jsx';
import TermsAndConditions from './pages/Terms/Terms.jsx';
import CampaignsForm from './pages/CreateCampaign/CreateCampaign.jsx';
import PublishAndPreview from './pages/PublishAndPreview/PublishAndPreview.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import CampaignPreviewNew from './pages/CampaignPreview/CampaignPreviewNew.tsx';
import CampaignAnalytics from './pages/CampaignAnalytics/CampaignAnalytics.jsx';
import AnalyticsDashboard from './pages/CampaignAnalytics/AnalyticsDashboard.jsx';
import ProfileDesign from './pages/ProfileDesign/ProfileDesign.tsx';
import ProfilePreview from './pages/ProfilePreview/ProfilePreview.tsx';
import PreviewNew from './pages/Preview/PreviewNew.tsx';
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';
import AdminHomepage from './pages/AdminHomepage/AdminHomepage.jsx';
import DeleteInstructions from './pages/DeleteInstructions/DeleteInstructions.jsx';
import BikerBayTermsPage from './pages/BikerBayTermsPage/BikerBayTermsPage.jsx';
import NewCampaigns from './pages/NewCampaigns/NewCampaigns.jsx'
// import {AssetsNavbarWebWrapper} from './webComponents/AssetsNavbarWebWrapper.jsx';
import "rsuite/dist/rsuite.min.css"; 
const App = () => {

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
              <Route path='/pricing' element={<PricingPage />} />
              <Route path='/paymentStatus' element={<PaymentStatus />} />
              <Route path='/deleteInstructions' element={<DeleteInstructions />} />
              <Route path='/profileDesign/:userId' element={<ProfileDesign />} />
              <Route path='/publish/:campaignId' element={<PublishAndPreview />} />
              <Route path='/profile/:userId' element={<ProfilePreview />} />
              <Route path='/campaign/:campaignId/:screen?' element={<CampaignPreviewNew />} />
              <Route path='/campaignAnalytics/:campaignId' element={<CampaignAnalytics />} />
              <Route path='/analyticsDashboard/:campaignId' element={<AnalyticsDashboard />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/terms&conditions' element={<TermsAndConditions />} />
              <Route path='/' element={<QRLogin />} />
              <Route path='/:shortId/:screen?' element={<PreviewNew />} />
              <Route path='/home' element={<NewCampaigns />} />
              <Route path='/fonts' element={<Campaigns />} />
              <Route path='/createCampaign' element={<CampaignsForm />} />
              <Route path='/themeSelection' element={<ThemeSelection />} />
              <Route path='/editor/:campaignId/:page' element={<EditorPage />} />
              <Route path='/bikerBayTermsAndConditions' element={<BikerBayTermsPage />} />


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