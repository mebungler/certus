package handlers

import (
"../../data/database"
"../../logger"
"encoding/json"
"github.com/gorilla/mux"
"net/http"
"../../data/models"
"../../decoder"
)

func AddFinOperation(w http.ResponseWriter , r *http.Request)  {
	var finOperation models.FinishedOperation
	decoder.Get(r.Body, &finOperation)
	err := database.Add(finOperation)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create finOperation:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}
func GetFinishedOperation(w http.ResponseWriter , r *http.Request)  {
	params:=mux.Vars(r)
	finOperation := models.FinishedOperation{ID:params["id"]}
	temp := database.Get(&finOperation)
	if temp != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get passport:\n" + temp.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{FinishedOperation: []models.FinishedOperation{finOperation}}); err != nil {
		logger.LogErr(err)
	}
}

func GetAllFinishedOperations(w http.ResponseWriter, r *http.Request)  {
	finOperations := []models.FinishedOperation{}
	err :=	database.GetAll(&finOperations)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get finOperations:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{FinishedOperation: finOperations}); err != nil {
		logger.LogErr(err)
	}
}

func GetAllPreFinishedOperations(w http.ResponseWriter, r *http.Request)  {
	params:=mux.Vars(r)
	finishedOperation := []models.FinishedOperation{}
	err := database.GetAllWithEagerLoading(&finishedOperation,params["ccomponent"])

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get passports:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{FinishedOperation: finishedOperation}); err != nil {
		logger.LogErr(err)
	}
}