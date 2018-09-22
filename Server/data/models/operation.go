package models

type Operation struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	ProductID string `json:"productID"`
	TimeSpan int `json:"time_span"`
	Equipment Equipment `json:"equipment"`
	EquipmentID string
	Number int `json:"number"`
	SeamstressPriority int `json:"seamstressPriority"`
	Name string `json:"name"`
	Cycle int `json:"cycle"`
}
