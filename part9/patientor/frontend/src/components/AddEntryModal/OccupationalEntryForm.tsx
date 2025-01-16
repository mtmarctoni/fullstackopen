const OccupationalHealthcareFields = () => {
    
    return (
        <div>
            <label className="block mb-2">Employer Name</label>
            <input
                type="text"
                name="employerName"
                className="w-full p-2 mb-4 border rounded"
            />
            <label className="block mb-2">Sick Leave Start Date</label>
            <input
                type="date"
                name="sickLeaveStartDate"
                className="w-full p-2 mb-4 border rounded"
            />
            <label className="block mb-2">Sick Leave End Date</label>
            <input
                type="date"
                name="sickLeaveEndDate"
                className="w-full p-2 mb-4 border rounded"
            />
        </div>
    );
};

export default OccupationalHealthcareFields;