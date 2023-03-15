import { getColor, getFontStyle, rem } from '@/theme/utils';
import { string } from 'prop-types';
import { useId } from 'react';
import styled from 'styled-components/macro';
import StA11yHidden from '@/components/a11yhidden/A11yHidden';

const StFormInput = styled.input`
  padding: ${rem(16)};
  border: none;
  border-radius: ${rem(4)};
  background-color: ${getColor('--dark-bg2')};
  color: ${getColor('--white')};
  ${getFontStyle('ParagraphM')};
  @media (min-width: 768px) {
    ${getFontStyle('ParagraphL')};
  }
  @media (min-width: 1920px) {
    ${getFontStyle('ParagraphXL')};
  }

  &:hover {
    margin: -1px;
    border: 1px solid;
  }
`;

const FormInput = ({ type, placeholder, label, ...restProps }) => {
  const id = useId();
  return (
    <div>
      {renderLabel(id, label)}
      <StFormInput
        id={id}
        type={type}
        placeholder={placeholder}
        {...restProps}
        required
      />
    </div>
  );
};

FormInput.defaultProps = {
  type: 'text',
  label: 'label',
};

FormInput.propTypes = {
  type: string,
  label: string.isRequired,
  placeholder: string.isRequired,
};

const renderLabel = (id, label) => {
  return (
    <StA11yHidden as="label" htmlFor={id}>
      {label}
    </StA11yHidden>
  );
};

export default FormInput;