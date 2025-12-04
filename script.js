// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://healthmonitory-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elements
const bpmEl = document.getElementById('bpm');
const spo2El = document.getElementById('spo2');
const bpmCard = bpmEl.parentElement;
const spo2Card = spo2El.parentElement;

// Listen for BPM changes
db.ref('BPM').on('value', snapshot => {
  const bpm = snapshot.val();
  bpmEl.textContent = bpm;
  // Alert if BPM is too low or high
  if (bpm < 60 || bpm > 100) bpmCard.classList.add('alert');
  else bpmCard.classList.remove('alert');
});

// Listen for SpO2 changes
db.ref('SpO2').on('value', snapshot => {
  const spo2 = snapshot.val();
  spo2El.textContent = spo2 + '%';
  // Alert if SpO2 is too low
  if (spo2 < 90) spo2Card.classList.add('alert');
  else spo2Card.classList.remove('alert');
});
