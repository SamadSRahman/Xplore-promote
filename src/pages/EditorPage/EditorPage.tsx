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


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosAdd, IoIosSave } from 'react-icons/io';
import styles from './EditorPage.module.css';
import { MdPublish } from "react-icons/md";

import {
  addTemplatesSuffix,
  convertDictToPalette,
  convertPaletteToDict,
  DivProEditor,
  removeTemplatesSuffix,
} from '../../lib'; // Adjust this import path as needed
import PreviewCard from '../../lib/components/PreviewCard/PreviewCard';
import MobilePreview from '../../lib/components/MobilePreview/MobilePreview';
import { blankBackgroundJSON, gradientBackgroundJSON, imageBackgroundJSON, quizJSON, solidBackgroundJSON } from '../../lib/utils/splashScreenData';
import useApi from '../../lib/utils/useApi';
import useCampaign from '../../lib/utils/useCampaign'
import saveIcon from '../../assets/save-icon.svg'
import useLayout from '../../lib/utils/useLayout';
import ReactHeader from '../../lib/components/ReactHeader';
import QuizStyleInputPopup from '../../components/QuizStyleInputPopup';
import { FaHandMiddleFinger } from 'react-icons/fa';

const EditorPage = () => {
  const { splashScreenLayout, isLandingScreenAvailable,
    isSplashScreenAvailable, splashScreenId, landingScreenId, landingScreenLayout } = useApi();
  const { type, campaignId, page } = useParams();
  const { getCampaignById, currentLayout, layoutId, screens } = useCampaign();
  const { updateLayout, createLayout } = useLayout();
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [editorData, setEditorData] = React.useState(null);
  const [editorKey, setEditorKey] = React.useState(0);
  const [jsonContent, setJsonContent] = React.useState(null);
  const [editorInstance, setEditorInstance] = React.useState(null);
  const editorContainerRef = React.useRef(null);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);


  React.useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert("Please login to access your campaigns")
      navigate('/')
    }
    if (campaignId) {
      getCampaignById(campaignId, page);
      if (page === "quiz_screen") {
        handleAddQuestion();
      }
    }
  }, [campaignId, page]);


  React.useEffect(() => {
    const screenWidth = window.innerWidth;
    const leftRightWidth = 0.25 * screenWidth;
    const middleWidth = 0.4 * screenWidth;
    if (!editorContainerRef.current) return;
    const editor = (window.editor = DivProEditor.init({
      renderTo: editorContainerRef.current,
      locale: 'en',
      rootConfigurable: true,
      card: {
        json: currentLayout,

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
        onChange: (newJson) => handleQuiz(newJson),
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
  }, [currentLayout, page]);

  async function handleQuiz(json) {
    const jsonData = JSON.parse(json);
    const quizComponent = jsonData?.card?.states[0]?.div?.items?.find(ele => ele.type === "_quiz");
    if (screens.find(ele => ele.path === "quiz_screen") === undefined) {
      try {
        // await handleLogJSON();
        // await createLayout(JSON.stringify(quizJSON), campaignId, "quiz_screen");
        // refreshScreenNames();
        // navigate(`/editor/${campaignId}/quiz_screen`);
      } catch (error) {
        console.error('Error handling quiz:', error);
      }
    }
  }
  React.useEffect(() => {
    try {
      const currentJSON = editorInstance.getValue();
      console.log('currentJSON', currentJSON);
    } catch (error) {
      console.error('Error getting editor value:', error);
    }
  }, [editorInstance, jsonContent]);

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
      console.log("line 243", layoutId);

      await updateLayout(layoutId, currentJSON, page, campaignId);
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
    // 
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

  function refreshScreenNames() {
    getCampaignById(campaignId, page)
  }
  const handleQuizSubmit = (quizData: QuizQuestion) => {
    const currentJson = JSON.parse(editorInstance.getValue());
    
    // Create quiz component structure
    const quizComponent = {
      type: "container",
      margins: { top: 20 },
      items: [
        {
          type: "container",
          items: [
            {
              type: "text",
              text: `Question ${quizData.questionNumber}: ${quizData.question}`,
              font_size: 22,
              font_weight: "bold",
              margin: { bottom: 16, top:20 },
              text_alignment_horizontal: "center"
            }
          ],
          orientation: "overlap"
        },
        {
          type: "gallery",
          width: { type: "match_parent" },
          height: { type: "fixed", value: 61 },
          alignment_horizontal: "left",
          alignment_vertical: "top",
          margins: { top: 47, right: 7, left: 7 },
          items: quizData.answers.map((answer, index) => ({
            type: "_template_button",
            text: answer,
            margin: { bottom: 8 },
            actions: [
              {
                question: quizData.question,
                options: quizData.answers,
                selected: answer,
                correct: quizData.answers[quizData.correctAnswer],
                log_id: `answer_${index}`,
                url: `quiz://answer?selected=${index}&correct=${quizData.correctAnswer}`
              }
            ],
            paddings: {
              top: 12,
              right: 15,
              bottom: 12,
              left: 15
            },
            text_alignment_horizontal: "center"
          })),
          cross_content_alignment: "center",
          item_spacing: 20,
          orientation: "horizontal",
          background: [
            {
              type: "solid",
              color: "#edc7c7"
            }
          ]
        }
      ]
    };

    // Get the current items or initialize empty array
    const currentItems = currentJson.card.states[0].div.items || [];
    
    // Update the div structure with the new quiz component
    currentJson.card.states[0].div = {
      ...currentJson.card.states[0].div,
      items: [...currentItems, quizComponent]
    };

    // Update the card

    updateLayout(layoutId, JSON.stringify(currentJson), page, campaignId);
    getCampaignById(campaignId, page);
  
    const card = editorInstance.getCard();
    if (card) {
      card.json = currentJson;
    }
  };

  const handleAddQuestion = () => {
    // setQuestionCount(prev => prev + 1);
    // setShowQuizPopup(true);
  };

  return (
    <div ref={editorContainerRef} style={{ maxWidth: '100vw', height: '100vh', boxSizing: 'border-box', paddding: '20px' }}>
      <ReactHeader  layoutId={layoutId} screens={screens} refreshScreenNames={refreshScreenNames} />
      <div>
        {showQuizPopup && (
          <QuizStyleInputPopup
            questionNumber={questionCount}
            onSubmit={handleQuizSubmit}
            onClose={() => setShowQuizPopup(false)}
          />
        )}
        <button
          className={styles.saveBtn}
          onClick={handleLogJSON}
        >
          <IoIosSave />
          Save
        </button>
        {/* <button
          className={styles.addQuestionBtn}
          onClick={handleAddQuestion}
        >
          <IoIosAdd />
          Add Question
        </button> */}
        <button className={styles.finishBtn}
          onClick={() => navigate(`/publish/${campaignId}`)}
        >
          <MdPublish />
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
