import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
};

export default async function handler(req, res) {
    const { monto } = req.query;
    
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    
    try {
        const snapshot = await get(ref(db, 'cotizacion/precioDolar'));
        const precioDolar = snapshot.val();
        const total = monto * precioDolar;

        res.status(200).json({ total: total });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}