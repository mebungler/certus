package models

type Operation struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	ProductID string `json:"product_id"`
	TimeSpan int `json:"time_span"`
	Equipment Equipment `json:"equipment"`
	Number int `json:"number"`
	SeamstressPriority int `json:"seamstressPriority"`
	Name string `json:"name"`
	Cycle int `json:"cycle"`
}
