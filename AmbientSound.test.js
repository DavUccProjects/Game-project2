
import AmbientSound from '../AmbientSound.js'

describe('AmbientSound', () => {
  let sound;

  beforeEach(() => {
    sound = new AmbientSound('/sounds/ambient.mp3', { loop: true, volume: 0.5 });
  });

  test('se instancia correctamente con las opciones dadas', () => {
    expect(sound).toBeDefined();
    expect(sound.options.loop).toBe(true);
    expect(sound.options.volume).toBe(0.5);
    expect(sound.url).toBe('/sounds/ambient.mp3');
  });

  test('el método play existe y puede ser llamado', () => {
    expect(typeof sound.play).toBe('function');
    // Evita error si no hay implementación real en pruebas
    if (sound.play) {
      expect(() => sound.play()).not.toThrow();
    }
  });

  test('el método stop existe y puede ser llamado', () => {
    expect(typeof sound.stop).toBe('function');
    if (sound.stop) {
      expect(() => sound.stop()).not.toThrow();
    }
  });
});
