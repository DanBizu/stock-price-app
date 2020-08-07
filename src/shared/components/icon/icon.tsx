import React from 'react';

interface Props {
    onPress: () => void;
    icon: string;
    iconHovered?: string;
}

export const Icon: React.FunctionComponent<Props> = (props: Props) => {
    const { icon, iconHovered } = props;

    return (
        <div id="icon">
            <p>{icon}</p>
            {
                !!iconHovered &&
                <p>{iconHovered}</p>
            }
        </div>
    );
}