'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { CarProps } from '@/types';
import { calculateCarRent, generateCarImageUrl } from '@/utils';

import CarDetails from './CarDetails';
import CustomButton from './CustomButton';

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="mt-6 flex text-[32px] font-extrabold leading-[38px]">
        <span className="self-start text-[14px] font-semibold leading-[17px]">
          $
        </span>
        {carRent}
        <span className="self-end text-[14px] font-medium leading-[17px]">
          /day
        </span>
      </p>

      <div className="relative my-3 h-40 w-full object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative mt-2 flex w-full">
        <div className="flex w-full justify-between text-grey group-hover:invisible">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">
              {transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
