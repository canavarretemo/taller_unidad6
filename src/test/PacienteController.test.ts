import { Request, Response } from "express";
import { PatientController, PatientControllerImpl } from "../api/components/pacientes/controller";
import { PatientService, PatientServiceImpl } from "../api/components/pacientes/service";
import { Patient, PatientReq } from "../api/components/pacientes/model";

const mockReq =  {} as Request
const mockRes =  {} as Response

describe('PatientController', () => {
    let patientService: PatientService
    let patientController: PatientController

    beforeEach(() => {
        patientService = {
            getAllPatients: jest.fn(),
            createPatient: jest.fn(),
            getPatientById: jest.fn(),
            updatePatient:jest.fn(),
            deletePatient: jest.fn()
        }

        patientController = new PatientControllerImpl(patientService)
        mockRes.status = jest.fn().mockReturnThis()
        mockRes.json = jest.fn().mockReturnThis()
    })



}

)