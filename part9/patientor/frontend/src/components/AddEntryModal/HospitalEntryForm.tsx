const HospitalFields = () => {

    return (
        <div>
            <label className="block mb-2">Discharge Date</label>
            <input
                type="date"
                name="dischargeDate"
                className="w-full p-2 mb-4 border rounded"
            />
            <label className="block mb-2">Discharge Criteria</label>
            <input
                type="text"
                name="dischargeCriteria"
                className="w-full p-2 mb-4 border rounded"
            />
        </div>
    );
};

export default HospitalFields;