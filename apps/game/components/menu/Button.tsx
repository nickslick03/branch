import { PropsWithChildren } from "react";

export default function Button({
    onClick,
    children
}: {
    onClick?: () => any
} & PropsWithChildren) {
    return (
        <button 
            className="text-white bg-brandblue px-20 py-6 hover:bg-[#6ea2f7]"
            onClick={onClick}>
            {children}
        </button>
    );
}