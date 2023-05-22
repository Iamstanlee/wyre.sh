import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import style from './Input.module.css';

interface Props {
  className?: string;
  title?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  name: InputHTMLAttributes<HTMLInputElement>['name'];
  id: InputHTMLAttributes<HTMLInputElement>['id'];
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  optional: boolean;
  disabled?: boolean;
  note?: string;
}

const Input = (props: Props) => {
  const { className, title, error, optional, note, ...rest } = props;
  const rootClassName = cn(style.root, {}, className, error && style.danger);

  return (
    <div className='w-full'>
      {title && (
        <label className="text-primary-text text-sm mb-1 block">
          {title}
          {!optional && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      {note && <p className="text-xs text-info pt-2">{note}</p>}
    </div>
  );
};

export default Input;
