export enum UserRole {
  ProgramAdmin = "Program Admin",
  StudyCoordinator = "Study Coordinator",
  Clinician = "Clinician",
  Participant = "Participant",
}

export enum Permission {
  ViewDashboard = "view:dashboard",
  EditStudy = "edit:study",
  AccessSensitiveData = "access:sensitive_data",
  SubmitForm = "submit:form",
}
