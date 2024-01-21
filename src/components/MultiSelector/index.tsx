import React, { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import "../../styles/multiselect-style.sass"

const typeList: string[] = ['Education', 'Yeeeah, science!', 'Art', 'Sport', 'Games', 'Health'];

const MultiSelector: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTypes, setFilteredTypes] = useState<string[]>(typeList);
    const [selectedList, setSelectedList] = useState<string[]>([]);
    const [expand, setExpand] = useState<boolean>(false);

    const selectInputRef = useRef<HTMLDivElement | null>(null);
    const selectItemsRef = useRef<HTMLDivElement | null>(null);
    const selectedItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const selectInput = selectInputRef.current as HTMLDivElement;
            const selectItems = selectItemsRef.current as HTMLDivElement;
            const selectedItem = selectedItemRef.current as HTMLDivElement;
            if (
                (selectInput && !selectInput.contains(event.target as Node)) &&
                (selectItems && !selectItems.contains(event.target as Node)) &&
                (selectedItem && !selectedItem.contains(event.target as Node))
            ) {
                setExpand(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = typeList.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredTypes(filtered);
    };

    const handleRemove = (itemToRemove: string): void => {
        setSelectedList((prevSelectedList) => prevSelectedList.filter(item => item !== itemToRemove));
    }

    const selecting = (selectedItem: string): void => {
        if (!selectedList.includes(selectedItem)) {
            setSelectedList((prevSelectedList) => [...prevSelectedList, selectedItem]);
        }
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
        <div>
            <div className='selected-items' ref={selectedItemRef} onClick={() => setExpand(true)}>
                {selectedList.map((item, index) => (
                    <span className='selected-item' key={index}>
                        <span className='text'>{item}</span>
                        <span className='close' onClick={() => handleRemove(item)}>
                            <ClearIcon sx={{ color: "#c93131" }} />
                        </span>
                    </span>
                ))}
            </div>
            <div className="select-box" ref={selectInputRef} onClick={() => setExpand(true)}>
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
            <div
                className={`select-items ${expand ? 'show' : 'hide'}`}
                ref={selectItemsRef}
                onClick={(event) => {
                    // Prevent the event from propagating to the parent div
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
        </div>
    );
};

export default MultiSelector;