interface Props {
    label: string,
    value: string,
    icon?: React.ReactNode,
}

const InfoRow = ({ label, value, icon }: Props) => (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
        <p className="text-gray-600 font-semibold">{label}</p>
        <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <p className="text-gray-800">{value}</p>
        </div>
    </div>
);

export default InfoRow;