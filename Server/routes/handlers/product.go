package handlers

import (
	"../../data/database"
	"../../data/models"
	"../../logger"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"../../decoder"
)

func GetProduct(w http.ResponseWriter, r *http.Request) {
	params:=mux.Vars(r)
	product:=models.Product{ID:params["id"]}
	temp,err:=database.GetProduct(product.ID)
	if err== nil {
		w.WriteHeader(http.StatusOK)
		if err:=json.NewEncoder(w).Encode(Response{Product: temp}); err!=nil{
			logger.LogErr(err)
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
			logger.LogErr(err)
		}
	}
}


func UpdateProduct(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	decoder.Get(r.Body, &product)
	err := database.Update(product)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to update product:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}

func RemoveProduct(w http.ResponseWriter, r *http.Request)  {
	params := mux.Vars(r)
	product := models.Product{ID:params["id"]}
	err:=database.Remove(product)
	if err== nil {
		w.WriteHeader(http.StatusOK)
		if err:=json.NewEncoder(w).Encode(Response{Product: product}); err!=nil{
			logger.LogErr(err)
		}
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if err:=json.NewEncoder(w).Encode(Response{Errors:Errors{Global:"Invalid credentials"}}); err!=nil{
			logger.LogErr(err)
		}
	}
}