package handlers

import "../../data/models"

type Errors struct {
	Global string `json:"global,omitempty"`
}
type Response struct {
	Errors      Errors               `json:"errors,omitempty"`
	Users       []models.User        `json:"users,omitempty"`
	User        models.User          `json:"user,omitempty"`
	Product     models.Product       `json:"product,omitempty"`
	Operations  []models.Operation   `json:"operations,omitempty"`
	Equipments  []models.Equipment   `json:"equipments,omitempty"`
	Customers   []models.Customer    `json:"customers,omitempty"`
	Models      []models.Model       `json:"models,omitempty"`
	TypeOfCloth []models.TypeOfCloth `json:"typeofclothes,omitempty"`
	Order 		[]models.Order 		 `josn:"orders,omitempty"`
	Passport 	[]models.Passport 	 `josn:"passports,omitempty"`
	FinishedOperation 	[]models.FinishedOperation 	 `josn:"finishedOperations,omitempty"`
	Pause 			[]models.Pause		`json:"pauses,omitempty"`
	Technology 		[]models.Technology		`json:"technologies,omitempty"`
	ActionOnModel   []models.ActionOnModel `json:"action_on_models,omitempty"`


}
