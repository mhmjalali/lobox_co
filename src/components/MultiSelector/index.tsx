import React, { useEffect, useRef, useState } from 'react';
import SelectBox from './SelectBox';
import SelectItems from './SelectItems';
import SelectedItems from './SelectedItems';
import "../../styles/multiselect-style.sass";

const typeList: string[] = ['Education', 'Yeeeah, science!', 'Art', 'Sport', 'Games', 'Health'];

const MultiSelector: React.FC = () => {
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

    return (
        <div>
            <SelectedItems 
                selectedItemRef={selectedItemRef}
                setSelectedList={setSelectedList} 
                selectedList={selectedList}
                setExpand={setExpand}
            />
            <SelectBox  
                selectInputRef={selectInputRef} 
                typeList={typeList} 
                setSelectedList={setSelectedList} 
                filteredTypes={filteredTypes}
                setFilteredTypes={setFilteredTypes} 
                expand={expand} setExpand={setExpand}
            />
            <SelectItems
                setSelectedList={setSelectedList}
                selectedList={selectedList}
                selectItemsRef={selectItemsRef}
                filteredTypes={filteredTypes}
                expand={expand}
            />
        </div>
    );
};

export default MultiSelector;