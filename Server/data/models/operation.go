package models

type Operation struct {
	ID                 string    `gorm:"primary_key" json:"id,omitempty"`
	IdealTime          int       `json:"idealTime"`
	Equipment          Equipment `json:"equipment"`
	EquipmentID        string
	Number             int    `json:"numOfOperation"`
	SeamstressPriority int    `json:"seamstressPriority"`
	Name               string `json:"name"`
	RealTime           int    `json:"realTime"`
}
