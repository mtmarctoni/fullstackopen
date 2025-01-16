// add the value of the health ratin and/ or add some UI to show it nicer

const HealthCheckFields = () => {
    return (
        <div>
            <label className="block mb-2">Health Check Rating</label>
            <input required
                type="number"
                min="0"
                max="3"
                name="healthCheckRating"
                className="w-full p-2 mb-4 border rounded"
            />
        </div>
    );
};
  
export default HealthCheckFields;