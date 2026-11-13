import React, { useEffect } from "react";
import { useSeries } from "../../contexts/Series/SeriesContext";
import { useParams } from "react-router-dom";

const SeriesDetails = () => {
  const { seriesID } = useParams();
  const { seriesDetails } = useSeries();

  useEffect(() => {
    seriesDetails(seriesID);
  }, []);
  return <div>SeriesDetails</div>;
};

export default SeriesDetails;
