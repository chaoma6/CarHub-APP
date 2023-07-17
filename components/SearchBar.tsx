'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import SearchManufacturer from './SearchManufacturer';
import WarningDialog from './WarningDialog';

const SearchButton = ({ otherClasses }: { otherClasses: String }) => (
  <button type="submit" className={`${otherClasses} z-10 -ml-3 `}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState('');
  const [model, setModel] = useState('');
  const [isDialogOpen, SetisDialogOpen] = useState(false);
  const router = useRouter();

  const updateSearchParams = (
    modelValue: string,
    manufacturerValue: string
  ) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (modelValue) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturerValue) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') {
      SetisDialogOpen(true);
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <WarningDialog
        isOpen={isDialogOpen}
        onClose={() => SetisDialogOpen(false)}
        message="Please fill in the search bar."
      />
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute ml-4 h-[20px] w-[20px]"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
