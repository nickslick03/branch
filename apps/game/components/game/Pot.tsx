import { PropsWithChildren } from "react";

/**
 * The Pot component displays the definition and an image of the definition if included.
 */
export default function Pot({
    children,
    imgURL
}: {
    /**
     * The URL of the background image of the definition
     */
    imgURL?: string;
} & PropsWithChildren) {
    return (
        <div 
            className="font-bold relative
            flex justify-center items-center
            w-[30vw] max-w-[160px]
            aspect-[10/9]
            bg-[url(../images/Pot.png)] bg-no-repeat bg-center bg-contain">
            <div 
                className="absolute w-[80%] h-full
                bg-no-repeat bg-cover bg-center opacity-60"
                style={{
                    "backgroundImage" : imgURL != undefined ? `url("${imgURL}")` : ''
                }}>
            </div>  
            <p className="z-10 text-xs sm:text-sm text-center overflow-hidden break-words w-[80%] h-full">
                {children}
            </p>
        </div>
    );
}