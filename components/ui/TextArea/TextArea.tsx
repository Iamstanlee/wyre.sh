import React, { TextareaHTMLAttributes, ChangeEvent } from 'react';
import cn from 'classnames';

import style from './TextArea.module.css';

interface Props {
  className?: string;
  title?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  error?: boolean;
  name: TextareaHTMLAttributes<HTMLTextAreaElement>['name'];
  id: TextareaHTMLAttributes<HTMLTextAreaElement>['id'];
  placeholder: TextareaHTMLAttributes<HTMLTextAreaElement>['placeholder'];
  errors?: string;
  optional: boolean;
}
const Input = (props: Props) => {
  const { className, title, value, errors, optional, ...rest } = props;
  const rootClassName = cn(style.root, {}, className, errors && style.danger);

  return (
    <div>
      {title && (
        <label className="text-primary-text text-sm mb-1 block">
          {title}
          {!optional && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      >
        {value}
      </textarea>
      {errors && <p className="text-xs text-danger">{errors}</p>}
    </div>
  );
};

export default Input;
