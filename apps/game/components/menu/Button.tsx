import { PropsWithChildren } from "react";

/**
 * A button component. 
 */
export default function Button({
    onClick,
    children
}: {
    /**
     * The callback function when the button is clicked.
     */
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
