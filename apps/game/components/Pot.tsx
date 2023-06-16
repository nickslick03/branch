import { PropsWithChildren } from "react";

export default function Pot({
    children,
    imgURL
}: {
    imgURL?: string;
} & PropsWithChildren) {
    return (
        <div 
            className="z-10 text-white font-bold 
            bg-gray-500 self-center relative
            text-sm text-center leading-tight
            flex justify-center items-center
            min-w-[6rem] w-[20vw] max-w-[15rem]
            min-h-[4.5rem] h-[15vw] max-h-[10rem]
            ">
            <div 
                className="absolute -z-10 w-full h-full
                bg-no-repeat bg-contain bg-center opacity-60"
                style={{
                    "backgroundImage" : imgURL != undefined ? `url("${imgURL}")` : ''
                }}>

            </div>
            {children}
        </div>
    )
}