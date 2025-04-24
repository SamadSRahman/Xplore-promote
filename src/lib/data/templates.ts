/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
/* eslint-disable indent */
import lottieIcon from "../../assets/components/lottie.svg?url";
import buttonIcon from "../../assets/components/button.svg?url";
import closeIcon from "../../assets/components/close.svg?url";
import ThreeSixtyIcon from "../../assets/components/360View.svg?url";
import backIcon from "../../assets/components/back-button.svg";
import chatbotIcon from "../../assets/components/chatbot-icon.svg";
import checkboxIcon from "../../assets/components/checkbox-icon.svg";
import inputIcon from "../../assets/components/input-icon.svg";
import whatsAppIcon from "../../assets/whatsapp-icon.svg";
import otpIcon from "../../assets/otp-icon.svg";
import productIcon from "../../assets/product.svg?url";

import listIcon from "../../assets/list.svg.svg";
import { COMPONENT_PROPS, type ComponentProperty } from "./componentProps";
import useProducts from "../utils/useProducts";

interface TemplateDescription {
  nameKey: string;
  description?: Record<string, string>;
  visible?: boolean;
  inShortList?: boolean;
  inlineTextEditorProp?: string;
  icon: string;
  props: ComponentProperty[];
  newNode: object;
  template: Record<string, unknown>;
  baseType?: string | undefined;
}

// Example of Action (can be further expanded as per your needs)

const { getAllProducts } = useProducts();

const products = (await getAllProducts()) || [];
console.log("products 41", products);

export const namedTemplates: Record<string, TemplateDescription> = {
  _template_lottie: {
    nameKey: "templates.lottie",
    visible: true,
    inShortList: true,
    icon: lottieIcon,
    description: { en: "Customizable gallery component" },
    props: [
      {
        type: "group",
        title: "lottieProps.title",
        list: [
          {
            name: "props.image_scale",
            prop: "scale",
            type: "select",
            default: "fill",
            options: [
              {
                name: "props.scale_fit",
                value: "fit",
              },
              {
                name: "props.scale_fill",
                value: "fill",
              },
              {
                name: "props.scale_no_scale",
                value: "no_scale",
              },
              {
                name: "props.scale_stretch",
                value: "stretch",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.lottie_url",
            prop: "lottie_params.lottie_url",
            type: "file",
            subtype: "lottie",
            enableSources: true,
          },
          {
            name: "props.repeat_count",
            prop: "lottie_params.repeat_count",
            type: "number",
            min: -1,
            enableSources: true,
          },
        ],
      },
    ],
    newNode: {
      type: "_template_lottie",
      width: {
        type: "wrap_content",
        constrained: true,
      },
      alignment_horizontal: "center",
      alignment_vertical: "center",
      lottie_params: {
        lottie_url: "https://yastatic.net/s3/home/divkit/empty2.png",
      },
    },
    template: {
      type: "gif",
      scale: "fit",
      extensions: [
        {
          id: "lottie",
          $params: "lottie_url",
        },
      ],
      gif_url: "https://yastatic.net/s3/home/divkit/empty2.png",
    },
  },
  _quiz: {
    nameKey: "templates.quiz",
    visible: true,
    inShortList: false,
    icon: listIcon,
    description: { en: "Quiz component" },
    props: [
      {
        type: "group",
        title: " ",
        list: [
          {
            name: "props.button_text",
            prop: "button_text",
            type: "string",
            enableTanker: true,
            enableSources: true,
            default: "Start quiz",
          },
          {
            type: "split",
            list: [
              {
                name: "props.font_size",
                prop: "font_size",
                type: "integer",
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: "props.line_height",
                prop: "line_height",
                type: "integer",
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: "props.font_weight",
            prop: "font_weight",
            type: "select",
            options: [
              {
                name: "props.font_weight_light",
                value: "light",
              },
              {
                name: "props.font_weight_normal",
                value: "regular",
              },
              {
                name: "props.font_weight_medium",
                value: "medium",
              },
              {
                name: "props.font_weight_bold",
                value: "bold",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.text_color",
            prop: "text_color",
            type: "color",
            enableSources: true,
          },
          {
            name: "props.corners",
            prop: "corners",
            type: "integer",
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      text: "Click me!",
      background: [
        {
          type: "solid",
          color: "#000",
        },
      ],
      text_color: "#fff",
      corners: 8,
      actions: [
        {
          log_id: "action_id",
          url: "div-screen://open?id=quiz_screen",
          log_url: "@{on_click_log_url}",
        },
      ],
    },
    template: {
      type: "container",
      width: { type: "match_parent" },
      height: { type: "wrap_content" },
      items: [
        {
          type: "_template_button",
          width: { type: "wrap_content" },
          height: { type: "wrap_content" },
          text_color: "#ffffff",
          background_color: "#4CAF50",
          font_size: 16,
          text: "Start quiz",
          padding: {
            left: 16,
            right: 16,
            top: 8,
            bottom: 8,
          },
          border_radius: 4,
        },
      ],
      alignment_horizontal: "center",
      alignment_vertical: "center",
    },
  },
  _template_button: {
    nameKey: "templates.button",
    visible: true,
    inShortList: true,
    inlineTextEditorProp: "text",
    icon: buttonIcon,
    props: [
      {
        type: "group",
        title: " ",
        list: [
          {
            name: "props.text",
            prop: "text",
            type: "string",
            enableTanker: true,
            enableSources: true,
            // zero-width space
            default: "​",
          },
          {
            type: "split",
            list: [
              {
                name: "props.font_size",
                prop: "font_size",
                type: "integer",
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: "props.line_height",
                prop: "line_height",
                type: "integer",
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: "props.font_weight",
            prop: "font_weight",
            type: "select",
            options: [
              {
                name: "props.font_weight_light",
                value: "light",
              },
              {
                name: "props.font_weight_normal",
                value: "regular",
              },
              {
                name: "props.font_weight_medium",
                value: "medium",
              },
              {
                name: "props.font_weight_bold",
                value: "bold",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.text_color",
            prop: "text_color",
            type: "color",
            enableSources: true,
          },
          {
            name: "props.corners",
            prop: "corners",
            type: "integer",
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      text: "Click me!",
      background: [
        {
          type: "solid",
          color: "#000",
        },
      ],
      text_color: "#fff",
      corners: 8,
    },
    template: {
      type: "text",

      border: { $corner_radius: "corners" },
      paddings: {
        bottom: 15,
        left: 22,
        right: 22,
        top: 15,
      },
      width: { type: "wrap_content" },
    },
  },

  _template_input: {
    nameKey: "templates.input",
    visible: true,
    inShortList: true,
    icon: inputIcon,
    props: [
      {
        type: "group",
        title: "Input Field",
        list: [
          {
            name: "props.hint_text",
            prop: "hint_text",
            type: "string",
            enableTanker: true,
            enableSources: true,
            default: "Enter text here",
          },
          {
            type: "split",
            list: [
              {
                name: "props.font_size",
                prop: "font_size",
                type: "integer",
                min: 1,
                max: 1000,
                default: 16,
                enableSources: true,
              },
              {
                name: "props.line_height",
                prop: "line_height",
                type: "integer",
                min: 0,
                max: 1000,
                default: 22,
                enableSources: true,
              },
            ],
          },
          {
            name: "props.font_weight",
            prop: "font_weight",
            type: "select",
            default: "medium",
            options: [
              {
                name: "props.font_weight_light",
                value: "light",
              },
              {
                name: "props.font_weight_normal",
                value: "regular",
              },
              {
                name: "props.font_weight_medium",
                value: "medium",
              },
              {
                name: "props.font_weight_bold",
                value: "bold",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.text_color",
            prop: "text_color",
            type: "color",
            default: "#000000",
            enableSources: true,
          },
          {
            name: "props.corners",
            prop: "corners",
            type: "integer",
            min: 0,
            max: 100,
            default: 8,
            enableSources: true,
          },
          {
            name: "props.keyboard_type",
            prop: "keyboard_type",
            type: "select",
            default: {
              name: "props.single_line_text",
              value: "single_line_text",
            },
            options: [
              {
                name: "props.single_line_text",
                value: "single_line_text",
              },
              {
                name: "props.multi_line_text",
                value: "multi_line_text",
              },
              {
                name: "props.phone",
                value: "phone",
              },
              {
                name: "props.number",
                value: "number",
              },
              {
                name: "props.email",
                value: "email",
              },
              {
                name: "props.uri",
                value: "uri",
              },
              {
                name: "props.password",
                value: "password",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.text_variable",
            prop: "text_variable",
            type: "select",
            options: [],
            enableSources: true,
            default: "Inter",
          },
        ],
      },
    ],
    newNode: {
      hint_text: "Enter text here",
      text_variable: "input_text",
      width: {
        type: "fixed",
        value: 200,
      },
      font_size: 16,
      font_weight: "medium",
      text_color: "#000000",
      hint_color: "#888888",
      corners: 8,
      accessibility: {
        description: "Input field",
      },
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
    },
    template: {
      type: "input",
      text_variable: "input_text",
      width: { type: "match_parent" },
      height: { type: "wrap_content" },
      text_alignment_horizontal: "left",
      text_alignment_vertical: "center",
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
      },
      keyboard_type: "default",
      max_length: 100,
    },
  },
  _template_close: {
    nameKey: "templates.close",
    visible: true,
    inShortList: true,
    icon: closeIcon,
    props: [
      {
        type: "group",
        title: "closeProps.title",
        list: [
          {
            name: "color",
            prop: "tint_color",
            type: "color",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      alignment_horizontal: "right",
      height: { type: "fixed", value: 28 },
      margins: { top: 20, right: 24 },
      width: { type: "fixed", value: 28 },
    },
    template: {
      accessibility: {
        description: "Закрыть",
        mode: "merge",
        type: "button",
      },
      actions: [
        {
          log_id: "close_popup",
          url: "div-screen://close",
        },
      ],
      image_url:
        "https://yastatic.net/s3/home/div/div_fullscreens/cross2.3.png",
      tint_color: "#73000000",
      type: "image",
      preload_required: true,
    },
  },

  _template_back: {
    nameKey: "templates.back",
    visible: true,
    inShortList: true,
    icon: backIcon,
    props: [
      {
        type: "group",
        title: "backProps.title",
        list: [
          {
            name: "color",
            prop: "tint_color",
            type: "color",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      alignment_horizontal: "left",
      height: { type: "fixed", value: 28 },
      margins: { top: 20, left: 24 },
      width: { type: "fixed", value: 28 },
      actions: [
        {
          log_id: "back_button",
          url: "xplore-promote://backBtn",
        },
      ],
    },
    template: {
      accessibility: {
        description: "Back",
        mode: "merge",
        type: "button",
      },
      actions: [
        {
          log_id: "back_button",
          url: "xplore-promote://backBtn",
        },
      ],
      image_url:
        "https://objectstore.e2enetworks.net/xplore/1732611449421-a4145e328273d3ae.png",
      tint_color: "#000",
      type: "image",
      preload_required: true,
    },
  },
  // _template_whatsappLogin: {
  //   nameKey: "templates.whatsappLogin",
  //   visible: true,
  //   inShortList: true,
  //   icon: whatsAppIcon,
  //   props: [
  //     {
  //       type: "group",
  //       title: " ",
  //       list: [
  //         {
  //           name: "props.text",
  //           prop: "text",
  //           type: "string",
  //           enableTanker: true,
  //           enableSources: true,
  //           // zero-width space
  //           default: "WhatsApp Login​",
  //         },
  //         {
  //           type: "split",
  //           list: [
  //             {
  //               name: "props.font_size",
  //               prop: "font_size",
  //               type: "integer",
  //               min: 1,
  //               max: 1000,
  //               enableSources: true,
  //             },
  //             {
  //               name: "props.line_height",
  //               prop: "line_height",
  //               type: "integer",
  //               min: 0,
  //               max: 1000,
  //               enableSources: true,
  //             },
  //           ],
  //         },
  //         {
  //           name: "props.font_weight",
  //           prop: "font_weight",
  //           type: "select",
  //           options: [
  //             {
  //               name: "props.font_weight_light",
  //               value: "light",
  //             },
  //             {
  //               name: "props.font_weight_normal",
  //               value: "regular",
  //             },
  //             {
  //               name: "props.font_weight_medium",
  //               value: "medium",
  //             },
  //             {
  //               name: "props.font_weight_bold",
  //               value: "bold",
  //             },
  //           ],
  //           default:"bold",
  //           enableSources: true,
  //         },
  //         {
  //           name: "props.text_color",
  //           prop: "text_color",
  //           type: "color",
  //           default:"#ffffff",
  //           enableSources: true,
  //         },
  //         {
  //           name: "props.corners",
  //           prop: "corners",
  //           type: "integer",
  //           min: 0,
  //           max: 100,
  //           enableSources: true,
  //         },
  //         {
  //           name: "props.actions",
  //           prop: "actions",
  //           type: "actions2",
  //         },
  //       ],
  //     },
  //     {
  //       type: "group",
  //       title: "image.title",
  //       list: [
  //         {
  //           name: "props.image_scale",
  //           prop: "scale",
  //           type: "select",
  //           default: "fill",
  //           options: [
  //             {
  //               name: "props.scale_fit",
  //               value: "fit",
  //             },
  //             {
  //               name: "props.scale_fill",
  //               value: "fill",
  //             },
  //             {
  //               name: "props.scale_no_scale",
  //               value: "no_scale",
  //             },
  //             {
  //               name: "props.scale_stretch",
  //               value: "stretch",
  //             },
  //           ],
  //           enableSources: true,
  //         },
  //         {
  //           name: "props.image_url",
  //           prop: "image_url",
  //           type: "file",
  //           subtype: "image",
  //           default:
  //             "https://xplore.objectstore.e2enetworks.net/1741067701029-d8cd29f273948d86.png",
  //           enableSources: true,
  //         },
  //         {
  //           name: "props.actions",
  //           prop: "actions",
  //           type: "actions2",
  //         },
  //       ],
  //     },
  //   ],
  //   newNode: {
  //     type: "container",
  //     width: {
  //       type: "fixed",
  //       value: 200,
  //     },
  //     height: {
  //       type: "fixed",
  //       value: 40,
  //     },
  //     alignment_horizontal: "center",
  //     alignment_vertical: "center",
  //     items: [
  //       {
  //         type: "image",
  //        $image_url:"image_url",
  //         width: {
  //           type: "fixed",
  //           value: 39,
  //         },
  //         height: {
  //           type: "fixed",
  //           value: 35,
  //         },
  //         preload_required: true,
  //         scale: "fit",
  //       },
  //       {
  //         type: "text",
  //         $text: "text",
  //         // width: {
  //         //   type: "fixed",
  //         //   value: 100,
  //         // },
  //         // font_weight: "bold",
  //         // text_color: "#ffffff",
  //         // margins: {
  //         //   left: 9,
  //         // },
  //       },
  //     ],
  //     orientation: "horizontal",
  //     content_alignment_horizontal: "left",
  //     content_alignment_vertical: "center",
  //     paddings: {
  //       right: 20,
  //       left: 20,
  //     },
  //     background: [
  //       {
  //         type: "solid",
  //         color: "#25d366",
  //       },
  //     ],
  //     border: {
  //       corner_radius: 5,
  //     },
  //   },

  //   template: {
  //     type:"container",
  //     accessibility: {
  //       description: "WhatsApp Login",
  //       mode: "merge",
  //       type: "button",
  //     },
  //     items:[
  //       {
  //         type: "image",
  //         $image_url:"image_url",
  //         width: {
  //           type: "fixed",
  //           value: 39,
  //         },
  //         height: {
  //           type: "fixed",
  //           value: 35,
  //         },
  //         preload_required: true,
  //         scale: "fit",
  //       },
  //       {
  //         type:"text",
  //         $text:"text",
  //         $font_weight: "font_weight",
  //         $text_color: "text_color",
  //         $font_size: "font_size",
  //         margins: {
  //           left: 9,
  //         },
  //       }
  //     ]
  //   },
  // },
  // _template_share: {
  //   nameKey: 'templates.share',
  //   visible: true,
  //   inShortList: true,
  //   icon: shareIcon,
  //   props: [
  //     {
  //       type: 'group',
  //       title: 'backProps.title',
  //       list: [
  //         {
  //           name: 'color',
  //           prop: 'tint_color',
  //           type: 'color',
  //           enableSources: true,
  //         },
  //         {
  //           name: 'props.actions',
  //           prop: 'actions',
  //           type: 'actions2',
  //         },
  //       ],
  //     },
  //   ],
  //   newNode: {
  //     alignment_horizontal: 'left',
  //     height: { type: 'fixed', value: 28 },
  //     margins: { top: 20, left: 24 },
  //     width: { type: 'fixed', value: 28 },
  //     actions: [
  //       {
  //         log_id: 'back_button',
  //         url: 'xplore-promote://backBtn',
  //       },
  //     ]
  //   },
  //   template: {
  //     accessibility: {
  //       description: 'Back',
  //       mode: 'merge',
  //       type: 'button',
  //     },
  //     actions: [
  //       {
  //         log_id: 'back_button',
  //         url: 'xplore-promote://backBtn',
  //       },
  //     ],
  //     image_url:
  //       'https://xplore.objectstore.e2enetworks.net/1734934115456-23b1079b81f2ae1b.png',
  //     tint_color: '#000',
  //     type: 'image',
  //     preload_required: true,
  //   },
  // },

  _template_360view: {
    nameKey: "templates.360view",
    visible: true,
    inShortList: true,
    icon: ThreeSixtyIcon,

    props: [
      {
        type: "group",
        title: "360viewProps.title",
        list: [
          {
            name: "props.custom_props",
            prop: "custom_props",
            type: "group",
            list: [
              {
                name: "props.productId",
                prop: "custom_props.productId",
                type: "string",
                enableSources: true,
              },
            ],
          },
        ],
      },
    ],
    template: {
      type: "custom",
      custom_type: "threesixty_card",
      width: { type: "match_parent" },
      height: { type: "fixed", value: 200 },

      items: [],
    },
    newNode: {
      productId: "",
      corners: 8,
      custom_props: {},
    },
  },
  _template_map: {
    nameKey: "templates.map",
    visible: true,
    inShortList: true,
    inlineTextEditorProp: "text",
    icon: buttonIcon, // You may want to create a specific map icon
    props: [
      {
        type: "group",
        title: "mapProps.title",
        list: [
          {
            name: "props.text",
            prop: "text",
            type: "string",
            enableTanker: true,
            enableSources: true,
            default: "View on Map",
          },
          {
            name: "props.latitude",
            prop: "latitude",
            type: "number",
            enableSources: true,
            default: 0,
          },
          {
            name: "props.longitude",
            prop: "longitude",
            type: "number",
            enableSources: true,
            default: 0,
          },
          {
            type: "split",
            list: [
              {
                name: "props.font_size",
                prop: "font_size",
                type: "integer",
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: "props.line_height",
                prop: "line_height",
                type: "integer",
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: "props.font_weight",
            prop: "font_weight",
            type: "select",
            options: [
              {
                name: "props.font_weight_light",
                value: "light",
              },
              {
                name: "props.font_weight_normal",
                value: "regular",
              },
              {
                name: "props.font_weight_medium",
                value: "medium",
              },
              {
                name: "props.font_weight_bold",
                value: "bold",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.text_color",
            prop: "text_color",
            type: "color",
            enableSources: true,
          },
          {
            name: "props.corners",
            prop: "corners",
            type: "integer",
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      text: "View on Map",
      latitude: 0,
      longitude: 0,
      background: [
        {
          type: "solid",
          color: "#000",
        },
      ],
      text_color: "#fff",
      corners: 8,
      actions: [
        {
          log_id: "open_map",
          url: "https://www.google.com/maps?q=0,0",
          _template_map: true,
        },
      ],
    },
    template: {
      type: "text",
      $latitude: "latitude", // Add this
      $longitude: "longitude",
      $text: "text",
      text_alignment_horizontal: "center",
      text_alignment_vertical: "center",
      border: { $corner_radius: "corners" },
      paddings: {
        bottom: 15,
        left: 22,
        right: 22,
        top: 15,
      },
      width: { type: "wrap_content" },
      $actions: [
        {
          log_id: "open_map",
          url: {
            type: "expression",
            value:
              "https://www.google.com/maps?q=" +
              "$latitude" +
              "," +
              "$longitude",
          },
          _template_map: true,
        },
      ],
    },
  },
  _template_contact_us: {
    nameKey: "templates.contact_us",
    visible: true,
    inShortList: true,
    inlineTextEditorProp: "text",
    icon: buttonIcon, // You may want to create a specific map icon
    props: [
      {
        type: "group",
        title: "contactUsProps.title",
        list: [
          {
            name: "props.text",
            prop: "text",
            type: "string",
            enableTanker: true,
            enableSources: true,
            default: "View on Map",
          },
          {
            type: "split",
            list: [
              {
                name: "props.font_size",
                prop: "font_size",
                type: "integer",
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: "props.line_height",
                prop: "line_height",
                type: "integer",
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: "props.font_weight",
            prop: "font_weight",
            type: "select",
            options: [
              {
                name: "props.font_weight_light",
                value: "light",
              },
              {
                name: "props.font_weight_normal",
                value: "regular",
              },
              {
                name: "props.font_weight_medium",
                value: "medium",
              },
              {
                name: "props.font_weight_bold",
                value: "bold",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.text_color",
            prop: "text_color",
            type: "color",
            enableSources: true,
          },
          {
            name: "props.corners",
            prop: "corners",
            type: "integer",
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      text: "Contact Us",
      background: [
        {
          type: "solid",
          color: "#000",
        },
      ],
      text_color: "#fff",
      corners: 8,
      actions: [
        {
          log_id: "contact_us",
          url: "xplore-promote://contact?screen_name=contact_us_screen",
        },
      ],
    },
    template: {
      type: "text",
      $latitude: "latitude", // Add this
      $longitude: "longitude",
      $text: "text",
      text_alignment_horizontal: "center",
      text_alignment_vertical: "center",
      border: { $corner_radius: "corners" },
      paddings: {
        bottom: 15,
        left: 22,
        right: 22,
        top: 15,
      },
      width: { type: "wrap_content" },
      $actions: [
        {
          log_id: "open_map",
          url: {
            type: "expression",
            value:
              "https://www.google.com/maps?q=" +
              "$latitude" +
              "," +
              "$longitude",
          },
          _template_map: true,
        },
      ],
    },
  },

  _template_native_signup: {
    nameKey: "templates.native_signup",
    visible: false,
    inShortList: false,
    icon: buttonIcon,
    description: { en: "Native authentication button (Google/Apple Sign In)" },
    props: [
      {
        type: "group",
        title: "authProps.title",
        list: [
          {
            name: "props.auth_type",
            prop: "auth_type",
            type: "select",
            options: [
              {
                name: "props.auth_type_all",
                value: "all",
              },
              {
                name: "props.auth_type_google",
                value: "google",
              },
              {
                name: "props.auth_type_apple",
                value: "apple",
              },
            ],
            default: "all",
            enableSources: true,
          },
          {
            name: "props.text",
            prop: "text",
            type: "string",
            default: "Sign in",
            enableSources: true,
          },
          {
            name: "props.background",
            prop: "background_color",
            type: "color",
            default: "#2C3E50",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      auth_type: "all",
      text: "Sign in",
      background_color: "#2C3E50",
      custom_props: {
        $text: "text",
        $background: "background",
        $auth_type: "auth_type",
      },
      actions: [
        {
          log_id: "native_auth",
          url: "xplorePromote://native-auth://authenticate",
        },
      ],
    },
    template: {
      type: "custom",
      custom_type: "native_auth",
      alignment_horizontal: "center",
      alignment_vertical: "center",
      custom_props: {
        $text: "text",
        $background: "background",
        $auth_type: "auth_type",
      },
      $actions: "actions",
    },
  },
  button_template: {
    nameKey: "templates.button",

    visible: true,
    inShortList: false,
    icon: buttonIcon,
    description: { en: "Button component" },
    props: [
      {
        type: "group",
        title: "buttonProps.title",
        list: [
          {
            name: "props.text",
            prop: "text",
            type: "string",
            default: "Button",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
          {
            name: "props.animation_action",
            prop: "animation_action",
            type: "select",
            options: [],
            default: "none",
            enableSources: true,
          },
        ],
      },
    ],
    newNode: {
      text: "Button",
      animation_action: "none",
      actions: [],
    },
    template: {
      type: "text",
      text_alignment_horizontal: "center",
      text_alignment_vertical: "center",
      border: {
        $corner_radius: "corners",
      },
      paddings: {
        bottom: 24,
        left: 28,
        right: 28,
        top: 22,
      },
      width: {
        type: "wrap_content",
      },
    },
  },
  whatsapp_button: {
    nameKey: "templates.whatsappLogin",

    visible: true,
    inShortList: true,
    icon: whatsAppIcon,
    description: { en: "Login via WhatsApp OTP" },
    props: [
      {
        name: "props.font_weight",
        prop: "font_weight",
        type: "select",
        default: "medium",
        options: [
          {
            name: "props.font_weight_light",
            value: "light",
          },
          {
            name: "props.font_weight_normal",
            value: "regular",
          },
          {
            name: "props.font_weight_medium",
            value: "medium",
          },
          {
            name: "props.font_weight_bold",
            value: "bold",
          },
        ],
        enableSources: true,
      },
      {
        type: "group",
        title: "buttonProps.title",
        list: [
          {
            name: "props.text",
            prop: "text",
            type: "string",
            default: "Button",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      text: "WhatsApp Login",
      animation_action: "none",
      background: [
        {
          type: "solid",
          color: "#25d366",
        },
      ],
      width: {
        type: "fixed",
        value: 150,
      },
      actions: [
        {
          log_id: "action_id",
          url: "xplore-promote://whatsappOtpIntegration/getOtp?phone=@{phone}&country_code=@{country_code}",
          function: "getOtp",
          log_url: "getOtp",
          otp: "@{otp_value}",
          phone: "@{phone}",
          country_code: "@{country_code}",
        },
      ],
      height: {
        type: "fixed",
        value: 40,
      },
      text_color: "#fff",
      font_weight: "bold",
      border: {
        corner_radius: "8",
      },
    },
    template: {
      $actions: "actions",
      type: "text",
      text_alignment_horizontal: "center",
      text_alignment_vertical: "center",
      border: {
        $corner_radius: "corners",
      },
      width: {
        type: "wrap_content",
      },
    },
  },
  sms_button: {
    nameKey: "templates.smsLogin",

    visible: true,
    inShortList: true,
    icon: otpIcon,
    description: { en: "Login via SMS OTP" },
    props: [
      {
        name: "props.font_weight",
        prop: "font_weight",
        type: "select",
        default: "medium",
        options: [
          {
            name: "props.font_weight_light",
            value: "light",
          },
          {
            name: "props.font_weight_normal",
            value: "regular",
          },
          {
            name: "props.font_weight_medium",
            value: "medium",
          },
          {
            name: "props.font_weight_bold",
            value: "bold",
          },
        ],
        enableSources: true,
      },
      {
        type: "group",
        title: "buttonProps.title",
        list: [
          {
            name: "props.text",
            prop: "text",
            type: "string",
            default: "Button",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      text: "Get OTP",
      animation_action: "none",
      actions: [
        {
          log_id: "action_id",
          url: "xplore-promote://smsIntegration/getOtp?provider=kaleyra&phone=@{phone}&country_code=@{country_code}",
          function: "getOtp",
          log_url: "getOtp",
          otp: "@{otp_value}",
          phone: "@{phone}",
          country_code: "@{country_code}",
        },
      ],
      background: [
        {
          type: "solid",
          color: "#39A6F5",
        },
      ],
      width: {
        type: "fixed",
        value: 150,
      },
      height: {
        type: "fixed",
        value: 40,
      },
      text_color: "#fff",
      font_weight: "bold",
      border: {
        corner_radius: "8",
      },
    },
    template: {
      $actions: "actions",
      type: "text",
      text_alignment_horizontal: "center",
      text_alignment_vertical: "center",
      border: {
        $corner_radius: "corners",
      },
      width: {
        type: "wrap_content",
      },
    },
  },

  _template_checkbox: {
    nameKey: "templates.checkbox",
    visible: true,
    inShortList: true,
    icon: checkboxIcon,
    description: { en: "Customizable checkbox component" },
    props: [
      {
        type: "group",
        title: "checkboxProps.title",
        list: [
          {
            name: "props.initial_state",
            prop: "initial_state",
            type: "select",
            default: "unchecked",
            options: [
              {
                name: "props.state_unchecked",
                value: "unchecked",
              },
              {
                name: "props.state_checked",
                value: "checked",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.size",
            prop: "size",
            type: "number",
            default: 24,
            min: 16,
            max: 48,
            enableSources: true,
          },
          {
            name: "props.label",
            prop: "label_text",
            type: "string",
            enableTanker: true,
            enableSources: true,
          },
          {
            name: "props.label_color",
            prop: "label_color",
            type: "color",
            enableSources: true,
          },
          {
            name: "props.font_size",
            prop: "font_size",
            type: "number",
            default: 14,
            enableSources: true,
          },
          {
            name: "props.checked_color",
            prop: "checked_color",
            type: "color",
            default: "#3F28C3",
            enableSources: true,
          },
          {
            name: "props.unchecked_color",
            prop: "unchecked_color",
            type: "color",
            default: "#FFFFFF",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
            sizeValue: "width",
          },
        ],
      },
    ],
    newNode: {
      type: "_template_checkbox",
      initial_state: "unchecked",
      size: 20,
      label_text: "Checkbox Label",
      label_color: "#000000",
      font_size: 14,
      checked_color: "#3F28C3",
      unchecked_color: "#FFFFFF",
      actions: [],
    },
    template: {
      type: "state",
      id: "checkbox_state",
      states: [
        {
          state_id: "unchecked",
          div: {
            type: "container",
            orientation: "horizontal",
            items: [
              {
                type: "container",
                width: { type: "fixed", $value: "size" },
                height: { type: "fixed", $value: "size" },
                border: {
                  corner_radius: 4,
                  stroke: {
                    color: "#CCCCCC",
                    width: 2,
                  },
                },
                background: [
                  {
                    type: "solid",
                    $color: "unchecked_color",
                  },
                ],
                actions: [
                  {
                    log_id: "update_checkbox_state",
                    url: "div-action://set_variable?name=isCheckboxChecked&value=true",
                  },
                  {
                    log_id: "toggle_checkbox",
                    url: "div-action://set_state?state_id=0/checkbox_state/checked",
                  },
                ],
              },
              {
                type: "text",
                $text: "label_text",
                $font_size: "font_size",
                $text_color: "label_color",
                margins: { left: 8 },
                width: { type: "match_parent" },
                // height: { type: 'wrap_content'
                // max_lines: 0,
                line_height: 1.5,
              },
            ],
          },
        },
        {
          state_id: "checked",
          div: {
            type: "container",
            orientation: "horizontal",
            items: [
              {
                type: "container",
                width: { type: "fixed", $value: "size" },
                height: { type: "fixed", $value: "size" },
                border: {
                  corner_radius: 4,
                  stroke: {
                    color: "#3F28C3",
                    width: 2,
                  },
                },
                background: [
                  {
                    type: "solid",
                    $color: "checked_color",
                  },
                ],
                items: [
                  {
                    type: "text",
                    text: "✓",
                    text_color: "#FFFFFF",
                    font_size: 16,
                    text_alignment_horizontal: "center",
                    text_alignment_vertical: "center",
                    width: { type: "match_parent" },
                    height: { type: "match_parent" },
                  },
                ],
                actions: [
                  {
                    log_id: "update_checkbox_state",
                    url: "div-action://set_variable?name=isCheckboxChecked&value=false",
                  },
                  {
                    log_id: "toggle_checkbox",
                    url: "div-action://set_state?state_id=0/checkbox_state/unchecked",
                  },
                ],
              },
              {
                type: "text",
                $text: "label_text",
                $font_size: "font_size",
                $text_color: "label_color",
                margins: { left: 8 },
                width: { type: "match_parent" },
                height: { type: "wrap_content" },
                max_lines: 0,
                line_height: 1.2,
              },
            ],
          },
        },
      ],
    },
  },
  _template_chatbot: {
    nameKey: "templates.chatbot",
    visible: true,
    inShortList: true,
    icon: chatbotIcon,
    description: { en: "Chatbot Component" },
    props: [
      {
        type: "group",
        title: "image.title",
        list: [
          {
            name: "props.image_scale",
            prop: "scale",
            type: "select",
            default: "fill",
            options: [
              {
                name: "props.scale_fit",
                value: "fit",
              },
              {
                name: "props.scale_fill",
                value: "fill",
              },
              {
                name: "props.scale_no_scale",
                value: "no_scale",
              },
              {
                name: "props.scale_stretch",
                value: "stretch",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.image_url",
            prop: "image_url",
            type: "file",
            subtype: "image",
            default:
              "https://xplore.objectstore.e2enetworks.net/1739858212180-fc3ddc3169e45e96.png",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
        ],
      },
    ],
    newNode: {
      image_url:
        "https://xplore.objectstore.e2enetworks.net/1739858212180-fc3ddc3169e45e96.png",
      width: {
        type: "fixed",
        value: 50,
      },
      height: {
        type: "fixed",
        value: 50,
      },
      background_color: "#5959e8",
      paddings: {
        right: 10,
        bottom: 10,
        left: 10,
        top: 10,
      },
      alignment_horizontal: "top",
      alignment_vertical: "right",
      actions: [
        {
          log_id: "open_chatbot",
          url: "xplore-promote://chatbot",
          _template_map: true,
        },
      ],
    },

    template: {
      type: "image",
      background: [
        {
          type: "solid",
          $color: "background_color",
        },
      ],
      $image_url: "image_url",
      preload_required: true,
      scale: "fit",

      border: {
        corner_radius: 50,
      },
      $alignment_horizontal: "alignment_horizontal",
      $alignment_vertical: "alignment_vertical",
      margins: {
        right: 20,
        bottom: 20,
      },
    },
  },
  _template_payment_gateway: {
    nameKey: "templates.paymentGateway",
    visible: true,
    inShortList: true,
    icon: chatbotIcon,
    description: { en: "Payment Component" },
    props: [
      {
        type: "group",
        title: "buttonProps.title",
        list: [
          {
            name: "props.text",
            prop: "text",
            type: "string",
            default: "Button",
            enableSources: true,
          },
          {
            name: "props.actions",
            prop: "actions",
            type: "actions2",
          },
          {
            name: "props.text_color",
            prop: "text_color",
            type: "color",
            default: "#fff",
            enableSources: true,
          },
        ],
      },
    ],
    newNode: {
      text: "Buy now",
      animation_action: "none",
      actions: [],
      text_color: "#ffffff",
      background: [
        {
          type: "solid",
          color: "#000",
        },
      ],
    },

    template: {
      type: "text",
      text_alignment_horizontal: "center",
      text_alignment_vertical: "center",
      border: {
        $corner_radius: "corners",
      },
      paddings: {
        bottom: 18,
        left: 18,
        right: 18,
        top: 18,
      },

      width: {
        type: "wrap_content",
      },
    },
  },
  _template_product_card: {
    nameKey: "templates.productCard",
    visible: false,
    inShortList: false,

    icon: productIcon,
    description: { en: "Product Card Component" },
    props: [
      {
        type: "group",
        title: "containerProps.title",
        list: [
          {
            name: "props.orientation",
            prop: "orientation",
            type: "select",
            default: "vertical",
            options: [
              {
                name: "props.orientation_horizontal",
                value: "horizontal",
              },
              {
                name: "props.orientation_vertical",
                value: "vertical",
              },
              {
                name: "props.orientation_overlap",
                value: "overlap",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.content_alignment",
            type: "alignment",
            horizontalProp: "content_alignment_horizontal",
            verticalProp: "content_alignment_vertical",
            orientationProp: "orientation",
            isContent: true,
          },
          {
            type: "group",
            title: "props.actions",
            list: [
              {
                name: "props.actions",
                prop: "actions",
                type: "actions2",
              },
            ],
          },
        ],
      },
      {
        type: "group",
        title: "productCardProps.title",
        list: [
          {
            name: "props.product_name_color",
            prop: "product_name_color",
            type: "color",
            default: "#000",
          },
          {
            name: "props.product_price_color",
            prop: "product_price_color",
            type: "color",
            default: "#000",
          },
          {
            name: "props.preview",
            prop: "preview",
            type: "file",
            subtype: "image_preview",
            enableSources: true,
          },
          {
            name: "props.image_scale",
            prop: "scale",
            type: "select",
            default: "fill",
            options: [
              {
                name: "props.scale_fit",
                value: "fit",
              },
              {
                name: "props.scale_fill",
                value: "fill",
              },
              {
                name: "props.scale_no_scale",
                value: "no_scale",
              },
              {
                name: "props.scale_stretch",
                value: "stretch",
              },
            ],
            enableSources: true,
          },
          {
            name: "props.image_alignment",
            type: "alignment",
            horizontalProp: "content_alignment_horizontal",
            verticalProp: "content_alignment_vertical",
            enableSources: true,
          },
          {
            name: "props.image_corner_radius",
            prop: "image_corner_radius",
            type: "integer",
            min: 0,
            max: 100,
            default:0,
            enableSources: true,
          },
          {
            name: "props.product_name_text_size",
            prop: "product_name_text_size",
            type: "integer",
            min: 0,
            max: 100,
            default: 17,
          },
          {
            name: "props.product_price_text_size",
            prop: "product_price_text_size",
            type: "integer",
            min: 0,
            max: 100,
            default: 17,
          },
        ],
      },
    ],
    newNode: {
      type: "container",
      width:{
        type: "fixed",
        value: 180,
      },
      product_name: products[0].name,
      product_image: products[0].images[0].url,
      product_price: products[0]?.ProductVariants[0]?.price,
      background: [
        {
          type: "solid",
          color: "#F5F5F5",
        },
      ],
      border: {
        corner_radius: 10,
      },
      paddings: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      alignment_horizontal: "left",
      alignment_vertical: "top",
      margins: {
        top: 148,
        left: 99,
      },
      items: [
        {
          type: "image",
          $image_url: "product_image",
          width: {
            type: "match_parent",
            constrained: true,
          },
          border: {
            $corner_radius: "image_corner_radius",
          },
          height: {
            type: "fixed",
            value: 175,
          },
          preload_required: true,
        },
        {
          type: "text",
          $text: "product_name",
          $text_color: "product_name_color",
          $font_size: "product_name_text_size",
          width: {
            type: "wrap_content",
            constrained: true,
          },
          margins: {
            top: 15,
          },
        },
        {
          type: "text",
          $text: "product_price",
          $text_color: "product_price_color",
          $font_size: "product_price_text_size",
          font_size: 15,
          width: {
            type: "wrap_content",
            constrained: true,
          },
          margins: {
            top: 10,
          },
        },
      ],
      content_alignment_horizontal: "center",
      content_alignment_vertical: "center",
    },

    template: {
      type: "container",
      $product_id: "product_id",
      background: [
        {
          type: "solid",
          color: "F5F5F5",
        },
      ],
      items: [
        {
          type: "image",
          $image_url: "product_image",
          width: {
            type: "match_parent",
            constrained: true,
          },
          border: {
            $corner_radius: "image_corner_radius",
          },
          height: {
            type: "fixed",
            value: 175,
          },
          preload_required: true,
        },
        {
          type: "text",
          $text: "product_name",
          $text_color: "product_name_color",
          $font_size: "product_name_text_size",
          width: {
            type: "wrap_content",
            constrained: true,
          },
          margins: {
            top: 15,
          },
        },
        {
          type: "text",
          $text: "product_price",
          $text_color: "product_price_color",
          $font_size: "product_price_text_size",
          font_size: 15,
          width: {
            type: "wrap_content",
            constrained: true,
          },
          margins: {
            top: 10,
          },
        },
      ],
    },
  },
};

export function isTemplate(name: string): boolean {
  return namedTemplates.hasOwnProperty(name);
}

export function getTemplateBaseType(name: string): string | undefined {
  return namedTemplates[name]?.baseType;
}
