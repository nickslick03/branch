import { PropsWithChildren } from "react";

export default function Modal({ 
    children 
} : {} & PropsWithChildren) {

    return (
        <div className="absolute z-20 h-full w-full bg-black bg-opacity-60 flex justify-center items-center">
            <div className="w-10/12 max-w-3xl px-5 py-10  bg-orange-100 animate-floatIn">
                {children}
            </div>
        </div>
    );
}