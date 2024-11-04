/* eslint-disable no-nested-ternary */
import React from 'react';
import styles from './PreviewCard.module.css';

const PreviewCard = ({ jsonData }) => {
    const { card } = jsonData;
    const { states } = card;


    const getColorValue = str => {
        const match = str.match(/#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6})/);
        return match ? match[0] : null;
    };

    // Handle rendering individual items like images and text
    const renderItem = (item, index) => {
        switch (item.type) {
            case 'text':
                return (
                    <p
                    key={index}
                    style={{
                        fontSize: item.font_size,
                        color: item.text_color,
                        marginBottom: item.margins?.bottom || 0,
                        marginLeft: item.margins?.left || 0,
                        marginRight: item.margins?.right || 0,
                        marginTop: item.margins?.top || 0,
                        textAlign: item.alignment_horizontal,
                        margin: item.alignment_horizontal === 'center' ? 'auto' : undefined,
                        position: 'absolute',
                        top: item.alignment_vertical === 'center' ? '50%' : item.margins?.top,
                        left: item.alignment_horizontal === 'center' ? '50%' : item.margins?.left,
                        transform: `${item.alignment_horizontal === 'center' ? 'translateX(-50%)' : ''} ${item.alignment_vertical === 'center' ? 'translateY(-50%)' : ''}`.trim(),
                    }}
                  >
                    {item.text}
                  </p>
                );
            case 'video' :
                return (
                  <div
                  key={index}
                  style={{
                      maxWidth: '50%',
                      position: 'absolute',
                      width: item.width?.type === 'wrap_content' ? 'min-content' : '',
                      height: item.height?.value,
                      top: item.alignment_vertical === 'top' ? item.margins?.top || 0 : item.alignment_vertical === 'center' ? '50%' : 'auto',
                      left: item.alignment_horizontal === 'center' ? '50%' : item.alignment_horizontal === 'right' ? 'auto' : 0,
                      right: item.alignment_horizontal === 'right' ? item.margins?.right || 0 : 'auto',
                      bottom: item.alignment_vertical === 'bottom' ? item.margins?.bottom || 0 : 'auto',
                      transform: `translate(${item.alignment_horizontal === 'center' ? '-50%' : '0'}, ${item.alignment_vertical === 'center' ? '-50%' : '0'}) rotate(${item.transform?.rotation || 0}deg)`,
                  }}
                  >
                      <video src={item.video_sources[0].url}
                       style={{
                           width: item.width?.type === 'wrap_content' ? 'min-content' : '',
                           height: item.width.value,
                           //  objectFit: item.scale === 'fit' ? 'contain' : 'cover',
                           objectFit: 'contain',
                           left: item.margins?.left,
                           top: `${item.margins?.top}px`
                       }}

                      />
                  </div>
                );
            case 'image':
                return (
          <div
            key={index}
            style={{
                position: 'absolute',
                width: item.width?.value,
                height: item.height?.value,
                top: item.alignment_vertical === 'top' ? item.margins?.top || 0 : item.alignment_vertical === 'center' ? '50%' : 'auto',
                left: item.alignment_horizontal === 'center' ? '50%' : item.alignment_horizontal === 'right' ? 'auto' : 0,
                right: item.alignment_horizontal === 'right' ? item.margins?.right || 0 : 'auto',
                bottom: item.alignment_vertical === 'bottom' ? item.margins?.bottom || 0 : 'auto',
                transform: `translate(${item.alignment_horizontal === 'center' ? '-50%' : '0'}, ${item.alignment_vertical === 'center' ? '-50%' : '0'}) rotate(${item.transform?.rotation || 0}deg)`,
            }}
          >
            <img
              src={item.image_url}
              alt="Image"
              style={{
                  width: item.width.value,
                  height: item.width.value,
                  objectFit: item.scale === 'fit' ? 'contain' : 'cover',
                  left: item.margins?.left,
                  top: `${item.margins?.top}px`
              }}
            />
          </div>
                );
            default:
                return null;
        }
    };

    // Render background based on the type (solid, gradient, image)
    const renderBackground = background => {
        if (!background) return null;

        if (background.type === 'solid') {
            return {
                backgroundColor: getColorValue(background.color),
            };
        }

        if (background.type === 'gradient') {
            return {
                background: `linear-gradient(${background.angle}deg, ${background.colors.join(', ')})`,
            };
        }

        if (background.type === 'image') {
            return {
                backgroundImage: `url(${background.image_url})`,
                backgroundSize: background.scale === 'fill' ? 'cover' : 'contain',
                backgroundPosition: `${background.content_alignment_horizontal} ${background.content_alignment_vertical}`,
            };
        }
    };

    // Handle rendering the container with its items and background
    const renderContainer = (state, index) => {
        const { div } = state;
        return (
      <div
        key={index}
        style={{
            display: 'flex',
            flexDirection: div.orientation === 'overlap' ? 'row' : 'column',
            // justifyContent: div.alignment_vertical || 'center',
            // alignItems: div.alignment_horizontal || 'center',
            ...renderBackground(div.background[0]), // Assuming only 1 background per container
            width: '100%',
            height: '100vh', // Full screen preview
            position: 'relative',
        }}
      >
        {div?.items?.map(renderItem)}
      </div>
        );
    };

    return (
    <div className={styles.wrapper}>
      {states.map((state, index) => renderContainer(state, index))}
    </div>
    );
};

export default PreviewCard;
