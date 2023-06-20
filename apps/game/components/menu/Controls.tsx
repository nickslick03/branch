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
                            <th>Computer</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Move Food</th>
                            <td>Side Arrows</td>
                            <td>Side Swipe</td>
                        </tr>
                        <tr>
                            <th>Speed Down</th>
                            <td>Down Arrow</td>
                            <td>Swipe Down</td>
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