export default function Lives({
    lives
} : {
    lives: number
}) {

    return (
        <div className="flex gap-1">
            <span className={lives < 1 ? 'scale-0' : ''}>❤️</span>
            <span className={lives < 2 ? 'scale-0' : ''}>❤️</span>
            <span className={lives < 3 ? 'scale-0' : ''}>❤️</span>
        </div>
    );
}