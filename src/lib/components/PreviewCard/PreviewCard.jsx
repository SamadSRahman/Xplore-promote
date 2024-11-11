/* eslint-disable no-nested-ternary */
import React from 'react';
import styles from './PreviewCard.module.css';


const PreviewCard = ({ jsonData, handleOnClick,  }) => {
    const { card, templates } = jsonData;
    console.log('card:',jsonData, card);
    
    const { states } = card;
    //templates.input_text.background
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
                            textAlign: item.text_alignment_horizontal ? item.text_alignment_horizontal : 'left',
                            width: item.width.type === 'match_parent' ? '100%' : item.width.type==='fixed'? item.width.value : item.width.type==='wrap_content'?'max-content':'',
                            fontSize: item.font_size,
                            backgroundColor: item?.background ? item?.background[0]?.color : '',
                            color: item.text_color ? item.text_color : 'black',
                            marginBottom: item.margins?.bottom || 0,
                            marginLeft: item.margins?.left || 0,
                            marginRight: item.margins?.right || 0,
                            // marginTop: item.margins?.top || 0,
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
            case 'video':
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
                            poster={item.preview}
                            controls
                            style={{
                                width: item.width?.type === 'wrap_content' ? 'min-content' : item.width.type === 'fixed' ? item.width.value : '',
                                height: item.height.value,
                                //  objectFit: item.scale === 'fit' ? 'contain' : 'cover',
                                objectFit: 'contain',
                                //    left: item.margins?.left,
                                //    top: `${item.margins?.top}px`
                            }}

                        />
                    </div>
                );
            case 'input_text':
                return (
                    <input type={item.keyboard_type?.includes('text') ? 'text' : item.keyboard_type === 'phone'? 'number' : item?.keyboard_type}
                        placeholder={item.hint_text}
                        style={{
                            cursor:'text',
                            position: 'absolute',
                            accentColor:'black',
                            color: item.text_color? item.text_color:'black',
                            backgroundColor: item.background ? item.background[item.background.length - 1].color : templates.input_text.background[templates.input_text.background.length - 1].color,
                            borderRadius: item.corners,
                            width: item.width?.type === 'wrap_content' ? 'min-content' : item.width?.type === 'fixed' ? item.width.value : '',
                            height: item.height ? item.height?.value : 'fit-content',
                            top: item.alignment_vertical === 'top' ? item.margins?.top || 0 : item.alignment_vertical === 'center' ? '50%' : 'auto',
                            left: item.alignment_horizontal === 'center' ? '50%' : item.alignment_horizontal === 'right' ? 'auto' : 0,
                            right: item.alignment_horizontal === 'right' ? item.margins?.right || 0 : 'auto',
                            bottom: item.alignment_vertical === 'bottom' ? item.margins?.bottom || 0 : 'auto',
                            transform: `translate(${item.alignment_horizontal === 'center' ? '-50%' : '0'}, ${item.alignment_vertical === 'center' ? '-50%' : '0'}) rotate(${item.transform?.rotation || 0}deg)`,
                            paddingLeft: item?.paddings?.left,
                            paddingTop: item?.paddings?.top,
                            paddingRight: item?.paddings?.right,
                            paddingBottom: item?.paddings?.bottom,
                            border: 'none',
                            fontSize: item?.font_size ? item?.font_size : '',
                        }}
                    />
                )
            case '_template_button':
                return (
                    <button
                    onClick={item.actions? ()=>handleOnClick(item.actions[0]): ''}
                        style={{
                            position: 'absolute',
                            backgroundColor: item.background[0].color,
                            color: item.text_color,
                            borderRadius: item.corners,
                            width: item.width?.type === 'wrap_content' ? 'max-content' : item.width.type==='fixed'? item.width.value:'',
                            height: item.height ? item.height?.value : 'fit-content',
                            top: item.alignment_vertical === 'top' ? item.margins?.top || 0 : item.alignment_vertical === 'center' ? '50%' : 'auto',
                            left: item.alignment_horizontal === 'center' ? '50%' : item.alignment_horizontal === 'right' ? 'auto' : 0,
                            right: item.alignment_horizontal === 'right' ? item.margins?.right || 0 : 'auto',
                            bottom: item.alignment_vertical === 'bottom' ? item.margins?.bottom || 0 : 'auto',
                            transform: `translate(${item.alignment_horizontal === 'center' ? '-50%' : '0'}, ${item.alignment_vertical === 'center' ? '-50%' : '0'}) rotate(${item.transform?.rotation || 0}deg)`,
                            paddingLeft: item?.paddings?.left,
                            paddingTop: item?.paddings?.top,
                            paddingRight: item?.paddings?.right,
                            paddingBottom: item?.paddings?.bottom,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: item?.font_size ? item?.font_size : '',
                            marginBottom: item.margins?.bottom || 0,
                            marginLeft: item.margins?.left || 0,
                            marginRight: item.margins?.right || 0,
                            // marginTop: item.margins?.top || 0,
                        }}
                    >{item.text}</button>
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
                backgroundColor: background.color[0] === '@' ? 'white' : background.color,
            };
        }

        if (background.type === 'gradient') {
            return {
                background: `linear-gradient(${background.angle ? background.angle-90 : 90}deg, ${background.colors.join(', ')})`,
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
                    ...renderBackground(div.background[div.background.length - 1]), // Assuming only 1 background per container
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
