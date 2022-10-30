import { InfinitySpin } from 'react-loader-spinner';
import { LoaderSpinner } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderSpinner>
      <InfinitySpin width="200" color="#3f51b5" />
    </LoaderSpinner>
  );
};
