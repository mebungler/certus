package handlers

import (
	"../../data/database"
	"../../data/models"
	"../../decoder"
	"../../logger"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

func AddTechnology(w http.ResponseWriter , r *http.Request)  {
	var technology models.Technology
	decoder.Get(r.Body, &technology)
	err := database.Add(technology)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create technology:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}


func GetTechnology(w http.ResponseWriter , r *http.Request)  {
	params:=mux.Vars(r)
	technolgy := models.Technology{ID:params["id"]}
	decoder.Get(r.Body, &technolgy)
	temp := database.Get(&technolgy)
	if temp != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if temp := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get order:\n" + temp.Error()}}); temp != nil {
			logger.LogErr(temp)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if temp := json.NewEncoder(w).Encode(Response{Technology: []models.Technology{technolgy}}); temp != nil {
		logger.LogErr(temp)
	}
}

func GetAllTechnologies(w http.ResponseWriter, r *http.Request)  {
	technologies := []models.Technology{}
	err :=	database.GetAll(&technologies)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get technologies:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Technology: technologies}); err != nil {
		logger.LogErr(err)
	}
}
