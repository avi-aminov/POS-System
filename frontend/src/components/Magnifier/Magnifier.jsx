/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";

const Magnifier = ({ imagePath }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => setOpen(false);

    return (
        <Dialog size="xl" open={open} handler={handleClose}>
            <DialogBody className=" text-center justify-center flex">
                <img
                    alt="enlarged"
                    className="h-[80vh] w-[80vh] object-cover object-center"
                    src={imagePath}
                />
            </DialogBody>
        </Dialog>
    );
};

export default Magnifier;
