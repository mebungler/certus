package models

type Passport struct {
	ID int `gorm:"primary_key" json:"id,omitempty"`
	Customer Customer	`json:"customer"`
	CustomerID Customer
	Model Model     `json:"model"`
	ModelID Model
	Color string	`json:"color"`
	Size int		`json:"size"`
	Quantity int   `json:"quantity"`
}