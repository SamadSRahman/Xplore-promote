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
    _template_input: {
      type: "input",
      text_variable: "my_borderless_text",
      width: {
        type: "match_parent",
      },
      height: {
        type: "wrap_content",
      },
      text_alignment_horizontal: "left",
      margins: {
        left: 16,
        top: 20,
        right: 16,
        bottom: 16,
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
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
        state_description: "Active input field",
      },
      autocapitalization: "sentences",
      keyboard_type: "default",
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },

      enter_key_type: "done",
      on_focus: [
        {
          type: "highlight",
          highlight_color: "#d3d3d3",
        },
      ],
      visibility: "visible",
      max_length: 100,
      mask: {
        type: "text",
        pattern: "[A-Za-z0-9 ]*",
      },
      text_alignment_horizontal: "left",
      text_alignment_vertical: "center",
    },
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
    _template_chatbot: {
      type: "image",
      image_url:
        "https://xplore.objectstore.e2enetworks.net/1739858212180-fc3ddc3169e45e96.png",
      preload_required: true,
      scale: "fit",
      background: [
        {
          type: "solid",
          $color: "background_color",
        },
      ],
      border: {
        corner_radius: 50,
      },
      $alignment_horizontal: "alignment_horizontal",
      $alignment_vertical: "alignment_vertical",
      margins: {
        right: 20,
        bottom: 20,
      },
      actions: [
        {
          log_id: "open_chatbot",
          url: "xplore-promote://chatbot",
        },
      ],
    },
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
export const landingScreenJSON = {
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
      {
        name: "nativeSignInNeeded",
        type: "boolean",
        value: false,
      },
    ],
  },
  templates: {
    _template_input: {
      type: "input",
      text_variable: "my_borderless_text",
      width: {
        type: "match_parent",
      },
      height: {
        type: "wrap_content",
      },
      text_alignment_horizontal: "left",
      margins: {
        left: 16,
        top: 20,
        right: 16,
        bottom: 16,
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
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
        state_description: "Active input field",
      },
      autocapitalization: "sentences",
      keyboard_type: "default",
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },

      enter_key_type: "done",
      on_focus: [
        {
          type: "highlight",
          highlight_color: "#d3d3d3",
        },
      ],
      visibility: "visible",
      max_length: 100,
      mask: {
        type: "text",
        pattern: "[A-Za-z0-9 ]*",
      },
      text_alignment_horizontal: "left",
      text_alignment_vertical: "center",
    },
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
export const splashScreenJSON = {
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
      {
        name: "screen_duration",
        type: "number",
        value: 2,
      },
    ],
  },
  templates: {
    _template_input: {
      type: "input",
      text_variable: "my_borderless_text",
      width: {
        type: "match_parent",
      },
      height: {
        type: "wrap_content",
      },
      text_alignment_horizontal: "left",
      margins: {
        left: 16,
        top: 20,
        right: 16,
        bottom: 16,
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
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
        state_description: "Active input field",
      },
      autocapitalization: "sentences",
      keyboard_type: "default",
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },

      enter_key_type: "done",
      on_focus: [
        {
          type: "highlight",
          highlight_color: "#d3d3d3",
        },
      ],
      visibility: "visible",
      max_length: 100,
      mask: {
        type: "text",
        pattern: "[A-Za-z0-9 ]*",
      },
      text_alignment_horizontal: "left",
      text_alignment_vertical: "center",
    },
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
              color: "#fff",
              type: "solid",
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
          ],
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
          },
        },
      },
    ],
  },
};

export const contactUsJSON = {
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
          items: [
            {
              type: "input_text",
              width: {
                type: "fixed",
                value: 248,
              },
              text_variable: "userName",
              alignment_horizontal: "center",
              alignment_vertical: "top",
              hint_text: "Name",
              margins: {
                top: 148,
              },
            },
            {
              type: "input_text",
              width: {
                type: "fixed",
                value: 248,
              },
              text_variable: "phone",
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                top: 216,
              },
              hint_text: "Phone",
              keyboard_type: "number",
            },
            {
              type: "input_text",
              width: {
                type: "fixed",
                value: 248,
              },
              text_variable: "email",
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                top: 283,
              },
              hint_text: "Email",
              keyboard_type: "email",
            },
            {
              text: "Submit",
              background: [
                {
                  type: "solid",
                  color: "#000",
                },
              ],
              text_color: "#fff",
              corners: 8,
              type: "_template_button",
              width: {
                type: "match_parent",
              },
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                left: 20,
                right: 20,
                top: 412,
              },
              actions: [
                {
                  log_id: "action_id",
                  url: "xplore-promote://submit?userName=@{userName}&email=@{email}&phone=@{phone}&consent_checkbox=@{consent_checkbox}",
                  log_url:
                    "xplore-promote://submit?userName=@{userName}&email=@{email}&phone=@{phone}&consent_checkbox=@{consent_checkbox}",
                  selected_variables: [
                    "name",
                    "email",
                    "phone",
                    "consent_checkbox",
                  ],
                },
              ],
              paddings: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              },
              font_size: 18,
              font_weight: "medium",
              text_alignment_horizontal: "center",
            },
            {
              type: "_template_checkbox",
              initial_state: "unchecked",
              size: 20,
              label_text: "I agree with the terms and conditions",
              label_color: "#000000",
              font_size: 14,
              checked_color: "#3F28C3",
              unchecked_color: "#FFFFFF",
              actions: [],
              width: {
                type: "wrap_content",
                constrained: true,
              },
              margins: {
                top: 353,
              },
              items: [],
              alignment_horizontal: "center",
            },
            {
              alignment_horizontal: "left",
              height: {
                type: "fixed",
                value: 28,
              },
              margins: {
                left: 20,
                top: 20,
              },
              width: {
                type: "fixed",
                value: 28,
              },
              actions: [
                {
                  log_id: "back_button",
                  url: "xplore-promote://backBtn",
                },
              ],
              type: "_template_back",
              alignment_vertical: "top",
            },
          ],
          content_alignment_horizontal: "center",
          content_alignment_vertical: "top",
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
      {
        type: "string",
        name: "userName",
        value: "",
      },
      {
        type: "string",
        name: "email",
        value: "",
      },
      {
        type: "string",
        name: "phone",
        value: "",
      },
      {
        type: "boolean",
        name: "consent_checkbox",
        value: false,
      },
    ],
  },
  templates: {
    input_text: {
      type: "input",
      text_variable: "my_borderless_text",
      width: {
        type: "match_parent",
      },
      height: {
        type: "wrap_content",
      },
      text_alignment_horizontal: "left",
      margins: {
        left: 16,
        top: 20,
        right: 16,
        bottom: 16,
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
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
        state_description: "Active input field",
      },
      autocapitalization: "sentences",
      keyboard_type: "default",
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },
      enter_key_type: "done",
      on_focus: [
        {
          type: "highlight",
          highlight_color: "#d3d3d3",
        },
      ],
      visibility: "visible",
      max_length: 100,
      mask: {
        type: "text",
        pattern: "[A-Za-z0-9 ]*",
      },
      text_alignment_vertical: "center",
    },
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
    _template_checkbox: {
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
                width: {
                  type: "fixed",
                  $value: "size",
                },
                height: {
                  type: "fixed",
                  $value: "size",
                },
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
                    url: "div-action://set_variable?name=consent_checkbox&value=true",
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
                margins: {
                  left: 8,
                },
                width: {
                  type: "wrap_content",
                },
                height: {
                  type: "wrap_content",
                },
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
                width: {
                  type: "fixed",
                  $value: "size",
                },
                height: {
                  type: "fixed",
                  $value: "size",
                },
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
                    width: {
                      type: "match_parent",
                    },
                    height: {
                      type: "match_parent",
                    },
                  },
                ],
                actions: [
                  {
                    log_id: "update_checkbox_state",
                    url: "div-action://set_variable?name=consent_checkbox&value=false",
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
                margins: {
                  left: 8,
                },
                width: {
                  type: "wrap_content",
                },
                height: {
                  type: "wrap_content",
                },
              },
            ],
          },
        },
      ],
    },
    _template_back: {
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
};

export const profileJSON = {
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
          items: [
            {
              type: "gallery",
              width: {
                type: "match_parent",
              },
              height: {
                type: "match_parent",
              },
              alignment_horizontal: "left",
              alignment_vertical: "top",
              items: [
                {
                  type: "container",
                  width: {
                    type: "match_parent",
                  },
                  height: {
                    type: "wrap_content",
                  },
                  items: [
                    {
                      type: "container",
                      width: {
                        type: "fixed",
                        value: 173,
                      },
                      height: {
                        type: "wrap_content",
                      },
                      items: [
                        {
                          type: "image",
                          image_url:
                            "https://objectstore.e2enetworks.net/xplore/1733213244734-d5b40f5f754d901e.png",
                          width: {
                            type: "fixed",
                            value: 151,
                          },
                          height: {
                            type: "fixed",
                            value: 150,
                          },
                          preload_required: true,
                          alignment_horizontal: "center",
                          border: {
                            stroke: {
                              color: "#ffffff",
                            },
                            corner_radius: 20,
                          },
                          scale: "fit",
                          margins: {
                            top: 10,
                            right: 10,
                            bottom: 10,
                            left: 10,
                          },
                          background: [
                            {
                              type: "solid",
                              color: "#f2f2f2",
                            },
                          ],
                        },
                      ],
                      border: {
                        stroke: {
                          color: "#d9d8d8",
                        },
                        corner_radius: 20,
                      },
                      alignment_horizontal: "center",
                      paddings: {
                        bottom: 1,
                      },
                    },
                    {
                      type: "text",
                      text: "Shreyas Srinivasan",
                      width: {
                        type: "wrap_content",
                      },
                      alignment_horizontal: "center",
                      text_alignment_horizontal: "center",
                      height: {
                        type: "wrap_content",
                      },
                      font_size: 18,
                      font_weight: "bold",
                      margins: {
                        top: 15,
                      },
                    },
                    {
                      type: "text",
                      text: "Founder at xplore",
                      font_size: 14,
                      width: {
                        type: "wrap_content",
                        constrained: true,
                      },
                      alignment_horizontal: "center",
                      alignment_vertical: "top",
                      font_weight: "regular",
                      text_color: "#666666",
                      margins: {
                        top: 10,
                      },
                    },
                  ],
                  margins: {
                    top: 50,
                  },
                  paddings: {
                    top: 1,
                  },
                },
                {
                  type: "container",
                  width: {
                    type: "match_parent",
                  },
                  height: {
                    type: "fixed",
                    value: 149,
                  },
                  items: [
                    {
                      type: "image",
                      image_url:
                        "https://objectstore.e2enetworks.net/xplore/1733213908205-560c5733a7665671.png",
                      width: {
                        type: "fixed",
                        value: 30,
                      },
                      height: {
                        type: "fixed",
                        value: 30,
                      },
                      preload_required: true,
                      alignment_horizontal: "left",
                      alignment_vertical: "top",
                    },
                    {
                      type: "text",
                      text: "explore.in",
                      font_size: 14,
                      width: {
                        type: "wrap_content",
                        constrained: true,
                      },
                      alignment_horizontal: "left",
                      alignment_vertical: "center",
                    },
                    {
                      text: "Enquire",
                      background: [
                        {
                          type: "solid",
                          color: "#896bf0",
                        },
                      ],
                      text_color: "#fff",
                      corners: 8,
                      type: "_template_button",
                      width: {
                        type: "fixed",
                        value: 90,
                      },
                      alignment_horizontal: "left",
                      alignment_vertical: "bottom",
                      paddings: {
                        top: 10,
                        right: 12,
                        bottom: 10,
                        left: 12,
                      },
                      font_weight: "medium",
                      font_size: 12,
                      border: {
                        corner_radius: 20,
                      },
                    },
                    {
                      type: "image",
                      image_url:
                        "https://objectstore.e2enetworks.net/xplore/1733214286638-f2e3baf45ede5d27.png",
                      width: {
                        type: "fixed",
                        value: 100,
                      },
                      height: {
                        type: "fixed",
                        value: 100,
                      },
                      preload_required: true,
                      alignment_horizontal: "right",
                      alignment_vertical: "center",
                    },
                  ],
                  margins: {
                    top: 14,
                    right: 14,
                    left: 15,
                  },
                  orientation: "overlap",
                  paddings: {
                    top: 15,
                    right: 15,
                    bottom: 15,
                    left: 15,
                  },
                  border: {
                    corner_radius: 20,
                    stroke: {
                      color: "#d9d8d8",
                    },
                  },
                },
                {
                  type: "container",
                  width: {
                    type: "match_parent",
                  },
                  height: {
                    type: "wrap_content",
                  },
                  items: [
                    {
                      type: "container",
                      width: {
                        type: "match_parent",
                      },
                      height: {
                        type: "fixed",
                        value: 151,
                      },
                      items: [
                        {
                          type: "image",
                          image_url:
                            "https://objectstore.e2enetworks.net/xplore/1733216790278-44ab5d40fc2190fe.png",
                          width: {
                            type: "fixed",
                            value: 30,
                          },
                          height: {
                            type: "fixed",
                            value: 30,
                          },
                          preload_required: true,
                          alignment_horizontal: "left",
                          alignment_vertical: "top",
                        },
                        {
                          type: "text",
                          text: "+91- 9087654321",
                          font_size: 14,
                          width: {
                            type: "wrap_content",
                            constrained: true,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "center",
                          height: {
                            type: "fixed",
                            value: 18,
                          },
                        },
                        {
                          text: "Enquire",
                          background: [
                            {
                              type: "solid",
                              color: "#3e90fb",
                            },
                          ],
                          text_color: "#fff",
                          corners: 8,
                          type: "_template_button",
                          width: {
                            type: "fixed",
                            value: 90,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "bottom",
                          paddings: {
                            top: 10,
                            right: 12,
                            bottom: 10,
                            left: 12,
                          },
                          font_weight: "medium",
                          font_size: 12,
                          border: {
                            corner_radius: 20,
                          },
                        },
                      ],
                      margins: {
                        top: 15,
                        right: 7,
                        left: 15,
                      },
                      orientation: "overlap",
                      paddings: {
                        top: 15,
                        right: 15,
                        bottom: 15,
                        left: 15,
                      },
                      border: {
                        corner_radius: 20,
                        stroke: {
                          color: "#d9d8d8",
                        },
                      },
                    },
                    {
                      type: "container",
                      width: {
                        type: "match_parent",
                      },
                      height: {
                        type: "fixed",
                        value: 151,
                      },
                      margins: {
                        top: 15,
                        right: 14,
                        left: 7,
                      },
                      orientation: "overlap",
                      paddings: {
                        top: 15,
                        right: 15,
                        bottom: 15,
                        left: 15,
                      },
                      border: {
                        corner_radius: 20,
                        stroke: {
                          color: "#d9d8d8",
                        },
                      },
                      items: [
                        {
                          type: "image",
                          image_url:
                            "https://objectstore.e2enetworks.net/xplore/1733216851637-1711ea6804a0c7da.png",
                          width: {
                            type: "fixed",
                            value: 30,
                          },
                          height: {
                            type: "fixed",
                            value: 30,
                          },
                          preload_required: true,
                          alignment_horizontal: "left",
                          alignment_vertical: "top",
                        },
                        {
                          type: "text",
                          text: "shreyas@gmail.com",
                          font_size: 14,
                          width: {
                            type: "wrap_content",
                            constrained: true,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "center",
                          height: {
                            type: "fixed",
                            value: 18,
                          },
                        },
                        {
                          text: "Enquire",
                          background: [
                            {
                              type: "solid",
                              color: "#ec4b35",
                            },
                          ],
                          text_color: "#fff",
                          corners: 8,
                          type: "_template_button",
                          width: {
                            type: "fixed",
                            value: 90,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "bottom",
                          paddings: {
                            top: 10,
                            right: 12,
                            bottom: 10,
                            left: 12,
                          },
                          font_weight: "medium",
                          font_size: 12,
                          border: {
                            corner_radius: 20,
                          },
                        },
                      ],
                    },
                  ],
                  orientation: "horizontal",
                },
                {
                  type: "container",
                  width: {
                    type: "match_parent",
                  },
                  height: {
                    type: "fixed",
                    value: 150,
                  },
                  margins: {
                    top: 14,
                    right: 14,
                    left: 15,
                  },
                  orientation: "overlap",
                  paddings: {
                    top: 15,
                    right: 15,
                    bottom: 15,
                    left: 15,
                  },
                  border: {
                    corner_radius: 20,
                    stroke: {
                      color: "#d9d8d8",
                    },
                  },
                  items: [
                    {
                      type: "image",
                      image_url:
                        "https://objectstore.e2enetworks.net/xplore/1733217099664-c4cbc6f4299f828a.png",
                      width: {
                        type: "fixed",
                        value: 30,
                      },
                      height: {
                        type: "fixed",
                        value: 30,
                      },
                      preload_required: true,
                      alignment_horizontal: "left",
                      alignment_vertical: "top",
                    },
                    {
                      type: "text",
                      text: "18 Chuncha, 9th Main Rd, 2nd Block, Jaya Nagar East, Jayanagar, Bengaluru, Karnataka 560011",
                      font_size: 14,
                      width: {
                        type: "wrap_content",
                        constrained: true,
                      },
                      alignment_horizontal: "left",
                      alignment_vertical: "center",
                      height: {
                        type: "wrap_content",
                      },
                    },
                    {
                      text: "Enquire",
                      background: [
                        {
                          type: "solid",
                          color: "#3e90fb",
                        },
                      ],
                      text_color: "#fff",
                      corners: 8,
                      type: "_template_button",
                      width: {
                        type: "fixed",
                        value: 90,
                      },
                      alignment_horizontal: "left",
                      alignment_vertical: "bottom",
                      paddings: {
                        top: 10,
                        right: 12,
                        bottom: 10,
                        left: 12,
                      },
                      font_weight: "medium",
                      font_size: 12,
                      border: {
                        corner_radius: 20,
                      },
                    },
                  ],
                },
                {
                  type: "container",
                  width: {
                    type: "match_parent",
                  },
                  height: {
                    type: "fixed",
                    value: 200,
                  },
                  orientation: "horizontal",
                  items: [
                    {
                      type: "container",
                      width: {
                        type: "match_parent",
                      },
                      height: {
                        type: "fixed",
                        value: 150,
                      },
                      margins: {
                        top: 14,
                        right: 7,
                        left: 15,
                      },
                      orientation: "overlap",
                      paddings: {
                        top: 15,
                        right: 15,
                        bottom: 15,
                        left: 15,
                      },
                      border: {
                        corner_radius: 20,
                        stroke: {
                          color: "#d9d8d8",
                        },
                      },
                      items: [
                        {
                          type: "image",
                          image_url:
                            "https://objectstore.e2enetworks.net/xplore/1733217029607-769096eb268d173e.jpg",
                          width: {
                            type: "fixed",
                            value: 30,
                          },
                          height: {
                            type: "fixed",
                            value: 30,
                          },
                          preload_required: true,
                          alignment_horizontal: "left",
                          alignment_vertical: "top",
                        },
                        {
                          type: "text",
                          text: "+91- 9087654321",
                          font_size: 14,
                          width: {
                            type: "wrap_content",
                            constrained: true,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "center",
                          height: {
                            type: "fixed",
                            value: 18,
                          },
                        },
                        {
                          text: "Enquire",
                          background: [
                            {
                              type: "solid",
                              color: "#020202",
                            },
                          ],
                          text_color: "#fff",
                          corners: 8,
                          type: "_template_button",
                          width: {
                            type: "fixed",
                            value: 90,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "bottom",
                          paddings: {
                            top: 10,
                            right: 12,
                            bottom: 10,
                            left: 12,
                          },
                          font_weight: "medium",
                          font_size: 12,
                          border: {
                            corner_radius: 20,
                          },
                        },
                      ],
                    },
                    {
                      type: "container",
                      width: {
                        type: "match_parent",
                      },
                      height: {
                        type: "fixed",
                        value: 150,
                      },
                      margins: {
                        top: 14,
                        right: 14,
                        left: 7,
                      },
                      orientation: "overlap",
                      paddings: {
                        top: 15,
                        right: 15,
                        bottom: 15,
                        left: 15,
                      },
                      border: {
                        corner_radius: 20,
                        stroke: {
                          color: "#d9d8d8",
                        },
                      },
                      items: [
                        {
                          type: "image",
                          image_url:
                            "https://objectstore.e2enetworks.net/xplore/1733217049343-53dab7af99ad3a53.png",
                          width: {
                            type: "fixed",
                            value: 30,
                          },
                          height: {
                            type: "fixed",
                            value: 30,
                          },
                          preload_required: true,
                          alignment_horizontal: "left",
                          alignment_vertical: "top",
                        },
                        {
                          type: "text",
                          text: "shreyas@gmail.com",
                          font_size: 14,
                          width: {
                            type: "wrap_content",
                            constrained: true,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "center",
                          height: {
                            type: "fixed",
                            value: 18,
                          },
                        },
                        {
                          text: "Enquire",
                          background: [
                            {
                              type: "solid",
                              color: "#0a66c2",
                            },
                          ],
                          text_color: "#fff",
                          corners: 8,
                          type: "_template_button",
                          width: {
                            type: "fixed",
                            value: 90,
                          },
                          alignment_horizontal: "left",
                          alignment_vertical: "bottom",
                          paddings: {
                            top: 10,
                            right: 12,
                            bottom: 10,
                            left: 12,
                          },
                          font_weight: "medium",
                          font_size: 12,
                          border: {
                            corner_radius: 20,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
              orientation: "vertical",
              cross_content_alignment: "start",
            },
          ],
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
      text_variable: "my_borderless_text",
      width: {
        type: "match_parent",
      },
      height: {
        type: "wrap_content",
      },
      text_alignment_horizontal: "left",
      margins: {
        left: 16,
        top: 20,
        right: 16,
        bottom: 16,
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
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
        state_description: "Active input field",
      },
      autocapitalization: "sentences",
      keyboard_type: "default",
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },
      enter_key_type: "done",
      on_focus: [
        {
          type: "highlight",
          highlight_color: "#d3d3d3",
        },
      ],
      visibility: "visible",
      max_length: 100,
      mask: {
        type: "text",
        pattern: "[A-Za-z0-9 ]*",
      },
      text_alignment_vertical: "center",
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

export const whatsAppVerifyOTPScreenJSON = {
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
          items: [
            {
              text: "Resend OTP",
              animation_action: "none",
              background: [
                {
                  type: "solid",
                  color: "#ffffff",
                },
              ],
              width: {
                type: "fixed",
                value: 150,
              },
              actions: [
                {
                  log_id: "action_id",
                  url: "xplore-promote://whatsappOtpIntegration/getOtp",
                  function: "getOtp",
                  log_url: "getOtp",
                },
              ],
              height: {
                type: "fixed",
                value: 40,
              },
              text_color: "#25d366",
              font_weight: "bold",
              border: {
                corner_radius: "8",
                stroke: {
                  color: "#25d366",
                },
              },
              type: "whatsapp_button",
              alignment_horizontal: "left",
              alignment_vertical: "top",
              margins: {
                left: 24,
                top: 276,
              },
            },
            {
              hint_text: "Enter OTP here",
              text_variable: "otp_value",
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
              type: "_template_input",
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                top: 206,
              },
            },
            {
              text: "Verify OTP",
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
                  url: "xplore-promote://whatsappOtpIntegration/verifyOtp?otp=@{otp_value}",
                  function: "verifyOtp",
                  log_url: "verifyOtp",
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
              type: "whatsapp_button",
              alignment_horizontal: "left",
              alignment_vertical: "top",
              margins: {
                left: 214,
                top: 276,
              },
            },
          ],
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
      {
        type: "string",
        name: "otp_value",
        value: "",
      },
    ],
  },
  templates: {
    _template_input: {
      type: "input",
      text_variable: "my_borderless_text",
      width: {
        type: "match_parent",
      },
      height: {
        type: "wrap_content",
      },
      text_alignment_horizontal: "left",
      margins: {
        left: 16,
        top: 20,
        right: 16,
        bottom: 16,
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
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
        state_description: "Active input field",
      },
      autocapitalization: "sentences",
      keyboard_type: "default",
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },
      enter_key_type: "done",
      on_focus: [
        {
          type: "highlight",
          highlight_color: "#d3d3d3",
        },
      ],
      visibility: "visible",
      max_length: 100,
      mask: {
        type: "text",
        pattern: "[A-Za-z0-9 ]*",
      },
      text_alignment_vertical: "center",
    },
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
    _template_chatbot: {
      type: "image",
      image_url:
        "https://xplore.objectstore.e2enetworks.net/1739858212180-fc3ddc3169e45e96.png",
      preload_required: true,
      scale: "fit",
      background: [
        {
          type: "solid",
          $color: "background_color",
        },
      ],
      border: {
        corner_radius: 50,
      },
      $alignment_horizontal: "alignment_horizontal",
      $alignment_vertical: "alignment_vertical",
      margins: {
        right: 20,
        bottom: 20,
      },
      actions: [
        {
          log_id: "open_chatbot",
          url: "xplore-promote://chatbot",
        },
      ],
    },
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
    whatsapp_button: {
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
};

export const smsVerifyOTPScreenJSON = {
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
          items: [
            {
              text: "Resend OTP",
              animation_action: "none",
              background: [
                {
                  type: "solid",
                  color: "#ffffff",
                },
              ],
              width: {
                type: "fixed",
                value: 150,
              },
              actions: [
                {
                  log_id: "action_id",
                  url: "xplore-promote://smsIntegration/getOtp?kaleyra",
                  function: "getOtp",
                  log_url: "getOtp",
                  service: "kaleyra",
                },
              ],
              height: {
                type: "fixed",
                value: 40,
              },
              text_color: "#39a6f5",
              font_weight: "bold",
              border: {
                corner_radius: "8",
                stroke: {
                  color: "#39a6f5",
                },
              },
              type: "whatsapp_button",
              alignment_horizontal: "left",
              alignment_vertical: "top",
              margins: {
                left: 24,
                top: 276,
              },
            },
            {
              hint_text: "Enter OTP here",
              text_variable: "otp_value",
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
              type: "_template_input",
              alignment_horizontal: "center",
              alignment_vertical: "top",
              margins: {
                top: 206,
              },
            },
            {
              text: "Verify OTP",
              animation_action: "none",
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
              type: "sms_button",
              alignment_horizontal: "left",
              alignment_vertical: "top",
              margins: {
                left: 194,
                top: 276,
              },
              actions: [
                {
                  log_id: "action_id",
                  url: "xplore-promote://smsIntegration/verifyOtp?provider=kaleyra&otp=@{otp_value}",
                  service: "kaleyra",
                  log_url: "verifyOtp",
                  function: "verifyOtp",
                  otp: "@{otp_value}",
                  phone: "@{phone}",
                  country_code: "@{country_code}",
                },
              ],
            },
          ],
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
      {
        type: "string",
        name: "otp_value",
        value: "",
      },
    ],
  },
  templates: {
    _template_input: {
      type: "input",
      text_variable: "my_borderless_text",
      width: {
        type: "match_parent",
      },
      height: {
        type: "wrap_content",
      },
      text_alignment_horizontal: "left",
      margins: {
        left: 16,
        top: 20,
        right: 16,
        bottom: 16,
      },
      paddings: {
        left: 16,
        top: 10,
        right: 16,
        bottom: 10,
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
        state_description: "Active input field",
      },
      autocapitalization: "sentences",
      keyboard_type: "default",
      background: [
        {
          type: "solid",
          color: "#f8f8f8",
        },
      ],
      border: {
        corner_radius: 8,
        stroke: {
          color: "#cccccc",
          width: 1,
        },
      },
      enter_key_type: "done",
      on_focus: [
        {
          type: "highlight",
          highlight_color: "#d3d3d3",
        },
      ],
      visibility: "visible",
      max_length: 100,
      mask: {
        type: "text",
        pattern: "[A-Za-z0-9 ]*",
      },
      text_alignment_vertical: "center",
    },
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
    _template_chatbot: {
      type: "image",
      image_url:
        "https://xplore.objectstore.e2enetworks.net/1739858212180-fc3ddc3169e45e96.png",
      preload_required: true,
      scale: "fit",
      background: [
        {
          type: "solid",
          $color: "background_color",
        },
      ],
      border: {
        corner_radius: 50,
      },
      $alignment_horizontal: "alignment_horizontal",
      $alignment_vertical: "alignment_vertical",
      margins: {
        right: 20,
        bottom: 20,
      },
      actions: [
        {
          log_id: "open_chatbot",
          url: "xplore-promote://chatbot",
        },
      ],
    },
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
    whatsapp_button: {
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
    sms_button: {
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
};
