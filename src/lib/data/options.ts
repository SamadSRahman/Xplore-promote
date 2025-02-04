export type OptionItem = {
    text: string;
    value: string;
};

export interface Option {
    type: 'option';
    text: string;
    value: string;
    alignment_horizontal?: 'left' | 'center' | 'right';
    alignment_vertical?: 'top' | 'center' | 'bottom';
}

export function optionPreview(option: Option, lang: {
    optionText: string;
    noOptionText: string;
}): string {
    if (!option.text) {
        return lang.noOptionText;
    }
    return lang.optionText.replace('%s', () => option.text);
}

export function createOption(text: string = '', value: string = ''): Option {
    return {
        type: 'option',
        text,
        value,
        alignment_horizontal: 'center',
        alignment_vertical: 'center'
    };
}

export function isOption(option: unknown): option is Option {
    return typeof option === 'object' && 
           option !== null && 
           'type' in option && 
           (option as Option).type === 'option';
}