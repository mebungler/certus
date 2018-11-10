package models

type Order struct {
	ID string `gorm:"primary_key" json:"id,omitempty"`
	Customer Customer       `json:"customer,omitempty"`
	CustomerID string
	TypeOfCloth TypeOfCloth	 `json:"typeOfCloth,omitempty"`
	TypeOfClothID string
	CodeOfModel string
	Model Model 		 	`json:"model,omitempty"`
	ModelID string
	Property 	  []Property `json:"property,omitempty"`
	TechnologyID  	    string
	TypeOfProcess 		string `json:"typeOfProcess"`
	Photo				string `json:"photo,omitempty"`
	ManagerReady 		bool `json:"managerReady"`
	ReadyForCutting  	bool `json:"readyForCutting"`
	Finished 			bool `json:"finished"`
	

}
