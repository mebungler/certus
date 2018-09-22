package handlers

import (
	"../../decoder"
	"../../data/database"
	"../../logger"
	"net/http"
	"encoding/json"
	"io/ioutil"
)

func AddOperation(w http.ResponseWriter, r *http.Request) {
	operation, err := decoder.GetOperation(r.Body)
	a,_:=ioutil.ReadAll(r.Body)
	print(string(a))
	if err != nil {
		logger.LogErr(err)
	}
	err = database.AddOperation(operation)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to create operation:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
}

func GetOperations(w http.ResponseWriter, r *http.Request) {
	operations, err := database.GetAllOperations()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if err := json.NewEncoder(w).Encode(Response{Errors: Errors{Global: "Failed to get operations:\n" + err.Error()}}); err != nil {
			logger.LogErr(err)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(Response{Operations: operations}); err != nil {
		logger.LogErr(err)
	}
}

/*func GetOperation(w http.ResponseWriter, r *http.Request) {
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
}*/