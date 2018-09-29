package models

type TypeOfCloth struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Name string `json:"name,omitempty"`
	//Models []types
}
