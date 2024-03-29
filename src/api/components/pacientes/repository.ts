import { db } from "../../../config/database"
import { Patient, PatientReq,  } from "./model"
import logger from '../../../utils/logger'
import { DoctorCreationError,  PacientUpdateError,  PatientGetAllError,  RecordNotFoundError, PatientDeleteError } from "../../../utils/customErrors"

export class PatientRepository {
    public async createPatient(patient: PatientReq): Promise<Patient> {
        try {
            const [createdPatient] =  await db('pacientes').insert(patient).returning('*') 
            return createdPatient
        } catch (error) {
            throw new DoctorCreationError(`Failed to create patient dubt: ${error}`)
        }
    }

    public async getAllPatients(): Promise<Patient[]> {
        try {
            return  db.select('*').from('pacientes')
        } catch (error) {
            throw new PatientGetAllError()
        }
    }

    public async getPatientById(id: number): Promise<Patient> {
        try{
            const patient = await db('pacientes').where({ id_paciente: id }).first()
            return patient
        } catch (error){
            logger.error( 'Failed get patient by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }

    public async getPatientByIdPac(id: String): Promise<Patient> {
        try{
            const patient = await db('pacientes').where({ identificacion: id }).first()
            return patient
        } catch (error){
            logger.error( 'Failed get patient by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }
    

    public async updatePatient(id: number, updates: Partial<PatientReq>): Promise<void> {
        try{
            await db('pacientes').where({ id_paciente: id }).update(updates)
        } catch (error){
            logger.error( 'Failed updated doctor in repository', {error})
            throw new PacientUpdateError()
        }
    }

    public async deletePatient(id: number) : Promise<void>{
        try{
            await db('pacientes').where({ id_paciente : id }).del()
        } catch (error){
            logger.error( 'Failed deleting doctor in repository', {error} )
            throw new PatientDeleteError()
        }
    }
}