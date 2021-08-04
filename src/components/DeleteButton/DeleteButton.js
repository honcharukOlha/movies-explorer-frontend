import React from 'react';
import './DeleteButton.css';

function DeleteButton() {

    const [isMarked, setIsMarked] = React.useState(true);

    function handleSaveClick() {
        setIsMarked(!isMarked);
      }

    return (
    <div className="delete">
        {isMarked ? 
            (<button className="button button_active" type="button" onClick={handleSaveClick} >
            <p className="button__text">&#10003;</p>
            </button>)
        : (<button className="button" type="button" onClick={handleSaveClick} >
            <p className="button__text">&#215;</p>
            </button>)
        }
    </div>
    )
};

export default DeleteButton;