import { Container, Row, Col } from 'react-bootstrap';
import { CityCard } from '../components/CityCard';
import { AutocompleteInput } from '../components/AutocompleteInput';
import { Header } from '../components/Header';

const cities: string[] = [
  'Moscow',
  'St Petersburg',
  'Rostov-on-Don',
  'Vladivostok',
  'Krasnodar',
  'Yekaterinburg',
];

export const HomePage = () => (
  <Container>
    <Header title="Введите город" />
    <AutocompleteInput />
    <Header title="Погода в избранных городах" />
    <Row xs={1} md={2} lg={3} className="g-4">
      {cities.map((city) => (
        <Col key={city}>
          <CityCard city={city} />
        </Col>
      ))}
    </Row>
  </Container>
);