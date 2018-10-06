package handlers

import (
	"../../data/database"
	"../../logger"
	"encoding/json"
	"net/http"
	"../../data/models"
	"../../decoder"
)

func AddOrder(w http.ResponseWriter , r *http.Request)  {
	var order models.Model
	decoder.Get(r.Body, &order)
	err := database.Add(order)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create order:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}
func GetOrder(w http.ResponseWriter , r *http.Request)  {
	var order models.Order
	decoder.Get(r.Body, &order)
	temp := database.Get(&order)
	if temp != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if temp := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get order:\n" + temp.Error()}}); temp != nil {
			logger.LogErr(temp)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if temp := json.NewEncoder(w).Encode(Response{Order: []models.Order{order}}); temp != nil {
		logger.LogErr(temp)
	}
}

func GetAllOrders(w http.ResponseWriter, r *http.Request)  {
	orders := []models.Order{}
	err :=	database.GetAll(&orders)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get equipments:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Order: orders}); err != nil {
		logger.LogErr(err)
	}
}

func GetAllPreOrder(w http.ResponseWriter, r *http.Request)  {
	orders := []models.Order{}
	err := database.GetAllWithEagerLoading(&orders,"Customer")
	database.GetAllWithEagerLoading(&orders,"TypeOfCloth")
	database.GetAllWithEagerLoading(&orders,"ActionOnModel")
	database.GetAllWithEagerLoading(&orders,"Order")

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get models:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Order: orders}); err != nil {
		logger.LogErr(err)
	}
}