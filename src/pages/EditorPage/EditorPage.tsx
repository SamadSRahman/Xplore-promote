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
import { useNavigate } from 'react-router-dom';
import styles from './EditorPage.module.css';
import {
  addTemplatesSuffix,
  convertDictToPalette,
  convertPaletteToDict,
  DivProEditor,
  removeTemplatesSuffix,
} from '../../lib'; // Adjust this import path as needed



const EditorPage = () => {
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
        json: JSON.stringify({
          card: {
            log_id: 'div2_sample_card',
            states: [
              {
                state_id: 0,
                div: {
                  items: [],
                  visibility_action: {
                    log_id: 'visible',
                  },
                  background: [
                    {
                      color:
                        "@{getDictOptColor('#00ffffff', local_palette, 'bg_primary', theme)}",
                      type: 'solid',
                    },
                  ],
                  height: {
                    type: 'match_parent',
                  },
                  orientation: 'overlap',
                  type: 'container',
                },
              },
            ],
            variables: [
              {
                type: 'dict',
                name: 'local_palette',
                value: {
                  bg_primary: {
                    name: 'Primary background',
                    light: '#fff',
                    dark: '#000',
                  },
                  color0: {
                    name: 'Secondary background',
                    light: '#eeeeee',
                    dark: '#000',
                  },
                },
              },
              {
                type: 'string',
                name: 'tanker_props_lottie_url',
                value: '#{tanker/props.lottie_url}',
              },
              {
                type: 'dict',
                name: 'test',
                value: {
                  logged: 1,
                  login: 'Vasya',
                  mailCount: 123,
                },
              },
            ],
          },
          templates: {
            _template_lottie: {
              type: 'gif',
              scale: 'fit',
              extensions: [
                {
                  id: 'lottie',
                  $params: 'lottie_params',
                },
              ],
              gif_url: 'https://yastatic.net/s3/home/divkit/empty2.png',
            },
            _template_button: {
              type: 'text',
              text_alignment_horizontal: 'center',
              text_alignment_vertical: 'center',
              border: {
                $corner_radius: 'corners',
              },
              paddings: {
                bottom: 24,
                left: 28,
                right: 28,
                top: 22,
              },
              width: {
                type: 'wrap_content',
              },
            },
            _template_close: {
              accessibility: {
                description: 'Закрыть',
                mode: 'merge',
                type: 'button',
              },
              actions: [
                {
                  log_id: 'close_popup',
                  url: 'div-screen://close',
                },
              ],
              image_url:
                'https://yastatic.net/s3/home/div/div_fullscreens/cross2.3.png',
              tint_color: '#73000000',
              type: 'image',
            },
          },
        }),
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
          items: ['tanker-overview'],
          items: ['sources-overview'],
          items: ['custom-variables'],
          items: ['timers'],
          items: ['new-component', 'component-tree'],
          minWidth: 420,
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
    const url = `https://xplore-promote.vercel.app/api/v1/layout/create/${id}`;
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
      </div>
    </div>
  );
};

window.convertDictToPalette = convertDictToPalette;
window.convertPaletteToDict = convertPaletteToDict;

window.addTemplatesSuffix = addTemplatesSuffix;
window.removeTemplatesSuffix = removeTemplatesSuffix;

export default EditorPage;
