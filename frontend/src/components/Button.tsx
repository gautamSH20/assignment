import { ReactElement } from "react";

interface btnInput {
  title: string;
  size: "lg" | "md" ;
  variant: "primary" | "secondary";
  onclick?: () => void;
  iconF?: ReactElement;
  iconB?: ReactElement;
}

const styleSize = {
  lg: "px-6 py-4 text-lg hover:px-8  text-xl rounded-xl",
  md: "px-4 py-2 text-md rounded-md",
};

const variantProp = {
  primary: "bg-[#0c0eff] text-white ",
  secondary: "bg-[#5676ff] text-[#4136bf]",
};

export const Button = (prop: btnInput) => {
  return (
    <div>
      <button
        type="submit"
        className={`${styleSize[prop.size]} ${
          variantProp[prop.variant]
        } p-2 flex jutify-between tranistion-all ease-in duration-300 cursor-pointer`}
        onClick={prop.onclick}
      >
        {prop.iconF ? prop.iconF : null}
        {prop.title}
        {prop.iconB ? prop.iconB : null}
      </button>
    </div>
  );
};
