package models

type Equipment struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Brand string `json:"brand"`
	Name string `json:"name"`
	MachineType string `json:"machineType,omitempty"`
	MachineStatus string `json:"machineStatus,omitempty"`

	//Associations

	OperationID string
}
