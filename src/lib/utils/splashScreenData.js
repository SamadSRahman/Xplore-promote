export const imageBackgroundJSON = {
  card: {
    log_id: "div2_sample_card",
    states: [
      {
        state_id: 0,
        div: {
          items: [
            {
              type: "text",
              text: "Ayatana",
              font_size: 18,
              width: {
                type: "wrap_content",
                constrained: true,
              },
              alignment_horizontal: "center",
              alignment_vertical: "bottom",
              margins: {
                bottom: 51,
              },
              text_color: "#ffd700",
              font_weight: "medium",
            },
            {
              type: "text",
              text: "Powered by",
              font_size: 20,
              width: {
                type: "wrap_content",
                constrained: true,
              },
              alignment_horizontal: "center",
              alignment_vertical: "bottom",
              margins: {
                bottom: 82,
              },
              text_color: "#ffd700",
              height: {
                type: "fixed",
                value: 25,
              },
              font_weight: "bold",
            },
            {
              type: "image",
              image_url:
                "https://thumbs.dreamstime.com/b/brown-blue-line-alphabet-letter-sr-s-r-logo-combination-company-icon-design-business-corporate-identity-143635334.jpg",
              width: {
                type: "fixed",
                value: 144,
              },
              height: {
                type: "fixed",
                value: 142,
              },
              preload_required: true,
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                top: 193,
              },
            },
          ],
          visibility_action: {
            log_id: "visible",
          },
          background: [
            {
              type: "image",
              angle: 270,
              image_url:
                "https://images.pexels.com/photos/6315941/pexels-photo-6315941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              scale: "fill",
              content_alignment_horizontal: "center",
              content_alignment_vertical: "center",
              alpha: 1,
              preload_required: true,
            },
          ],
          height: {
            type: "match_parent",
          },
          orientation: "overlap",
          type: "container",
        },
      },
    ],
    variables: [
      {
        type: "dict",
        name: "local_palette",
        value: {
          bg_primary: {
            name: "Primary background",
            light: "#fff",
            dark: "#000",
          },
          color0: {
            name: "Secondary background",
            light: "#eeeeee",
            dark: "#000",
          },
        },
      },
    ],
  },
  templates: {
    _template_lottie: {
      type: "gif",
      scale: "fit",
      extensions: [
        {
          id: "lottie",
          $params: "lottie_params",
        },
      ],
      gif_url: "https://yastatic.net/s3/home/divkit/empty2.png",
    },
    _template_button: {
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
    _template_close: {
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
    },
  },
};

export const gradientBackgroundJSON = {
  card: {
    log_id: "div2_sample_card",
    states: [
      {
        state_id: 0,
        div: {
          items: [
            {
              type: "text",
              text: "Ayatana",
              font_size: 18,
              width: {
                type: "wrap_content",
                constrained: true,
              },
              alignment_horizontal: "center",
              alignment_vertical: "bottom",
              margins: {
                bottom: 51,
              },
              text_color: "#ffffff",
            },
            {
              type: "text",
              text: "Powered by",
              font_size: 20,
              width: {
                type: "wrap_content",
                constrained: true,
              },
              alignment_horizontal: "center",
              alignment_vertical: "bottom",
              margins: {
                bottom: 82,
              },
              text_color: "#ffffff",
              height: {
                type: "fixed",
                value: 25,
              },
            },
            {
              type: "image",
              image_url:
                "https://t4.ftcdn.net/jpg/04/08/00/87/360_F_408008716_uFEQOjnd6noCmsKwjXzxvnCLa09ROCw8.jpg",
              width: {
                type: "fixed",
                value: 144,
              },
              height: {
                type: "fixed",
                value: 142,
              },
              preload_required: true,
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                top: 193,
              },
            },
          ],
          visibility_action: {
            log_id: "visible",
          },
          background: [
            {
              type: "gradient",
              colors: ["#4a148c", "#d500f9"],
              angle: 270,
            },
          ],
          height: {
            type: "match_parent",
          },
          orientation: "overlap",
          type: "container",
        },
      },
    ],
    variables: [
      {
        type: "dict",
        name: "local_palette",
        value: {
          bg_primary: {
            name: "Primary background",
            light: "#fff",
            dark: "#000",
          },
          color0: {
            name: "Secondary background",
            light: "#eeeeee",
            dark: "#000",
          },
        },
      },
    ],
  },
  templates: {
    _template_lottie: {
      type: "gif",
      scale: "fit",
      extensions: [
        {
          id: "lottie",
          $params: "lottie_params",
        },
      ],
      gif_url: "https://yastatic.net/s3/home/divkit/empty2.png",
    },
    _template_button: {
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
    _template_close: {
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
    },
  },
};

export const solidBackgroundJSON = {
  card: {
    log_id: "div2_sample_card",
    states: [
      {
        state_id: 0,
        div: {
          items: [
            {
              type: "image",
              image_url:
                "https://png.pngtree.com/png-vector/20221207/ourmid/pngtree-letter-s-r-beauty-monogram-serif-logo-design-png-image_6514468.png",
              width: {
                type: "fixed",
                value: 144,
              },
              height: {
                type: "fixed",
                value: 189,
              },
              preload_required: true,
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                top: 140,
              },
            },
            {
              type: "text",
              text: "Ayatana",
              font_size: 18,
              width: {
                type: "wrap_content",
                constrained: true,
              },
              alignment_horizontal: "center",
              alignment_vertical: "bottom",
              margins: {
                bottom: 51,
              },
              text_color: "#eccab2",
            },
            {
              type: "text",
              text: "Powered by",
              font_size: 20,
              width: {
                type: "wrap_content",
                constrained: true,
              },
              alignment_horizontal: "center",
              alignment_vertical: "bottom",
              margins: {
                bottom: 82,
              },
              text_color: "#eccab2",
              height: {
                type: "fixed",
                value: 25,
              },
            },
          ],
          visibility_action: {
            log_id: "visible",
          },
          background: [
            {
              color: "#000000",
              type: "solid",
            },
          ],
          height: {
            type: "match_parent",
          },
          orientation: "overlap",
          type: "container",
        },
      },
    ],
    variables: [
      {
        type: "dict",
        name: "local_palette",
        value: {
          bg_primary: {
            name: "Primary background",
            light: "#fff",
            dark: "#000",
          },
          color0: {
            name: "Secondary background",
            light: "#eeeeee",
            dark: "#000",
          },
        },
      },
    ],
  },
  templates: {
    _template_lottie: {
      type: "gif",
      scale: "fit",
      extensions: [
        {
          id: "lottie",
          $params: "lottie_params",
        },
      ],
      gif_url: "https://yastatic.net/s3/home/divkit/empty2.png",
    },
    _template_button: {
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
    _template_close: {
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
    },
  },
};

export const blankBackgroundJSON = {
  card: {
    log_id: "div2_sample_card",
    states: [
      {
        state_id: 0,
        div: {
          visibility_action: {
            log_id: "visible",
          },
          background: [
            {
              color:
                "@{getDictOptColor('#00ffffff', local_palette, 'bg_primary', theme)}",
              type: "solid",
            },
          ],
          height: {
            type: "match_parent",
          },
          orientation: "overlap",
          type: "container",
        },
      },
    ],
    variables: [
      {
        type: "dict",
        name: "local_palette",
        value: {
          bg_primary: {
            name: "Primary background",
            light: "#fff",
            dark: "#000",
          },
          color0: {
            name: "Secondary background",
            light: "#eeeeee",
            dark: "#000",
          },
        },
      },
    ],
  },
  templates: {
    input_text: {
    type: "input",
    text_variable: 'my_borderless_text',
  width: {
    type: "match_parent"
  },
  height: {
    type: "wrap_content"
  },
  text_alignment_horizontal: "left",
  margins: {
    left: 16,
    top: 20,
    right: 16,
    bottom: 16
  },
  paddings: {
    left: 16,
    top: 10,
    right: 16,
    bottom: 10
  },
  alignment_horizontal: "center",
  alignment_vertical: "center",
  font_size: 16,
  font_weight: "medium",
  text_color: "#000000",
  hint_color: "#888888",
  highlight_color: "#e0bae3",
  line_height: 22,
  accessibility: {
    description: "Enter text here",
    hint: "Type your response",
    state_description: "Active input field"
  },
  autocapitalization: "sentences",
  keyboard_type: "default",
  background: [
    {
      type: 'solid',
      color: "#f8f8f8"
    }
  ],
  border: {
    corner_radius: 8,
    stroke: {
      color: "#cccccc",
      width: 1
    }
  },


  enter_key_type: "done",
  on_focus: [
    {
      type: "highlight",
      highlight_color: "#d3d3d3"
    }
  ],
  visibility: "visible",
  max_length: 100,
  mask: {
    type: "text",
    pattern: "[A-Za-z0-9 ]*"
  },
  text_alignment_horizontal: "left",
  text_alignment_vertical: "center"
  },
 

    // _template_lottie: {
    //   type: "gif",
    //   scale: "fit",
    //   extensions: [
    //     {
    //       id: "lottie",
    //       $params: "lottie_params",
    //     },
    //   ],
    //   gif_url: "https://yastatic.net/s3/home/divkit/empty2.png",
    // },
    _template_button: {
      type: "text",
      text_alignment_horizontal: "center",
      text_alignment_vertical: "center",
      border: {
        $corner_radius: "corners",
      },
      paddings: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      width: {
        type: "wrap_content",
      },
    },
    _template_close: {
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
    },
//     _template_list_text_only: {
//       type: 'container',
//       orientation: 'vertical',
//       items: [
//         {
//           type: 'foreach', // Allows dynamic rendering based on list_items
//           in: 'list_items',
//           template: {
//             type: 'text',
//             $text: 'list_item_text',
//             $text_color: 'list_item_color',
//             $font_size: 'list_item_size',
//             line_height: 32,
//             $font_weight: 'list_item_weight',
//             width: {
//               type: 'wrap_content',
//               constrained: true,
//             },
//           },
//         },
//       ],
// }
  },
};


export const quizJSON = {
 card: {
  log_id: "quiz_card",
  states: [
    {
      state_id: 0,
      div: {
        visibility_action: {
          log_id: "visible",
        },
        background: [
          {
            color: '#fff',
            type: "solid"
          },
        ],
        height: {
          type: "match_parent",
        },
        orientation: "vertical",
        type: "container",
        variables: [
          {
            type: "dict",
            name: "local_palette",
            value: {
              bg_primary: {
                name: "Primary background",
                light: "#fff",
                dark: "#000",
              },
              color0: {
                name: "Secondary background",
                light: "#eeeeee",
                dark: "#000",
              },
            },
          },
        ] ,
        templates: {
          _template_button: {
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
          _template_close: {
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
          },
        } 
      } 
    }
  ] 
 }  
} 



export const contactUsJSON = {
  "card": {
    "log_id": "div2_sample_card",
    "states": [
      {
        "state_id": 0,
        "div": {
          "visibility_action": {
            "log_id": "visible"
          },
          "background": [
            {
              "color": "@{getDictOptColor('#00ffffff', local_palette, 'bg_primary', theme)}",
              "type": "solid"
            }
          ],
          "height": {
            "type": "match_parent"
          },
          "orientation": "overlap",
          "type": "container",
          "items": [
            {
              "type": "input_text",
              "width": {
                "type": "fixed",
                "value": 248
              },
              "text_variable": "name",
              "alignment_horizontal": "center",
              "alignment_vertical": "top",
              "hint_text": "Name",
              "margins": {
                "top": 148
              }
            },
            {
              "type": "input_text",
              "width": {
                "type": "fixed",
                "value": 248
              },
              "text_variable": "phone",
              "alignment_horizontal": "center",
              "alignment_vertical": "top",
              "margins": {
                "top": 216
              },
              "hint_text": "Phone",
              "keyboard_type": "number"
            },
            {
              "type": "input_text",
              "width": {
                "type": "fixed",
                "value": 248
              },
              "text_variable": "email",
              "alignment_horizontal": "center",
              "alignment_vertical": "top",
              "margins": {
                "top": 283
              },
              "hint_text": "Email",
              "keyboard_type": "email"
            },
            {
              "text": "Submit",
              "background": [
                {
                  "type": "solid",
                  "color": "#000"
                }
              ],
              "text_color": "#fff",
              "corners": 8,
              "type": "_template_button",
              "width": {
                "type": "match_parent"
              },
              "alignment_horizontal": "center",
              "alignment_vertical": "top",
              "margins": {
                "left": 20,
                "right": 20,
                "top": 412
              },
              "actions": [
                {
                  "log_id": "action_id",
                  "url": "xplore-promote://submit?name=@{name}&email=@{email}&phone=@{phone}&isCheckboxChecked=@{isCheckboxChecked}",
                  "log_url": "xplore-promote://submit?name=@{name}&email=@{email}&phone=@{phone}&isCheckboxChecked=@{isCheckboxChecked}",
                  "selected_variables": [
                    "name",
                    "email",
                    "phone",
                    "isCheckboxChecked"
                  ]
                }
              ],
              "paddings": {
                "top": 20,
                "right": 20,
                "bottom": 20,
                "left": 20
              },
              "font_size": 18,
              "font_weight": "medium",
              "text_alignment_horizontal": "center"
            },
            {
              "type": "_template_checkbox",
              "initial_state": "unchecked",
              "size": 20,
              "label_text": "I agree with the terms and conditions",
              "label_color": "#000000",
              "font_size": 14,
              "checked_color": "#3F28C3",
              "unchecked_color": "#FFFFFF",
              "actions": [],
              "width": {
                "type": "wrap_content",
                "constrained": true
              },
              "margins": {
                "top": 353
              },
              "items": [],
              "alignment_horizontal": "center"
            },
            {
              "alignment_horizontal": "left",
              "height": {
                "type": "fixed",
                "value": 28
              },
              "margins": {
                "left": 20,
                "top": 20
              },
              "width": {
                "type": "fixed",
                "value": 28
              },
              "actions": [
                {
                  "log_id": "back_button",
                  "url": "xplore-promote://backBtn"
                }
              ],
              "type": "_template_back",
              "alignment_vertical": "top"
            }
          ],
          "content_alignment_horizontal": "center",
          "content_alignment_vertical": "top"
        }
      }
    ],
    "variables": [
      {
        "type": "dict",
        "name": "local_palette",
        "value": {
          "bg_primary": {
            "name": "Primary background",
            "light": "#fff",
            "dark": "#000"
          },
          "color0": {
            "name": "Secondary background",
            "light": "#eeeeee",
            "dark": "#000"
          }
        }
      },
      {
        "type": "string",
        "name": "name",
        "value": ""
      },
      {
        "type": "string",
        "name": "email",
        "value": ""
      },
      {
        "type": "string",
        "name": "phone",
        "value": ""
      },
      {
        "type": "boolean",
        "name": "isCheckboxChecked",
        "value": false
      }
    ]
  },
  "templates": {
    "input_text": {
      "type": "input",
      "text_variable": "my_borderless_text",
      "width": {
        "type": "match_parent"
      },
      "height": {
        "type": "wrap_content"
      },
      "text_alignment_horizontal": "left",
      "margins": {
        "left": 16,
        "top": 20,
        "right": 16,
        "bottom": 16
      },
      "paddings": {
        "left": 16,
        "top": 10,
        "right": 16,
        "bottom": 10
      },
      "alignment_horizontal": "center",
      "alignment_vertical": "center",
      "font_size": 16,
      "font_weight": "medium",
      "text_color": "#000000",
      "hint_color": "#888888",
      "highlight_color": "#e0bae3",
      "line_height": 22,
      "accessibility": {
        "description": "Enter text here",
        "hint": "Type your response",
        "state_description": "Active input field"
      },
      "autocapitalization": "sentences",
      "keyboard_type": "default",
      "background": [
        {
          "type": "solid",
          "color": "#f8f8f8"
        }
      ],
      "border": {
        "corner_radius": 8,
        "stroke": {
          "color": "#cccccc",
          "width": 1
        }
      },
      "enter_key_type": "done",
      "on_focus": [
        {
          "type": "highlight",
          "highlight_color": "#d3d3d3"
        }
      ],
      "visibility": "visible",
      "max_length": 100,
      "mask": {
        "type": "text",
        "pattern": "[A-Za-z0-9 ]*"
      },
      "text_alignment_vertical": "center"
    },
    "_template_button": {
      "type": "text",
      "text_alignment_horizontal": "center",
      "text_alignment_vertical": "center",
      "border": {
        "$corner_radius": "corners"
      },
      "paddings": {
        "bottom": 0,
        "left": 0,
        "right": 0,
        "top": 0
      },
      "width": {
        "type": "wrap_content"
      }
    },
    "_template_close": {
      "accessibility": {
        "description": "Закрыть",
        "mode": "merge",
        "type": "button"
      },
      "actions": [
        {
          "log_id": "close_popup",
          "url": "div-screen://close"
        }
      ],
      "image_url": "https://yastatic.net/s3/home/div/div_fullscreens/cross2.3.png",
      "tint_color": "#73000000",
      "type": "image"
    },
    "_template_checkbox": {
      "type": "state",
      "id": "checkbox_state",
      "states": [
        {
          "state_id": "unchecked",
          "div": {
            "type": "container",
            "orientation": "horizontal",
            "items": [
              {
                "type": "container",
                "width": {
                  "type": "fixed",
                  "$value": "size"
                },
                "height": {
                  "type": "fixed",
                  "$value": "size"
                },
                "border": {
                  "corner_radius": 4,
                  "stroke": {
                    "color": "#CCCCCC",
                    "width": 2
                  }
                },
                "background": [
                  {
                    "type": "solid",
                    "$color": "unchecked_color"
                  }
                ],
                "actions": [
                  {
                    "log_id": "update_checkbox_state",
                    "url": "div-action://set_variable?name=isCheckboxChecked&value=true"
                  },
                  {
                    "log_id": "toggle_checkbox",
                    "url": "div-action://set_state?state_id=0/checkbox_state/checked"
                  }
                ]
              },
              {
                "type": "text",
                "$text": "label_text",
                "$font_size": "font_size",
                "$text_color": "label_color",
                "margins": {
                  "left": 8
                },
                "width": {
                  "type": "wrap_content"
                },
                "height": {
                  "type": "wrap_content"
                }
              }
            ]
          }
        },
        {
          "state_id": "checked",
          "div": {
            "type": "container",
            "orientation": "horizontal",
            "items": [
              {
                "type": "container",
                "width": {
                  "type": "fixed",
                  "$value": "size"
                },
                "height": {
                  "type": "fixed",
                  "$value": "size"
                },
                "border": {
                  "corner_radius": 4,
                  "stroke": {
                    "color": "#3F28C3",
                    "width": 2
                  }
                },
                "background": [
                  {
                    "type": "solid",
                    "$color": "checked_color"
                  }
                ],
                "items": [
                  {
                    "type": "text",
                    "text": "✓",
                    "text_color": "#FFFFFF",
                    "font_size": 16,
                    "text_alignment_horizontal": "center",
                    "text_alignment_vertical": "center",
                    "width": {
                      "type": "match_parent"
                    },
                    "height": {
                      "type": "match_parent"
                    }
                  }
                ],
                "actions": [
                  {
                    "log_id": "update_checkbox_state",
                    "url": "div-action://set_variable?name=isCheckboxChecked&value=false"
                  },
                  {
                    "log_id": "toggle_checkbox",
                    "url": "div-action://set_state?state_id=0/checkbox_state/unchecked"
                  }
                ]
              },
              {
                "type": "text",
                "$text": "label_text",
                "$font_size": "font_size",
                "$text_color": "label_color",
                "margins": {
                  "left": 8
                },
                "width": {
                  "type": "wrap_content"
                },
                "height": {
                  "type": "wrap_content"
                }
              }
            ]
          }
        }
      ]
    },
    "_template_back": {
      "accessibility": {
        "description": "Back",
        "mode": "merge",
        "type": "button"
      },
      "actions": [
        {
          "log_id": "back_button",
          "url": "xplore-promote://backBtn"
        }
      ],
      "image_url": "https://objectstore.e2enetworks.net/xplore/1732611449421-a4145e328273d3ae.png",
      "tint_color": "#000",
      "type": "image",
      "preload_required": true
    }
  }
}
