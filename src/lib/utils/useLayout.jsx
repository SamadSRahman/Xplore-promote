/* eslint-disable brace-style */
/* eslint-disable arrow-parens */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable indent */
import axios from "axios";
import {  useState } from "react";
import {  getScreenName, getScreenPath } from "./services";
import {  useSetRecoilState } from "recoil";
import { screensAtom } from "../../recoil/atoms";

export default function useLayout() {
    const channel = localStorage.getItem("channel");
    const [layouts, setLayouts] = useState([])
    const token = localStorage.getItem("accessToken");
    const [isLayoutCreated, setIsLayoutCreated] = useState(false)
    const setScreens = useSetRecoilState(screensAtom);

    let API_BASE_URL = 'https://pre.xplore.xircular.io/api'; 
    if(window.location.origin==="https://xplr.live"||window.location.origin.includes("localhost")||window.location.origin.includes("vercel")){
        console.log(window.location.origin);  
     API_BASE_URL = 'https://xplr.live/api';
    }



    const createLayout = async (jsonData, campaignId, page, isInitial) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/v1/layout/create/${campaignId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                        session: channel
                    },
                    body: JSON.stringify({
                        name: getScreenPath(page),
                        layoutJSON: JSON.parse(jsonData),
                        isInitial: isInitial?true:false
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json(); // Capture the error response
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Layout created successfully', data);
            getAllLayoutNames(campaignId);
            setIsLayoutCreated(true);
        } catch (error) {
            console.log('Error posting layout data:', error);
            alert(error.message || 'Failed to publish layout. Please try again.');
        }
    };

    const deleteLayout = async (id, campaignId)=>{
        if (!window.confirm('Are you sure you want to delete this screen?')) {
            return;
        }
        try {
            const response = await axios.delete(`${API_BASE_URL}/v1/layout/delete/${id}`,{
                headers: {
                    authorization: token,
                    session: channel
                }
            })
            console.log('Response:', response);
            getAllLayout(campaignId);
        } catch (error) {
            console.log('Error deleting layout:', error);
        }
    }


    const updateLayout = async (id, layout, name, isAlert) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/v1/layout/update/${id}`,
                {
                    // Pass the body content as a JavaScript object
                    name: getScreenPath(name),
                    layoutJSON: JSON.parse(layout), // Parse `layout` to a JSON object
                },
                {
                    headers: {
                        "Content-Type": "application/json", // Specify the content type
                        authorization: `${token}`, // Include the authorization token
                        session: channel,
                    },
                }
            );
            console.log("Response:", response.data);
          if(isAlert){
            alert("Layout saved succssfully");
          }
            // if (name === "splash_screen") {
            //     window.location.href = `/editor/${campaignId}/landing_screen`;
            // } else {
            //     window.location.href = `/publish/${campaignId}`;
            // }
        } catch (error) {
            console.error("Error updating layout:", error);
        }
    };

    const setInitialLayout = async (id, campaignId) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/v1/layout/update/${id}`,
                {
                    isInitial: true
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                        session: channel
                    }
                }
            );
            console.log("Response:", response.data);
            alert("Screen set as initial successfully");
            getAllLayout(campaignId);
        } catch (error) {
            console.error("Error setting initial layout:", error);
        }
    }

    const getAllLayout = async (id)=>{
        console.log("id line 101", id);
        
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/layout/getAll/${id}`)
            console.log(response.data.layouts)
            setLayouts(response.data.layouts)
            const campaignScreens = response.data.layouts.map(ele=>ele);
            
        const formattedScreens = campaignScreens.map(screen => ({
            name: getScreenName(screen.name),
            path: getScreenPath(screen.name),
            id: screen.layoutID,
            isInitial: screen.isInitial
        }));
        console.log('screens updated',formattedScreens);
        
        setScreens(formattedScreens)
          
        } catch (error) {
            console.log(error)
        }
    }

    const getAllLayoutNames = async (campaignId, page = 0, size = 10) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/v1/layout/getAllLayoutName/${campaignId}`,
                {
                    params: { page, size },
                    headers: {
                        authorization: token,
                        session: channel
                    }
                }
            );
            
            const formattedScreens = response.data.layoutNames.map(screen => ({
                name: getScreenName(screen.name),
                path: getScreenPath(screen.name),
                id: screen.id,
                isInitial: screen.isInitial
            }));
            
            console.log('screens updated', formattedScreens);
            setScreens(formattedScreens);
            localStorage.setItem('screens', JSON.stringify(formattedScreens));
            
        } catch (error) {
            console.error('Error fetching layout names:', error);
        }
    };

    return {
        updateLayout,
        createLayout,
        getAllLayout,
        deleteLayout,
        setInitialLayout,
        getAllLayoutNames,
        layouts,
        isLayoutCreated,
        
    };
}
