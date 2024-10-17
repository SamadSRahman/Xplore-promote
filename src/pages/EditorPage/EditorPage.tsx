/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import {
  addTemplatesSuffix,
  convertDictToPalette,
  convertPaletteToDict,
  DivProEditor,
  removeTemplatesSuffix,
} from '../../lib'; // Adjust this import path as needed

const EditorPage = () => {
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
                  items: [
                
                 
                  ],
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
          // items: ['tanker-overview'],
          // items: ['sources-overview'],
          // items: ['custom-variables'],
          // items: ['timers'],
          items: ['new-component', 'component-tree', 'palette', 'timers'],
          minWidth: 400,
        },
        {
          items: ['preview'],
          weight: 3,
        },
        {
          items: ['component-props:code'],
          minWidth: 360,
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
          return new Promise((resolve) => {
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
          return new Promise((resolve) => {
            setTimeout(() => {
              const obj = langAuto[locale as keyof typeof langAuto];
              const folders = [
                ...new Set(
                  Object.keys(obj)
                    .filter((key) => key.includes('.'))
                    .map((key) => key.split('.')[0] + '.')
                ),
              ];

              resolve(
                folders
                  .concat(Object.keys(obj))
                  .filter(
                    (key) =>
                      key.startsWith(query) &&
                      !(query.endsWith('.') && key === query)
                  )
                  .map((key) => {
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
    return () => {
      // Clean up the editor if necessary
    };
  }, []);

  return (
    <div id="editor-container" style={{ minWidth: '100%', height: '100vh' }}>
      {/* The editor will be rendered here */}
      <span>Splash screen</span>
    </div>
  );
};

window.convertDictToPalette = convertDictToPalette;
window.convertPaletteToDict = convertPaletteToDict;

window.addTemplatesSuffix = addTemplatesSuffix;
window.removeTemplatesSuffix = removeTemplatesSuffix;

export default EditorPage;
