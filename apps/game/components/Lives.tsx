export default function Lives(props: {
    lives: 3 | 2 | 1 | 0
}) {

    return (
        <div className="flex gap-1">
            <span className={props.lives < 1 ? 'scale-0' : ''}>❤️</span>
            <span className={props.lives < 2 ? 'scale-0' : ''}>❤️</span>
            <span className={props.lives < 3 ? 'scale-0' : ''}>❤️</span>
        </div>
    );
}