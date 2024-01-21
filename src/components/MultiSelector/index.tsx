import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import "../../styles/multiselect-style.sass"

const typeList: string[] = ['Education', 'Yeeeah, science!', 'Art', 'Sport', 'Games', 'Health'];

const MultiSelector: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTypes, setFilteredTypes] = useState<string[]>(typeList);
    const [selectedList, setSelectedList] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = typeList.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredTypes(filtered);
    };

    const selecting = (selectedItem: string): void => {
        setSelectedItem(selectedItem);
        
        if (!selectedList.includes(selectedItem)) {
            setSelectedList((prevSelectedList) => [...prevSelectedList, selectedItem]);
        }
    };

    return (
        <div>
            <div className='selected-items'>
                {selectedList.map((item, index) => (
                    <span className='selected-item' key={index}><span className='text'>{item}</span><span className='close'><ClearIcon sx={{ color: "rgb(150 165 230)" }} /></span></span>
                ))}
            </div>
            <div className="select-box">
                <input
                    type="text"
                    className='select-input'
                    placeholder='Type Your Type :)'
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <ExpandMoreIcon sx={{ color: "rgb(150 165 230)" }} />
            </div>
            <div className='select-items'>
                <ul>
                    {filteredTypes.map((item, index) => (
                        <li onClick={() => selecting(item)} key={index} className={item === selectedItem ? 'selected' : ''}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MultiSelector;