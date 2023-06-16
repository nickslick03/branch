import Image from "next/image";
import healthHolder from "../images/healthHolder.png";
import healthTicket from "../images/healthTicket.png";

export default function Lives({
    lives
} : {
    lives: number
}) {

    const loseHealth = (heartNum: number) =>
        heartNum > lives ? ' translate-y-32 opacity-0' : '';

    return (
        <div className="">
            <div className="float-right flex flex-col items-center h-full">
                <Image 
                    src={healthHolder} 
                    alt={"health holder"}
                    width={200} />
                <div className="flex justify-between w-[105%]">
                    <div className={"transition-[opacity,_transform] ease-fiveSteps duration-1000 delay-[1000ms]" + loseHealth(1)}>
                        <Image src={healthTicket} alt="heath ticket" width={60} />
                    </div>
                    <div className={"transition-[opacity,_transform] ease-fiveSteps duration-1000 delay-[1000ms]" + loseHealth(2)}>
                        <Image src={healthTicket} alt="heath ticket" width={60} />
                    </div>
                    <div className={"transition-[opacity,_transform] ease-fiveSteps duration-1000 delay-[1000ms]" + loseHealth(3)}>
                        <Image src={healthTicket} alt="heath ticket" width={60} />
                    </div>
                </div>
            </div>
        </div>
    );
}