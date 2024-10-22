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
