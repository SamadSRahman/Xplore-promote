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
  // horizontal_grid: {
  //     nameKey: 'templates.horizontal_grid',
  //     visible: true,
  //     inShortList: true,
  //     icon: gridIcon, // You'll need to create this icon
  //     description: { en: 'Horizontal grid with 50% width items' },
  //     props: [
  //         {
  //             type: 'group',
  //             title: 'gridProps.title',
  //             list: [
  //                 {
  //                     name: 'props.item_count',
  //                     prop: 'item_count',
  //                     type: 'integer',
  //                     min: 2,
  //                     max: 10,
  //                     default: 2
  //                 },
  //                 {
  //                     type: 'group',
  //                     title: 'gridProps.items',
  //                     // list: Array.from({ length: 10 }, (_, i) => [
  //                     //     {
  //                     //         name: `props.item_${i + 1}_background`,
  //                     //         prop: `item_${i + 1}_background`,
  //                     //         type: 'file',
  //                     //         subtype: 'image',
  //                     //         enableSources: true,
  //                     //         show: { prop: 'item_count', condition: 'gte', value: i + 1 }
  //                     //     },
  //                     //     {
  //                     //         name: `props.item_${i + 1}_text`,
  //                     //         prop: `item_${i + 1}_text`,
  //                     //         type: 'string',
  //                     //         enableTanker: true,
  //                     //         enableSources: true,
  //                     //         show: { prop: 'item_count', condition: 'gte', value: i + 1 }
  //                     //     }
  //                     // ]).flat()
  //                     list: [
  //                         {
  //                                 name: `props.item_${1}_background`,
  //                                 prop: `item_${1}_background`,
  //                                 type: 'file',
  //                                 subtype: 'image',
  //                                 enableSources: true,
  //                             },
  //                         {
  //                                 name: `props.item_${1}_background`,
  //                                 prop: `item_${1}_background`,
  //                                 type: 'string',
  //                                 enableSources: true,

  //                             }
  //                         ]
  //                 }
  //             ]
  //         }
  //     ],
  //     newNode: {
  //         type: 'horizontal_grid',
  //         item_count: 2,
  //         item_1_background: 'https://example.com/placeholder1.jpg',
  //         item_1_text: 'Item 1',
  //         item_2_background: 'https://example.com/placeholder2.jpg',
  //         item_2_text: 'Item 2'
  //     },
  //     template: {
  //         type: 'container',
  //         orientation: 'horizontal',
  //         width: { type: 'match_parent' },
  //         height: { type: 'wrap_content' },
  //         items: {
  //             type: 'repeat',
  //             count: '$item_count',
  //             item: {
  //                 type: 'container',
  //                 width: { type: 'fixed', value: '50%' },
  //                 height: { type: 'wrap_content' },
  //                 background: [
  //                     {
  //                         type: 'image',
  //                         $image_url: '${"item_" + (index + 1) + "_background"}',
  //                         scale: 'fill'
  //                     }
  //                 ],
  //                 items: [
  //                     {
  //                         type: 'text',
  //                         $text: '${"item_" + (index + 1) + "_text"}',
  //                         font_size: 16,
  //                         font_weight: 'medium',
  //                         text_color: '#FFFFFF',
  //                         max_lines: 2,
  //                         margins: { all: 16 }
  //                     }
  //                 ]
  //             }
  //         }
  //     }
  // },
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

  _template_list: {
    nameKey: 'templates.list',
    visible: true,
    inShortList: false,
    icon: listIcon, // You'll need to create this icon
    description: { en: 'Custom container-like component' },
    props: [
      {
        type: 'group',
        title: 'containerProps.title',
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
            name: 'props.content_alignment',
            type: 'alignment',
            horizontalProp: 'content_alignment_horizontal',
            verticalProp: 'content_alignment_vertical',
            orientationProp: 'orientation',
            isContent: true,
          },
        ],
      },
      {
        type: 'group',
        title: 'listProps.title',
        list: [
          {
            name: 'props.image',
            prop: 'image_url',
            type: 'file',
            subtype: 'image',
            enableSources: true,
          },
          {
            name: 'props.heading',
            prop: 'heading_text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
          },
          {
            name: 'props.subheading',
            prop: 'subheading_text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
          },
          {
            name: 'props.button_text',
            prop: 'button_text',
            type: 'string',
            enableTanker: true,
            enableSources: true,
          },
          {
            name: 'props.button_text_color',
            prop: 'button_text_color',
            type: 'color',
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
      type: '_template_list',
      orientation: 'horizontal',
      content_alignment_horizontal: 'center',
      content_alignment_vertical: 'center',
      image_url: 'https://yastatic.net/s3/home/divkit/placeholder.png',
      heading_text: 'Heading',
      subheading_text: 'Subheading',
      button_text: 'Action',
      button_text_color: '#02bba4',
    },
    template: {
      type: 'container',
      $orientation: 'orientation',
      width: { type: 'match_parent' },
      height: { type: 'wrap_content' },
      $alignment_horizontal: 'content_alignment_horizontal',
      $alignment_vertical: 'content_alignment_vertical',
      margins: { left: 16, right: 16, top: 8, bottom: 8 },
      items: [
        {
          type: 'image',
          width: { type: 'fixed', value: 48 },
          height: { type: 'fixed', value: 48 },
          $image_url: 'image_url',
        },
        {
          type: 'container',
          orientation: 'horizontal',
          width: { type: 'match_parent', weight: 1 },
          alignment_vertical: 'center',
          margins: { left: 16 },
          items: [
            {
              type: 'container',
              orientation: 'vertical',
              width: { type: 'wrap_content', weight: 1 },
              items: [
                {
                  type: 'text',
                  $text: 'heading_text',
                  font_size: 16,
                  font_weight: 'bold',
                  max_lines: 1,
                },
                {
                  type: 'text',
                  $text: 'subheading_text',
                  font_size: 14,
                  color: '#666666',
                  max_lines: 2,
                },
              ],
            },
            {
              type: 'text',
              $text: 'button_text',
              font_size: 14,
              font_weight: 'medium',
              $text_color: 'button_text_color',
              paddings: { left: 12, right: 12, top: 8, bottom: 8 },
              width: { type: 'wrap_content' },
              border: {
                corner_radius: 4,
                stroke: {
                  color: '#0077FF',
                  width: 1,
                },
              },
              $actions: 'actions',
            },
          ],
        },
      ],
    },
  },
  _template_lottie: {
    nameKey: 'templates.lottie',
    visible: true,
    inShortList: true,
    icon: lottieIcon,
    props: [
      {
        type: 'group',
        title: 'lottieProps.title',
        list: [
          {
            name: 'props.lottie_url',
            prop: 'lottie_params.lottie_url',
            type: 'file',
            subtype: 'lottie',
            enableSources: true,
          },
          {
            name: 'props.preview',
            prop: 'preview',
            type: 'file',
            subtype: 'image_preview',
            enableSources: true,
          },
        ],
      },
    ],
    newNode: {
      lottie_params: {
        lottie_url: '',
        repeat_count: -1,
        repeat_mode: 'restart',
      },
      width: {
        type: 'fixed',
        value: 100,
      },
      height: {
        type: 'fixed',
        value: 100,
      },
    },
    template: {
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
      text: 'Hi',
      background: [
        {
          type: 'solid',
          color: '#000',
        },
      ],
      text_color: '#fff',
      corners: 4,
    },
    template: {
      type: 'text',
      text_alignment_horizontal: 'center',
      text_alignment_vertical: 'center',
      border: { $corner_radius: 'corners' },
      paddings: {
        bottom: 24,
        left: 28,
        right: 28,
        top: 22,
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
  _template_list_item: {
    nameKey: 'templates.list_item',
    visible: true,
    icon: listItemIcon,
    props: [
      {
        type: 'group',
        title: 'listItemProps.title',
        list: [
          {
            name: 'props.text',
            prop: 'list_text',
            type: 'string',
            enableTanker: true,
            default: '\0',
            enableSources: true,
          },
          {
            name: 'props.font_size',
            prop: 'list_text_size',
            type: 'integer',
            min: 1,
            max: 1000,
            enableSources: true,
          },
          {
            name: 'props.font_weight',
            prop: 'list_font_weight',
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
            prop: 'list_color',
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
      list_text: 'Text',
      list_color: '#000',
      list_text_size: 24,
      list_font_weight: 'medium',
    },
    template: {
      type: 'container',
      orientation: 'horizontal',
      items: [
        {
          type: 'image',
          image_url:
            'https://yastatic.net/s3/home/div/div_fullscreens/hyphen.4.png',
          $tint_color: 'list_color',
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
          $text: 'list_text',
          $text_color: 'list_color',
          $font_size: 'list_text_size',
          line_height: 32,
          $font_weight: 'list_font_weight',
          width: {
            type: 'wrap_content',
            constrained: true,
          },
        },
      ],
    },
  },
  _template_list_new: {
    nameKey: 'templates.list_item',
  visible: true,
  icon: listItemIcon,
  props: [
    {
        type: 'group',
        title: 'listProps.title',
        list: [
          {
            name: 'listItemProps.title',
            prop: 'list_items',
            type: 'array',
            arrayType: 'object',
            minItems: 1,
            maxItems: 10, // You can adjust this as needed
            fields: [
              {
                name: 'props.image',
                prop: 'image_url',
                type: 'file',
                subtype: 'image',
                enableSources: true
              },
              {
                name: 'props.text',
                prop: 'list_text',
                type: 'string',
                default: 'List Item',
                enableSources: true
              },
              {
                name: 'props.font_size',
                prop: 'list_text_size',
                type: 'integer',
                min: 1,
                max: 1000,
                default: 16,
                enableSources: true
              },
              {
                name: 'props.font_weight',
                prop: 'list_font_weight',
                type: 'select',
                options: [
                  { name: 'props.font_weight_light', value: 'light' },
                  { name: 'props.font_weight_normal', value: 'regular' },
                  { name: 'props.font_weight_medium', value: 'medium' },
                  { name: 'props.font_weight_bold', value: 'bold' }
                ],
                default: 'regular',
                enableSources: true
              },
              {
                name: 'props.text_color',
                prop: 'list_color',
                type: 'color',
                default: '#000000',
                enableSources: true
              }
            ]
          }
        ]
      }
    ],
    newNode: {
      list_items: [
        {
          list_text: 'Item 1',
          list_color: '#000000',
          list_text_size: 16,
          list_font_weight: 'regular',
          image_url: 'https://yastatic.net/s3/home/div/div_fullscreens/hyphen.4.png'
        },
        {
          list_text: 'Item 2',
          list_color: '#000000',
          list_text_size: 16,
          list_font_weight: 'regular',
          image_url: 'https://yastatic.net/s3/home/div/div_fullscreens/hyphen.4.png'
        },
        {
          list_text: 'Item 3',
          list_color: '#000000',
          list_text_size: 16,
          list_font_weight: 'regular',
          image_url: 'https://yastatic.net/s3/home/div/div_fullscreens/hyphen.4.png'
        }
      ]
    },
    template: {
        type: 'container',
        orientation: 'vertical',
        items: {
          type: 'array',
          value: {
            $ref: 'list_items'
          },
          itemTemplate: {
            type: 'container',
            orientation: 'horizontal',
            items: [
              {
                type: 'image',
                $image_url: {
                  $ref: 'image_url'
                },
                $tint_color: {
                  $ref: 'list_color'
                },
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
                $text: {
                  $ref: 'list_text'
                },
                $text_color: {
                  $ref: 'list_color'
                },
                $font_size: {
                  $ref: 'list_text_size'
                },
                line_height: 32,
                $font_weight: {
                  $ref: 'list_font_weight'
                },
                width: {
                  type: 'wrap_content',
                  constrained: true,
                },
              },
            ],
          },
        },
      },
}
};

export function isTemplate(name: string): boolean {
  return namedTemplates.hasOwnProperty(name);
}

export function getTemplateBaseType(name: string): string | undefined {
  return namedTemplates[name]?.baseType;
}
