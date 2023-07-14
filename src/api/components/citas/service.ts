import { DoctorCreationError, DoctorGetByIdError, RecordNotFoundError, GetAllError, apppointmentDeleteError, PatientGetByIdError } from "../../../utils/customErrors"
import logger from "../../../utils/logger"
import { AppointmentReq, Appointment, AppointmentResDB } from "./model"
import { AppointmentRepository } from "./repository"
import { DoctorRepository } from "../doctores/repository"
import { Doctor } from "../doctores/model"
import { PatientRepository } from "../pacientes/repository"

export interface AppointmentService {
    getAllAppointments(): Promise<Appointment[]>
    createAppointment(patientReq: AppointmentReq): Promise<Appointment>
    getAppointmentById(id: number): Promise<Appointment>
    deleteAppointment(id: number): Promise<void>
}


export class AppointmentServiceImpl implements AppointmentService {
    private appointmentRepository: AppointmentRepository
    private doctorRepository: DoctorRepository
    private patientRepository: PatientRepository

    constructor(appointmentRepository: AppointmentRepository, doctorRepository: DoctorRepository, 
        patientRepository: PatientRepository){
        this.appointmentRepository = appointmentRepository
        this.doctorRepository = doctorRepository
        this.patientRepository = patientRepository
    }

    public async getAllAppointments(): Promise<Appointment[]> {
        try{
            
            const patients = await  this.appointmentRepository.getAllAppointment()
            return patients
        } catch (error){
            logger.error(error)
            throw new GetAllError("Failed getting all appointments from service", "appointment")
        }
    }
    
    public  async createAppointment(appointmentReq: AppointmentReq): Promise<Appointment> {
        try{
            const existDoctor =  await this.doctorRepository.getDoctorById(appointmentReq.id_doctor)
            if (!existDoctor) {
                throw new DoctorGetByIdError(appointmentReq.id_doctor)
            } 
            const existPatient = await this.patientRepository.getPatientByIdPac(appointmentReq.identificacion_paciente)
            if (!existPatient) {
                throw new PatientGetByIdError()
            }             
            const appointmentDb = await this.appointmentRepository.createAppointment(appointmentReq) 
            const appointment: Appointment = mapAppointment(appointmentDb, existDoctor)
            return appointment
        } catch (error){
            if(error instanceof PatientGetByIdError){
                throw error
            } else if(error instanceof DoctorGetByIdError){
                throw error
            } else{
                throw new DoctorCreationError("Failed to create appointment from service")
            }
    }
}

    public async getAppointmentById(id: number): Promise<Appointment> {
        try {
            const appointmentDb =  await this.appointmentRepository.getAppointmentById(id)
            const doctor = await this.doctorRepository.getDoctorById(appointmentDb.id_doctor)
            const appointment: Appointment = mapAppointment(appointmentDb, doctor)
            return appointment
        } catch (error) {
            logger.error('Failed to get appointment from service')
            throw new RecordNotFoundError()
        }
    }

    public async deleteAppointment(id: number): Promise<void>{
        try{
            const appointmentExist = this.appointmentRepository.getAppointmentById(id)
            if(!appointmentExist){
                throw new RecordNotFoundError()
            } else {
                await this.appointmentRepository.deleteAppointment(id)
            }
        } catch (error) {
            logger.error('Failed to delete apppointment from service')
            throw new apppointmentDeleteError()
        }


    }

   
}


function mapAppointment(appointmentDb: AppointmentResDB, doctor: Doctor): Appointment {
    const appointment: Appointment = {
        identificacion_paciente: appointmentDb.identificacion_paciente, 
        especialidad:appointmentDb.especialidad,
        doctor: `${doctor.nombre} ${doctor.apellido}`,
        consultorio: doctor.consultorio,
        horario: appointmentDb.horario
    }
    return appointment
}