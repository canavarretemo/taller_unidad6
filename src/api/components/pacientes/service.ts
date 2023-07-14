import { DoctorCreationError, DoctorDeleteError, DoctorUpdateError, PatientDeleteError, RecordNotFoundError } from "../../../utils/customErrors"
import logger from "../../../utils/logger"
import { PatientReq, Patient } from "./model"
import { PatientRepository } from "./repository"


export interface PatientService {
    getAllPatients(): Promise<Patient[]>
    createPatient(patientReq: PatientReq): Promise<Patient>
    getPatientById(id: number): Promise<Patient>
    updatePatient(id: number, updates:Partial<Patient>): Promise<Patient>
    deletePatient(id: number): Promise<void>

}

export class PatientServiceImpl implements PatientService {
    private patientRepository: PatientRepository

    constructor(patientRepository: PatientRepository){
        this.patientRepository = patientRepository
    }

    public getAllPatients(): Promise<Patient[]> {
        const patients: Promise<Patient[]> =  this.patientRepository.getAllPatients()
        return patients
    }
    
    public   createPatient(patientReq: PatientReq): Promise<Patient> {
        try{
            const actualDate = new Date()
            patientReq.created_at = actualDate
            patientReq.updated_at = actualDate
            return this.patientRepository.createPatient(patientReq)
        } catch (error){
            throw new DoctorCreationError("Failed to create patient from service")
        }
    }

    public getPatientById(id: number): Promise<Patient> {
        try {
            return this.patientRepository.getPatientById(id)
        } catch (error) {
            logger.error('Failed to get patient from service')
            throw new RecordNotFoundError()
        }
    }

    public getPatientByIdPac(id: String): Promise<Patient> {
        try {
            return this.patientRepository.getPatientByIdPac(id)
        } catch (error) {
            logger.error('Failed to get patient from service')
            throw new RecordNotFoundError()
        }
    }

    public  async updatePatient(id: number, updates: Partial<PatientReq>): Promise<Patient> {
        try {
            const existPatient =  await this.patientRepository.getPatientById(id)
            if (!existPatient) {
                throw new RecordNotFoundError()
            }
            updates.updated_at =  new Date()
            const updatePatient = {...existPatient, ...updates}
            this.patientRepository.updatePatient(id, updatePatient)
            return updatePatient
        } catch (error) {
            logger.error('Failed to update patient from service')
            throw new DoctorUpdateError()
        }
    }

    public async deletePatient(id :number) : Promise<void>{
        try{
            const existPatient = await this.patientRepository.getPatientById(id);
            if (!existPatient){
                throw new RecordNotFoundError()
            } else {
                await this.patientRepository.deletePatient(id)
            } 

        }catch (error) {
            logger.error( 'Failed to delete doctor from service' )
            throw new PatientDeleteError()
        }
    }

   
}