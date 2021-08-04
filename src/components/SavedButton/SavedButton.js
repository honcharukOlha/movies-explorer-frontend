import React from 'react';
import './SavedButton.css';

function SavedButton() {

    const [isMarked, setIsMarked] = React.useState(true);

    function handleSaveClick() {
        setIsMarked(!isMarked);
      }

    return (
    <div className="saved">
        {isMarked ? 
            (<button className="button" type="button" onClick={handleSaveClick} >
            <p className="button__text">Сохранить</p>
            </button>)
        : (<button className="button button_active" type="button" onClick={handleSaveClick} >
            <p className="button__text">&#10003;</p>
            </button>)
        }
    </div>
    )
};

export default SavedButton;