import Modal from './Modal';
import Button from './Button';

/**
 * A modal which displays how to play Order Up.
 */
export default function HowToPlay() {

  return (
    <Modal>
        <div className='text-center'>
            <h2 className="text-4xl mb-10">How To Play</h2>
            <p className='text-left mb-8 text-lg'>
                Match the correct foods (Terms) with the correct Pots (Definitions). Put
                3 correct foods in a pot to get 10 points! Get 3 wrong answers and
                it&apos;s game over...
            </p>
            <Button>
                Next
            </Button>
        </div>
    </Modal>
  );
}
