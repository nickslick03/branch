import Button from "./Button";
import Modal from "./Modal";

/**
 * Displays a game over splash screen using the Modal component. The "play again" button reloads the page.
 */
export default function GameOver({
    isGameOver,
    score,
} : {
    /**
     * A boolean indicating whether the game is over.
     */
    isGameOver: boolean;
    /**
     * The total score the user got.
     */
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