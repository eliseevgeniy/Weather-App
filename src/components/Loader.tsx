import { Spinner } from 'react-bootstrap';

export const Loader = () => (
  <div className="d-flex justify-content-center my-4">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </Spinner>
  </div>
);