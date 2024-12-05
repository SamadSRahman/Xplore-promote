/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useId, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosSave, IoMdEye } from 'react-icons/io';
import styles from './Profile.module.css';
import { MdPublish } from "react-icons/md";

import {
  addTemplatesSuffix,
  convertDictToPalette,
  convertPaletteToDict,
  DivProEditor,
  removeTemplatesSuffix,
} from '../../lib'; // Adjust this import path as needed

import useProfile from '../../lib/utils/useProfile';
import ReactHeader from '../../lib/components/ReactHeader';

import PreviewScreen from '../../components/PreviewScreen';
import QrPopup from '../../lib/components/QrPopup/QrPopup';

const ProfileDesign = () => {
  const { campaignId, page, userId } = useParams();
  const {getProfileLayout, profileLayout, updateProfileLayout} = useProfile()
  const navigate = useNavigate();
  const [jsonContent, setJsonContent] = React.useState(null);
  const [editorInstance, setEditorInstance] = React.useState(null);
  const editorContainerRef = React.useRef(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false)


  React.useEffect(() => {
    console.log("userId", userId);
    
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert("Please login to design your profile")
      navigate('/')
    }
    if(userId){
      console.log(userId);
      
      getProfileLayout(userId)
    }
  }, [campaignId, page]);


  React.useEffect(() => {
    const screenWidth = window.innerWidth;
    const leftRightWidth = 0.25 * screenWidth;
    // const middleWidth = 0.4 * screenWidth;
    if (!editorContainerRef.current) return;
    const editor = (window.editor = DivProEditor.init({
      renderTo: editorContainerRef.current,
      locale: 'en',
      rootConfigurable: true,
      card: {
        json:profileLayout,

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
          items: ['component-props:code', 'custom-variables'],
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
            console.log("key", key, resolve);
          });
        },
        getTranslationSuggest(query) {
          return new Promise(resolve => {
            setTimeout(() => {
              const obj = {};
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
    setEditorInstance(editor);
    return () => {
      // Clean up the editor if necessary
      if (editor && typeof editor.destroy === 'function') {
        editor.destroy();
      }
    };
  }, [profileLayout]);





  const handleLogJSON = async () => {
    if (!editorInstance) {
      console.log('Editor not initialized');
      return;
    }

    try {
      const currentJSON = editorInstance.getValue();
      setJsonContent(currentJSON);
      updateProfileLayout(currentJSON);
    
    } catch (error) {
      console.error('Error handling JSON:', error);
    }
  };


 


  return (
    <div ref={editorContainerRef} style={{ maxWidth: '100vw', height: '100vh', boxSizing: 'border-box',  }}>
   {isPopupVisible &&    <QrPopup type={"profile"} campaignId={userId} onClose={()=>setIsPopupVisible(false)} campaignName={JSON.parse(localStorage.getItem(("user")))?.name} />}
      <ReactHeader screens={[]} />
      <div>
        <div className="flex gap-2 absolute bottom-4 right-4">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className={styles.addQuestionBtn}
          >
            <IoMdEye /> Preview
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleLogJSON}
          >
            <IoIosSave />
            Save
          </button>
        </div>
        <button className={styles.finishBtn}
          onClick={() =>setIsPopupVisible(pre=>!pre)}
        >
          <MdPublish />
          Publish
        </button>
      </div>

      <PreviewScreen
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        jsonData={editorInstance?.getValue()}
      />
    </div>
  );
};

window.convertDictToPalette = convertDictToPalette;
window.convertPaletteToDict = convertPaletteToDict;

window.addTemplatesSuffix = addTemplatesSuffix;
window.removeTemplatesSuffix = removeTemplatesSuffix;

export default ProfileDesign;
