package models



type Model struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	CustomerID string
	TypeOfClotheID string
}
