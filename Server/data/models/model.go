package models

import (
	"time"
)
type Model struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	CodeOfModel string `json:"codeOfModel,omitempty"`
	Customer Customer `json:"customer,omitempty"`
	CustomerID string
	TypeOfCloth TypeOfCloth `json:"typeOfCloth,omitempty"`
	TypeOfClotheID string
	ActionOnModel []ActionOnModel `json:"actionOnModel"`

	CreatedAt time.Time `json:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
}
