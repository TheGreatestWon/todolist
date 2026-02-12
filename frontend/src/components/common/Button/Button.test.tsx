/**
 * Button Component Tests
 *
 * 공통 버튼 컴포넌트 테스트
 * - 커버리지 목표: 80% 이상
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  // 1. 기본 렌더링
  it('should render button with children', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  // 2. onClick 호출
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 3. disabled 상태
  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 4. variant별 클래스
  it('should apply primary variant class by default', () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('primary');
  });

  it('should apply secondary variant class', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('secondary');
  });

  it('should apply danger variant class', () => {
    render(<Button variant="danger">Danger</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('danger');
  });

  // 5. type 속성
  it('should set type attribute to button by default', () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should set type attribute to submit', () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  // 6. ariaLabel
  it('should set aria-label attribute', () => {
    render(<Button ariaLabel="Add new item">+</Button>);

    const button = screen.getByRole('button', { name: /add new item/i });
    expect(button).toHaveAttribute('aria-label', 'Add new item');
  });

  // 7. className 병합
  it('should merge custom className with default classes', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('primary');
    expect(button).toHaveClass('custom-class');
  });

  // 추가 테스트: reset type
  it('should set type attribute to reset', () => {
    render(<Button type="reset">Reset</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'reset');
  });
});
