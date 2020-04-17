import React from "react";
import {useEffect, useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from 'semantic-ui-react';
const Dropdown = (props) => {

    const node = useRef();
    const [HideMenu, setHideMenu] = useState(true);
    const HideMenuFunct = () => {
        setHideMenu(!HideMenu);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

      const handleClick = e => {
        if (node.current.contains(e.target)) {
          return;
        }
        // outside click
        setHideMenu(true);
      };

    return (
        <div ref={node}>
            <Button compact onClick={HideMenuFunct}>
                {props.maintext}
            </Button>
        
            { HideMenu ? ( null ) : (
                <div class="ui link list">
                    <button onClick={props.function} class="active item">{props.listitem1}  </button>
                    <button onClick={props.function} class="active item"> {props.listitem2} </button>
                    <button onClick={props.function} class=" active item"> {props.listitem3} </button>
                </div>
            )
        }
        </div>
  
    );
}
export default Dropdown;

// import React from 'react'
// import { Dropdown, Button, Menu } from 'semantic-ui-react'
// const fun = e => {
//     console.log(e);
// }
// const options = [
//   { key: 1, text: 'Logos', onClick: {fun}, value: 1 },
//   { key: 2, text: 'Slideshow', value: 2 },
//   { key: 3, text: 'Services', value: 3 },
// ]

// const DropdownMenu = () => (
// //   <Menu compact="true">
//     <Dropdown compact="true" onMouseDown={fun}text='Edit Images' options={options} simple item />
// //   </Menu>
// )

// export default DropdownMenu;
