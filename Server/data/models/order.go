package models

type Order struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Customer Customer       `json:"customer"`
	CustomerID string
	TypeOfCloth TypeOfCloth	 `json:"typeOfCloth"`
	TypeOfClothID string
	ActionOnModel ActionOnModel `json:"actionOnModel"`
	ActionOnModelID string
	Property 	  []Property `json:"property"`


}
