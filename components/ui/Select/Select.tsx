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
  error?: string;
  name: SelectHTMLAttributes<HTMLSelectElement>['name'];
  id: SelectHTMLAttributes<HTMLSelectElement>['id'];
  placeholder?: SelectHTMLAttributes<HTMLSelectElement>['placeholder'];
  optional: boolean;
  options: Array<OptionProps>;
}

const Select = (props: Props) => {
  const { className, title, error, optional, options, placeholder, ...rest } =
    props;
  const rootClassName = cn(style.root, {}, className, error && style.danger);

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
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
};

export default Select;
