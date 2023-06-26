import Button from "./Button";
import Modal from "./Modal";

export default function Controls() {

    return (
        <Modal>
            <div className="text-center">
                <h2 className="text-4xl mb-10">Controls</h2>
                <table className="text-left m-auto mb-8">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Move Food</th>
                            <th>Speed Down</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Comptuer</th>
                            <td>Side Arrows</td>
                            <td>Down Arrow</td>
                        </tr>
                        <tr>
                            <th>Mobile</th>
                            <td>Side Swipe</td>
                            <td>Down Swipe</td>
                        </tr>
                    </tbody>
                </table>   
                <Button>
                    Play
                </Button>
            </div>
        </Modal>
    );
}