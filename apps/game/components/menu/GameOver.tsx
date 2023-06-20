import Button from "./Button";
import Modal from "./Modal";

export default function GameOver({
    isGameOver,
    score,
} : {
    isGameOver: boolean;
    score: number;
}) {

    return (
        <div className={'text-center' + (isGameOver ? '' : ' hidden')}>
            <Modal>
                <h2 className="text-4xl mb-8">
                    Game Over
                </h2>
                <p className="text-lg mb-6">
                    Your score was: {score}
                </p>
                <Button onClick={() => location.reload()}>
                    Play Again
                </Button>
            </Modal>
        </div>
    );
}