import Button from './Button';
import Modal from './Modal';

/**
 * Displays the a modal listing the controls to the game for both mobile and computer. It will only display the mobile controls if the screen is smaller than 640px.
 */
export default function Controls() {
  return (
    <Modal>
      <div className="text-center">
        <h2 className="text-4xl mb-10">Controls</h2>
        <table className="m-auto mb-8">
          <thead>
            <tr className="hidden sm:table-row">
              <th></th>
              <th className="border-l-black border-l-2">Computer</th>
              <th className="border-l-black border-l-2">Mobile</th>
            </tr>
          </thead>
          <tbody className="[&>tr>*]:p-2">
            <tr>
              <th className="border-r-black border-r-2">Move Food</th>
              <td className="hidden sm:table-cell">Side Arrows ↔️</td>
              <td className="border-l-black border-l-2">Side Swipe 👆</td>
            </tr>
            <tr>
              <th className="border-r-black border-r-2">Speed Down</th>
              <td className="hidden sm:table-cell">Down Arrow ⬇️</td>
              <td className="border-l-black border-l-2">Down Swipe 👆</td>
            </tr>
            <tr>
              <th className="border-r-black border-r-2">Pause</th>
              <td className="hidden sm:table-cell">{'"p"'} key</td>
              <td className="border-l-black border-l-2">
                Pause <br /> Button
              </td>
            </tr>
          </tbody>
        </table>
        <Button>Play</Button>
      </div>
    </Modal>
  );
}
