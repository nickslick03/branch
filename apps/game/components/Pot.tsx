import { PropsWithChildren } from "react";

export default function Pot({
    children,
    imgURL
}: {
    imgURL?: string;
} & PropsWithChildren) {
    return (
        <div 
            className="font-bold relative
            flex justify-center items-center
            w-[30vw] max-w-[200px]
            h-[27vw] max-h-[180px]
            bg-[url(../images/Pot.png)] bg-no-repeat bg-center bg-contain
            ">
            <div 
                className="absolute w-[80%] h-full
                bg-no-repeat bg-cover bg-center opacity-60"
                style={{
                    "backgroundImage" : imgURL != undefined ? `url("${imgURL}")` : ''
                }}>
            </div>  
            <p className="z-10 text-center overflow-hidden break-words w-[80%] h-full">
                {children}
            </p>
        </div>
    );
}