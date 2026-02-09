import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Método no permitido');

    const { precio, password } = req.body;
    const PASSWORD_SECRETA = "TuClaveEternally123"; // CAMBIÁ ESTO POR TU CLAVE

    if (password !== PASSWORD_SECRETA) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    try {
        await set(ref(db, 'cotizacion/'), { precioDolar: precio });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
}