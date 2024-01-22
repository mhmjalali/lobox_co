import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { Dispatch, FC, RefObject, SetStateAction, useState } from 'react';
import "../../../styles/multi-select/selectBox-style.sass";

interface SelectBoxProps {
    selectInputRef: RefObject<HTMLDivElement | null>;
    typeList: string[];
    setSelectedList: Dispatch<SetStateAction<string[]>>;
    filteredTypes: string[];
    setFilteredTypes: Dispatch<SetStateAction<string[]>>;
    expand: boolean;
    setExpand: Dispatch<SetStateAction<boolean>>;
}

const SelectBox: FC<SelectBoxProps> = ({ selectInputRef, typeList, setSelectedList, filteredTypes, setFilteredTypes, expand, setExpand }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = typeList.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredTypes(filtered);
    };

    const addItem = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const newItem = (event.target as HTMLInputElement).value.toLowerCase();

        if (!filteredTypes.some(item => item.toLowerCase() === newItem)) {
            typeList.push(newItem);
            setFilteredTypes(typeList);
            setSelectedList((prevSelectedList) => [...prevSelectedList, newItem]);
            setSearchTerm("");
        }
    };

    return (
        <div className="select-box" ref={selectInputRef as React.RefObject<HTMLDivElement>} onClick={() => setExpand(true)}>
            <input
                type="text"
                className='select-input'
                placeholder='Type Your Type :)'
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={(event) => { if (event.key === 'Enter') { addItem(event); } }}
            />
            <span className={expand ? 'expand-more' : 'expand-less'}>
                <ExpandMoreIcon sx={{ color: "rgb(150 165 230)" }} />
            </span>
        </div>
    );
};

export default SelectBox;