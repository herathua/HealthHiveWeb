import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import QrCodeContent from './QrCodeContent';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ url: "https://www.example.com" }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('loads and displays QR code', async () => {
  render(<QrCodeContent />);

  // Check that the API is called once
  expect(fetch).toHaveBeenCalledTimes(1);

  // Wait for the QR code to appear
  await waitFor(() => screen.getByAltText('QR code'));

  // Check that the QR code has been rendered
  const qrCode = screen.getByAltText('QR code');
  expect(qrCode).toBeInTheDocument();
});
