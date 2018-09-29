package models

type Order struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Customer Customer
	CustomerID string
	TypeOfCloth TypeOfCloth
	TypeOfClothID string
	ActionOnModel ActionOnModel
	ActionOnModelID string

}
