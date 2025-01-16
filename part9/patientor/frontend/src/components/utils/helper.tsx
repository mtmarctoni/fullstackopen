import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

export const entryTypeIcon = {
    Hospital: <LocalHospitalIcon className="text-red-500" />,
    OccupationalHealthcare: <WorkIcon className="text-green-500" />,
    HealthCheck: <HealthAndSafetyIcon className="text-blue-500" />
};

export const genderIcon = {
    male: <MaleIcon className="text-blue-500" />,
    female: <FemaleIcon className="text-pink-500" />,
    other: <TransgenderIcon className="text-purple-500" />
};

export const assertNever = (val: never) => {
    throw new Error(`Unexpected handled type: ' ${JSON.stringify(val)}`);
};