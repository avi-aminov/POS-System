
import ReactDOM from "react-dom";
import Magnifier from "./Magnifier";

let magnifierContainer = null;

const createMagnifierContainer = () => {
    magnifierContainer = document.createElement("div");
    document.body.appendChild(magnifierContainer);
};

const destroyMagnifierContainer = () => {
    if (magnifierContainer) {
        const root = ReactDOM.createRoot(magnifierContainer);
        root.unmount();
        document.body.removeChild(magnifierContainer);
        magnifierContainer = null;
    }
};

const MagnifierUtils = {
    open: (imagePath) => {
        if (!magnifierContainer) {
            createMagnifierContainer();
        }

        const handleClose = (event) => {
            // Check if the close event was triggered by a click
            if (event && event.type === "click") {
                destroyMagnifierContainer();
            }
        };

        const root = ReactDOM.createRoot(magnifierContainer);
        root.render(<Magnifier imagePath={imagePath} onClose={handleClose} />);
    },
};

export default MagnifierUtils;
