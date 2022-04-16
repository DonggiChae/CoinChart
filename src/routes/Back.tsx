import { useNavigate } from 'react-router-dom';

function Back() {
  const navigate = useNavigate();

  return (
    <>
    <button onClick={() => navigate(-1)}>Go back</button>
    </>
    
  )
}

export default Back;