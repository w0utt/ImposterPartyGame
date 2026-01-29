// =====================================================
// Multiplayer functionality using Firebase Realtime Database
// =====================================================

// Firebase configuration
// IMPORTANT: Replace this with your own Firebase project configuration
// See MULTIPLAYER_SETUP.md for complete setup instructions
// The demo config below will NOT work - you must create your own Firebase project
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7XxsxIn_FgEWZzYXV-_2_7uny8JOE5cg",
  authDomain: "imposterpartygame-540ee.firebaseapp.com",
  databaseURL: "https://imposterpartygame-540ee-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "imposterpartygame-540ee",
  storageBucket: "imposterpartygame-540ee.firebasestorage.app",
  messagingSenderId: "579941194156",
  appId: "1:579941194156:web:83ebe4a4bc3ab46c0c0209",
  measurementId: "G-ZVJ8DB0TPF"
};

const MULTIPLAYER = {
  db: null,
  isHost: false,
  roomCode: null,
  playerName: null,
  playerId: null,
  players: [],
  roomRef: null,
  
  // Initialize Firebase
  init() {
    if (this.db) return;
    
    try {
      // Check if Firebase is already initialized
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      this.db = firebase.database();
      console.log('Firebase initialized');
    } catch (error) {
      console.error('Firebase initialization error:', error);
      // Fallback: use localStorage for demo purposes
      console.log('Using localStorage fallback for demo');
      this.db = null;
    }
  },
  
  // Generate a 6-digit room code
  generateRoomCode() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },
  
  // Generate unique player ID
  generatePlayerId() {
    return 'player_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
  },
  
  // Host a game
  async hostGame(playerName) {
    this.isHost = true;
    this.playerName = playerName;
    this.playerId = this.generatePlayerId();
    this.roomCode = this.generateRoomCode();
    
    if (!this.db) {
      // Fallback for demo without Firebase
      this.players = [{ id: this.playerId, name: playerName, isHost: true }];
      return this.roomCode;
    }
    
    try {
      this.roomRef = this.db.ref('rooms/' + this.roomCode);
      
      // Create room
      await this.roomRef.set({
        hostId: this.playerId,
        createdAt: Date.now(),
        players: {
          [this.playerId]: {
            name: playerName,
            isHost: true,
            joinedAt: Date.now()
          }
        },
        status: 'waiting'
      });
      
      // Listen for player changes
      this.roomRef.child('players').on('value', (snapshot) => {
        const playersData = snapshot.val() || {};
        this.players = Object.keys(playersData).map(id => ({
          id,
          name: playersData[id].name,
          isHost: playersData[id].isHost || false
        }));
        
        if (window.updatePlayersListUI) {
          window.updatePlayersListUI(this.players);
        }
      });
      
      console.log('Room created:', this.roomCode);
      return this.roomCode;
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Kon geen kamer maken. Probeer het opnieuw.');
      return null;
    }
  },
  
  // Join a game
  async joinGame(playerName, roomCode) {
    this.isHost = false;
    this.playerName = playerName;
    this.playerId = this.generatePlayerId();
    this.roomCode = roomCode;
    
    if (!this.db) {
      // Fallback for demo without Firebase
      alert('Multiplayer vereist Firebase configuratie. Zie README voor instructies.');
      return false;
    }
    
    try {
      this.roomRef = this.db.ref('rooms/' + roomCode);
      
      // Check if room exists
      const snapshot = await this.roomRef.once('value');
      if (!snapshot.exists()) {
        alert('Kamer niet gevonden. Controleer de code en probeer opnieuw.');
        return false;
      }
      
      // Add player to room
      await this.roomRef.child('players').child(this.playerId).set({
        name: playerName,
        isHost: false,
        joinedAt: Date.now()
      });
      
      // Listen for player changes
      this.roomRef.child('players').on('value', (snapshot) => {
        const playersData = snapshot.val() || {};
        this.players = Object.keys(playersData).map(id => ({
          id,
          name: playersData[id].name,
          isHost: playersData[id].isHost || false
        }));
        
        if (window.updatePlayersListUI) {
          window.updatePlayersListUI(this.players);
        }
      });
      
      // Listen for game start signal
      this.roomRef.child('gameStarted').on('value', (snapshot) => {
        if (snapshot.val() && window.handleMultiplayerGameStart) {
          window.handleMultiplayerGameStart();
        }
      });
      
      // Listen for full game data (for non-hosts)
      this.roomRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data && data.gameMode && data.gameStarted && !this.isHost && window.handleGameDataReceived) {
          window.handleGameDataReceived(data);
        }
        
        // Listen for new game restart
        if (data && !data.gameStarted && data.status === 'waiting' && window.returnToMainMenu) {
          // Host started a new game, return everyone to waiting room
          if (this.roomRef) {
            window.returnToMainMenu();
          }
        }
      });
      
      console.log('Joined room:', roomCode);
      return true;
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Kon niet joinen. Probeer het opnieuw.');
      return false;
    }
  },
  
  // Start game (host only)
  async startGame(gameMode, playersList, imposterIndex, gameData) {
    if (!this.isHost || !this.roomRef) return;
    
    try {
      await this.roomRef.update({
        gameStarted: true,
        status: 'playing',
        gameMode: gameMode,
        players: playersList.map((name, index) => ({
          name: name,
          isImposter: index === imposterIndex
        })),
        gameData: gameData // category/word or prompt pair
      });
    } catch (error) {
      console.error('Error starting game:', error);
    }
  },
  
  // Update player's answer (for Q&A mode)
  async updatePlayerAnswer(answer) {
    if (!this.roomRef || !this.playerId) return;
    
    try {
      await this.roomRef.child('playerAnswers').child(this.playerId).set({
        name: this.playerName,
        answer: answer,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  },
  
  // Start new game (host only)
  async startNewGame() {
    if (!this.isHost || !this.roomRef) return;
    
    try {
      await this.roomRef.update({
        gameStarted: false,
        status: 'waiting',
        gameMode: null,
        players: null,
        gameData: null,
        playerAnswers: null
      });
    } catch (error) {
      console.error('Error starting new game:', error);
    }
  },
  
  // Leave room
  async leaveRoom() {
    if (this.roomRef && this.playerId) {
      try {
        // Remove player from room
        await this.roomRef.child('players').child(this.playerId).remove();
        
        // If host is leaving, delete the entire room
        // Note: This implementation closes the room when host leaves
        // For production, consider implementing host migration instead
        if (this.isHost) {
          await this.roomRef.remove();
        }
        
        // Remove listeners
        this.roomRef.off();
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    }
    
    this.isHost = false;
    this.roomCode = null;
    this.playerName = null;
    this.playerId = null;
    this.players = [];
    this.roomRef = null;
  },
  
  // Cleanup
  destroy() {
    this.leaveRoom();
  }
};
