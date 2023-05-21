import React, { SelectHTMLAttributes, ChangeEvent } from 'react';
import cn from 'classnames';

import style from './Select.module.css';

interface OptionProps {
  item: string;
  value: string;
}

interface Props {
  className?: string;
  title?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  error?: boolean;
  name: SelectHTMLAttributes<HTMLSelectElement>['name'];
  id: SelectHTMLAttributes<HTMLSelectElement>['id'];
  placeholder?: SelectHTMLAttributes<HTMLSelectElement>['placeholder'];
  errors?: string;
  optional: boolean;
  options: Array<OptionProps>;
}

const Select = (props: Props) => {
  const { className, title, errors, optional, options, placeholder, ...rest } =
    props;
  const rootClassName = cn(style.root, {}, className, errors && style.danger);

  return (
    <div>
      {title && (
        <label className="text-primary-text text-sm mb-1 block">
          {title}
          {!optional && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.item}
          </option>
        ))}
      </select>
      {errors && <p className="text-xs text-danger">{errors}</p>}
    </div>
  );
};

export default Select;
