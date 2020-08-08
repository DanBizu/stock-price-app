import React from 'react';

interface Props {
    onPress: () => void;
    icon: string;
    iconHovered?: string;
}

export const Icon: React.FunctionComponent<Props> = (props: Props) => {
    const { icon, onPress } = props;

    return (
        <button id="icon" onClick={onPress}>
            <img src={require(`../../assets${icon}`)} alt='icon'/>
        </button>
    );
}