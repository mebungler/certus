package models

type TypeOfCloth struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Name string
	//Models []types
}
