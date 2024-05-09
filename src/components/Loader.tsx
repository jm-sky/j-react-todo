import { FaSpinner } from 'react-icons/fa';

export default function Loader() {
  return <div className="w-full p-3 flex items-center justify-center"><FaSpinner className="animate-spin" /></div>;
}
