import { useEffect, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GeoLocation, GeoResponse } from '../types/weather';

export const AutocompleteInput = () => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<GeoLocation[]>([]);
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length < 2) {
      setOptions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        const data: GeoResponse = await res.json();
        setOptions(data.results ?? []);
        setShowList(true);
      } catch {
        /* ignore */
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const handleSelect = (city: GeoLocation) => {
    setQuery(city.name);
    setShowList(false);
    navigate(
      `/weather/${encodeURIComponent(city.name)}?lat=${city.latitude}&lng=${city.longitude}`
    );
  };

  return (
    <div className="position-relative mb-4">
      <Form.Control
        type="text"
        placeholder="Enter city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => options.length && setShowList(true)}
      />
      {showList && options.length > 0 && (
        <ListGroup className="position-absolute w-100 shadow" style={{ zIndex: 10 }}>
          {options.map((opt) => (
            <ListGroup.Item
              key={opt.id}
              action
              onClick={() => handleSelect(opt)}
            >
              {opt.name}
              {opt.country ? `, ${opt.country}` : ''}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};