package models

type Passport struct {
	ID string `gorm:"primary_key" json:"id,omitempty" "AUTO_INCREMENT"`
	CodeOfPassport int
	Customer Customer	`json:"customer"`
	CustomerID string
	Model Model     `json:"model"`
	ModelID string
	Color string	`json:"color"`
	Size int		`json:"size"`
	Quantity int   `json:"quantity"`
}