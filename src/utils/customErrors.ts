class DoctorGetAllError extends Error {
    constructor(){
        super("Failed to retrieve doctor list")
        this.name = "DoctorGetAllError"
    }
}

class DoctorGetByIdError extends Error {
    constructor(id : number){
        super("Failed to retrieve doctor by id: " + id)
        this.name = "DoctorGetbyIdError"
    }
}

class PatientGetByIdError extends Error {
    constructor(){
        super("Failed to retrieve patient")
        this.name = "PatientGetByIdError"
    }
}

class PatientGetAllError extends Error {
    constructor(){
        super("Failed to retrieve patient list")
        this.name = "PatientGetAllError"
    }
}

class DoctorCreationError extends Error {
    constructor(message: string){
        super(message)
        this.name = "DoctorCreationError"
    }
}

class DoctorUpdateError extends Error {
    constructor(){
        super("Failed to update doctor")
        this.name = "DoctorUpdateError"
    }
}

class PacientUpdateError extends Error {
    constructor(){
        super("Failed to update patient")
        this.name = "PacientUpdateError"
    }
}

class DoctorDeleteError extends Error {
    constructor(){
        super("Failed to delete doctor")
        this.name = "DoctorDeleteError"
    }
}

class PatientDeleteError extends Error {
    constructor(){
        super("Failed to delete patient")
        this.name = "PatientDeleteError"
    }
}

class apppointmentDeleteError extends Error {
    constructor(){
        super("Failed to delete apppointment")
        this.name = "AppointmentDeleteError"
    }
}

class RecordNotFoundError extends Error {
    constructor(){
        super("Record has not found yet")
        this.name = "RecordNotFound"
    }
}


class GetAllError extends Error {
    constructor(message: string, componentName?: string){
        super(message)
        this.name = `${componentName}GetAllError`
    }
}

export {
    DoctorGetAllError,
    DoctorCreationError,
    RecordNotFoundError,
    DoctorUpdateError,
    DoctorDeleteError,
    PatientGetAllError,
    GetAllError,
    PacientUpdateError,
    PatientDeleteError,
    apppointmentDeleteError,
    DoctorGetByIdError,
    PatientGetByIdError
}