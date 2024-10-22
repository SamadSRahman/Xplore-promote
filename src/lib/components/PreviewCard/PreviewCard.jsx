import React from 'react';
import styles from './PreviewCard.module.css';

const PreviewCard = ({ jsonData }) => {
    const { card } = jsonData;
    const { states } = card;

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
                marginBottom: item.margins?.bottom,
                marginLeft: item.margins?.left,
                marginRight: item.margins?.right,
                marginTop: item.margins?.top,
                textAlign: item.alignment_horizontal,
            }}
          >
            {item.text}
          </p>
                );
            case 'image':
                return (
          <img
            key={index}
            src={item.image_url}
            alt="Image"
            style={{
                width: item.width?.value,
                height: item.height?.value,
                marginTop: item.margins?.top,
            }}
          />
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
                backgroundColor: background.color,
            };
        }

        if (background.type === 'gradient') {
            return {
                background: `linear-gradient(${background.angle}deg, ${background.colors.join(
                    ', '
                )})`,
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
            flexDirection: div.orientation === 'overlap' ? 'column' : 'column',
            justifyContent: div.alignment_vertical || 'center',
            alignItems: div.alignment_horizontal || 'center',
            ...renderBackground(div.background[0]), // Assuming only 1 background per container
            width: '100%',
            height: '100vh', // Full screen preview
            position: 'relative',
        }}
      >
        {div.items.map(renderItem)}
      </div>
        );
    };

    return (
    <div className={styles.container}>
      {states.map((state, index) => renderContainer(state, index))}
    </div>
    );
};

export default PreviewCard;