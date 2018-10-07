package models

type ActionOnModel struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Equipment Equipment
	Operation Operation
	EquipmentID string
	OperationID string
	ModelID string
} 