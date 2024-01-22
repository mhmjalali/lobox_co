import CheckIcon from '@mui/icons-material/Check';
import React, { Dispatch, FC, RefObject, SetStateAction } from 'react';
import "../../../styles/multi-select/selectItems-style.sass";

interface SelectItemsxProps {
    selectItemsRef: RefObject<HTMLDivElement | null>;
    selectedList: string[];
    setSelectedList: Dispatch<SetStateAction<string[]>>;
    expand: boolean;
    filteredTypes: string[];
}

const SelectItems: FC<SelectItemsxProps> = ({selectItemsRef, filteredTypes, selectedList, expand, setSelectedList}) => {

    const selecting = (selectedItem: string): void => {
        if (!selectedList.includes(selectedItem)) {
            setSelectedList((prevSelectedList) => [...prevSelectedList, selectedItem]);
        }
    };

    return (
        <div
            className={`select-items ${expand ? 'show' : 'hide'}`}
            ref={selectItemsRef as React.RefObject<HTMLDivElement>}
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            {filteredTypes.length === 0 ? (
                <p className='add-item-text'>press <span>Enter</span> to add to list</p>
            ) : (
                <ul>
                    {filteredTypes.map((item, index) => (
                        <li
                            onClick={() => selecting(item)}
                            key={index}
                            className={selectedList.includes(item) ? 'selected' : ''}
                        >
                            {item}
                            {selectedList.includes(item) ? <CheckIcon sx={{color: "#219f43"}}/> : ""}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectItems;