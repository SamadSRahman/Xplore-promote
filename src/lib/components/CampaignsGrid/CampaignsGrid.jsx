import React, { useCallback, useEffect, useRef } from "react";
import styles from "./CampaignsGrid.module.css";
import useCampaign from "../../utils/useCampaign";
import CampaignCard from "../CampaignCard/CampaignCard";
import { Loader } from "rsuite";

export default function CampaignsGrid() {
  const { getCampaigns, campaigns, loading, page, totalPages, deleteCampaign } = useCampaign();
  const observer = useRef(null);
  const pageRef = useRef(page); // Track page state using ref

  useEffect(() => {
    getCampaigns(); // Fetch initial campaigns
  }, []);

  useEffect(() => {
    pageRef.current = page; // Update ref when page state changes
  }, [page]);

    const handleDelete = async(id, name)=>{
          const isDeleteConfirmed = confirm(`Are you sure you want to delete ${name} campaign?`);
          if(isDeleteConfirmed){
             await deleteCampaign(id)
             alert("Campaign Deleted");
          }
          else{
              alert("Deletion cancelled")
          }
        }

  const lastCampaignRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && pageRef.current < totalPages) {
            console.log("Fetching page:", pageRef.current + 1);
            getCampaigns(pageRef.current); // Use ref instead of state
          }
        },
        { threshold: 1.0 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, totalPages] // Removed `page` to avoid stale closure issues
  );

  return (
    <div className={styles.container}>
       
      <div className={styles.header}>
        <h4>Campaigns</h4>
      </div>
      <div className={styles.body}>
        {campaigns.map((campaign, index) => {
          if (index === campaigns.length - 1) {
            return (
              <div key={campaign.campaignID} ref={lastCampaignRef}>
                <CampaignCard onDelete={handleDelete} getCampaigns={getCampaigns} campaign={campaign} />
              </div>
            );
          }
          return <CampaignCard onDelete={handleDelete} getCampaigns={getCampaigns} key={campaign.campaignID} campaign={campaign} />;
        })}
      </div>
      {loading && <Loader size="md" content="Loading Campaigns" color="red" />}
    </div>
  );
}
