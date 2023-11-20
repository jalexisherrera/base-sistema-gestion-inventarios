import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { KeyValuePair } from 'tailwindcss/types/config';

interface DropdownProps {
    options?: KeyValuePair<string, string>[];
    onSelect?: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState(options?.[0]?.value);

    const handleOptionClick = (option: KeyValuePair<string, string>) => {
        setIsOpen(false);

        if (onSelect) {
            onSelect(option.key);
            setOptionSelected(option.value);
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="flex items-center primary border p-3 bg-slate-300"
            >
                {optionSelected}
                <BsChevronDown
                    className={`w-5 h-5 ml-2 ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {options?.map((option) => (
                            <li key={option.key}>
                                <button
                                    onClick={() => handleOptionClick(option)}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                >
                                    {option.value}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export { Dropdown };
