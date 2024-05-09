import { FaGithub } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="mt-6 text-xs p-2 flex flex-row items-center justify-center gap-4 sticky bottom-0">
      <a href="https://github.com/jm-sky" className="flex flex-row items-center gap-2 transition-opacity opacity-50 hover:opacity-75" target="_blank" rel="noopener noreferrer">
        <FaGithub />
        <span>Dev Made IT</span>
      </a>
    </footer>
  );
}
