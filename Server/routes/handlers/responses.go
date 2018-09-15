package handlers

import "../../data/models"

type Errors struct {
	Global string `json:"global,omitempty"`
}
type Response struct {
	Errors     Errors             `json:"errors,omitempty"`
	Users      []models.User      `json:"users,omitempty"`
	User       models.User        `json:"user,omitempty"`
	Product    models.Product     `json:"product,omitempty"`
	Operations []models.Operation `json:"operations,omitempty"`
	Equipments []models.Equipment  `json:"equipments,omitempty"`
}
