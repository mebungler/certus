package models

type Customer struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	CustomerName string `json:"customerName,omitempty"`
	ContactNumber string `json:"contactNumber,omitempty"`
	Email string `json:"email,omitempty"`
}
