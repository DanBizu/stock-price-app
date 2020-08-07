import React from 'react';

interface Props {
    label: string;
    propertyName: string;
    onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
    options: string[];
}

/**
 * Minimal Select tag
 */
export function Select(props: Props) {
    const { label, propertyName, onChange, options } = props;
    return (
        <label>
            {label}
            <select name={propertyName} onChange={onChange}>
                {
                    !!options &&
                    options.map((option, index) =>
                        <option key={index} value={option}>{option}</option>
                    )
                }
            </select>
        </label>
    );
}