package models

type Property struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Color string	`json:"color"`
	Size int	   `json:"size"`
	Quantity int   `json:"quantity"`
}