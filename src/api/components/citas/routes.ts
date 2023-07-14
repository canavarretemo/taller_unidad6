import  { Router} from 'express'
import { AppointmentController, AppointmentControllerImpl } from './controller'
import { AppointmentRepository } from './repository'
import { AppointmentServiceImpl } from './service'
import { DoctorRepository } from '../doctores/repository'
import { PatientRepository } from '../pacientes/repository'


const router = Router()
const repository = new AppointmentRepository()
const repositoryDoctor = new DoctorRepository()
const patienteRepository = new PatientRepository()
const service = new AppointmentServiceImpl(repository, repositoryDoctor, patienteRepository)
const controller: AppointmentController = new AppointmentControllerImpl(service)


router.get('',  controller.getAllAppointment.bind(controller))
router.post('/create',  controller.createAppointment.bind(controller))
router.get('/:id',  controller.getAppointmentById.bind(controller))
router.delete('/:id', controller.deleteApointment.bind(controller))

export default router