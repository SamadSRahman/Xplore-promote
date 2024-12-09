import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import ProfileDesign from './pages/ProfileDesign/ProfileDesign.tsx'
import ProfilePreview from './pages/ProfilePreview/ProfilePreview.tsx'
import Preview from './pages/Preview/Preview.tsx'

export default function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  // const { data, getData } = useVisitorData(
  //   { extendedResult: true },
  //   { immediate: true }
  // );

  React.useEffect(() => {
    // getData({ ignoreCache: true });
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const path = window.location.pathname;
      const isCampaignPreview = path.startsWith('/campaign/') || path.includes("privacyPolicy") || path.includes("terms&conditions") || path.includes("contactus") || path.includes("profile");
      setIsMobile(mobile && !isCampaignPreview);
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
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      )}
    </div>
  );
}

