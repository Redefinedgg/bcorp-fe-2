import React from 'react';
import Select, { StylesConfig, SingleValue, ActionMeta } from 'react-select';

interface OptionType {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: OptionType[];
  value: string | number | null;
  onChange: (selected: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
  placeholder?: string;
}

const customStyles: StylesConfig<OptionType> = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? 'orange' : 'orange',
    borderWidth: '2px',
    borderRadius: '30px',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 165, 0, 0.5)' : 'none',
    '&:hover': {
      borderColor: 'darkorange',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '30px',
    overflow: 'hidden',
    margin: '0',
    padding: '0',
  }),
  menuList: (base) => ({
    ...base,
    padding: '0',
    overflowX: 'hidden',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'rgba(255, 165, 0, 0.2)' : 'white',
    color: 'black',
    borderRadius: '30px',
    margin: '5px 10px',
    '&:hover': {
      backgroundColor: 'rgba(255, 165, 0, 0.4)',
    },
    ':active': {
      backgroundColor: 'rgba(255, 165, 0, 0.6)',
    },
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder }) => {
  const selectedValue = options.find((option) => option.value === value) || null;

  const handleChange = (selected: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    onChange(selected, actionMeta);
  };

  return (
    <Select
      options={options}
      value={selectedValue}
      isMulti={false}
      onChange={handleChange}
      styles={customStyles}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
