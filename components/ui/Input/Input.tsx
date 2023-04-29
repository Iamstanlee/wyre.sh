import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import cn from 'classnames';

import style from './Input.module.css';

interface Props {
  className?: string;
  title?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  name: InputHTMLAttributes<HTMLInputElement>['name'];
  id: InputHTMLAttributes<HTMLInputElement>['id'];
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  errors?: string;
  optional: boolean;
  disabled?: boolean;
}
const Input = (props: Props) => {
  const { className, title, errors, optional, ...rest } = props;
  const rootClassName = cn(style.root, {}, className, errors && style.danger);

  return (
    <div>
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
      {errors && <p className="text-xs text-danger">{errors}</p>}
    </div>
  );
};

export default Input;
