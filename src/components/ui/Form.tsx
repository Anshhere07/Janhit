import React, { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                               Input Component                              */
/* -------------------------------------------------------------------------- */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      id,
      disabled,
      isRequired,
      ...props
    },
    ref
  ) => {
    const defaultId = useId();
    const inputId = id || defaultId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            <span>{label}</span>
            {isRequired && <span className="text-emergency-500 ml-1 font-bold">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500 flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              'w-full rounded-xl border bg-white dark:bg-dark-surface px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-600 focus:shadow-sm dark:focus:ring-medical-400/20 dark:focus:border-medical-400',
              error
                ? 'border-emergency-500 bg-emergency-50/10 dark:bg-emergency-950/20 focus:ring-emergency-500/20 focus:border-emergency-500 dark:border-emergency-500'
                : success
                ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/20 focus:ring-emerald-500/20 focus:border-emerald-500'
                : 'border-slate-300 dark:border-dark-border hover:border-slate-400 dark:hover:border-slate-600',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              disabled && 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-dark-card',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-emergency-600 dark:text-emergency-400 flex items-center gap-1.5 font-medium animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : success ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{success}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* -------------------------------------------------------------------------- */
/*                               Select Component                             */
/* -------------------------------------------------------------------------- */
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  options: SelectOption[];
  isRequired?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      options,
      id,
      disabled,
      isRequired,
      ...props
    },
    ref
  ) => {
    const defaultId = useId();
    const selectId = id || defaultId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            <span>{label}</span>
            {isRequired && <span className="text-emergency-500 ml-1 font-bold">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full rounded-xl border bg-white dark:bg-dark-surface px-4 py-2.5 text-sm text-slate-900 dark:text-white transition-all duration-200 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-600 focus:shadow-sm dark:focus:ring-medical-400/20 dark:focus:border-medical-400',
            error
              ? 'border-emergency-500 bg-emergency-50/10 dark:bg-emergency-950/20 focus:ring-emergency-500/20 focus:border-emergency-500'
              : success
              ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/20 focus:ring-emerald-500/20 focus:border-emerald-500'
              : 'border-slate-300 dark:border-dark-border hover:border-slate-400 dark:hover:border-slate-600',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-dark-card',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-xs text-emergency-600 dark:text-emergency-400 flex items-center gap-1.5 font-medium animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : success ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{success}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = 'Select';

/* -------------------------------------------------------------------------- */
/*                              Textarea Component                            */
/* -------------------------------------------------------------------------- */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  isRequired?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      id,
      rows = 4,
      disabled,
      isRequired,
      ...props
    },
    ref
  ) => {
    const defaultId = useId();
    const textareaId = id || defaultId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            <span>{label}</span>
            {isRequired && <span className="text-emergency-500 ml-1 font-bold">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={cn(
            'w-full rounded-xl border bg-white dark:bg-dark-surface px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200 resize-y',
            'focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-600 focus:shadow-sm dark:focus:ring-medical-400/20 dark:focus:border-medical-400',
            error
              ? 'border-emergency-500 bg-emergency-50/10 dark:bg-emergency-950/20 focus:ring-emergency-500/20 focus:border-emergency-500'
              : success
              ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/20 focus:ring-emerald-500/20 focus:border-emerald-500'
              : 'border-slate-300 dark:border-dark-border hover:border-slate-400 dark:hover:border-slate-600',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-dark-card',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-emergency-600 dark:text-emergency-400 flex items-center gap-1.5 font-medium animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : success ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{success}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

/* -------------------------------------------------------------------------- */
/*                              Checkbox Component                            */
/* -------------------------------------------------------------------------- */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, helperText, id, disabled, ...props }, ref) => {
    const defaultId = useId();
    const checkboxId = id || defaultId;

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'h-4 w-4 rounded-md border-slate-300 text-medical-600 focus:ring-medical-500 dark:border-slate-700 dark:bg-dark-surface dark:checked:bg-medical-500 cursor-pointer transition-colors',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor={checkboxId}
            className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none"
          >
            {label}
          </label>
          {helperText && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

