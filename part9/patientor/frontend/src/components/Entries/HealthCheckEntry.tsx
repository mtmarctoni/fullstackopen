import { HealthCheckRating, type HealthCheckEntry } from "../../types";
import EntryContainer from "./EntryContainer";

interface Props {
    entry: HealthCheckEntry
}

const HealthCheck = ({ entry }: Props) => {
    const getHealthCheckRatingString = (rating: HealthCheckRating): string => {
        switch (rating) {
          case HealthCheckRating.healthy:
            return "Healthy";
          case HealthCheckRating.LowRisk:
            return "Low Risk";
          case HealthCheckRating.HighRisk:
            return "High Risk";
          case HealthCheckRating.CriticalRisk:
            return "Critical Risk";
          default:
            return "Unknown";
        }
      };

    const ratingString = getHealthCheckRatingString(entry.healthCheckRating);
    return (
        <EntryContainer entry={entry}>
            <div className="mt-2">
                <span className="font-semibold">Health check rating:</span> {`${ratingString} [${entry.healthCheckRating}]`}
            </div>
        </EntryContainer>
    );
};

export default HealthCheck;