import { Container, Table } from 'react-bootstrap';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { useForecast } from '../hooks/useForecast';
import { formatShortDate } from '../utils/formatDate';
import { getWeatherDescription } from '../utils/weatherCode';

export const WeatherPage = () => {
  const { city = '' } = useParams<{ city: string }>();
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));

  const { forecast, loading, error } = useForecast(lat, lng);

  if (loading) return <Loader />;
  if (error || !forecast) return <Container className="mt-3">Ошибка: {error}</Container>;

  return (
    <Container className="mt-3">
      <Link to="/">Назад</Link>
      <Header title={`Прогноз погоды в городе ${city}`} />
      <Table responsive bordered hover>
        <tbody>
          <tr>
            <td>Дата</td>
            {forecast.time.map((d) => (
              <td key={d}>{formatShortDate(d)}</td>
            ))}
          </tr>
          <tr>
            <td>Мин. темп.</td>
            {forecast.temperature_2m_min.map((t, i) => (
              <td key={i}>{t}°C</td>
            ))}
          </tr>
          <tr>
            <td>Макс. темп.</td>
            {forecast.temperature_2m_max.map((t, i) => (
              <td key={i}>{t}°C</td>
            ))}
          </tr>
          <tr>
            <td>Погода</td>
            {forecast.weathercode.map((code, i) => (
              <td key={i}>{getWeatherDescription(code)}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};