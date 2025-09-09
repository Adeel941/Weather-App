import axios from "axios";
import type { forecastData } from "../types/weather";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Loading from "../components/loading";
import ErrorMessage from "../components/error";
import ForecastDetails from "../components/forecastDetails";
import { useQuery } from "@tanstack/react-query";
const apiKey = import.meta.env.VITE_API_KEY;

function Forecast() {
  const { city } = useParams();

  const forecast = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    return res.data;
  };
  const { error, isLoading, data } = useQuery<forecastData>({
    queryKey: ["weather", city],
    queryFn: () => forecast(),
    staleTime: 5000 * 60,
  });

  return (
    <>
      <Heading mt={12} mb={6}>Today's forecast for {city}</Heading>
      {isLoading && <Loading />}
      {error && <ErrorMessage message="Something went wrong" />}
      {data && !error && !isLoading && <ForecastDetails forecastData={data} />}
    </>
  );
}

export default Forecast;
