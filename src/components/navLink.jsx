import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function NavLink({ name, navlinks }) {
  const [isHovering, setIsHovering] = useState(false);
  // hover
  const handleOnClick = () => {
    setIsHovering(!isHovering);
  };
  return (
    <div onClick={handleOnClick} className="cursor-pointer flex flex-col mx-4">
      <div className="flex flex-row">
        {name}
        <KeyboardArrowDownIcon />
        {isHovering && (
          <div className="flex flex-col bg-white text-black absolute top-[60px] rounded py-2 w-[150px] shadow z-10">
            {navlinks.map((index) => (
              <div className="dropDown"> {index} </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavLink;
