import { useNavigate } from 'react-router-dom';

interface IRedirect {
  path?: string;
}

export const AppRedirect = ({ path = '/' }: IRedirect) => {
  const navigate = useNavigate();
  navigate(path);
};
