package models

type Property struct {
	OrderID string 
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Color string	`json:"color,omitempty"`
	Size int	   `json:"size"`
	Quantity int   `json:"quantity"`
}