import { PlusIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b rounded-lg border-base-content/10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-start py-3 px-4 gap-8">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>
          <Link to="/create" className="btn btn-primary flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
