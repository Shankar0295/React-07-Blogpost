import { initializeApp } from 'firebase/app';


const FireBaseConfig = {
    apiKey: process.env.FIRE_BASE_KEY,
    authDomain: "blogscope-a7010.firebaseapp.com",
    databaseURL: "https://blogscope-a7010-default-rtdb.firebaseio.com",
    projectId: "blogscope-a7010",
    storageBucket: "blogscope-a7010.appspot.com",
    messagingSenderId: "804817611378",
    appId: "1:804817611378:web:d6c40673b48054153a30eb",
    measurementId: "G-EQQDP06YKC"
};

const app = initializeApp(FireBaseConfig);

export default app;