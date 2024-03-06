import { useState } from "react";

const useFlip = (initialVal) => {
    const [value, setValue] = useState(initialVal);
    const flip = () => {
        setValue(oldValue => !oldValue);
    };
  
  return [value, flip];
}

export default useFlip;