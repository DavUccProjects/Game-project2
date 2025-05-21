import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import VRIntegration from './VRIntegration';

// Mock básico de la WebXR API
beforeAll(() => {
  window.navigator.xr = {
    isSessionSupported: jest.fn()
  };
});

describe('VRIntegration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el botón de activar VR si el dispositivo es compatible', async () => {
    window.navigator.xr.isSessionSupported.mockResolvedValue(true);

    render(<VRIntegration />);
    
    // Espera a que aparezca el botón (ajusta el texto si usas otro)
    const vrButton = await screen.findByText(/activar VR/i);
    expect(vrButton).toBeInTheDocument();
  });

  it('no muestra el botón si el dispositivo no es compatible', async () => {
    window.navigator.xr.isSessionSupported.mockResolvedValue(false);

    render(<VRIntegration />);
    
    // Espera a que NO aparezca el botón
    await waitFor(() => {
      expect(screen.queryByText(/activar VR/i)).not.toBeInTheDocument();
    });
  });

  it('muestra un mensaje si el navegador no soporta VR', async () => {
    delete window.navigator.xr; // Simula navegador sin XR
    render(<VRIntegration />);
    const msg = await screen.findByText(/VR no soportado/i);
    expect(msg).toBeInTheDocument();
  });
});
