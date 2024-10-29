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



const EditorPage = () => {
  const { type } = useParams();
  const id = localStorage.getItem('adId');
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [jsonContent, setJsonContent] = React.useState(null);
  const [editorData, setEditorData] = React.useState(null);
  React.useEffect(() => {
    const editor = (window.editor = DivProEditor.init({
      renderTo: document.getElementById('editor-container') as HTMLElement,
      locale: 'en',
      rootConfigurable: true,
      card: {
        json: JSON.stringify(type === 'gradient' ? gradientBackgroundJSON : type === 'solid' ? solidBackgroundJSON : type === 'image' ? imageBackgroundJSON : blankBackgroundJSON),
        // "meta": {
        //     "tanker": {
        //         "props.lottie_url": {
        //             "ru": "Анимация",
        //             "en": "Animation"
        //         }
        //     }
        // }
      },
      theme: 'dark',
      layout: [
        {
          items: ['new-component', 'component-tree'],
          minWidth: 360,
        },
        {
          items: ['preview'],
          weight: 5,
          minWidth: 460,
        },
        {
          items: ['component-props:code'],
          minWidth: 375,
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
    return () => {
      // Clean up the editor if necessary
    };
  }, []);
  React.useEffect(() => {
    window.editorData = jsonContent;
  }, [jsonContent]);

  const handleLogJSON = () => {
    if (editorData) {
      console.log('line 294', editorData);
      const currentJSON = editorData.getValue();
      window.editorData = currentJSON;
      setJsonContent(currentJSON);
      postLayoutData(currentJSON);
      console.log('Current JSON:', currentJSON);
    } else {
      console.log('Editor not initialized');
    }
  };

  const postLayoutData = async jsonData => {
    if (!token || !id) {
      alert('Token or Id not available, please add valid details to continue');
      navigate('/');
    }
    const url = `https://pre.xplore.xircular.io/api/v1/layout/create/${id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          authorization: `${token}`, // Include the authorization token
        },
        body: JSON.stringify({ // Stringify the body content
          name: 'Splash Screen',
          layoutJSON: JSON.parse(jsonData) // Pass the JSON object here
        }),
      });
  
      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); // Parse the JSON response
      console.log('Response:', data); // Log the response data
      alert('Layout published successfully!');
    } catch (error) {
      console.error('Error posting layout data:', error); // Log any errors
    }
  };



  return (
    <div id="editor-container" style={{ minWidth: '100%', height: '100vh' }}>
      {/* The editor will be rendered here */}
      <div div >
        <button
        className={styles.publishBtn}
          onClick={handleLogJSON}
 >
          Publish
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
