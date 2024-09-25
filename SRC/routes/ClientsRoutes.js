import { Router } from "express";
import { GetClients,GetClientsById ,createClients,updateClients,deleteClients} from "../controllers/clientsControllers.js";

const router = Router()

router.get('/clients',GetClients)
router.get('/clients/:id',GetClientsById)
router.post('/clients',createClients)
router.put('/clients/:id',updateClients)
router.delete('/clients/:id',deleteClients)


export default router;