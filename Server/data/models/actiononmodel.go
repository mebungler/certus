package models

type ActionOnModel struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	EquipmentID string
	OperationID string
} 