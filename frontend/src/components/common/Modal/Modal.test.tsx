/**
 * Modal Component Tests
 *
 * 공통 Modal 컴포넌트 테스트
 * - 커버리지 목표: 80% 이상
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. isOpen true/false
  it('should render modal when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // 2. title/children 렌더링
  it('should render title correctly', () => {
    render(<Modal {...defaultProps} title="Custom Title" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(
      <Modal {...defaultProps}>
        <div>Custom content</div>
      </Modal>
    );

    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  // 3. 배경 클릭
  it('should call onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not close when modal content is clicked', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    const modalContent = screen.getByRole('dialog');
    fireEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not call onClose when backdrop is clicked and closeOnBackdropClick is false', () => {
    const onClose = jest.fn();
    render(
      <Modal {...defaultProps} onClose={onClose} closeOnBackdropClick={false} />
    );

    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

    expect(onClose).not.toHaveBeenCalled();
  });

  // 4. ESC 키
  it('should call onClose when ESC key is pressed', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when ESC is pressed and closeOnEsc is false', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnEsc={false} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not call onClose when other keys are pressed', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(onClose).not.toHaveBeenCalled();
  });

  // 5. 닫기 버튼
  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // 6. footer 렌더링
  it('should render footer when provided', () => {
    render(
      <Modal
        {...defaultProps}
        footer={
          <button type="button">Confirm</button>
        }
      />
    );

    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('should not render footer when not provided', () => {
    const { container } = render(<Modal {...defaultProps} />);

    const footer = container.querySelector('.footer');
    expect(footer).not.toBeInTheDocument();
  });

  // 7. 접근성 (role, aria)
  it('should have correct accessibility attributes', () => {
    render(<Modal {...defaultProps} />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  // 8. Portal
  it('should render modal using portal', () => {
    const { baseElement } = render(<Modal {...defaultProps} />);

    // Portal을 통해 document.body에 직접 렌더링됨
    const modal = baseElement.querySelector('[role="dialog"]');
    expect(modal).toBeInTheDocument();
    expect(modal?.parentElement?.parentElement).toBe(document.body);
  });

  // 추가 테스트: size 속성
  it('should apply correct size class for sm', () => {
    render(<Modal {...defaultProps} size="sm" />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('sm');
  });

  it('should apply correct size class for md by default', () => {
    render(<Modal {...defaultProps} />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('md');
  });

  it('should apply correct size class for lg', () => {
    render(<Modal {...defaultProps} size="lg" />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('lg');
  });

  // 추가 테스트: body 스크롤 방지
  it('should prevent body scroll when modal is open', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);

    expect(document.body.style.overflow).toBe('hidden');

    rerender(<Modal {...defaultProps} isOpen={false} />);

    expect(document.body.style.overflow).toBe('');
  });
});
