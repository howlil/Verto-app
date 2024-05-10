import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import addKriteria from "./api/addKriteria";

const AddKriteria = ({onClose}) => {
    const [nama, setNama] = useState("");
    const [bobot, setBobot] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;
        let bobotFloat = parseFloat(bobot)
        try {
            result = await addKriteria({nama, bobotFloat});
            setData(await result.json());
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="modal-backdrop" className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 px-8 py-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
                    <Input label="Nama Kriteria" placeholder="Nama Kriteria" type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                    <Input label="Jumlah Bobot" placeholder="Enter your password" type="number" value={bobot} onChange={(e) => setBobot(e.target.value)} />
                    <Button >Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default AddKriteria;