/**
 * Pixel Quest MMORPG - Main Game Entry Point
 * Phaser 3 Configuration and Initialization
 */

import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import HUDScene from './scenes/HUDScene';
import InventoryScene from './scenes/InventoryScene';
import PauseScene from './scenes/PauseScene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true,
    smooth: false,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
      debugShowBody: false,
      debugShowStaticBody: false,
      debugShowVelocity: false,
      maxVelocity: 400,
    },
  },
  input: {
    keyboard: { target: window },
    mouse: { target: window },
    gamepad: true,
  },
  scene: [BootScene, PreloadScene, MenuScene, GameScene, HUDScene, InventoryScene, PauseScene],
  audio: { disableWebAudio: false },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    orientation: Phaser.Scale.Orientation.LANDSCAPE,
    expandParent: true,
  },
  fps: { target: 60, forceSetTimeOut: false },
  disableContextMenu: true,
};

let game = null;

export function initializeGame() {
  if (game !== null) {
    console.warn('Game is already initialized');
    return game;
  }
  try {
    game = new Phaser.Game(gameConfig);
    console.log('Pixel Quest MMORPG initialized successfully');
    return game;
  } catch (error) {
    console.error('Failed to initialize game:', error);
    throw error;
  }
}

export function getGame() {
  return game;
}

export function destroyGame() {
  if (game !== null) {
    game.destroy(true);
    game = null;
    console.log('Game instance destroyed');
  }
}

export function getGameConfig() {
  return gameConfig;
}

export function updateGameConfig(updates) {
  Object.assign(gameConfig, updates);
  console.log('Game configuration updated:', updates);
}

export function launchScene(sceneName, data = {}) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  const sceneManager = game.scene;
  if (sceneManager.isActive(sceneName)) {
    console.warn(`Scene ${sceneName} is already active`);
    return;
  }
  sceneManager.launch(sceneName, data);
  console.log(`Scene ${sceneName} launched`);
}

export function startScene(sceneName, data = {}) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  const sceneManager = game.scene;
  sceneManager.start(sceneName, data);
  console.log(`Scene ${sceneName} started`);
}

export function stopScene(sceneName) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  const sceneManager = game.scene;
  if (sceneManager.isActive(sceneName)) {
    sceneManager.stop(sceneName);
    console.log(`Scene ${sceneName} stopped`);
  }
}

export function getActiveScene() {
  if (!game) {
    console.error('Game not initialized');
    return null;
  }
  return game.scene.getActive();
}

export function getScene(sceneName) {
  if (!game) {
    console.error('Game not initialized');
    return null;
  }
  return game.scene.getScene(sceneName);
}

export function getGameState() {
  if (!game) {
    console.error('Game not initialized');
    return null;
  }
  return game.registry.get('gameState') || {
    player: null,
    currentMap: null,
    level: 1,
    experience: 0,
    currency: 0,
    inventory: [],
    quests: [],
    skills: [],
    stats: {},
  };
}

export function updateGameState(updates) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  const currentState = getGameState();
  const newState = { ...currentState, ...updates };
  game.registry.set('gameState', newState);
  game.events.emit('gameStateChanged', newState);
}

export function onGameEvent(eventName, callback) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  game.events.on(eventName, callback);
}

export function emitGameEvent(eventName, data) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  game.events.emit(eventName, data);
}

export function offGameEvent(eventName, callback) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  game.events.off(eventName, callback);
}

export function isGameRunning() {
  return game !== null && game.isRunning;
}

export function getGameDimensions() {
  return { width: gameConfig.width, height: gameConfig.height };
}

export function getGameFPS() {
  if (!game) {
    console.error('Game not initialized');
    return null;
  }
  return Math.round(game.loop.actualFps);
}

export function toggleDebugMode(enabled) {
  if (!game) {
    console.error('Game not initialized');
    return;
  }
  const arcadePhysics = game.physics.arcade;
  arcadePhysics.debug = enabled;
  arcadePhysics.debugShowBody = enabled;
  arcadePhysics.debugShowStaticBody = enabled;
  arcadePhysics.debugShowVelocity = enabled;
  console.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
}

export default {
  gameConfig,
  initializeGame,
  getGame,
  destroyGame,
  getGameConfig,
  updateGameConfig,
  launchScene,
  startScene,
  stopScene,
  getActiveScene,
  getScene,
  getGameState,
  updateGameState,
  onGameEvent,
  emitGameEvent,
  offGameEvent,
  isGameRunning,
  getGameDimensions,
  getGameFPS,
  toggleDebugMode,
};