package handlers

import (
	"../../data/models"
	"../../decoder"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"../../data/database"
	"../../logger"
)
func AddModel(w http.ResponseWriter,r *http.Request)  {
	var model models.Model
	decoder.Get(r.Body,&model)
 	err := database.AddModel(model)
 	if err != nil {
 		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create model:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}

		return
	}
 	w.WriteHeader(http.StatusOK)
}

func GetModel(w http.ResponseWriter,r *http.Request)  {
	params:=mux.Vars(r)
	model := models.Model{ID:params["id"]}
	temp,err := database.GetModel(model.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get model:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Models: []models.Model{temp}}); err != nil {
		logger.LogErr(err)
	}
}
func GetModels(w http.ResponseWriter, r *http.Request) {
	models, err := database.GetAllModels()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get models:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Models: models}); err != nil {
		logger.LogErr(err)
	}
}

func GetAllPre(w http.ResponseWriter, r *http.Request)  {
	models := []models.Model{}
	err := database.GetAllWithEagerLoading(&models,"Equipment")
	database.GetAllWithEagerLoading(&models,"Operation")
	database.GetAllWithEagerLoading(&models,"ActionOnModel")

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get models:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Models: models}); err != nil {
		logger.LogErr(err)
	}
}