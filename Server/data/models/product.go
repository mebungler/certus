package models

type Product struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Operations []Operation `json:"operations,omitempty"`
}
