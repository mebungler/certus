package models

type Passport struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	CodeOfPassport int   `json:"codeOfPassport"`
	Customer Customer	`json:"customer"`
	CustomerID string
	Model Model        `json:"model"`
	ModelID string
	Oreder Order `json:"oreder,omitempty"`
	OrderID string
	Color string	   `json:"color"`
	Size int		   `json:"size"`
	Quantity int       `json:"quantity"`
}