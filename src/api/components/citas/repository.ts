import { db } from "../../../config/database"
import { Appointment, AppointmentReq, AppointmentResDB } from "./model"
import logger from '../../../utils/logger'
import { DoctorCreationError,  apppointmentDeleteError,  RecordNotFoundError, GetAllError} from "../../../utils/customErrors"

export class AppointmentRepository {
    public async createAppointment(appointment: AppointmentReq): Promise<AppointmentResDB> {
        try {
            const [createdAppointment] =  await db('citas').insert(appointment).returning('*') 
            return createdAppointment
        } catch (error) {
            throw new DoctorCreationError(`Failed to create appointment dubt: ${error}`)
        }
    }

    public async getAllAppointment(): Promise<Appointment[]> {
        try {
            return  db.select('*').from('citas')
        } catch (error) {
            
            throw new GetAllError("Failed getting all appointments from repository", "appointment")
        }
    }

    public async getAppointmentById(id: number): Promise<AppointmentResDB> {
        try{
            const appointment = await db('citas').where({ id_cita: id }).first()
            return appointment
        } catch (error){
            logger.error( 'Failed get appointment by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }

    public async deleteAppointment(id :number) : Promise<void>{
        try{
            const apppointment = db('citas').where({ id_cita: id}).del()
        } catch (error) {
            logger.error( 'Failed deleting appointment in repository', {error})
            throw new apppointmentDeleteError()
        }
    }
}