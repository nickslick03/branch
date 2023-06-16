export default function Score({
    score
}: {
    score: number
}) {

    return (
        <div className="w-96 pt-2">
            <div  
                className='w-[150px] h-[95px] 
                bg-[url(../images/scoreboard.png)] bg-contain 
                flex justify-center items-center'>
                <span className="relative top-2 left-1 text-3xl">
                    {score}
                </span>
            </div>
        </div>
    );
}