/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
/* eslint-disable indent */
import lottieIcon from '../../assets/components/lottie.svg?url';
import buttonIcon from '../../assets/components/button.svg?url';
import closeIcon from '../../assets/components/close.svg?url';
import listItemIcon from '../../assets/components/list-item.svg?url';
import listIcon from '../../assets/list.svg.svg';
import { type ComponentProperty } from './componentProps';
import { EMPTY_IMAGE } from './doc';

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

interface TemplateProps {
    list_items: ListItemProps[];
  }

  interface ListItemProps {
    list_text: string;
    list_color: string;
    list_text_size: number;
    list_font_weight: 'light' | 'regular' | 'medium' | 'bold';
    image_url: string;
  }

// Example of Action (can be further expanded as per your needs)

// Sample props data
const props: TemplateProps = {
    list_items: [
      {
        list_text: 'Item 1',
        list_color: '#FF5733',
        list_text_size: 14,
        list_font_weight: 'bold',
        image_url: 'https://example.com/item1.png',
      },
      {
        list_text: 'Item 2',
        list_color: '#33FF57',
        list_text_size: 18,
        list_font_weight: 'medium',
        image_url: 'https://example.com/item2.png',
      },
      {
        list_text: 'Item 3',
        list_color: '#3357FF',
        list_text_size: 16,
        list_font_weight: 'light',
        image_url: 'https://example.com/item3.png',
      },
    ],
  };
  const createTemplate = (props: TemplateProps): Record<string, unknown> => {
    const items = (props.list_items || []).map((item) => ({
      type: 'container',
      orientation: 'horizontal',
      items: [
        {
          type: 'image',
          image_url: item.image_url,
          $tint_color: item.list_color,
          width: {
            type: 'fixed',
            value: 28,
            unit: 'sp',
          },
          height: {
            type: 'fixed',
            value: 28,
            unit: 'sp',
          },
          margins: {
            top: 2,
            right: 12,
            bottom: 2,
          },
        },
        {
          type: 'text',
          $text: item.list_text,
          $text_color: item.list_color,
          $font_size: item.list_text_size,
          line_height: 32,
          $font_weight: item.list_font_weight,
          width: {
            type: 'wrap_content',
            constrained: true,
          },
        },
      ],
    }));
  
    return {
      type: 'container',
      orientation: 'vertical',
      items,
    };
  };

export const namedTemplates: Record<string, TemplateDescription> = {


  _template_gallery: {
    nameKey: 'templates.gallery',
    visible: true,
    inShortList: false,
    icon: listIcon, // You'll need to create this icon
    description: { en: 'Customizable gallery component' },
    props: [
      {
        type: 'group',
        title: 'galleryProps.title',
        list: [
          {
            name: 'props.orientation',
            prop: 'orientation',
            type: 'select',
            default: 'horizontal',
            options: [
              {
                name: 'props.orientation_horizontal',
                value: 'horizontal',
              },
              {
                name: 'props.orientation_vertical',
                value: 'vertical',
              },
              {
                name: 'props.orientation_overlap',
                value: 'overlap',
              },
            ],
            enableSources: true,
          },
          {
            name: 'props.item_spacing',
            prop: 'item_spacing',
            type: 'number',
            default: 8,
            enableSources: true,
          },
          {
            name: 'props.items_count',
            prop: 'items_count',
            type: 'number',
            default: 4,
            min: 1,
            max: 10,
            enableSources: true,
          },
        ],
      },
      {
        type: 'group',
        title: 'itemProps.title',
        list: [
          {
            name: 'props.image',
            prop: 'image_url',
            type: 'file',
            subtype: 'image',
            enableSources: true,
          },
          {
            name: 'props.text',
            prop: 'item_text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
          },
          {
            name: 'props.text_color',
            prop: 'text_color',
            type: 'color',
            enableSources: true,
          },
          {
            name: 'props.font_size',
            prop: 'font_size',
            type: 'number',
            default: 22,
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
            sizeValue: 'width',
          },
        ],
      },
    ],
    newNode: {
      type: '_template_gallery',
      orientation: 'horizontal',
      item_spacing: 8,
      items_count: 4,
      image_url:
        'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
      item_text: 'Gallery Item',
      text_color: '#000000',
      font_size: 22,
    },
    template: {
      type: 'gallery',
      $orientation: 'orientation',
      $item_spacing: 'item_spacing',
      width: { type: 'fixed', value: 180 },
      height: { type: 'fixed', value: 200 },
      items: {
        type: 'repeat_times',
        $count: 'items_count',
        items: [
          {
            type: 'container',
            width: { type: 'fixed', value: 180 },
            height: { type: 'fixed', value: 200 },
            items: [
              {
                type: 'image',
                width: { type: 'fixed', value: 120 },
                height: { type: 'match_parent' },
                preload_required: true,
                $image_url: 'image_url',
              },
              {
                type: 'text',
                $text: 'item_text',
                width: { type: 'match_parent' },
                height: { type: 'wrap_content' },
                text_alignment_horizontal: 'center',
                font_weight: 'medium',
                $font_size: 'font_size',
                alpha: 1,
                $text_color: 'text_color',
                margins: { bottom: 10 },
                $actions: 'actions',
              },
            ],
            orientation: 'overlap',
            alignment_vertical: 'bottom',
            content_alignment_horizontal: 'center',
            content_alignment_vertical: 'bottom',
          },
        ],
      },
    },
  },
  _quiz: {
    nameKey: 'templates.quiz',
    visible: true,
    inShortList: false,
    icon: listIcon,
    description: { en: 'Quiz component' },
    props: [
      {
        type: 'group',
        title: ' ',
        list: [
          {
            name: 'props.button_text',
            prop: 'button_text', 
            type: 'string',
            enableTanker: true,
            enableSources: true,
            default: 'Start quiz',
          },
          {
            type: 'split',
            list: [
              {
                name: 'props.font_size',
                prop: 'font_size',
                type: 'integer',
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: 'props.line_height',
                prop: 'line_height',
                type: 'integer',
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: 'props.font_weight',
            prop: 'font_weight',
            type: 'select',
            options: [
              {
                name: 'props.font_weight_light',
                value: 'light',
              },
              {
                name: 'props.font_weight_normal',
                value: 'regular',
              },
              {
                name: 'props.font_weight_medium',
                value: 'medium',
              },
              {
                name: 'props.font_weight_bold',
                value: 'bold',
              },
            ],
            enableSources: true,
          },
          {
            name: 'props.text_color',
            prop: 'text_color',
            type: 'color',
            enableSources: true,
          },
          {
            name: 'props.corners',
            prop: 'corners',
            type: 'integer',
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
          },
        ],
      },
    ],
    newNode: {
      text: 'Click me!',
      background: [
        {
          type: 'solid',
          color: '#000',
        },
      ],
      text_color: '#fff',
      corners: 8,
      actions: [
                {
                  log_id: "action_id",
                  url: "div-screen://open?id=quiz_screen",
                  log_url: "@{on_click_log_url}"
                }
              ]
    },
    template: {
      type: 'container',
      width: { type: 'match_parent' },
      height: { type: 'wrap_content' },
      items: [
        {
          type: '_template_button',
          width: { type: 'wrap_content' },
          height: { type: 'wrap_content' },
          text_color: '#ffffff',
          background_color: '#4CAF50',
          font_size: 16,
          text: 'Start quiz',
          padding: {
            left: 16,
            right: 16,
            top: 8,
            bottom: 8
          },
          border_radius: 4
        }
      ],
      alignment_horizontal: 'center',
      alignment_vertical: 'center'
    },
  },
  _template_button: {
    nameKey: 'templates.button',
    visible: true,
    inShortList: true,
    inlineTextEditorProp: 'text',
    icon: buttonIcon,
    props: [
      {
        type: 'group',
        title: ' ',
        list: [
          {
            name: 'props.text',
            prop: 'text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
            // zero-width space
            default: '​',
          },
          {
            type: 'split',
            list: [
              {
                name: 'props.font_size',
                prop: 'font_size',
                type: 'integer',
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: 'props.line_height',
                prop: 'line_height',
                type: 'integer',
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: 'props.font_weight',
            prop: 'font_weight',
            type: 'select',
            options: [
              {
                name: 'props.font_weight_light',
                value: 'light',
              },
              {
                name: 'props.font_weight_normal',
                value: 'regular',
              },
              {
                name: 'props.font_weight_medium',
                value: 'medium',
              },
              {
                name: 'props.font_weight_bold',
                value: 'bold',
              },
            ],
            enableSources: true,
          },
          {
            name: 'props.text_color',
            prop: 'text_color',
            type: 'color',
            enableSources: true,
          },
          {
            name: 'props.corners',
            prop: 'corners',
            type: 'integer',
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
          },
        ],
      },
    ],
    newNode: {
      text: 'Click me!',
      background: [
        {
          type: 'solid',
          color: '#000',
        },
      ],
      text_color: '#fff',
      corners: 8,
    },
    template: {
      type: 'text',
      text_alignment_horizontal: 'center',
      text_alignment_vertical: 'center',
      border: { $corner_radius: 'corners' },
      paddings: {
        bottom: 15,
        left: 22,
        right: 22,
        top: 15,
      },
      width: { type: 'wrap_content' },
    },
  },
  _template_close: {
    nameKey: 'templates.close',
    visible: true,
    inShortList: true,
    icon: closeIcon,
    props: [
      {
        type: 'group',
        title: 'closeProps.title',
        list: [
          {
            name: 'color',
            prop: 'tint_color',
            type: 'color',
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
          },
        ],
      },
    ],
    newNode: {
      alignment_horizontal: 'right',
      height: { type: 'fixed', value: 28 },
      margins: { top: 20, right: 24 },
      width: { type: 'fixed', value: 28 },
    },
    template: {
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
      preload_required: true,
    },
  },

  _template_map: {
    nameKey: 'templates.map',
    visible: true,
    inShortList: true,
    inlineTextEditorProp: 'text',
    icon: buttonIcon, // You may want to create a specific map icon
    props: [
      {
        type: 'group',
        title: 'mapProps.title',
        list: [
          {
            name: 'props.text',
            prop: 'text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
            default: 'View on Map',
          },
          {
            name: 'props.latitude',
            prop: 'latitude',
            type: 'number',
            enableSources: true,
            default: 0,
          },
          {
            name: 'props.longitude',
            prop: 'longitude',
            type: 'number',
            enableSources: true,
            default: 0,
          },
          {
            type: 'split',
            list: [
              {
                name: 'props.font_size',
                prop: 'font_size',
                type: 'integer',
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: 'props.line_height',
                prop: 'line_height',
                type: 'integer',
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: 'props.font_weight',
            prop: 'font_weight',
            type: 'select',
            options: [
              {
                name: 'props.font_weight_light',
                value: 'light',
              },
              {
                name: 'props.font_weight_normal',
                value: 'regular',
              },
              {
                name: 'props.font_weight_medium',
                value: 'medium',
              },
              {
                name: 'props.font_weight_bold',
                value: 'bold',
              },
            ],
            enableSources: true,
          },
          {
            name: 'props.text_color',
            prop: 'text_color',
            type: 'color',
            enableSources: true,
          },
          {
            name: 'props.corners',
            prop: 'corners',
            type: 'integer',
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
          },
        ],
      },
    ],
    newNode: {
      text: 'View on Map',
      latitude: 0,
      longitude: 0,
      background: [
        {
          type: 'solid',
          color: '#000',
        },
      ],
      text_color: '#fff',
      corners: 8,
      actions: [
        {
          log_id: "open_map",
          url: "https://www.google.com/maps?q=0,0",
          _template_map: true,
        }
      ]
    },
    template: {
      type: 'text',
      $latitude: 'latitude',  // Add this
      $longitude: 'longitude',
      $text: 'text',
      text_alignment_horizontal: 'center',
      text_alignment_vertical: 'center',
      border: { $corner_radius: 'corners' },
      paddings: {
        bottom: 15,
        left: 22,
        right: 22,
        top: 15,
      },
      width: { type: 'wrap_content' },
      $actions: [{
        log_id: "open_map",
        url: {
          type: 'expression',
           value: 'https://www.google.com/maps?q=' + '$latitude' + ',' + '$longitude'
        },
        _template_map: true
      }]
    },
  },
  _template_contact_us: {
    nameKey: 'templates.contact_us',
    visible: true,
    inShortList: true,
    inlineTextEditorProp: 'text',
    icon: buttonIcon, // You may want to create a specific map icon
    props: [
      {
        type: 'group',
        title: 'contactUsProps.title',
        list: [
          {
            name: 'props.text',
            prop: 'text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
            default: 'View on Map',
          },
          {
            type: 'split',
            list: [
              {
                name: 'props.font_size',
                prop: 'font_size',
                type: 'integer',
                min: 1,
                max: 1000,
                enableSources: true,
              },
              {
                name: 'props.line_height',
                prop: 'line_height',
                type: 'integer',
                min: 0,
                max: 1000,
                enableSources: true,
              },
            ],
          },
          {
            name: 'props.font_weight',
            prop: 'font_weight',
            type: 'select',
            options: [
              {
                name: 'props.font_weight_light',
                value: 'light',
              },
              {
                name: 'props.font_weight_normal',
                value: 'regular',
              },
              {
                name: 'props.font_weight_medium',
                value: 'medium',
              },
              {
                name: 'props.font_weight_bold',
                value: 'bold',
              },
            ],
            enableSources: true,
          },
          {
            name: 'props.text_color',
            prop: 'text_color',
            type: 'color',
            enableSources: true,
          },
          {
            name: 'props.corners',
            prop: 'corners',
            type: 'integer',
            min: 0,
            max: 100,
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
          },
        ],
      },
    ],
    newNode: {
      text: 'Contact Us',
      background: [
        {
          type: 'solid',
          color: '#000',
        },
      ],
      text_color: '#fff',
      corners: 8,
      actions: [
        {
          log_id: "contact_us",
          url: "div-screen://open?id=contact_us_screen",
        }
      ]
    },
    template: {
      type: 'text',
      $latitude: 'latitude',  // Add this
      $longitude: 'longitude',
      $text: 'text',
      text_alignment_horizontal: 'center',
      text_alignment_vertical: 'center',
      border: { $corner_radius: 'corners' },
      paddings: {
        bottom: 15,
        left: 22,
        right: 22,
        top: 15,
      },
      width: { type: 'wrap_content' },
      $actions: [{
        log_id: "open_map",
        url: {
          type: 'expression',
           value: 'https://www.google.com/maps?q=' + '$latitude' + ',' + '$longitude'
        },
        _template_map: true
      }]
    },
  },

  _template_native_signup: {
    nameKey: 'templates.native_signup',
    visible: true,
    inShortList: true,
    icon: buttonIcon,
    description: { en: 'Native authentication button (Google/Apple Sign In)' },
    props: [
      {
        type: 'group',
        title: 'authProps.title',
        list: [
          {
            name: 'props.auth_type',
            prop: 'auth_type',
            type: 'select',
            options: [
              {
                name: 'props.auth_type_all',
                value: 'all',
              },
              {
                name: 'props.auth_type_google',
                value: 'google',
              },
              {
                name: 'props.auth_type_apple',
                value: 'apple',
              },
            ],
            default: 'all',
            enableSources: true,
          },
          {
            name: 'props.text',
            prop: 'text',
            type: 'string',
            default: 'Sign in',
            enableSources: true,
          },
          {
            name: 'props.background',
            prop: 'background_color',
            type: 'color',
            default: '#2C3E50',
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
          },
        ],
      },
    ],
    newNode: {
      auth_type: 'all',
      text: 'Sign in',
      background_color: '#2C3E50',
      custom_props: {
        $text: 'text',
        $background: 'background',
        $auth_type: 'auth_type'
      },
      actions: [
        {
          log_id: "native_auth",
          url: "xplorePromote://native-auth://authenticate",
        }
      ]
    },
    template: {
      type: 'custom',
      custom_type: 'native_auth',
      alignment_horizontal: 'center',
      alignment_vertical: 'center',
      custom_props: {
        $text: 'text',
        $background: 'background',
        $auth_type: 'auth_type'
      },
      $actions: 'actions'
    },
  },
  button_template: {
    nameKey: 'templates.button',
  
    visible: true,
    inShortList: false,
    icon: buttonIcon,
    description: { en: 'Button component' },
    props: [
      {
        type: 'group',
        title: 'buttonProps.title',
        list: [
          {
            name: 'props.text',
            prop: 'text',
            type: 'string',
            default: 'Button',
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
          },
          {
            name: 'props.animation_action',
            prop: 'animation_action',
            type: 'select',
            options: [],
            default: 'none',
            enableSources: true,
          }
        ]
      }
    ],
    newNode: {
      text: 'Button',
    
      animation_action: 'none',
      actions: [] 
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
    }
  },
  _template_checkbox: {
    nameKey: 'templates.checkbox',
    visible: true,
    inShortList: true,
    icon: listIcon,
    description: { en: 'Customizable checkbox component' },
    props: [
      {
        type: 'group',
        title: 'checkboxProps.title',
        list: [
          {
            name: 'props.initial_state',
            prop: 'initial_state',
            type: 'select',
            default: 'unchecked',
            options: [
              {
                name: 'props.state_unchecked',
                value: 'unchecked',
              },
              {
                name: 'props.state_checked',
                value: 'checked',
              }
            ],
            enableSources: true,
          },
          {
            name: 'props.size',
            prop: 'size',
            type: 'number',
            default: 24,
            min: 16,
            max: 48,
            enableSources: true,
          },
          {
            name: 'props.label',
            prop: 'label_text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
          },
          {
            name: 'props.label_color',
            prop: 'label_color',
            type: 'color',
            enableSources: true,
          },
          {
            name: 'props.font_size',
            prop: 'font_size',
            type: 'number',
            default: 16,
            enableSources: true,
          },
          {
            name: 'props.checked_color',
            prop: 'checked_color',
            type: 'color',
            default: '#3F28C3',
            enableSources: true,
          },
          {
            name: 'props.unchecked_color',
            prop: 'unchecked_color',
            type: 'color',
            default: '#FFFFFF',
            enableSources: true,
          },
          {
            name: 'props.actions',
            prop: 'actions',
            type: 'actions2',
            sizeValue: 'width',
          },
        ],
      }
    ],
    newNode: {
      type: '_template_checkbox',
      initial_state: 'unchecked',
      size: 24,
      label_text: 'Checkbox Label',
      label_color: '#000000',
      font_size: 16,
      checked_color: '#3F28C3',
      unchecked_color: '#FFFFFF',
      actions: []
    },
    template: {
      type: 'state',
      id: 'checkbox_state',
      states: [
        {
          state_id: 'unchecked',
          div: {
            type: 'container',
            orientation: 'horizontal',
            items: [
              {
                type: 'container',
                width: { type: 'fixed', $value: 'size' },
                height: { type: 'fixed', $value: 'size' },
                border: {
                  corner_radius: 4,
                  stroke: {
                    color: '#CCCCCC',
                    width: 2
                  }
                },
                background: [
                  {
                    type: 'solid',
                    $color: 'unchecked_color'
                  }
                ],
                actions: [
                  {
                    log_id: 'toggle_checkbox',
                    url: 'div-action://set_state?state_id=0/checkbox_state/checked'
                  },
                  {
                    "log_id": "update_checkbox_state",
                    "url": "div-action://set_variable?name=checkbox_state&value=true"
                  }
                ]
              },
              {
                type: 'text',
                $text: 'label_text',
                $font_size: 'font_size',
                $text_color: 'label_color',
                margins: { left: 8 },
                width: { type: 'wrap_content' },
                height: { type: 'wrap_content' }
              }
            ]
          }
        },
        {
          state_id: 'checked',
          div: {
            type: 'container',
            orientation: 'horizontal',
            items: [
              {
                type: 'container',
                width: { type: 'fixed', $value: 'size' },
                height: { type: 'fixed', $value: 'size' },
                border: {
                  corner_radius: 4,
                  stroke: {
                    color: '#3F28C3',
                    width: 2
                  }
                },
                background: [
                  {
                    type: 'solid',
                    $color: 'checked_color'
                  }
                ],
                items: [
                  {
                    type: 'text',
                    text: '✓',
                    text_color: '#FFFFFF',
                    font_size: 16,
                    text_alignment_horizontal: 'center',
                    text_alignment_vertical: 'center',
                    width: { type: 'match_parent' },
                    height: { type: 'match_parent' }
                  }
                ],
                actions: [
                  {
                    log_id: 'toggle_checkbox',
                    url: 'div-action://set_state?state_id=0/checkbox_state/unchecked'
                  },
                  {
                    "log_id": "update_checkbox_state",
                    "url": "div-action://set_variable?name=checkbox_state&value=false"
                  }
                ]
              },
              {
                type: 'text',
                $text: 'label_text',
                $font_size: 'font_size',
                $text_color: 'label_color',
                margins: { left: 8 },
                width: { type: 'wrap_content' },
                height: { type: 'wrap_content' }
              }
            ]
          }
        }
      ]
    }
}
,

};

export function isTemplate(name: string): boolean {
  return namedTemplates.hasOwnProperty(name);
}

export function getTemplateBaseType(name: string): string | undefined {
  return namedTemplates[name]?.baseType;
}
