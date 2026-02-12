/**
 * Input Component Tests
 *
 * 공통 Input 컴포넌트 테스트
 * - 커버리지 목표: 80% 이상
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  // 1. 기본 렌더링
  it('should render input with value', () => {
    const handleChange = jest.fn();
    render(<Input value="test value" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test value');
  });

  // 2. label 렌더링
  it('should render label when provided', () => {
    const handleChange = jest.fn();
    render(<Input label="Email" value="" onChange={handleChange} />);

    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input.getAttribute('id') || '');
  });

  // 3. onChange 호출
  it('should call onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // 4. 에러 표시
  it('should display error message when error prop is provided', () => {
    const handleChange = jest.fn();
    render(
      <Input value="" onChange={handleChange} error="This field is required" />
    );

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This field is required');
  });

  it('should apply error styling when error prop is provided', () => {
    const handleChange = jest.fn();
    render(
      <Input value="" onChange={handleChange} error="Invalid input" />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('inputError');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  // 5. required 별표
  it('should display asterisk when required prop is true', () => {
    const handleChange = jest.fn();
    render(
      <Input label="Password" value="" onChange={handleChange} required />
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
  });

  // 6. disabled 상태
  it('should be disabled when disabled prop is true', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  // 7. type 속성
  it('should render with default type text', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should render with type email', () => {
    const handleChange = jest.fn();
    render(<Input type="email" value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should render with type password', () => {
    const handleChange = jest.fn();
    render(<Input type="password" value="" onChange={handleChange} />);

    const input = document.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  // 8. 접근성 (aria)
  it('should set aria-describedby when error is present', () => {
    const handleChange = jest.fn();
    render(
      <Input
        value=""
        onChange={handleChange}
        error="Error message"
        id="test-input"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  it('should not set aria-describedby when no error', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  // 추가 테스트: placeholder
  it('should render with placeholder', () => {
    const handleChange = jest.fn();
    render(
      <Input value="" onChange={handleChange} placeholder="Enter your email" />
    );

    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeInTheDocument();
  });

  // 추가 테스트: name 속성
  it('should set name attribute', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} name="email" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'email');
  });

  // 추가 테스트: custom className
  it('should merge custom className', () => {
    const handleChange = jest.fn();
    render(
      <Input value="" onChange={handleChange} className="custom-input" />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input');
    expect(input).toHaveClass('custom-input');
  });

  // 추가 테스트: autoComplete
  it('should set autoComplete attribute', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} autoComplete="email" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });
});
