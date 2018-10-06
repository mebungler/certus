package models

type Order struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Customer Customer       `json:"customer"`
	CustomerID string
	TypeOfCloth TypeOfCloth	 `json:"typeOfCloth"`
	TypeOfClothID string
	CodeOfModel string
	Model Model 		 	`json:"model"`
	ModelID string
	Property 	  []Property `json:"property"`


}
