import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AnalyticsDashboard.module.css';
import { useParams } from 'react-router-dom';
import useAnalytics from '../../lib/utils/useAnalytics';
import { FaArrowLeftLong } from "react-icons/fa6";
import instaicon from '../../assets/ig-instagram-icon.png';
import facebookicon from '../../assets/facebook-round-color-icon 1.png';
import qrcodeicon from '../../assets/qr-code-icon.png';
import iosicon from '../../assets/apple-icon.png';
import androidicon from '../../assets/android-icon.png';
// import webicon from '../../assets/other-icon.png';
import indianflag from '../../assets/india-flag-icon.png';
import usaflag from '../../assets/united-states-flag-icon.png';
import southafricanflag from '../../assets/south-africa-flag-icon.png';
import CampaignAnalytics from './CampaignAnalytics.jsx';
import useCampaign from '../../lib/utils/useCampaign';


const AnalyticsDashboard = () => {

  const { getperformamceAnalyticsData, performancedata } = useAnalytics();  
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { campaignName, getCampaignById } = useCampaign();
  const [activetab, setActivetab] = useState('Dashboard');

  useEffect(() => {
          if(campaignId){
              getperformamceAnalyticsData(campaignId);
              getCampaignById(campaignId);
          }
          console.log("Analytics performancedata", performancedata);
  }, [campaignId]);


  return (
    <div className={styles.maincontainer}>

    <div className={styles.sidebar}>
    <div  className={styles.topmenuwrapper}>
      <div className={styles.namecard}>
      <div className={styles.backbtnbox}>
           <button className={styles.backbtn} onClick={()=>navigate('/campaigns')}> <FaArrowLeftLong  color="white"/> </button>
           <h2> Analytics </h2>
      </div>
          <p className={styles.campaignname}> {campaignName} </p>
      </div>

      <div className={styles.menulisting}>
      <button className={activetab === 'Dashboard' ? styles.tabbtnactive : styles.tabbtn }  onClick={()=>setActivetab('Dashboard')} > Dashboard </button>
      <button className={activetab === 'Interested Users' ? styles.tabbtnactive : styles.tabbtn }  onClick={()=>setActivetab('Interested Users')} > Interested Users  </button>
      </div>
    </div>
    
    </div>

   {
       activetab === 'Dashboard' ?  
          (  <div className={styles.analyticscontainer}>

      <div className={styles.analyticstitle}> 
        <h1>  Overview </h1>
      </div>
      <div className={styles.overviewboxses}> 

      <div className={styles.overviewbox}>
        <p className={styles.metrictitle}> Total no of Clicks</p>
        <h3 className={styles.metric}> { performancedata?.totalClicks || 0 } </h3> 
      </div>

      <div className={styles.overviewbox}>
          <p  className={styles.metrictitle}> Top Source </p>
          <h3 className={styles.metric}> { performancedata?.overview?.topSource || 0 } </h3> 
      </div>

      <div className={styles.overviewbox}>
          <p  className={styles.metrictitle}> Top Device </p>
          <h3 className={styles.metric}> {performancedata?.overview?.topDevice || 0 } </h3> 
      </div>

      <div className={styles.overviewbox}>
          <p  className={styles.metrictitle}> Top Region </p>
          <h3 className={styles.metric}>  {performancedata?.overview?.topRegion || 0 } </h3> 
      </div>

      </div>

      <div className={styles.otherdetailsboxes}>

        <div className={styles.contentbox}>
        <h3 className={styles.heading}> Sources </h3> 
        {
            performancedata?.sourceDistribution?.map((element) =>  {      
              return (
                <div className={styles.content}>
                      <div className={styles.iconbox}>
                        { element.source ==='instagram' ? <img src={instaicon} alt="source image" />  : ''}
                        { element.source ==='qr' ? <img src={qrcodeicon} alt="source image" /> :'' }
                        { element.source ==='facebook' ? <img src={facebookicon} alt="source image" /> :''}
                        { element.source ==='direct' ? <img src={qrcodeicon} alt="source image" /> :''}
                        <p> { element.source || ''}</p>
                      </div>
                      <div className={styles.numbersbox}>
                        <p> {element.count || 0 } </p>  
                        <p className={styles.percentagebtn}> {element.percentage || 0}% </p>
                      </div>
                    </div>
                )})
            }
        
        </div>

        <div className={styles.contentbox}>
        <h3 className={styles.heading}> Devices </h3> 
        {
            performancedata?.deviceDistribution?.map((element) =>  {      
              return (
                <div className={styles.content}>
                      <div className={styles.iconbox}>
                        { element.device ==='ios' ? <img src={iosicon} alt="source image" />  : ''}
                        { element.device ==='android' ? <img src={androidicon} alt="source image" /> :'' }
                        { element.device ==='web' ? <img src={androidicon} alt="source image" /> :''}
                        <p> { element.device || ''}</p>
                      </div>
                      <div className={styles.numbersbox}>
                        <p> {element.count || 0} </p>  
                        <p className={styles.percentagebtn}> {element.percentage || 0 }% </p>
                      </div>
                    </div>
                )})
            }
        
        </div>

        <div className={styles.contentbox}>
        <h3 className={styles.heading}> Region </h3> 
        {
            performancedata?.regionDistribution?.map((element) =>  {      
              return (
                <div className={styles.content}>
                      <div className={styles.iconbox}>
                        { element.region ==='IN' ? <img src={indianflag} alt="source image" />  : ''}
                        { (element.region ==='USA' || element.region ==='US') ? <img src={usaflag} alt="source image" /> :'' }
                        { element.region ==='ZA' ? <img src={southafricanflag} alt="source image" /> :''}
                        <p> { element.region || ''} </p>
                      </div>
                      <div className={styles.numbersbox}>
                        <p> {element.count || 0} </p>  
                        <p className={styles.percentagebtn}> {element.percentage || 0}% </p>
                      </div>
                    </div>
                )})
            }
        
        </div>

      </div>
      
           </div>) 
                  
      : (
       <CampaignAnalytics />
       )
                               
   }

   </div>
  )
}

export default AnalyticsDashboard