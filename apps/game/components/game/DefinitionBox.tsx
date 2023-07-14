import { PropsWithChildren } from "react";

export default function DefinitionBox({
    children
} : PropsWithChildren) {

    return (
        <p className='bg-white absolute bottom-2 left-0 w-full h-20 md:h-28 
        flex-1 text-sm md:text-lg py-1 overflow-hidden'>
            {children}
        </p>
    );
}