// src/integrations/VRIntegration.js
class VRIntegration {
  constructor(renderer) {
    this.renderer = renderer;
    this.isVRSupported = false;
    this.updateCallback = null;
    this.session = null;
    this.character = null;  // Para almacenar referencia al personaje
    this.checkVRSupport();
  }

  async checkVRSupport() {
    if (navigator.xr && navigator.xr.isSessionSupported) {
      this.isVRSupported = await navigator.xr.isSessionSupported('immersive-vr');
      console.log("Soporte VR:", this.isVRSupported);
    } else {
      this.isVRSupported = false;
      console.log("WebXR API no disponible en este navegador");
    }
    return this.isVRSupported;
  }

  // Método que Experience.js está intentando llamar
  setUpdateCallback(callback) {
    this.updateCallback = callback;
  }

  // Método que CircularMenu.js está intentando llamar
  async toggleVR() {
    if (!this.isVRSupported) {
      console.warn("VR no está soportado en este dispositivo o navegador.");
      return false;
    }
    
    if (this.session) {
      // Si ya hay una sesión VR, terminarla
      await this.session.end();
      this.session = null;
      console.log("Sesión VR terminada");
      return false;
    } else {
      // Iniciar nueva sesión VR
      try {
        this.session = await navigator.xr.requestSession('immersive-vr', {
          requiredFeatures: ['local-floor']
        });
        
        // Configurar el renderer para VR si estamos usando Three.js
        if (this.renderer && this.renderer.xr) {
          this.renderer.xr.enabled = true;
          this.renderer.xr.setReferenceSpaceType('local-floor');
          this.renderer.xr.setSession(this.session);
        }
        
        // Llamar al callback de actualización si existe
        if (this.updateCallback) {
          this.updateCallback();
        }
        
        // Configurar evento para cuando se termine la sesión
        this.session.addEventListener('end', () => {
          this.session = null;
          console.log("Sesión VR finalizada externamente");
        });
        
        console.log("Sesión VR iniciada");
        return true;
      } catch (error) {
        console.error("Error al iniciar sesión VR:", error);
        return false;
      }
    }
  }

  // Nuevo método que World.js está intentando llamar
  bindCharacter(character) {
    if (!character) {
      console.warn("No se proporcionó un personaje válido para vincular con VR");
      return;
    }

    this.character = character;
    console.log("Personaje vinculado a VR:", character);
    
    // Aquí puedes agregar lógica adicional para la vinculación, como:
    // - Configurar posición inicial del personaje en VR
    // - Vincular controladores VR con animaciones o acciones del personaje
    // - Configurar cámara VR para seguir al personaje
  }

  // Método adicional que podría ser útil para actualizar la posición del personaje en cada frame
  updateCharacterPosition(vrCamera) {
    if (!this.character || !this.session) return;
    
    // Ejemplo de lógica para actualizar la posición del personaje basándose en la posición de la cámara VR
    // Esto es solo un ejemplo y necesitarás adaptarlo a tu implementación específica
    if (vrCamera && vrCamera.position) {
      // Actualiza solo la posición horizontal (X, Z) manteniendo la Y del personaje
      this.character.position.x = vrCamera.position.x;
      this.character.position.z = vrCamera.position.z;
      
      // También podrías actualizar la rotación del personaje basándote en la dirección de la cámara
      // this.character.rotation.y = vrCamera.rotation.y;
    }
  }
}

export default VRIntegration;