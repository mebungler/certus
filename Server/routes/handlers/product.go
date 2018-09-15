package handlers

import (
	"../../data/database"
	"../../data/models"
	"../../logger"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
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
