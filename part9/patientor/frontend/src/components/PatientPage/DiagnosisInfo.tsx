import { useEffect, useState } from "react";
import { type Code, type Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";

interface Props {
    code: Code
}

const DiagnosisInfo = ({ code }: Props) => {
    const [diagnosis, setDiagnosis] = useState<Diagnosis>();
    useEffect(() => {
        diagnosisService.getDiagnosis(code)
            .then(data => setDiagnosis(data));
    }, [code]);

    return (
        <>{`${code}: ${diagnosis?.name}`}</>
    );
};

export default DiagnosisInfo;