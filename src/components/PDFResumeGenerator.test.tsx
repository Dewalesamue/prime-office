import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PDFResumeGenerator } from './PDFResumeGenerator';

vi.mock('./ui/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

const saveMock = vi.fn();
const docMock = {
  internal: {
    pageSize: {
      getWidth: vi.fn(() => 612),
      getHeight: vi.fn(() => 792),
    },
  },
  text: vi.fn().mockReturnThis(),
  setFontSize: vi.fn().mockReturnThis(),
  setFont: vi.fn().mockReturnThis(),
  setTextColor: vi.fn().mockReturnThis(),
  splitTextToSize: vi.fn((text: string) => [text]),
  addPage: vi.fn().mockReturnThis(),
  save: saveMock,
};

vi.mock('jspdf', () => ({
  jsPDF: vi.fn(function () {
    return docMock;
  }),
}));

describe('PDFResumeGenerator', () => {
  beforeEach(() => {
    saveMock.mockReset();
    docMock.text.mockClear();
    docMock.setFontSize.mockClear();
    docMock.setFont.mockClear();
    docMock.setTextColor.mockClear();
    docMock.splitTextToSize.mockClear();
    docMock.addPage.mockClear();
  });

  it('downloads a resume PDF when the button is clicked', () => {
    render(
      <PDFResumeGenerator
        personalInfo={{
          name: 'Jane Doe',
          nickname: 'JD',
          title: 'Frontend Engineer',
          location: 'London',
          email: 'jane@example.com',
          phone: '+44 7777 000000',
          website: 'jane.dev',
          linkedin: 'linkedin.com/in/jane',
          github: 'github.com/jane',
          summary: 'Experienced frontend engineer with strong product focus.',
        }}
        workExperience={[]}
        education={[]}
        skills={{ frontend: ['React'], backend: ['Node'], ai: ['GPT'], tools: ['VS Code'], soft: ['Communication'] }}
        certifications={[]}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /download pdf/i }));

    expect(saveMock).toHaveBeenCalledWith('Jane Doe_Resume.pdf');
  });
});
