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

func AddPassport(w http.ResponseWriter, r *http.Request) {
	var passport models.Passport
	decoder.Get(r.Body, &passport)
	err := database.Add(passport)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create passport:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}
func GetPassport(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passport := models.Passport{ID: params["id"]}
	temp := database.Get(&passport)
	if temp != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get passport:\n" + temp.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Passport: []models.Passport{passport}}); err != nil {
		logger.LogErr(err)
	}
}

func GetAllPassports(w http.ResponseWriter, r *http.Request) {
	passports := []models.Passport{}
	err := database.GetAll(&passports)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get passports:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Passport: passports}); err != nil {
		logger.LogErr(err)
	}
}

func GetAllPrePassports(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passports := []models.Passport{}
	err := database.GetAllWithEagerLoading(&passports, params["component"])

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get passports:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Passport: passports}); err != nil {
		logger.LogErr(err)
	}
}

func GetOnePrePassport(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passport := models.Passport{ID: params["id"]}
	database.GetAllWithEagerLoading(&passport, params["component"])
	temp := database.Get(&passport)
	if temp != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get passport:\n" + temp.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Passport: []models.Passport{passport}}); err != nil {
		logger.LogErr(err)
	}
}




func UpdatePassport(w http.ResponseWriter, r *http.Request) {
	var passoprt models.Passport
	decoder.Get(r.Body, &passoprt)
	err := database.Update(passoprt)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to update passoprt:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}

func RemovePassport(w http.ResponseWriter, r *http.Request)  {
	params := mux.Vars(r)
	passport := models.Passport{ID:params["id"]}
	err:=database.Remove(passport)
	if err== nil {
		w.WriteHeader(http.StatusOK)

	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
			logger.LogErr(err)
		}
	}
}