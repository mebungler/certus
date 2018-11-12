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
	Property 	  []Property `json:"property"`
	TechnologyID  	    string
	TypeOfProcess 		string `json:"typeOfProcess,omitempty"`
	Photo				string `json:"photo,omitempty"`
	ManagerReady 		bool `json:"managerReady,omitempty"`
	ReadyForCutting  	bool `json:"readyForCutting,omitempty"`
	Finished 			bool `json:"finished,omitempty"`
	

}
