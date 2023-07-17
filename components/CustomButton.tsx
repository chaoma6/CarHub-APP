'use client';

import Image from 'next/image';
import React from 'react';

import type { CustomButtonProps } from '@/types';

const CustomButton = ({
  isDisabled,
  rightIcon,
  title,
  handleClick,
  containerStyles,
  btnType,
  textStyles,
}: CustomButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={btnType || 'button'}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative h-6 w-6">
          <Image
            src={rightIcon}
            alt="arrow_left"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
