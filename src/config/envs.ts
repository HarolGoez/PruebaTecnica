import 'dotenv/config';
import * as env from 'env-var';


export const getEnvs = () => {

    try {
        const PORT = env.get('PORT').required().asPortNumber()
        const API_KEY_AMADEUS = env.get('API_KEY_AMADEUS').asString()
        const API_KEY_SECRET = env.get('API_KEY_SECRET').asString()

        return {
            port: PORT,
            api_key: API_KEY_AMADEUS,
            api_secret: API_KEY_SECRET
        }

    } catch (error) {
        return {
            port: 3000,
            api_key: '',
            api_secret: ''
        }
    }


}



