package handlers

import (
	"encoding/json"
	"net/http"
	"../../data/models"
	"../../decoder"
	"../../data/database"
	"../../logger"

)

func AddAction(w http.ResponseWriter,r *http.Request)  {
	var clotheType models.ActionOnModel
	decoder.Get(r.Body,&clotheType)
	err := database.Add(clotheType)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to add type of clothe:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}
/*
func GetAction(w http.ResponseWriter,r *http.Request)  {
	var typec models.ActionOnModel
	decoder.Get(r.Body,&typec)
	temp,err := database.Get(&typec)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get type of clothe :\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{TypeOfCloth: []models.TypeOfCloth{temp}}); err != nil {
		logger.LogErr(err)
	}

}

func GetAllTypes(w http.ResponseWriter, r *http.Request) {
	clothetypes, err := database.GetAllTypes()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get all types:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{TypeOfCloth: clothetypes}); err != nil {
		logger.LogErr(err)
	}

}
*/