import ClearIcon from '@mui/icons-material/Clear';
import React, { Dispatch, FC, RefObject, SetStateAction } from 'react';
import "../../../styles/multi-select/selectedItems-style.sass";

interface SelectedItemsxProps {
    selectedItemRef: RefObject<HTMLDivElement | null>;
    selectedList: string[];
    setSelectedList: Dispatch<SetStateAction<string[]>>;
    setExpand: Dispatch<SetStateAction<boolean>>;
}

const SelectedItems: FC<SelectedItemsxProps> = ({selectedItemRef, selectedList, setSelectedList, setExpand}) => {

    const handleRemove = (itemToRemove: string): void => {
        setSelectedList((prevSelectedList) => prevSelectedList.filter(item => item !== itemToRemove));
    }

    return (
        <div className='selected-items' ref={selectedItemRef as React.RefObject<HTMLDivElement>} onClick={() => setExpand(true)}>
            {selectedList.map((item, index) => (
                <span className='selected-item' key={index}>
                    <span className='text'>{item}</span>
                    <span className='close' onClick={() => handleRemove(item)}>
                        <ClearIcon sx={{ color: "#c93131" }} />
                    </span>
                </span>
            ))}
        </div>
    );
};

export default SelectedItems;