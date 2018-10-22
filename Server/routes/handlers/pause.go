package handlers

import (
	"../../data/database"
	"../../data/models"
	"../../decoder"
	"../../logger"
	"encoding/json"
	"net/http"
)

func AddPause(w http.ResponseWriter , r *http.Request)  {
	var pause models.Pause
	decoder.Get(r.Body, &pause)
	err := database.Add(pause)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create pause:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}

/*

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	decoder.Get(r.Body, &user)
	err := database.Update(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to update user:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}
/*
func RemovePuase(w http.ResponseWriter, r *http.Request)  {
	params := mux.Vars(r)
	pause := models.Pause{ID:params["id"]}
	err:=database.Remove(pause)
	if err== nil {
		w.WriteHeader(http.StatusOK)
		if err:=json.NewEncoder(w).Encode(Response{User: user}); err!=nil{
			logger.LogErr(err)
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
			logger.LogErr(err)
		}
	}
}
*/