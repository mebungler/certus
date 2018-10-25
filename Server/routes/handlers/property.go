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

func AddProperty(w http.ResponseWriter , r *http.Request)  {
	var property models.Passport
	decoder.Get(r.Body, &property)
	err := database.Add(property)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create property:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}


func UpdateProperty(w http.ResponseWriter, r *http.Request) {
	var property models.User
	decoder.Get(r.Body, &property)
	err := database.Update(property)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to update property:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}

func RemoveProperty(w http.ResponseWriter, r *http.Request)  {
	params := mux.Vars(r)
	property := models.Property{ID:params["id"]}
	err:=database.Remove(property)
	if err== nil {
		w.WriteHeader(http.StatusOK)

	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
			logger.LogErr(err)
		}
	}
}