package handlers

import (
	"../../data/database"
	"../../data/models"
	"../../decoder"
	"../../logger"
	"encoding/json"
	"net/http"
)

func AddCustomer(w http.ResponseWriter,r *http.Request)  {
	var customer models.Customer
	decoder.Get(r.Body,&customer)
	err := database.AddCustomer(customer)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create customer:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)

}

func GetCustomers(w http.ResponseWriter,r *http.Request)  {
	customers,err:= database.GetCustomers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create customers:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Customers: customers}); err != nil {
		logger.LogErr(err)
	}

}

func GetCustomer(w http.ResponseWriter, r *http.Request) {
	var customer models.Customer
	decoder.Get(r.Body, &customer)
	temp, err := database.GetCustomer(customer.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get customer:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Customers: []models.Customer{temp}}); err != nil {
		logger.LogErr(err)
	}
}