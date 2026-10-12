import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import { getWeatherDescription } from '../utils/weatherCode';
import { Loader } from './Loader';

interface CityCardProps {
  city: string;
}

export const CityCard = ({ city }: CityCardProps) => {
  const { weather, coords, loading, error } = useCurrentWeather(city);

  if (loading) return <Loader />;
  if (error || !weather || !coords)
    return (
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{city}</Card.Title>
          <Card.Text className="text-danger">
            {error ?? 'Нет данных'}
          </Card.Text>
        </Card.Body>
      </Card>
    );

  const link = `/weather/${encodeURIComponent(city)}?lat=${coords.lat}&lng=${coords.lng}`;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{city}</Card.Title>
        <Card.Text className="mb-1">
          Температура: {weather.temperature}°C
        </Card.Text>
        <Card.Text className="mb-1">
          Состояние: {getWeatherDescription(weather.weathercode)}
        </Card.Text>
        <Card.Text className="mb-3">
          Скорость ветра: {weather.windspeed} м/с
        </Card.Text>
        <Button
          as={Link as any}
          to={link}
          variant="primary"
          className="mt-auto align-self-start"
        >
          Смотреть прогноз
        </Button>
      </Card.Body>
    </Card>
  );
};