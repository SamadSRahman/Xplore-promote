import React from 'react';
import styles from './PreviewCard.module.css';

const PreviewCard = ({ jsonData, handleOnClick, handleInputChange }) => {
    const { card, templates } = jsonData;
    const { states } = card;

    // const getColorValue = str => str?.match(/#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6})/)?.[0] || null;

    const defaultAlignmentStyles = item => ({
        position: 'absolute',
        top: item.alignment_vertical === 'center' ? '50%' : item.margins?.top,
        left: item.alignment_horizontal === 'center' ? '50%' : item.margins?.left,
        right: item.alignment_horizontal === 'right' ? item.margins?.right : 'auto',
        bottom: item.alignment_vertical === 'bottom' ? item.margins?.bottom : 'auto',
        transform: `translate(${item.alignment_horizontal === 'center' ? '-50%' : '0'}, ${item.alignment_vertical === 'center' ? '-50%' : '0'})`,
        margin: item.alignment_horizontal === 'center' ? 'auto' : undefined,
        paddingLeft: item?.paddings?.left,
        paddingTop: item?.paddings?.top,
        paddingRight: item?.paddings?.right,
        paddingBottom: item?.paddings?.bottom,
    });

    const renderItemStyles = item => ({
        ...defaultAlignmentStyles(item),
        color: item.text_color || 'black',
        backgroundColor: item?.background ? item.background[0]?.type==='solid'? item.background[0].color : "": '',
        fontSize: item.font_size,
        width: item.width?.type === 'match_parent' ? '100%' : item.width?.type === 'fixed' ? item.width.value : 'max-content',
        height: item.height?.type === 'fixed' ? item.height.value : 'fit-content',
        borderRadius: item.corners,
        cursor: item.type === 'input_text' ? 'text' : 'default',
    });

    const renderItem = (item, index) => {
        switch (item.type) {
            case 'text':
                return (
                    <p key={index} style={renderItemStyles(item)}>
                        {item.text}
                    </p>
                );
            case 'video':
                return (
                    <div key={index} style={{ ...renderItemStyles(item), maxWidth: '50%' }}>
                        <video
                            src={item.video_sources[0].url}
                            poster={item.preview}
                            controls
                            style={{ width: item.width.value || '100%', height: item.height.value || 'auto', objectFit: 'contain' }}
                        />
                    </div>
                );
            case 'input_text':
                return (
                    <input 
                    onChange={(e) => handleInputChange(item.hint_text, e.target.value)}
                        type={item.keyboard_type?.includes('text') ? 'text' : item.keyboard_type === 'phone' ? 'number' : item.keyboard_type}
                        placeholder={item.hint_text}
                        style={{
                            ...renderItemStyles(item),
                            backgroundColor: item.background?.[0]?.color || templates.input_text.background[0]?.color,
                            border: 'none',
                            
                        }}
                    />
                );
            case '_template_button':
                return (
                    <button
                        key={index}
                        onClick={() => item.actions && handleOnClick(item.actions[0])}
                        style={{
                            ...renderItemStyles(item),
                            border: 'none',
                            cursor: 'pointer',
                            // transform:' translate(0px, 50%)',
                            ...renderBackground(item.background[0])
                        }}
                    >
                        {item.text}
                    </button>
                );
            case 'image':
                return (
                    <div key={index} style={{ ...renderItemStyles(item), width: item.width?.value, height: item.height?.value }}>
                        <img src={item.image_url} alt="Image" style={{ width: '100%', height: '100%', objectFit: item.scale==='fit'?'contain':'cover' }} />
                    </div>
                );
            default:
                return null;
        }
    };

    const renderBackground = background => {
        console.log('background', background);
        
        if (!background) return null;
        const { type, color, angle, colors, image_url, scale, content_alignment_horizontal, content_alignment_vertical } = background;

        if (type === 'solid') return { backgroundColor: color[0] === '@' ? 'white' : color };
        if (type === 'gradient') return { background: `linear-gradient(${(angle? angle-90 : 90)}deg, ${colors.join(', ')})` };
        if (type === 'image') {
            return {
                backgroundImage: `url(${image_url})`,
                backgroundSize: scale === 'fill' ? 'cover' : 'contain',
                backgroundPosition: `${content_alignment_horizontal || 'center'} ${content_alignment_vertical || 'center'}`,
            };
        }
    };

    const renderContainer = (state, index) => {
        const { div } = state;
        return (
            <div
                key={index}
                className={styles.container}
                style={{
                    display: 'flex',
                    flexDirection: div.orientation === 'overlap' ? 'row' : 'column',
                    ...renderBackground(div.background[div.background.length - 1]),
                    width: '100%',
                    height: '100vh',
                    position: 'relative',
                    overflowY:'scroll'
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
