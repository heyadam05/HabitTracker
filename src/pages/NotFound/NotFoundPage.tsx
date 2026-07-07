import { Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import './NotFoundPage.css';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <Target />
      <h1>Page not found</h1>
      <p>This habit wandered off the trail.</p>
      <Button onClick={() => navigate('/')}>Back to dashboard</Button>
    </div>
  );
}
