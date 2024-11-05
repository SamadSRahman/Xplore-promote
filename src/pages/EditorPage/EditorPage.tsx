/* eslint-disable space-before-blocks */
/* eslint-disable brace-style */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import styles from './EditorPage.module.css';
import {
  addTemplatesSuffix,
  convertDictToPalette,
  convertPaletteToDict,
  DivProEditor,
  removeTemplatesSuffix,
} from '../../lib'; // Adjust this import path as needed
import PreviewCard from '../../lib/components/PreviewCard/PreviewCard';
import MobilePreview from '../../lib/components/MobilePreview/MobilePreview';
import { blankBackgroundJSON, gradientBackgroundJSON, imageBackgroundJSON, solidBackgroundJSON } from '../../lib/utils/splashScreenData';
import useApi from '../../lib/utils/useApi';
import saveIcon from '../../assets/save-icon.svg'



const EditorPage = () => {
  const { getCampaignById, splashScreenLayout, isLandingScreenAvailable, 
    isSplashScreenAvailable, updateLayout, splashScreenId, landingScreenId, landingScreenLayout } = useApi();
  const { type, campaignId, page } = useParams();
  // const id = localStorage.getItem('adId');
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [editorData, setEditorData] = React.useState(null);
  const [editorKey, setEditorKey] = React.useState(0);
  const [jsonContent, setJsonContent] = React.useState(null);
  const [editorInstance, setEditorInstance] = React.useState(null);
  const editorContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (campaignId) {
      getCampaignById(campaignId);
    }
  }, [campaignId, getCampaignById]);


  React.useEffect(() => {
    getCampaignById(campaignId);
    const screenWidth = window.innerWidth;
    const leftRightWidth = 0.25 * screenWidth;
    const middleWidth = 0.4 * screenWidth;
    console.log('line 47', page, splashScreenLayout);
    if (!editorContainerRef.current) return;
    const editor = (window.editor = DivProEditor.init({
      renderTo: editorContainerRef.current,
      locale: 'en',
      rootConfigurable: true,
      card: {
        json: (page === 'splash_screen' ? splashScreenLayout : landingScreenLayout)
      },
      theme: 'dark',
      layout: [
        {
          items: ['new-component', 'component-tree'],
          minWidth: leftRightWidth,
        },
        {
          items: ['preview'],
          weight: 5,
          minWidth: leftRightWidth,
        },
        {
          items: ['component-props:code'],
          minWidth: leftRightWidth,
        },
      ],
      actionLogUrlVariable: 'on_click_log_url',
      paletteEnabled: true,
      cardLocales: [
        {
          id: 'ru',
          text: {
            ru: 'RU',
            en: 'RU',
          },
        },
        {
          id: 'en',
          text: {
            ru: 'EN',
            en: 'EN',
          },
        },
      ],
      sources: [
        {
          key: 'test',
          url: 'https://ya.ru/api',
          example: {
            logged: 1,
            login: 'Vasya',
            mailCount: 123,
          },
        },
      ],
      customActions: [
        {
          baseUrl: 'div-screen://close',
          text: {
            ru: 'Закрыть',
            en: 'Close',
          },
        },
        {
          baseUrl: 'div-screen://open',
          text: {
            ru: 'Открыть',
            en: 'Open',
          },
          args: [
            {
              type: 'string',
              name: 'id',
              text: {
                ru: 'ID',
                en: 'ID',
              },
            },
          ],
        },
        {
          baseUrl: 'div-screen://next_slide',
          text: {
            ru: 'Следующий',
            en: 'Next',
          },
        },
      ],
      // readOnly: true,
      api: {
        getTranslationKey(key) {
          return new Promise(resolve => {
            setTimeout(() => {
              if (key in langAuto.ru) {
                const res: Record<string, string> = {};

                res.ru = String(langAuto.ru[key as keyof typeof langAuto.ru]);
                res.en = String(langAuto.en[key as keyof typeof langAuto.en]);

                resolve(res);
              } else {
                resolve(undefined);
              }
            }, Math.random() * 500);
          });
        },
        getTranslationSuggest(query, locale) {
          return new Promise(resolve => {
            setTimeout(() => {
              const obj = langAuto[locale as keyof typeof langAuto];
              const folders = [
                ...new Set(
                  Object.keys(obj)
                    .filter(key => key.includes('.'))
                    .map(key => key.split('.')[0] + '.')
                ),
              ];

              resolve(
                folders
                  .concat(Object.keys(obj))
                  .filter(
                    key =>
                      key.startsWith(query) &&
                      !(query.endsWith('.') && key === query)
                  )
                  .map(key => {
                    return {
                      key,
                      text: String(obj[key as keyof typeof obj]),
                    };
                  })
              );
            }, Math.random() * 500);
          });
        },
      },
    }));
    console.log('editor', editor);
    setEditorData(editor);
    setEditorInstance(editor);
    return () => {
      // Clean up the editor if necessary
      if (editor && typeof editor.destroy === 'function') {
        editor.destroy();
      }
    };
  }, [splashScreenLayout, isSplashScreenAvailable]);

  React.useEffect(() => {
    if (editorInstance && (splashScreenLayout || landingScreenLayout)) {
      try {
        editorInstance.setValue({
          card: {
            json: page === 'splash_screen' ? splashScreenLayout : landingScreenLayout
          }
        });
      } catch (error) {
        console.error('Error updating editor content:', error);
      }
    }
  }, [editorInstance, splashScreenLayout, page]);

  React.useEffect(() => {
    window.editorData = jsonContent;
  }, [jsonContent]);

  const handleLogJSON = async () => {
    if (!editorInstance) {
      console.log('Editor not initialized');
      return;
    }

    try {
      const currentJSON = editorInstance.getValue();
      window.editorData = currentJSON;
      setJsonContent(currentJSON);
      if (page === 'splash_screen' && isSplashScreenAvailable) {
        // Execute code if page is 'splash_screen' and splash screen is available
        await updateLayout(splashScreenId, currentJSON, page, campaignId);
      } else if (page !== 'splash_screen' && isLandingScreenAvailable) {
        console.log('Landing screen update');

        // Execute code if page is not 'splash_screen' and landing screen is available
        await updateLayout(landingScreenId, currentJSON, page, campaignId);
      } else {
        // Post layout data if the respective screen is not available
        await postLayoutData(currentJSON);
      }
    } catch (error) {
      console.error('Error handling JSON:', error);
    }
  };

  const postLayoutData = async jsonData => {
 
    if (!token) {
      alert('Token or Id not available, please add valid details to continue');
      navigate('/');
      return;
    }
    const channel = localStorage.getItem('channel');
    try {
      const response = await fetch(
        `https://pre.xplore.xircular.io/api/v1/layout/create/${campaignId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
            session: channel
          },
          body: JSON.stringify({
            name: page,
            layoutJSON: JSON.parse(jsonData)
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      alert('Layout saved successfully!');
      if (page === 'splash_screen') {
        navigate(`/editor/${campaignId}/landing_screen`)
      }
      else {
        navigate(`/publish/${campaignId}`)
      }
    } catch (error) {
      console.error('Error posting layout data:', error);
      alert('Failed to publish layout. Please try again.');
    }
  };

  const handleSave = () => {
    const currentJSON = editorInstance.getValue();
    window.editorData = currentJSON;
    setJsonContent(currentJSON);
    const layout = {
      name: page,
      layoutJSON: JSON.parse(currentJSON)
    }
    if (page === 'splash_screen') {
      localStorage.setItem('splash_screen_layout', JSON.stringify(layout))
    }
    else {
      localStorage.setItem('landing_screen_layout', JSON.stringify(layout))
    }
  }



  return (
    <div ref={editorContainerRef} style={{ maxWidth: '100vw', height: '100vh', boxSizing: 'border-box', paddding: '20px' }}>
      {/* The editor will be rendered here */}
      <div>
        {/* <button
          className={styles.publishBtn}
          onClick={handleLogJSON}
        >
          {isSplashScreenAvailable ? 'Update' : 'Publish' }
        </button> */}
        <button
          className={styles.saveBtn}
          onClick={handleLogJSON}
        >
          {/* <img src={saveIcon} alt="" /> */}
          <IoIosSave />
          Save

        </button>

        {/* <PreviewCard jsonData={solidBackgroundJSON} /> */}

        {/* <MobilePreview jsonData={JSON.parse(imageBackgroundJSON)} /> */}
      </div>
    </div>
  );
};

window.convertDictToPalette = convertDictToPalette;
window.convertPaletteToDict = convertPaletteToDict;

window.addTemplatesSuffix = addTemplatesSuffix;
window.removeTemplatesSuffix = removeTemplatesSuffix;

export default EditorPage;
